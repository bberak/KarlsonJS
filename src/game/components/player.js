import * as THREE from "three";
import { add } from "../utils/three";

export default ({ parent, camera, x, y, z, world, width = 1, height = 2, breadth = 1, scale = 1 }) => {
	const group = new THREE.Group();

	group.position.x = x;
	group.position.y = y;
	group.position.z = z;

	camera.position.set(0, height / 2, 0);

	add(group, camera);
	add(parent, group);

	return {
		model: group,
		player: true,
		bodies: [
			world.add({
				type: "box",
				size: [width * scale, height * scale, breadth * scale],
				pos: [x, y, z],
				rot: [0, 0, 0],
				move: false,
				density: 0.1,
				friction: 0.9,
				restitution: 0.2,
				belongsTo: 1,
				collidesWith: 0xffffffff
			})
		]
	}
}