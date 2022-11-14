import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Mesh } from "three";

const isClient = typeof window !== undefined;
const degToRad = (deg: number) => (deg / 180) * deg;

const Div = styled.div<{ height: number; width: number }>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

const Cube = () => {
  const cube = useRef<Mesh>(null);
  useFrame(() => {
    if (!cube.current) return;
    cube.current.rotation.x += 0.01;
    cube.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={cube}>
      <boxGeometry />
      <meshStandardMaterial color="#7d9430" />
    </mesh>
  );
};

const Plane = () => {
  const plane = useRef<Mesh>(null);

  return (
    <mesh ref={plane} rotation={[-degToRad(90), 0, 0]}>
      <planeGeometry args={[5, 5]} />
      <meshStandardMaterial color="#17315f" />
    </mesh>
  );
};

export const Dummy = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  function onResize() {
    if (!isClient) return;
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    if (isClient) {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.addEventListener("resize", onResize);
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Div {...{ ...dimension }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} />
        <Cube />
        <Plane />
        <ambientLight args={["#fff", 1]} />
      </Canvas>
    </Div>
  );
};
