import { promisifyLoader } from "../utils/three";
import FBXLoader from "../utils/three/fbx-loader";
import AnimatedModel from "./animated-model";
import DroidFile from "../../assets/models/droid.fbx";

const loader = promisifyLoader(new FBXLoader());
const mesh = loader.load(DroidFile);

export default async ({ parent, world, x = 0, y = 0, z = 0 }) => {
	const animated = await AnimatedModel({
		parent,
		x,
		y,
		z,
		mesh,
		scale: 0.0035
	});

	animated.bodies = [
		world.add({
			type: "sphere",
			size: [1.25, 1.25, 1.25],
			pos: [x, y, z],
			rot: [0, 0, 0],
			move: false,
			density: 0.1,
			friction: 0.9,
			restitution: 0.2,
			belongsTo: 1,
			collidesWith: 0xffffffff
		})
	];

	return animated;
};
