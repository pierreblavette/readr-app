"use client";
import { useState, useEffect, useRef } from "react";

export default function GradientDropzone({ onClick, children, gradientId = "gradBorder" }) {
  const ref = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!ref.current) return;
    setDims({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
  }, []);

  return (
    <div ref={ref} className="import-dropzone import-dropzone-photo" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {dims.w > 0 && (
        <svg className="photo-dropzone-border" width={dims.w} height={dims.h} aria-hidden="true">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#F67BF8"/>
              <stop offset="62%" stopColor="#4959E6"/>
            </linearGradient>
          </defs>
          <rect x="1" y="1" width={dims.w - 2} height={dims.h - 2} rx="9" fill="none"
            stroke={`url(#${gradientId})`} strokeWidth="2" strokeDasharray="6 4"/>
        </svg>
      )}
      {children}
    </div>
  );
}
