import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { useSpring } from "react-spring";
import {rootInDarkMode} from "../utils";

interface Marker {
	location: [number, number];
	size: number;
}

interface GlobeProps {
	className?: string;
	phi: number;
	markers: Marker[];
}



function Globe({ className, phi, markers }: GlobeProps) {
	const globeRef = useRef<HTMLCanvasElement>(null);
	const pointerInteracting = useRef<any>(null);
	const pointerInteractionMovement = useRef(0);
  /*
 const [theme,setTheme] = useState(0)

function getUserPref() {
		  const storedTheme = typeof localStorage !== "undefined" && localStorage.getItem("theme");
	   const theme = storedTheme || (lightModePref.matches ? "light" : "dark");
    return theme === “dark” ? 1: 0;
	}
  document.addEventListener("astro:after-swap", () => setTheme(getUserPref()));
   document.removeEventListener("astro:after-swap", () => setTheme(getUserPref()));
  */
	const [{ r }, api] = useSpring(() => ({
		r: 0,
		config: {
			mass: 1,
			tension: 280,
			friction: 40,
			precision: 0.001,
		},
	}));


	useEffect(() => {
		let phi = 0;
		let width = 0;
		const onResize = () => globeRef.current && (width = globeRef.current.offsetWidth);
		window.addEventListener("resize", onResize);
		onResize();


		if (!globeRef.current) return;
		const globe = createGlobe(globeRef.current, {
			devicePixelRatio: 2,
			width: width * 2,
			height: width * 2,
			phi: 0,
			theta: 0.3,
			dark: rootInDarkMode() ? 1: 0,
			diffuse: 3,
			mapSamples: 16000,
			mapBrightness: 1.2,
			baseColor: [1, 1, 1],
			markerColor: [251 / 255, 100 / 255, 21 / 255],
			glowColor: [1.2, 1.2, 1.2],
			markers: markers,
			onRender: (state) => {
				// This prevents rotation while dragging
				if (!pointerInteracting.current) {
					// Called on every animation frame.
					// `state` will be an empty object, return updated params.
					phi += 0.005;
				}
				state.phi = phi + r.get();
				state.width = width * 2;
				state.height = width * 2;
			},
		});
		setTimeout(() => globeRef.current && (globeRef.current.style.opacity = "1"));
		return () => {
			globe.destroy();
			window.removeEventListener("resize", onResize);
		};
	}, [rootInDarkMode,markers]);

	return (
		<div
			style={{
				width: "100%",
				maxWidth: 600,
				aspectRatio: 1,
				margin: "auto",
				position: "relative",
			}}
			className={className}
		>
			<canvas
				ref={globeRef}
				onPointerDown={(e) => {
					pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
					globeRef.current && (globeRef.current.style.cursor = "grabbing");
				}}
				onPointerUp={() => {
					pointerInteracting.current = null;
					globeRef.current && (globeRef.current.style.cursor = "grab");
				}}
				onPointerOut={() => {
					pointerInteracting.current = null;
					globeRef.current && (globeRef.current.style.cursor = "grab");
				}}
				onMouseMove={(e) => {
					if (pointerInteracting.current !== null) {
						const delta = e.clientX - pointerInteracting.current;
						pointerInteractionMovement.current = delta;
						api.start({
							r: delta / 200,
						});
					}
				}}
				onTouchMove={(e) => {
					if (pointerInteracting.current !== null && e.touches[0]) {
						const delta = e.touches[0].clientX - pointerInteracting.current;
						pointerInteractionMovement.current = delta;
						api.start({
							r: delta / 100,
						});
					}
				}}
				className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 ease-in-out"
			/>
		</div>
	);
}

export default Globe;
