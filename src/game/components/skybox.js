import * as THREE from "three";
import { promisifyLoader } from "../utils/three";
import Back from "../../assets/textures/skybox-01/back.jpg";
import Down from "../../assets/textures/skybox-01/down.jpg";
import Front from "../../assets/textures/skybox-01/front.jpg";
import Left from "../../assets/textures/skybox-01/left.jpg";
import Right from "../../assets/textures/skybox-01/right.jpg";
import Up from "../../assets/textures/skybox-01/up.jpg";

const loader = promisifyLoader(new THREE.TextureLoader());
const textureTasks = [Front, Back, Up, Down, Right, Left].map(loader.load)

export default async ({ parent, x = 0, y = 0, z = 0}) => {

	const textures = await Promise.all(textureTasks);
	const materials = textures.map(t => new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide }))
	const geo = new THREE.BoxGeometry(10000, 10000, 10000);
	const model = new THREE.Mesh(geo, materials);

	parent.add(model);

	return {
		model
	};
};
