import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { ArrowRight, ArrowLeftRight, CornerDownRight } from "lucide-react";
import { ArrowDown, HelpCircle } from "lucide-react";
import { Wifi, Radio, Layers, Cpu, Database, TrendingUp, GitBranch } from "lucide-react";

export const PipelineDiagram = () => {
	return (
		<div className="border-border mx-auto my-1 max-w-2xl rounded-xl border p-4 font-sans text-xs">
			{/* Step 1: Input Pipeline */}
			<div className="border-border border-b pb-2.5">
				<div className="flex flex-wrap items-center gap-4">
					1. <span className="font-medium">Multi-view images</span>
					<ArrowRight size={18} strokeWidth={1.5} />
					<span className="font-medium">COLMAP (SfM)</span>
					<ArrowRight size={18} strokeWidth={1.5} />
					<span className="bg-link/20 rounded-[3px] px-1.5 py-px">
						Camera poses + Sparse points
					</span>
				</div>
			</div>

			{/* Step 2: Main Loop with clear visual indentation */}
			<div className="pt-2.5">
				<div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
					2. <span className="pl-2.5 font-medium">For each ray</span>
					<ArrowRight size={16} strokeWidth={1.5} />
					<span className="text-slate-500">through each camera pixel</span>
				</div>

				{/* Three parallel methods */}
				<div className="relative ml-3 pl-6">
					{/* Vertical bracket / grouping line */}
					<div className="bg-border absolute top-0 bottom-0 left-0 w-0.5" />

					<div className="flex flex-col gap-4">
						{/* NeRF */}
						<div className="flex flex-wrap items-baseline gap-2 text-xs">
							<span className="w-15 font-mono font-semibold">NeRF</span>
							<span className="bg-link/20 rounded-[3px] px-1.5 py-px font-mono">
								f<sub>θ</sub>(x, d)
							</span>
							<ArrowRight size={16} strokeWidth={1.5} />
							<span className="font-mono">(σ, c)</span>
							<span className="ml-2 text-xs text-slate-500">density + color</span>
						</div>

						{/* NeuS */}
						<div className="flex flex-wrap items-baseline gap-2 text-xs">
							<span className="w-15 font-mono font-semibold">NeuS</span>
							<span className="bg-link/20 rounded-[3px] px-1.5 py-px font-mono">
								f<sub>θ</sub>(x)
							</span>
							<ArrowRight size={16} strokeWidth={1.5} />
							<span className="font-mono">s(x)</span>
							<span className="ml-2 text-xs text-slate-500">signed distance</span>
						</div>

						{/* 3DGS */}
						<div className="flex flex-wrap items-baseline gap-2 text-xs">
							<span className="w-15 font-mono font-semibold">3DGS</span>
							<span className="bg-link/20 rounded-[3px] px-1.5 py-px font-mono">3D Gaussians</span>
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
						<div className="bg-link/20 flex items-center gap-2 rounded-full px-3 py-1.5">
							<span className="font-mono">Rendered RGB</span>
							<ArrowLeftRight size={14} strokeWidth={1.5} />
							<span className="font-mono">Observed RGB</span>
						</div>
					</div>
				</div>
			</div>

			{/* Step 3: Output */}
			<div>
				<div className="border-border mt-4 flex flex-wrap items-center gap-3 border-t pt-2 text-xs">
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
			theme: "base",
			themeVariables: {
				background: "transparent",
				primaryColor: "#f8f9fa",
				primaryBorderColor: "#2c3e50",
				// 'primaryTextColor': '#2c3e50',
				lineColor: "hsl(33, 49%, 41%)",
				secondaryColor: "#e9ecef",
				tertiaryColor: "#fff",
			},
			flowchart: {
				useMaxWidth: true,
				htmlLabels: true,
				curve: "monotoneX",
				padding: 20,
			},
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
		<div className="bg-background border-border mx-auto my-5 max-w-[900px] rounded-xl border p-6">
			<div ref={diagramRef} className="mermaid">
				{diagram}
			</div>
		</div>
	);
};

export const ComparisonDiagram = () => {
	return (
		<div className="mx-auto my-5 max-w-2xl space-y-4 font-sans text-xs">
			{/* Camera-based reconstruction */}
			<div className="bg-secondary/10 rounded-xl border border-dotted p-4">
				<div className="text-textColor mb-4 text-center font-bold tracking-tight uppercase">
					Camera-Based 3D Reconstruction{" "}
					<span className="text-muted-foreground ml-1 text-[10px] font-normal lowercase">
						(mature, proven)
					</span>
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
						<div className="bg-textColor h-4 w-px"></div>
						<ArrowDown size={14} strokeWidth={1.5} />
					</div>

					<div className="bg-background border-border text-muted-foreground rounded-[3px] border px-3 py-1 text-[11px] italic">
						Camera poses + Sparse point cloud
					</div>

					<div className="flex flex-col items-center opacity-30">
						<div className="bg-textColor h-4 w-px"></div>
						<ArrowDown size={14} strokeWidth={1.5} />
					</div>

					<div className="bg-accent/20 border-accent/30 rounded-md border px-4 py-1.5 font-semibold tracking-wide">
						DENSE 3D MESH
					</div>
				</div>
			</div>

			{/* WiFi CSI reconstruction */}
			<div className="border-accent/30 bg-accent/5 rounded-xl border border-dashed py-1">
				<div className="text-accent-2 mb-4 text-center font-bold tracking-tight uppercase">
					WiFi CSI 3D Reconstruction{" "}
					<span className="ml-1 text-[10px] font-normal lowercase">(proposed, no prior art)</span>
				</div>

				<div className="flex flex-col items-center gap-3">
					<div className="flex flex-wrap items-center justify-center gap-3">
						<span className="bg-background border-border rounded-[3px] border px-1.5 py-0.5 font-medium">
							WiFi APs
						</span>
						<ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />
						<span className="bg-background border-border rounded-[3px] border px-1.5 py-0.5 font-medium">
							CSI Streams
						</span>
						<ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />

						<div className="group relative">
							<span className="bg-destructive/10 border-destructive/20 text-destructive rounded-[3px] border border-dashed px-2.5 py-0.5 font-mono font-bold tracking-widest">
								???
							</span>
							<HelpCircle size={10} className="text-destructive/40 absolute -top-1.5 -right-1.5" />
						</div>

						<ArrowRight size={16} strokeWidth={1.5} className="text-muted-foreground/30" />
						<span className="bg-background border-border rounded-[3px] border px-1.5 py-0.5 font-medium">
							NeRF / 3DGS
						</span>
					</div>

					<div className="bg-destructive/10 border-destructive/20 mt-2 rounded-lg border p-0 px-2 text-center text-xs">
						<div className="text-[11px] leading-relaxed">
							<code>???</code> No existing bridge converts multipath CSI into <br /> the geometric
							constraints needed for 3D reconstruction.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const HighLevelDiagram = () => {
	return (
		<div className="border-border bg-background mx-auto my-6 max-w-2xl rounded-xl border p-6 font-sans text-xs shadow-sm">
			{/* Input Section */}
			<div className="mb-6 flex flex-col items-center gap-2">
				<div className="flex items-center gap-3">
					<div className="bg-accent/10 border-accent/20 rounded-lg border p-2">
						<Wifi size={18} className="text-accent" />
					</div>
					<ArrowRight className="text-muted-foreground/30" size={16} />
					<div className="flex flex-col items-center">
						<span className="text-muted-foreground mb-1 text-[10px] font-semibold tracking-wider uppercase">
							Raw Input
						</span>
						<div className="bg-secondary/20 border-border rounded border px-3 py-1.5 font-mono">
							CSI Streams (A, φ)
						</div>
					</div>
				</div>
				<ArrowDown className="text-muted-foreground/30" size={16} />
				<div className="bg-background border-border text-muted-foreground rounded border px-3 py-1.5 italic">
					Preprocessing: Phase Sanitization & Normalization
				</div>
			</div>

			{/* Shared Backbone */}
			<div className="mb-8 flex flex-col items-center gap-3">
				<ArrowDown className="text-muted-foreground/30" size={16} />
				<div className="group relative">
					<div className="from-accent/20 to-link/20 absolute -inset-1 rounded-xl bg-gradient-to-r opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
					<div className="bg-background border-accent/30 relative flex items-center gap-3 rounded-xl border-2 px-6 py-4 shadow-sm">
						<Cpu size={24} className="text-accent" />
						<div className="flex flex-col">
							<span className="text-textColor text-[11px] font-bold tracking-tight uppercase">
								CSI Shared Backbone
							</span>
							<span className="text-muted-foreground text-[10px]">
								ViT / 3D-CNN (Pretrained via CSI-MAE)
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Multi-Task Heads */}
			<div className="mb-8 grid grid-cols-3 gap-4">
				<div className="flex flex-col items-center gap-2">
					<div className="bg-border h-6 w-px"></div>
					<div className="bg-link/5 border-link/20 w-full rounded-lg border p-2.5 text-center">
						<Layers size={14} className="text-link mx-auto mb-1.5" />
						<div className="text-link mb-0.5 font-semibold">Depth Head</div>
						<div className="text-[9px] text-slate-500">Per-pixel depth map</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="bg-border h-6 w-px"></div>
					<div className="bg-accent/5 border-accent/20 w-full rounded-lg border p-2.5 text-center">
						<GitBranch size={14} className="text-accent mx-auto mb-1.5" />
						<div className="text-accent mb-0.5 font-semibold">Pose Head</div>
						<div className="text-[9px] text-slate-500">AP 6-DoF Pose</div>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2">
					<div className="bg-border h-6 w-px"></div>
					<div className="bg-secondary/10 border-border w-full rounded-lg border p-2.5 text-center">
						<TrendingUp size={14} className="mx-auto mb-1.5 text-slate-600" />
						<div className="mb-0.5 font-semibold text-slate-700">Feature Head</div>
						<div className="text-[9px] text-slate-500">Geometric Descriptors</div>
					</div>
				</div>
			</div>

			{/* Neural Surface & RF Loop */}
			<div className="bg-secondary/5 border-border flex flex-col items-center gap-4 rounded-xl border p-5">
				<div className="flex flex-wrap items-center justify-center gap-3">
					<div className="bg-background border-accent/40 rounded-lg border-2 px-4 py-2 text-center shadow-sm">
						<Database size={16} className="text-accent mx-auto mb-1" />
						<div className="text-textColor font-bold">Neural Implicit Scene</div>
						<div className="text-muted-foreground text-[9px] lowercase">SDF / 3DGS / NeRF</div>
					</div>
					<ArrowLeftRight className="text-accent/30" size={18} />
					<div className="border-border bg-background/50 rounded-lg border border-dashed px-4 py-2 text-center">
						<Radio size={16} className="mx-auto mb-1 text-slate-400" />
						<div className="font-medium text-slate-600">Differentiable RF Model</div>
						<div className="text-[9px] text-slate-400 lowercase italic">Inverse Rendering</div>
					</div>
				</div>

				<div className="border-border mt-1 flex w-full items-center justify-center gap-3 border-t pt-3">
					<div className="bg-accent/10 text-accent-2 flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium">
						Analysis-by-Synthesis Loss
					</div>
				</div>
			</div>
		</div>
	);
};
