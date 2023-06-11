import { Canvas, useFrame } from "@react-three/fiber";
import {
  AccumulativeShadows,
  Center,
  Decal,
  Environment,
  OrbitControls,
  RandomizedLight,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import "./App.css";
import { useRef } from "react";
import { easing } from "maath";
import Overlay from "./Overlay";
import * as THREE from 'three'
import { useSnapshot } from 'valtio'
import { state } from './store'

const  Shirt = (props) => {
  const snap = useSnapshot(state)
  const { nodes, materials } = useGLTF("/gltf/shirt_baked_collapsed.glb");

  // materials.lambert1.color = new THREE.Color(snap.selectedColor)

  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.selectedColor, 0.25, delta)
  )

  const texture = useTexture(`${snap.selectedDecal}.png`)

  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}>
        <Decal map={texture}
        position={[0, .04, .15]}
        rotation={[0,0,0]}
        scale={.15}
        opacity={.7}
        map-anisotropy={16}
        />
      </mesh>
  );
}

const Backdrop = () => {

  const shadows = useRef()

  useFrame((state, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      state.selectedColor,
      0.25,
      delta
    )
  )
  return (
    <AccumulativeShadows
    ref={shadows}
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
  )
}

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


export const App = ({ position = [0, 0, 2.5], fov = 25 }) => (
  <>
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
  <Overlay/>
  </>
);

useGLTF.preload("/gltf/shirt_baked.glb");
