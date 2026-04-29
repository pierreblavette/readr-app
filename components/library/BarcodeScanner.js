"use client";
import { useEffect, useRef, useState } from "react";

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
  const [scanState, setScanState] = useState('idle'); // idle | scanning | looking-up | not-found | error
  const [error, setError] = useState('');
  const [manualISBN, setManualISBN] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const detectorRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'BarcodeDetector' in window) {
      try {
        detectorRef.current = new window.BarcodeDetector({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'],
        });
        setSupportsNative(true);
      } catch {}
    }
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
    setError('');
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
      setError(t.scanCameraError || 'Camera permission denied or unavailable.');
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
    setError('');
    try {
      const book = await lookupISBN(isbn);
      if (!book) {
        setScanState('not-found');
        return;
      }
      onBookFound?.(book);
      setScanState('idle');
    } catch (e) {
      setError(t.scanLookupError || 'Could not look up this ISBN.');
      setScanState('error');
    }
  }

  function handleManualLookup(e) {
    e.preventDefault();
    const isbn = normalizeISBN(manualISBN);
    if (!isbn) {
      setError(t.scanInvalidISBN || 'Invalid ISBN. Enter 10 or 13 digits.');
      setScanState('error');
      return;
    }
    runLookup(isbn);
  }

  function handleRetry() {
    stopCamera();
    setError('');
    setScanState('idle');
    setManualISBN('');
  }

  return (
    <div className="scan-panel">
      {scanState === 'idle' && (
        <>
          {supportsNative && (
            <button type="button" className="btn btn-primary btn-md scan-start-btn" onClick={handleStartCamera}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              {t.scanStartBtn || 'Scan with camera'}
            </button>
          )}
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
              />
              <button type="submit" className="btn btn-outline btn-md" disabled={!manualISBN.trim()}>
                {t.scanLookupBtn || 'Look up'}
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

      {scanState === 'looking-up' && (
        <div className="scan-loading">
          <div className="panel-spinner" />
          <span>{t.scanLookingUp || 'Looking up…'}</span>
        </div>
      )}

      {scanState === 'not-found' && (
        <div className="scan-error-state">
          <p>{t.scanNotFound || 'No book found for this ISBN. Try another or use the Manual tab.'}</p>
          <button type="button" className="btn btn-outline btn-md" onClick={handleRetry}>
            {t.scanRetry || 'Try again'}
          </button>
        </div>
      )}

      {scanState === 'error' && (
        <div className="scan-error-state">
          <p>{error || t.scanGenericError || 'Something went wrong.'}</p>
          <button type="button" className="btn btn-outline btn-md" onClick={handleRetry}>
            {t.scanRetry || 'Try again'}
          </button>
        </div>
      )}
    </div>
  );
}
