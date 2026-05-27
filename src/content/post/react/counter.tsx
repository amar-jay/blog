import { useState } from "react";

function Counter() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	const decrement = () => {
		setCount(count - 1);
	};

	return (
		<div className="flex items-center justify-center text-2xl">
			<button
				className="bg-accent/70 hover:bg-accent rounded px-5 py-2 font-bold text-white"
				onClick={decrement}
			>
				-
			</button>
			<span className="mx-4 text-2xl">{count}</span>
			<button
				className="bg-accent/70 hover:bg-accent rounded px-5 py-2 font-bold text-white"
				onClick={increment}
			>
				+
			</button>
		</div>
	);
}

export default Counter;
