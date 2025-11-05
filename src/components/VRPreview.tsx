'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, Html, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Rotating turbine component
function RotatingTurbine({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);

  // This would be used in a proper React Three Fiber setup
  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.5;
  //   }
  // });

  return (
    <group ref={meshRef} position={position}>
      {/* Turbine tower */}
      <Box position={[0, -1, 0]} args={[0.2, 2, 0.2]} material-color="#C0C0C0" />
      {/* Blades */}
      <Box position={[0, 0, 0]} args={[0.05, 1.5, 0.3]} material-color="#FFFFFF" />
      <Box position={[0, 0, 0]} args={[0.05, 1.5, 0.3]} rotation={[0, Math.PI / 3, 0]} material-color="#FFFFFF" />
      <Box position={[0, 0, 0]} args={[0.05, 1.5, 0.3]} rotation={[0, -Math.PI / 3, 0]} material-color="#FFFFFF" />
    </group>
  );
}

// Interactive building component
function InteractiveBuilding({ position, onClick }: { position: [number, number, number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Building base */}
      <Box position={[0, -0.5, 0]} args={[2, 1, 2]} material-color="#696969" />
      {/* Building structure */}
      <Box position={[0, 1, 0]} args={[1.5, 2, 1.5]} material-color={hovered ? "#87CEEB" : "#D3D3D3"} />
      {/* Windows */}
      <Box position={[-0.4, 1.2, 0.76]} args={[0.3, 0.3, 0.05]} material-color="#4169E1" />
      <Box position={[0.4, 1.2, 0.76]} args={[0.3, 0.3, 0.05]} material-color="#4169E1" />
      <Box position={[-0.4, 0.6, 0.76]} args={[0.3, 0.3, 0.05]} material-color="#4169E1" />
      <Box position={[0.4, 0.6, 0.76]} args={[0.3, 0.3, 0.05]} material-color="#4169E1" />
      {/* Solar panels on roof */}
      <Box position={[0, 2.2, 0]} args={[1.2, 0.05, 0.8]} material-color="#FFD700" />

      {hovered && (
        <Html position={[0, 3, 0]}>
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
            Green Building - LEED Certified
          </div>
        </Html>
      )}
    </group>
  );
}

export default function VRPreview() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [vrMode, setVrMode] = useState(false);

  return (
    <div className="w-full bg-gradient-to-b from-blue-900 to-blue-600 rounded-lg overflow-hidden relative">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <motion.button
          onClick={() => setVrMode(!vrMode)}
          className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {vrMode ? 'Exit VR' : 'VR Mode'}
        </motion.button>
      </div>

      <Canvas
        camera={{ position: [0, 2, 8], fov: vrMode ? 90 : 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={vrMode ? Math.PI : Math.PI / 2}
            minDistance={vrMode ? 2 : 3}
            maxDistance={vrMode ? 15 : 20}
          />

          {/* Sky background */}
          <mesh>
            <sphereGeometry args={[50, 32, 32]} />
            <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
          </mesh>

          {/* Ground */}
          <Box position={[0, -2.5, 0]} args={[50, 0.1, 50]} material-color="#228B22" />

          {/* Construction Site Complex */}
          <group position={[-3, 0, 0]}>
            <Text
              position={[0, 5, 0]}
              fontSize={0.8}
              color="white"
              anchorX="center"
              anchorY="middle"
              font="/fonts/helvetiker_regular.typeface.json"
            >
              CES Ltd. Smart Construction Site
            </Text>

            {/* Main building */}
            <InteractiveBuilding
              position={[0, 0, 0]}
              onClick={() => setSelectedModel('building')}
            />

            {/* Wind turbine */}
            <RotatingTurbine position={[4, 0, 2]} />

            {/* Solar array */}
            <group position={[-4, 0, 2]}>
              {Array.from({ length: 6 }, (_, i) => (
                <Box
                  key={i}
                  position={[(i % 3 - 1) * 1.5, 1.5, Math.floor(i / 3) * 1.5]}
                  args={[1.2, 0.05, 0.8]}
                  material-color="#FFD700"
                />
              ))}
            </group>

            {/* IoT Sensors */}
            <Sphere position={[2, 2, 3]} args={[0.1]} material-color="#00FF00" />
            <Sphere position={[-2, 2, 3]} args={[0.1]} material-color="#FFFF00" />
            <Sphere position={[0, 2, -3]} args={[0.1]} material-color="#FF4500" />

            {/* Sensor labels */}
            <Text position={[2, 2.5, 3]} fontSize={0.2} color="white" anchorX="center">
              Temperature: 24°C
            </Text>
            <Text position={[-2, 2.5, 3]} fontSize={0.2} color="white" anchorX="center">
              Humidity: 65%
            </Text>
            <Text position={[0, 2.5, -3]} fontSize={0.2} color="white" anchorX="center">
              Energy: 285 kW
            </Text>

            {/* Construction vehicles (simplified) */}
            <Box position={[6, -1, -2]} args={[2, 1, 4]} material-color="#8B4513" />
            <Box position={[-6, -1, -2]} args={[1.5, 0.8, 3]} material-color="#FF6347" />

            {/* Safety barriers */}
            <Box position={[0, -1.5, 5]} args={[10, 0.5, 0.2]} material-color="#FF0000" />
            <Box position={[0, -1.5, -5]} args={[10, 0.5, 0.2]} material-color="#FF0000" />
          </group>

          {/* Environmental elements */}
          <group position={[8, 0, -5]}>
            {/* Trees */}
            <Cylinder position={[0, 0, 0]} args={[0.2, 0.2, 2]} material-color="#8B4513" />
            <Sphere position={[0, 1.5, 0]} args={[0.8]} material-color="#228B22" />

            <Cylinder position={[2, 0, 1]} args={[0.15, 0.15, 1.5]} material-color="#8B4513" />
            <Sphere position={[2, 1, 1]} args={[0.6]} material-color="#32CD32" />
          </group>
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
        <div className="bg-black/60 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm font-semibold">VR Construction Site Preview</p>
          <p className="text-xs opacity-80">Mouse: rotate | Scroll: zoom | Click: interact</p>
          {vrMode && (
            <p className="text-xs text-purple-300 mt-1">VR Mode Active - Immersive Experience</p>
          )}
        </div>

        {selectedModel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/80 backdrop-blur-sm rounded-lg p-4 max-w-xs"
          >
            <h4 className="font-semibold mb-2">
              {selectedModel === 'building' ? 'Smart Green Building' : 'Selected Element'}
            </h4>
            <p className="text-xs opacity-80 mb-2">
              {selectedModel === 'building'
                ? 'LEED Platinum certified building with integrated IoT sensors, solar panels, and smart energy management.'
                : 'Advanced construction technology with real-time monitoring.'
              }
            </p>
            <div className="flex space-x-2 text-xs">
              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded">Energy Efficient</span>
              <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded">IoT Enabled</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* VR Mode Indicator */}
      {vrMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            VR MODE
          </div>
        </motion.div>
      )}
    </div>
  );
}