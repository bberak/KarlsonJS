import Generate from "./terrain-generator";
import Droid from "../components/droid";
import Skybox from "../components/skybox";
import Player from "../components/player";
import Box from "../components/box";

const map = `
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxz
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxx     d xxxxxxxxxx
xxxxxxxxxxxxxxxxx p  xxxxxxxxxxxxxx
xxxxxxx       xxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#
xxxxxxx
xxxxxx
xx
#
xxxxxxx
xxxxxx
xx
#
xxxxxxx
xxxxxx
xx
`;

export default async ({ scene, camera, world }) => {
	const assets = {
		x: async ({ x, y, z, width, breadth, height }) =>
			await Box({
				parent: scene,
				world,
				dynamic: false,
				x,
				y,
				z,
				width,
				breadth,
				height,
				scale: 1,
				color: 0x00e6ff
			})
		//p: async ({ x, y, z, width, breadth, height }) => await Player(),
		//d: async ({ x, y, z, width, breadth, height }) => await Droid()
	};

	return {
		skybox: await Skybox({ parent: scene }),
		droid: await Droid({ parent: scene, world, y: 0 }),
		player: Player({
			parent: scene,
			camera,
			world,
			height: 2,
			x: 5,
			y: 5,
			z: 5
		}),
		...Generate({ map, assets })
	};
};
