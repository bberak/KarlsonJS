import * as THREE from 'three';
import Camera from "../components/camera";
import HUD from "../components/hud";
import { clear } from "../utils/three";
import * as OIMO from "oimo";

const scene = new THREE.Scene();
const camera = Camera();
const world = new OIMO.World({ 
    timestep: 1 / 60, 
    iterations: 8, 
    broadphase: 2,
    worldscale: 1,
    random: true,
    info: false,
    gravity: [0, -9.8 ,0] 
});

export default async (level) => {
	clear(scene);
	world.clear();

	const ambient = new THREE.AmbientLight(0xffffff, 1);
	const sunlight = new THREE.DirectionalLight(0xffffff, 0.95);

    sunlight.position.set(50, 50, 50);

    scene.add(ambient);
    scene.add(sunlight);

	return {
		scene,
		camera,
		world,
		hud: HUD(),
		...level({ scene, camera, world })
	}
};
