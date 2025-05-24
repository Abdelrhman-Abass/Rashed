import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

type ModelProps = {
  url: string;
};

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={0.5} />;
};

type ModelViewerProps = {
  glbPath: string;
};

export const ModelViewer: React.FC<ModelViewerProps> = ({ glbPath }) => {
  return (
    <Canvas camera={{ fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <React.Suspense fallback={null}>
        <Stage environment="city" intensity={0.6} shadows preset="rembrandt">
          <Model url={glbPath} />
        </Stage>
      </React.Suspense>

      <OrbitControls enableZoom={false} autoRotate={false} />
    </Canvas>
  );
};
