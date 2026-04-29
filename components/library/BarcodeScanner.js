"use client";
import { useEffect, useRef, useState } from "react";
import { prepareImage } from "../../lib/prepareImage";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://readr-vision.pierreblavette.workers.dev';

// Strip ISBN to digits + optional trailing X (ISBN-10 check digit).
function normalizeISBN(raw) {
  if (!raw) return '';
  const cleaned = raw.replace(/[^0-9Xx]/g, '').toUpperCase();
  if (cleaned.length === 10 || cleaned.length === 13) return cleaned;
  return '';
}

async function lookupISBN(isbn) {
  const url = `${WORKER_URL}/books?q=${encodeURIComponent('isbn:' + isbn)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`books_${res.status}`);
  const data = await res.json();
  const item = data.items?.[0]?.volumeInfo;
  if (!item || !item.title) return null;
  return {
    title: item.title,
    author: (item.authors || []).join(', '),
    year: item.publishedDate?.slice(0, 4) || null,
    genre: (item.categories || [])[0] || null,
    description: item.description || null,
    cover: item.imageLinks?.thumbnail?.replace('http:', 'https:') || null,
    isbn,
  };
}

export default function BarcodeScanner({ onBookFound, t }) {
  const [supportsNative, setSupportsNative] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle | scanning | reading-photo | looking-up | not-found | error
  const [errorMsg, setErrorMsg] = useState(null); // { title, desc? } | null
  const [manualISBN, setManualISBN] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);
  const photoInputRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('BarcodeDetector' in window) {
      try {
        detectorRef.current = new window.BarcodeDetector({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
        });
        setSupportsNative(true);
      } catch {}
    }
    // Touch detection for the photo-capture fallback (Safari iOS, etc.).
    setIsTouch(window.matchMedia('(pointer: coarse)').matches);
    return () => stopCamera();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopCamera() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }

  async function handleStartCamera() {
    setErrorMsg(null);
    setScanState('scanning');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      detectLoop();
    } catch (e) {
      setErrorMsg({ title: t.scanCameraError || 'Camera permission denied or unavailable.' });
      setScanState('error');
    }
  }

  async function detectLoop() {
    if (!detectorRef.current || !videoRef.current || scanState !== 'scanning') return;
    try {
      const codes = await detectorRef.current.detect(videoRef.current);
      const code = codes.find(c => /^\d{10,13}X?$/i.test(c.rawValue));
      if (code) {
        const isbn = normalizeISBN(code.rawValue);
        if (isbn) {
          stopCamera();
          await runLookup(isbn);
          return;
        }
      }
    } catch {}
    rafRef.current = requestAnimationFrame(detectLoop);
  }

  async function runLookup(isbn) {
    setScanState('looking-up');
    setErrorMsg(null);
    try {
      const book = await lookupISBN(isbn);
      if (!book) {
        setErrorMsg({
          title: t.scanNotFoundTitle || 'No book found',
          desc: t.scanNotFoundDescOverride || 'Try another or use the Manual tab.',
        });
        setScanState('not-found');
        return;
      }
      onBookFound?.(book);
      setScanState('idle');
    } catch (e) {
      setErrorMsg({
        title: t.scanLookupErrorTitle || 'Lookup failed',
        desc: t.scanLookupErrorDesc || 'Try again.',
      });
      setScanState('error');
    }
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = ''; // allow re-picking the same file later
    if (!file) return;
    setScanState('reading-photo');
    setErrorMsg(null);
    try {
      const { base64, mimeType } = await prepareImage(file);
      const res = await fetch('/api/vision/barcode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64, mimeType }),
      });
      const data = await res.json();
      if (!res.ok || !data.isbn) {
        setErrorMsg({
          title: t.scanNotFoundTitle || 'No barcode detected',
          desc: t.scanPhotoNotFoundDesc || 'Make sure the barcode is visible and well-lit, then try again.',
        });
        setScanState('error');
        return;
      }
      await runLookup(data.isbn);
    } catch (err) {
      setErrorMsg({
        title: t.scanGenericError || 'Something went wrong.',
      });
      setScanState('error');
    }
  }

  function handleManualLookup(e) {
    e.preventDefault();
    const isbn = normalizeISBN(manualISBN);
    if (!isbn) {
      setErrorMsg({
        title: t.scanInvalidISBNTitle || 'Invalid number',
        desc: t.scanInvalidISBNDesc || 'Enter 10 or 13 digits.',
      });
      setScanState('error');
      return;
    }
    runLookup(isbn);
  }

  function handleRetry() {
    stopCamera();
    setErrorMsg(null);
    setScanState('idle');
    setManualISBN('');
  }

  return (
    <>
      {(scanState === 'idle' || (scanState === 'looking-up' && manualISBN.trim())) && (
        <>
          {supportsNative ? (
            <button
              type="button"
              className="btn btn-primary btn-md scan-start-btn"
              onClick={handleStartCamera}
              disabled={scanState === 'looking-up'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              {t.scanStartBtn || 'Scan with camera'}
            </button>
          ) : isTouch ? (
            <>
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                className="btn btn-primary btn-md scan-start-btn"
                onClick={() => photoInputRef.current?.click()}
                disabled={scanState === 'looking-up'}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                {t.scanPhotoBtn || 'Take a photo of the barcode'}
              </button>
            </>
          ) : null}
          <form onSubmit={handleManualLookup} className="scan-manual">
            <label className="scan-manual-label">{t.scanManualLabel || 'Or enter ISBN manually'}</label>
            <div className="scan-manual-row">
              <input
                type="text"
                className="scan-manual-input"
                placeholder={t.scanManualPlaceholder || '978-…'}
                value={manualISBN}
                onChange={e => setManualISBN(e.target.value)}
                inputMode="numeric"
                autoComplete="off"
                disabled={scanState === 'looking-up'}
              />
              <button
                type="submit"
                className="btn btn-primary btn-md scan-lookup-btn"
                disabled={!manualISBN.trim() || scanState === 'looking-up'}
                aria-label={t.scanLookupBtn || 'Look up'}>
                {scanState === 'looking-up' ? (
                  <svg className="panel-cast-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                )}
                <span className="scan-lookup-label">
                  {scanState === 'looking-up' ? (t.scanLookingUp || 'Looking up…') : (t.scanLookupBtn || 'Look up')}
                </span>
              </button>
            </div>
          </form>
        </>
      )}

      {scanState === 'scanning' && (
        <div className="scan-camera">
          <video ref={videoRef} className="scan-video" playsInline muted />
          <div className="scan-viewfinder" />
          <p className="scan-instructions">{t.scanInstructions || 'Point your camera at the book\'s barcode.'}</p>
          <button type="button" className="btn btn-outline btn-md" onClick={handleRetry}>
            {t.scanCancel || 'Cancel'}
          </button>
        </div>
      )}

      {scanState === 'reading-photo' && (
        <div className="scan-loading">
          <div className="panel-spinner" />
          <span>{t.scanReadingPhoto || 'Reading the barcode…'}</span>
        </div>
      )}

      {scanState === 'looking-up' && !manualISBN.trim() && (
        <div className="scan-loading">
          <div className="panel-spinner" />
          <span>{t.scanLookingUp || 'Looking up…'}</span>
        </div>
      )}

      {(scanState === 'error' || scanState === 'not-found') && errorMsg && (
        <div className="scan-error-state">
          <div className="scan-error-text">
            <p className="scan-error-title">{errorMsg.title}</p>
            {errorMsg.desc && <p className="scan-error-desc">{errorMsg.desc}</p>}
          </div>
          <button type="button" className="btn btn-outline btn-md" onClick={handleRetry}>
            {t.scanRetry || 'Try again'}
          </button>
        </div>
      )}
    </>
  );
}
