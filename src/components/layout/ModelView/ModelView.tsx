import { useGLTF } from "@react-three/drei";

interface ModelProps {
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}

export function Model(props: ModelProps) {
  const { nodes, materials } = useGLTF(
    "/Models/humanoid_robot_ai/scene.gltf"
  ) as any;

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.material_0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.material_0}
      />
    </group>
  );
}
