import React from 'react';

const ReflectionDiagram = () => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 font-sans">
      <div className="relative rounded-xl bg-secondary/5 p-2 overflow-hidden">
        <svg viewBox="0 0 700 350" className="w-full h-auto drop-shadow-sm">
          {/* Grids for technical feel */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border/30" />
            </pattern>
            {/* Wave animation mask */}
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" className="text-secondary" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" className="text-secondary" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-secondary" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Wall (Top) */}
          <rect x="0" y="20" width="700" height="15" className="fill-muted/50" />
          <line x1="0" y1="35" x2="700" y2="35" className="stroke-textColor/80" strokeWidth="2" strokeDasharray="10,5" />
          <text x="350" y="15" textAnchor="middle" className="text-[10px] uppercase tracking-widest font-bold fill-muted-foreground">Boundary (Wall)</text>

          {/* TX Side */}
          <g transform="translate(100, 220)">
            <circle r="30" className="fill-link/10 stroke-link" strokeWidth="1.5" />
            <path d="M -15 0 L 15 0 M 0 -15 L 0 15" className="stroke-link/40" strokeWidth="1" />
            <circle r="4" className="fill-link" />
            <text y="45" textAnchor="middle" className="text-[11px] font-bold fill-textColor">TX</text>
            <text y="58" textAnchor="middle" className="text-[9px] fill-muted-foreground">Source</text>
            
            {/* Wave arcs from TX */}
            <path d="M 40 -20 Q 55 0 40 20" fill="none" className="stroke-link/30" strokeWidth="1.5" />
            <path d="M 55 -30 Q 75 0 55 30" fill="none" className="stroke-link/20" strokeWidth="1" />
          </g>

          {/* RX Side */}
          <g transform="translate(600, 220)">
            <circle r="30" className="fill-accent/10 stroke-accent" strokeWidth="1.5" />
            <path d="M -10 -10 L 10 10 M -10 10 L 10 -10" className="stroke-accent/40" strokeWidth="1" />
            <circle r="4" className="fill-accent" />
            <text y="45" textAnchor="middle" className="text-[11px] font-bold fill-textColor">RX</text>
            <text y="58" textAnchor="middle" className="text-[9px] fill-muted-foreground">Collector</text>
          </g>

          {/* PATHS */}
          
          {/* 1. Direct Path */}
          <line x1="130" y1="220" x2="570" y2="220" className="stroke-muted-foreground/40" strokeWidth="1.5" strokeDasharray="4,4" />
          <text x="350" y="212" textAnchor="middle" className="text-[9px] fill-muted-foreground italic tracking-wide">Direct Path (Line-of-Sight)</text>

          {/* 2. Reflected Path */}
          <path d="M 100 190 L 350 35 L 600 190" fill="none" className="stroke-destructive/80" strokeWidth="2.5" />
          <circle cx="350" cy="35" r="4" className="fill-destructive" />
          <text x="240" y="100" textAnchor="end" transform="rotate(-32, 240, 100)" className="text-[10px] fill-destructive font-medium tracking-tighter">Reflected Path</text>
          {/* <path d="M 580 180 Q 565 195 585 205" fill="none" className="stroke-destructive/40" strokeWidth="1" /> */}
          {/* <text x="590" y="170" textAnchor="end" className="text-[8px] fill-destructive/80 font-mono">AoA_1</text> */}

          {/* 3. Scattered Path */}
          <g transform="translate(250, 300)">
             <rect x="-30" y="-20" width="60" height="40" rx="4" className="fill-secondary/80 stroke-border shadow-inner" strokeWidth="1" />
             <text textAnchor="middle" y="4" className="text-[9px] font-bold fill-textColor/60 uppercase">Object</text>
             <circle r="2" cx="0" cy="0" className="fill-border/50" />
          </g>
          <path d="M 125 240 L 220 290" fill="none" className="stroke-accent-2/60" strokeWidth="2" strokeDasharray="3,3" />
          <path d="M 280 290 L 575 245" fill="none" className="stroke-accent-2/60" strokeWidth="2" strokeDasharray="3,3" />
          <text x="420" y="285" textAnchor="middle" className="text-[10px] fill-accent-2 font-medium">Scattered (Diffraction)</text>

          {/* Indicators */}
          {/* <g transform="translate(450, 280)">
             <rect x="-80" y="-10" width="160" height="45" rx="6" className="fill-background/90 stroke-border" strokeWidth="1" />
             <text textAnchor="middle" y="5" className="text-[10px] font-bold fill-textColor">Superposition at RX</text>
             <text textAnchor="middle" y="20" className="text-[8px] fill-muted-foreground font-mono">H(f,t) = Σ a_i exp(j φ_i)</text>
             <text textAnchor="middle" y="30" className="text-[7px] text-accent/80 font-mono italic">ToF_i, AoA_i, Doppler_i</text>
          </g> */}
        </svg>

        {/* Legend Overlay */}
        {/* <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 p-2 bg-background/80 backdrop-blur-sm rounded border border-border text-[9px]">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive"></div>
              <span className="text-muted-foreground uppercase tracking-tighter">Reflected</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent-2"></div>
              <span className="text-muted-foreground uppercase tracking-tighter">Scattered</span>
           </div>
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 border border-dashed border-muted-foreground/60"></div>
              <span className="text-muted-foreground uppercase tracking-tighter">Direct</span>
           </div>
      </div> */}
        </div>
      <p className="mt-0 text-xs text-center italic leading-relaxed">
        The Phase Space of CSI: Every object in the scene leaves a unique "fingerprint" on the multipath superposition. 
        Reconstruction requires disentangling path lengths (ToF) and arrival angles (AoA).
      </p>
    </div>
  );
};

export default ReflectionDiagram;