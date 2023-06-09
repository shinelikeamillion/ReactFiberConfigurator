import { Canvas, useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Center,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
} from "@react-three/drei";
import "./App.css";
import { useRef } from "react";
import { easing } from "maath";

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

const Backdrop = () => (
  <AccumulativeShadows
    temporal
    frames={60}
    alphaTest={0.85}
    scale={10}
    rotation={[Math.PI / 2, 0, 0]}
    position={[0, 0, -0.14]}
  >
    <RandomizedLight
      amount={4}
      radius={9}
      intensity={0.55}
      ambient={0.25}
      position={[5, 5, -10]}
    />
    <RandomizedLight
      amount={4}
      radius={5}
      intensity={0.25}
      ambient={0.55}
      position={[-5, 5, -9]}
    />
  </AccumulativeShadows>
);

const CameraRig = ({ children }) => {
  const group = useRef();
  useFrame((state, deleta) => {
    easing.dampE(
      // initial pointer.x = 0
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      deleta
    );
  });
  return <group ref={group}>{children}</group>;
};

export const App = ({ position = [-1, 0, 2.5], fov = 25 }) => (
  <Canvas
    shadows
    eventSource={document.getElementById("root")}
    eventPrefix="client"
    camera={{ position, fov }}
  >
    <ambientLight intensity={[0.5]} />
    <Environment preset="city" />
    <CameraRig>
      <Center>
        <Shirt />
        <Backdrop />
      </Center>
    </CameraRig>
    {/* <OrbitControls /> */}
  </Canvas>
);

useGLTF.preload("/gltf/shirt_baked.glb");
