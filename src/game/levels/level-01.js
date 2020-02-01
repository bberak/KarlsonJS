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
`

export default async ({ scene, camera, world }) => {

	const assets = {
		x: async ({ x, y, z, width, breadth, height }) => await Box(),
		p: async ({ x, y, z, width, breadth, height }) => await Player(),
		d: async ({ x, y, z, width, breadth, height }) => await Droid()
	}

	return {
		skybox: await Skybox({ parent: scene }),
		droid:  await Droid({ parent: scene, world,  y: 0 }),
		player: Player({ parent: scene, camera, world, height: 2, x: 0, y: 1, z: 5 }),
		...Generate({ map, assets })
	};
};
