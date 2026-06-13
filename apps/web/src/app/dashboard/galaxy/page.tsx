"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Sphere, Trail, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Power } from "lucide-react";
import * as THREE from "three";

// Central Startup Sun
function StartupSun({ isIgnited }: { isIgnited: boolean }) {
  const sunRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      const scale = isIgnited ? 1.5 + Math.sin(clock.getElapsedTime() * 5) * 0.1 : 1;
      sunRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      <mesh ref={sunRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color={isIgnited ? "#ffffff" : "#3b82f6"} 
          emissive={isIgnited ? "#ffffff" : "#1d4ed8"}
          emissiveIntensity={isIgnited ? 5 : 1}
          wireframe={!isIgnited}
        />
      </mesh>
      <pointLight 
        color={isIgnited ? "#ffffff" : "#3b82f6"} 
        intensity={isIgnited ? 100 : 20} 
        distance={50} 
      />
    </group>
  );
}

// Orbiting Agent Planet
function AgentPlanet({ radius, speed, color, label, size, offset }: { radius: number, speed: number, color: string, label: string, size: number, offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = (clock.getElapsedTime() * speed) + offset;
    }
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.05;
      planetRef.current.rotation.x += 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[radius, 0, 0]}>
        <Trail width={size * 2} length={100} color={new THREE.Color(color)} attenuation={(t) => t * t}>
          <mesh ref={planetRef}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
          </mesh>
        </Trail>
        <Html distanceFactor={15} center>
          <div className="text-[10px] font-bold text-white uppercase tracking-widest whitespace-nowrap bg-black/50 px-2 py-0.5 rounded backdrop-blur-md border border-white/10">
            {label}
          </div>
        </Html>
      </group>
    </group>
  );
}

export default function GalaxyPage() {
  const [ignited, setIgnited] = useState(false);
  const [sequenceComplete, setSequenceComplete] = useState(false);

  const handleIgnite = () => {
    setIgnited(true);
    setTimeout(() => setSequenceComplete(true), 3500); // Wait for the "explosion" animation
  };

  const agents = [
    { label: "CEO Agent", r: 4, s: 0.5, c: "#3b82f6", sz: 0.4 },
    { label: "CTO Agent", r: 5.5, s: 0.4, c: "#10b981", sz: 0.35 },
    { label: "CMO Agent", r: 7, s: 0.6, c: "#8b5cf6", sz: 0.3 },
    { label: "CFO Agent", r: 8.5, s: 0.3, c: "#f59e0b", sz: 0.45 },
    { label: "Research Agent", r: 10, s: 0.45, c: "#06b6d4", sz: 0.25 },
    { label: "Investor Agent", r: 12, s: 0.2, c: "#ef4444", sz: 0.5 },
  ];

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 8, 15], fov: 60 }}>
          <color attach="background" args={["#000000"]} />
          <ambientLight intensity={0.1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={true} enablePan={false} autoRotate={!ignited} autoRotateSpeed={0.5} maxDistance={30} minDistance={5} />
          
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <StartupSun isIgnited={ignited} />
            {agents.map((a, i) => (
              <AgentPlanet key={i} radius={a.r} speed={a.s} color={a.c} label={a.label} size={a.sz} offset={i * 2} />
            ))}
          </Float>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Rocket className="w-8 h-8 text-blue-500" /> Startup Galaxy
        </h1>
        <p className="text-gray-400 mt-2 text-sm tracking-wide">Live 3D orbital visualization of your startup intelligence.</p>
      </div>

      {/* Control Panel */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        {!ignited ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleIgnite}
            className="group relative flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <Power className="w-6 h-6" />
            Initiate Genesis Moment
          </motion.button>
        ) : null}
      </div>

      {/* The Genesis Moment Finale */}
      <AnimatePresence>
        {sequenceComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              className="bg-black/80 border border-white/10 rounded-3xl p-12 max-w-2xl w-full text-center shadow-[0_0_100px_rgba(59,130,246,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <h2 className="text-6xl font-black text-white mb-2 tracking-tighter">GENESIS COMPLETE.</h2>
                <p className="text-blue-400 font-bold uppercase tracking-[0.3em] mb-12">The Startup is Alive</p>
              </motion.div>

              <div className="grid grid-cols-3 gap-6 mb-12">
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Unicorn Prob</div>
                  <div className="text-4xl font-black text-purple-400">8.7%</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.7 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Yr 5 Rev</div>
                  <div className="text-4xl font-black text-green-400">$120M</div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.9 }} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-2">Reality Score</div>
                  <div className="text-4xl font-black text-blue-400">92/100</div>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                <p className="text-gray-400 text-sm mb-6">Your venture has been fully simulated and validated.</p>
                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors">
                    View Pitch Deck
                  </button>
                  <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/10 text-white font-bold uppercase tracking-wider rounded-full hover:bg-white/20 border border-white/10 transition-colors">
                    Reset
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
