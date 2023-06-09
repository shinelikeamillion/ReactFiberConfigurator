import { Canvas } from "@react-three/fiber";
import { Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import "./App.css";

export function Shirt(props) {
  const { nodes, materials } = useGLTF("/gltf/shirt_baked_1.glb");
  return (
    <group {...props} dispose={null}>
      <group position={[0.42, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh.geometry}
          material={materials.lambert1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_1.geometry}
          material={materials.lambert1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_2.geometry}
          material={materials.lambert1}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_3.geometry}
          material={materials.lambert1}
        />
      </group>
    </group>
  );
}

export const App = ({ position = [-1, 0, 2.5], fov = 25 }) => (
  <Canvas 
  eventSource={document.getElementById('root')}
  eventPrefix="client"
  camera={{ position, fov }}>
    <ambientLight intensity={[.5]}/>
    <Environment preset="city"/>
    <Center>
      <Shirt/>
    </Center>
    <OrbitControls />
  </Canvas>
);

useGLTF.preload("/gltf/shirt_baked.glb");