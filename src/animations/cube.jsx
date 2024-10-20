import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import image from "../image.jpeg"

const RotatingSquares = () => {
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const [phase, setPhase] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Фиксированные позиции кубиков
  const fixedPositions = [
    [-1.3, 0, 0], // Левый верхний
    [0, 0, 0],    // Центральный верхний
    [1.3, 0, 0],  // Правый верхний
    [-2.6, 0, 0],  
    [2.6, 0, 0],   
  ];

  // Позиции для буквы "V"
  const VPositions = [
    [-1.2, 1.2, 0],   // Левый верхний
    [-0.6, 0.1, 0], // Левый средний
    [0.6, 0.1, 0],  // Правый средний
    [1.2, 1.2, 0],    // Правый верхний
    [0, -1, 0],   // Центр
  ];

  // Случайные позиции для разлета кубиков
  const randomPositions = [
    [-3, 3, 0],
    [3, 3, 0],
    [-3, -3, 0],
    [3, -3, 0],
    [0, 0, 0],
  ];

  // Загрузка текстуры
//   const texture = useLoader(TextureLoader, image); // Укажите путь к вашей текстуре

  useFrame((state, delta) => {
    setElapsedTime((prev) => prev + delta);

    if (groupRef.current) {
      meshRefs.current.forEach((mesh, index) => {
        if (phase === 0) {
          // Фаза 1: Сборка в букву "V"
          const targetPos = VPositions[index];
          mesh.position.x += (targetPos[0] - mesh.position.x) * 0.1; // Линейная интерполяция
          mesh.position.y += (targetPos[1] - mesh.position.y) * 0.1;
        } else if (phase === 1) {
          // Фаза 2: Разлет кубиков в случайные позиции
          const targetPos = randomPositions[index];
          mesh.position.x += (targetPos[0] - mesh.position.x) * 0.1;
          mesh.position.y += (targetPos[1] - mesh.position.y) * 0.1;
        } else if (phase === 2) {
          // Фаза 3: Возврат на фиксированные позиции
          const targetPos = fixedPositions[index];
          mesh.position.x += (targetPos[0] - mesh.position.x) * 0.1;
          mesh.position.y += (targetPos[1] - mesh.position.y) * 0.1;
        }
      });
    }

    // Меняем фазы анимации по таймеру
    if (elapsedTime > 1 && phase === 0) {
      setPhase(1); // Переход в фазу 2 (разлет) через 2 секунды
      setElapsedTime(0);
    } else if (elapsedTime > 1 && phase === 1) {
      setPhase(2); // Переход в фазу 3 (возврат) через 2 секунды
      setElapsedTime(0);
    } else if (elapsedTime > 1 && phase === 2) {
      setPhase(0); // Переход в фазу 1 (сборка в "V") через 2 секунды
      setElapsedTime(0);
    }
  });

  return (
    <group ref={groupRef} scale={0.5}>
      {fixedPositions.map((pos, index) => (
        <mesh
          key={index}
          ref={(el) => (meshRefs.current[index] = el)}
          position={pos}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            transparent
            opacity={0.05}
            // map={texture} // Применяем текстуру к материалу
            side={THREE.DoubleSide}
          />
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
            <lineBasicMaterial color={'white'} />
          </lineSegments>
        </mesh>
      ))}
    </group>
  );
};

const Cube = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <RotatingSquares />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default Cube;