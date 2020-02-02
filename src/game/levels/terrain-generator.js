import { id } from "../utils";
import _ from "lodash";

const merge = (voxels, axis) => {
   const first = voxels[0];
   const last = voxels[voxels.length - 1];

   return Object.assign(last, {
      x: (first.x + last.x) * 0.5,
      y: (first.y + last.y) * 0.5,
      z: (first.z + last.z) * 0.5,
      [`side${axis.toUpperCase()}`]: last[axis] - first[axis] + 1
   });
};

const compress = (voxels, axis, canMerge = (a, b) => true) => {
   const groups = _.groupBy(voxels, vox =>
      ["x", "y", "z"]
         .filter(k => k !== axis)
         .map(k => vox[k])
         .join("-")
   );
   const results = [];

   Object.keys(groups).forEach(key => {
      const sorted = _.sortBy(groups[key], vox => vox[axis]);
      const mergeable = _.reduce(
         sorted,
         (acc, current) => {
            const arr = acc[acc.length - 1];
            const previous = arr[arr.length - 1];

            if (!previous) arr.push(current);
            else if (
               current[axis] - previous[axis] === 1 &&
               canMerge(previous, current)
            )
               arr.push(current);
            else acc.push([current]);
            return acc;
         },
         [[]]
      );

      mergeable.forEach(arr => results.push(merge(arr, axis)));
   });

   return results;
};

const contains = (str, val) => {
	return str.indexOf(val) !== -1;
};

const readVoxels = ({ map, assets }) => {
	const lines = map.split("\n");
	const voxels = [];
	const pos = { x: 0, y: 0, z: 0}

	lines.forEach(line => {
		if (contains(line, "#")) {
			pos.x = 0;
			pos.y += 1;
			pos.z = 0;
		} else {
			line.split("").forEach(symbol => {
				const asset = assets[symbol];

				if (asset)
					voxels.push({ symbol, sideX: 1, sideY: 1, sideZ: 1, ...pos })

				pos.x += 1;
			});

			pos.x = 0;
			pos.z += 1;
		}
	});

	return voxels;
}

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

export default async ({ map, assets }) => {
	let voxels = readVoxels({ map, assets });

	voxels = compress(voxels, "z");
  	voxels = compress(voxels, "y", (a, b) => a.sideZ === b.sideZ);
  	voxels = compress(voxels, "x", (a, b) => a.sideZ === b.sideZ && a.sideY === b.sideY);

	const nextId = (id => () => id("e"))(id(0));
	const entities = {};

	await asyncForEach(voxels, async v => {
		entities[nextId()] = await assets[v.symbol]({ ...v, width: v.sideX, height: v.sideY, breadth: v.sideZ })
	})

	return entities;
};



