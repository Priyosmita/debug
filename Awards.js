import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useBox } from '@react-three/cannon';

const Awards = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 35, 0], onCollide }) => {
  const { scene, animations } = useGLTF('/assets/awards/scene.gltf'); // Load the GLTF file
  const { actions } = useAnimations(animations, scene); // Bind animations to the scene
  const [awardsref] = useBox(() => ({
    position,
    args: scale,
    rotation,
    onCollide: (e) => {
      if (onCollide) onCollide('Awards'); // Call the onCollide function when collision occurs
    }
  }));

  useEffect(() => {
    if (actions['Loop']) { // Adjusted for the correct animation name
      actions['Loop'].play(); // Play the animation
    }
  }, [actions]);

  return <primitive ref={awardsref} object={scene} scale={scale} position={position} rotation={rotation} />;
};

export default Awards;
