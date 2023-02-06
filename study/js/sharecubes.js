import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";

export const state = {
	width: 300,
	height: 150,
};

export function init(data) {
	const { canvas } = data;

	state.width = canvas.width;
	state.height = canvas.height;

	const renderer = new THREE.WebGLRenderer({ canvas });

	const fov = 75;
	const aspect = 2; // 相机默认值
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.z = 2;

	const scene = new THREE.Scene();

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0x8844aa, -2),
		makeInstance(geometry, 0xaa8844, 2),
	];

	const color = 0xffffff;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({ color });

		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.position.x = x;

		return cube;
	}

	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = state.width;
		const height = state.height;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	function render(time) {
		time *= 0.001; // 将时间单位变为秒

		cubes.forEach((cube, ndx) => {
			const speed = 1 + ndx * 0.1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});

		if (resizeRendererToDisplaySize(renderer)) {
			camera.aspect = state.width / state.height;
			camera.updateProjectionMatrix();
		}

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
