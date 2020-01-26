import { clamp } from "../utils";

const Camera = ({
  yawSpeed = -0.01,
  pitchSpeed = -0.01
} = {}) => {
  return (entities, { mouseController }) => {
    const camera = entities.camera;

    if (camera && mouseController) {
      camera.rotation.y += mouseController.movement.x * yawSpeed;
      camera.rotation.x += mouseController.movement.y * pitchSpeed;
      camera.rotation.x = clamp(camera.rotation.x, -1.4, 1);
      camera.updateProjectionMatrix();
    }

    return entities;
  };
};

export default Camera;
