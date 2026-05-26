import React from 'react'

const boxStyle = (x: number, y: number, w: number, h: number) => ({ x, y, width: w, height: h, rx: 8 })

export default function ComparisonDiagrams() {
  return (
    <svg viewBox="0 0 1000 420" width="100%" height="auto" aria-label="Camera vs WiFi CSI diagram">
      <style>{`.title{font:18px sans-serif;fill:#111}.label{font:13px sans-serif;fill:#111}.muted{fill:#444;opacity:0.9}`}</style>

      {/* Camera box */}
      <rect {...boxStyle(20, 20, 460, 170)} fill="#f7f9fc" stroke="#cbd5e1" />
      <text x={40} y={45} className="title">CAMERA-BASED 3D RECONSTRUCTION (mature, proven)</text>
      <text x={40} y={75} className="label">Camera(s) → RGB Images → COLMAP/SfM → NeRF/3DGS</text>
      <text x={40} y={105} className="muted">Camera poses + Sparse point cloud</text>
      <text x={40} y={135} className="muted">↓</text>
      <text x={40} y={165} className="label">Dense 3D Mesh</text>

      {/* WiFi box */}
      <rect {...boxStyle(520, 20, 460, 170)} fill="#fff8f0" stroke="#f1c27d" />
      <text x={540} y={45} className="title">WIFI CSI 3D RECONSTRUCTION (proposed, exploratory)</text>
      <text x={540} y={85} className="label">WiFi APs → CSI Streams → ??? → NeRF/3DGS</text>
      <text x={540} y={115} className="muted">The gap: the missing "???" that converts CSI into geometric constraints</text>

      {/* Connecting header */}
      <g>
        <rect x={20} y={210} width={960} height={180} rx={8} fill="#ffffff" stroke="#e5e7eb" />
        <text x={40} y={240} className="title">Why this matters</text>
        <text x={40} y={275} className="label">The infrastructure exists widely; neural rendering is mature.</text>
        <text x={40} y={300} className="label">The missing piece is the bridge between WiFi CSI and geometry.</text>
      </g>
    </svg>
  )
}
