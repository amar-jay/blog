import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { ArrowRight, ArrowLeftRight, CornerDownRight } from 'lucide-react';
import { ArrowDown, HelpCircle } from 'lucide-react';
import { Wifi, Radio, Layers, Cpu, Database, TrendingUp, GitBranch } from 'lucide-react';



export const PipelineDiagram = () => {
  return (
    <div className="max-w-2xl mx-auto my-1 rounded-xl border border-border p-4 font-sans text-xs">
      {/* Step 1: Input Pipeline */}
      <div className="border-b border-border pb-2.5">
        <div className="flex flex-wrap items-center gap-4">
          1. <span className="font-medium">Multi-view images</span>
          <ArrowRight size={18} strokeWidth={1.5} />
          <span className="font-medium">COLMAP (SfM)</span>
          <ArrowRight size={18} strokeWidth={1.5} />
          <span className="bg-link/20 rounded-[3px] px-1.5 py-px">Camera poses + Sparse points</span>
        </div>
      </div>

      {/* Step 2: Main Loop with clear visual indentation */}
      <div className="pt-2.5">
        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
          2. <span className="font-medium pl-2.5">For each ray</span>
          <ArrowRight size={16} strokeWidth={1.5} />
          <span className="text-slate-500">through each camera pixel</span>
        </div>

        {/* Three parallel methods */}
        <div className="relative ml-3 pl-6">
          {/* Vertical bracket / grouping line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border" />

          <div className="flex flex-col gap-4">
            {/* NeRF */}
            <div className="flex flex-wrap items-baseline gap-2 text-xs">
              <span className="font-mono font-semibold w-15">NeRF</span>
              <span className="font-mono bg-link/20 rounded-[3px] px-1.5 py-px">f<sub>θ</sub>(x, d)</span>
              <ArrowRight size={16} strokeWidth={1.5} />
              <span className="font-mono">(σ, c)</span>
              <span className="ml-2 text-xs text-slate-500">density + color</span>
            </div>

            {/* NeuS */}
            <div className="flex flex-wrap items-baseline gap-2 text-xs">
              <span className="font-mono font-semibold w-15">NeuS</span>
              <span className="font-mono bg-link/20 rounded-[3px] px-1.5 py-px">f<sub>θ</sub>(x)</span>
              <ArrowRight size={16} strokeWidth={1.5} />
              <span className="font-mono">s(x)</span>
              <span className="ml-2 text-xs text-slate-500">signed distance</span>
            </div>

            {/* 3DGS */}
            <div className="flex flex-wrap items-baseline gap-2 text-xs">
              <span className="font-mono font-semibold w-15">3DGS</span>
              <span className="font-mono bg-link/20 rounded-[3px] px-1.5 py-px">3D Gaussians</span>
              <span className="ml-2 text-xs text-slate-500">explicit</span>
            </div>
          </div>
        </div>

        {/* Rendering + Loss */}
        <div className="mt-6 ml-9">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-700">
            <CornerDownRight size={16} strokeWidth={1.5} color="#888" />
            <span className="font-medium">Volumetric rendering</span>
            <span className="text-slate-500">or</span>
            <span className="font-medium">Rasterization</span>
          </div>

          <div className="ml-6 flex flex-wrap items-center gap-3">
            <span>Loss</span>
            <div className="flex items-center gap-2 rounded-full bg-link/20 px-3 py-1.5">
              <span className="font-mono">Rendered RGB</span>
              <ArrowLeftRight size={14} strokeWidth={1.5} />
              <span className="font-mono">Observed RGB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Output */}
      <div>
        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-2 text-xs">
          <span className="font-medium">3. Extract surface</span>
          <ArrowRight size={18} strokeWidth={1.5} />
          <span className="bg-link/20 rounded-[3px] px-1.5 py-px">Level set of density / SDF</span>
          <span className="text-slate-500">or</span>
          <span className="bg-link/20 rounded-[3px] px-1.5 py-px">Direct from Gaussians</span>
        </div>
      </div>
    </div>
  );
};




export const FusionDiagram = () => {
  const diagramRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        'background': 'transparent',
        'primaryColor': '#f8f9fa',
        'primaryBorderColor': '#2c3e50',
        // 'primaryTextColor': '#2c3e50',
        'lineColor': 'hsl(33, 49%, 41%)',
        'secondaryColor': '#e9ecef',
        'tertiaryColor': '#fff'
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'monotoneX',
        padding: 20
      }
    });

    if (diagramRef.current) {
      mermaid.contentLoaded();
    }
  }, []);

  const diagram = `
flowchart TD
    Camera["Camera (RGB/RGB-D)"]
    WiFi["WiFi APs (1..K)"]
    
    VisualEncoder["Visual Encoder (DINOv2)"]
    CSIEncoder["CSI Encoder"]
    
    Fusion["Cross-Modal Fusion<br><small>(CLIP-style alignment)</small>"]
    Geometry["Neural Scene Geometry<br><small>(NeRF / 3DGS / SDF)</small>"]
    
    Camera --> VisualEncoder
    WiFi --> CSIEncoder
    
    VisualEncoder --> Fusion
    CSIEncoder --> Fusion
    
    Fusion --> Geometry
    
    classDef default fill:#f9f9f9,stroke:#333,stroke-width:1px
    classDef node fill:#d1d1d1,stroke:#2c3e50,stroke-width:2px
    class Camera,WiFi,VisualEncoder,CSIEncoder,Fusion,Geometry node
  `;

  return (
    <div className="max-w-[900px] mx-auto my-5 p-6 bg-background rounded-xl border border-border">
      <div ref={diagramRef} className="mermaid">
        {diagram}
      </div>
    </div>
  );
};



export const ComparisonDiagram = () => {
  return (
    <div className="max-w-2xl mx-auto my-5 space-y-4 font-sans text-xs">
      {/* Camera-based reconstruction */}
      <div className="rounded-xl border border-dotted p-4 bg-secondary/10">
        <div className="font-bold text-center mb-4 text-textColor tracking-tight uppercase">
          Camera-Based 3D Reconstruction <span className="text-[10px] font-normal text-muted-foreground lowercase ml-1">(mature, proven)</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-link/20 rounded-[3px] px-1.5 py-0.5 font-medium">Camera(s)</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/50" />
            <span className="bg-link/20 rounded-[3px] px-1.5 py-0.5 font-medium">RGB Images</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/50" />
            <span className="bg-link/20 rounded-[3px] px-1.5 py-0.5 font-medium">COLMAP (SfM)</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/50" />
            <span className="bg-link/20 rounded-[3px] px-1.5 py-0.5 font-medium">NeRF / 3DGS</span>
          </div>

          <div className="flex flex-col items-center opacity-30">
            <div className="h-4 w-px bg-textColor"></div>
            <ArrowDown size={14} strokeWidth={1.5} />
          </div>

          <div className="px-3 py-1 bg-background border border-border rounded-[3px] italic text-muted-foreground text-[11px]">
            Camera poses + Sparse point cloud
          </div>

          <div className="flex flex-col items-center opacity-30">
            <div className="h-4 w-px bg-textColor"></div>
            <ArrowDown size={14} strokeWidth={1.5} />
          </div>

          <div className="px-4 py-1.5 bg-accent/20 border border-accent/30 rounded-md font-semibold text-accent tracking-wide">
            DENSE 3D MESH
          </div>
        </div>
      </div>

      {/* WiFi CSI reconstruction */}
      <div className="rounded-xl border border-dashed border-accent/30  py-1 bg-accent/5">
        <div className="font-bold text-center mb-4 text-accent-2 tracking-tight uppercase">
          WiFi CSI 3D Reconstruction <span className="text-[10px] font-normal lowercase ml-1">(proposed, no prior art)</span>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="bg-background border border-border rounded-[3px] px-1.5 py-0.5 font-medium">WiFi APs</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />
            <span className="bg-background border border-border rounded-[3px] px-1.5 py-0.5 font-medium">CSI Streams</span>
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />
            
            <div className="relative group">
              <span className="bg-destructive/10 border border-destructive/20 border-dashed rounded-[3px] px-2.5 py-0.5 text-destructive font-mono font-bold tracking-widest">
                ???
              </span>
              <HelpCircle size={10} className="absolute -top-1.5 -right-1.5 text-destructive/40" />
            </div>
            
            <ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />
            <span className="bg-background border border-border rounded-[3px] px-1.5 py-0.5 font-medium">NeRF / 3DGS</span>
          </div>

          <div className="mt-2 p-0 px-2 bg-destructive/10 border border-destructive/20 text-xs rounded-lg text-center">
            <div className="text-[11px] leading-relaxed">
             <code>???</code>{' '} No existing bridge converts multipath CSI into <br/> the geometric constraints needed for 3D reconstruction.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const HighLevelDiagram = () => {
  return (
    <div className="max-w-2xl mx-auto my-6 rounded-xl border border-border bg-background p-6 font-sans text-xs shadow-sm">
      {/* Input Section */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
            <Wifi size={18} className="text-accent" />
          </div>
          <ArrowRight className="text-muted-foreground/30" size={16} />
          <div className="flex flex-col items-center">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-muted-foreground mb-1">Raw Input</span>
            <div className="px-3 py-1.5 bg-secondary/20 rounded border border-border font-mono">
              CSI Streams (A, φ)
            </div>
          </div>
        </div>
        <ArrowDown className="text-muted-foreground/30" size={16} />
        <div className="px-3 py-1.5 bg-background border border-border rounded italic text-muted-foreground">
          Preprocessing: Phase Sanitization & Normalization
        </div>
      </div>

      {/* Shared Backbone */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <ArrowDown className="text-muted-foreground/30" size={16} />
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-link/20 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center gap-3 px-6 py-4 bg-background border-2 border-accent/30 rounded-xl shadow-sm">
            <Cpu size={24} className="text-accent" />
            <div className="flex flex-col">
              <span className="font-bold text-textColor text-[11px] uppercase tracking-tight">CSI Shared Backbone</span>
              <span className="text-[10px] text-muted-foreground">ViT / 3D-CNN (Pretrained via CSI-MAE)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Task Heads */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-px bg-border"></div>
          <div className="w-full p-2.5 bg-link/5 border border-link/20 rounded-lg text-center">
            <Layers size={14} className="mx-auto mb-1.5 text-link" />
            <div className="font-semibold text-link mb-0.5">Depth Head</div>
            <div className="text-[9px] text-slate-500">Per-pixel depth map</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-px bg-border"></div>
          <div className="w-full p-2.5 bg-accent/5 border border-accent/20 rounded-lg text-center">
            <GitBranch size={14} className="mx-auto mb-1.5 text-accent" />
            <div className="font-semibold text-accent mb-0.5">Pose Head</div>
            <div className="text-[9px] text-slate-500">AP 6-DoF Pose</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-px bg-border"></div>
          <div className="w-full p-2.5 bg-secondary/10 border border-border rounded-lg text-center">
            <TrendingUp size={14} className="mx-auto mb-1.5 text-slate-600" />
            <div className="font-semibold text-slate-700 mb-0.5">Feature Head</div>
            <div className="text-[9px] text-slate-500">Geometric Descriptors</div>
          </div>
        </div>
      </div>

      {/* Neural Surface & RF Loop */}
      <div className="flex flex-col items-center gap-4 p-5 bg-secondary/5 border border-border rounded-xl">
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <div className="px-4 py-2 bg-background border-2 border-accent/40 rounded-lg text-center shadow-sm">
            <Database size={16} className="mx-auto mb-1 text-accent" />
            <div className="font-bold text-textColor">Neural Implicit Scene</div>
            <div className="text-[9px] text-muted-foreground lowercase">SDF / 3DGS / NeRF</div>
          </div>
          <ArrowLeftRight className="text-accent/30" size={18} />
          <div className="px-4 py-2 border border-dashed border-border rounded-lg text-center bg-background/50">
            <Radio size={16} className="mx-auto mb-1 text-slate-400" />
            <div className="font-medium text-slate-600">Differentiable RF Model</div>
            <div className="text-[9px] text-slate-400 lowercase italic">Inverse Rendering</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-1 pt-3 border-t border-border w-full justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-[10px] text-accent-2 font-medium">
             Analysis-by-Synthesis Loss
          </div>
        </div>
      </div>
    </div>
  );
};
