import React from "react"
import { Canvas, useLoader } from "react-three-fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const AnimatedLogo = () => {

	const gltf = useLoader(GLTFLoader, "./../../static/media/logo.742463f2.glb")
	gltf.scene.scale.set(2, 2, 2);
	gltf.scene.position.set(10, 23, 10);

	let interval: NodeJS.Timeout

	const AnimatePoinerOver = () => {
		if (gltf.scene.rotation.y === 0) {
			interval = setInterval(() => {
				if (parseFloat(gltf.scene.rotation.y.toString()).toPrecision(2).toString() != "0.42") {
					gltf.scene.rotation.y += 0.03;
				} else {
					clearInterval(interval);
				}
			}, 80)
		}
	}

	const AnimatePoinerOut = () => {
		if (gltf.scene.rotation.y !== 0) {
			clearInterval(interval);
			interval = setInterval(() => {
				if (parseFloat(gltf.scene.rotation.y.toString()).toPrecision(2).toString() != "0.030") {
					gltf.scene.rotation.y -= 0.03;
				} else {
					gltf.scene.rotation.y = 0;
					clearInterval(interval);
				}
			}, 80)
		}
	}

	return (
		<Canvas onPointerOver={AnimatePoinerOver} onPointerOut={AnimatePoinerOut} style={{ width: "80px", height: "80px" }} camera={{ position: [0, -1, 50] }}>
			<ambientLight intensity={2} />
			<mesh>
				<primitive object={gltf.scene} />
			</mesh>
		</Canvas>
	)
}

export default AnimatedLogo