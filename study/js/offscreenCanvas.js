import { init, state } from "./sharecubes.js";

function setSize(data) {
	state.width = data.width;
	state.height = data.height;
}

const handlers = {
	init,
	setSize,
};

self.onmessage = (e) => {
	const fn = handlers[e.data.type];
	if (typeof fn !== "function") {
		throw new Error("no handler for type: ", e.data.type);
	}
	fn(e.data);
};
