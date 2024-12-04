import { Canvas, useThree } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import CameraAndPikachu from './CameraAndPikachu';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import Awards from './Awards';
import { Modal, Button } from 'flowbite-react';  // Importing Modal and Button for UI components

// Set background color of the scene
const SetBackgroundColor = ({ color }) => {
  const { scene } = useThree();
  useEffect(() => {
    scene.background = new THREE.Color(color);
  }, [scene, color]);
  return null;
};

// Ground component for the scene
const Ground = ({ color }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 22]}>
    <planeGeometry args={[62, 68]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

export default function Forest() {
  const [isModalOpen, setModalOpen] = useState(false);  // Modal state to control visibility

  // Collision handler to open modal when certain objects are collided with
  const handleCollide = (object) => {
    if (object === 'Awards') {
      setModalOpen(true);  // Open the modal when collision happens with Awards
    }
  };

  return (
    <>
      <Canvas gl={{ antialias: true }} className='-z-10'>
        {/* Set background color */}
        <SetBackgroundColor color="#8de2fc" />

        {/* Lights in the scene */}
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 20, 10]} intensity={4} />

        {/* Physics simulation for the scene */}
        <Physics>
          <Ground color="#0bfc03" />
          <CameraAndPikachu setModalOpen={setModalOpen} />
          <Awards position={[22, 0, 18]} scale={[1.2, 1.2, 1.2]} onCollide={handleCollide} />  {/* Pass the onCollide function */}
        </Physics>
      </Canvas>

      {/* Modal to display on collision */}

      <Modal
        show={isModalOpen}
        onClose={() => setModalOpen(false)}
        size="sm"
        className="fixed inset-0 flex items-center justify-center z-50" // Ensures proper centering
      >
        <div className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-[400px] p-4">
          {/* Modal Header */}
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Collision Detected</h2>
            <button
              onClick={() => setModalOpen(false)} // Close the modal
              className="text-gray-400 hover:text-gray-700 focus:outline-none"
              aria-label="Close"
            >
              &times; {/* Close icon */}
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-4 text-gray-600">
            <p>You've collided with the Awards object!</p>
          </div>

          {/* Modal Footer */}
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setModalOpen(false)} className="text-white bg-blue-500 hover:bg-blue-600">
              Close
            </Button>
          </div>
        </div>
      </Modal>


    </>
  );
}
