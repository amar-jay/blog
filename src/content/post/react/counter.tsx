import React, { useState } from "react";

function Counter() {
	const [count, setCount] = useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	const decrement = () => {
		setCount(count - 1);
	};

	return (
		<div className="flex items-center justify-center  text-2xl">
			<button
				className="rounded bg-accent/70 px-5 py-2 font-bold text-white hover:bg-accent"
				onClick={decrement}
			>
				-
			</button>
			<span className="mx-4 text-2xl">{count}</span>
			<button
				className="rounded bg-accent/70 px-5 py-2 font-bold text-white hover:bg-accent"
				onClick={increment}
			>
				+
			</button>
		</div>
	);
}

export default Counter;
