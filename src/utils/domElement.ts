export function elementHasClass(element: HTMLElement, className: string) {
	return element.classList.contains(className);
}

export function rootInDarkMode() {
	return document.documentElement.getAttribute("data-theme") === "dark";
}

export function isMobile() {
	return typeof window !== "undefined" && window.innerWidth < 640;
}
