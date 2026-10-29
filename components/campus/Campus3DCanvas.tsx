'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw } from 'lucide-react';

interface Campus3DCanvasProps {
  activeLocationId?: string;
  onSelectLocation?: (id: string) => void;
}

export default function Campus3DCanvas(_props: Campus3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL capability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Three.js Scene Setup
    const width = container.clientWidth;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF0F7FF);
    scene.fog = new THREE.FogExp2(0xF0F7FF, 0.02);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Lighting (Daylight White & Blue)
    const ambientLight = new THREE.AmbientLight(0xE0F2FE, 1.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00A3E0, 1.6);
    directionalLight.position.set(10, 15, 8);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x0284C7, 1.5, 20);
    pointLight.position.set(-6, 4, -4);
    scene.add(pointLight);

    // Campus Grounds Ground Plane (Ice White / Soft Blue)
    const groundGeo = new THREE.PlaneGeometry(35, 35);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xEDF6FF,
      roughness: 0.8,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid Floor Overlay in Vidyadhari Blue
    const gridHelper = new THREE.GridHelper(30, 30, 0x00A3E0, 0xBAE6FD);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // Architectural Blocks representing Vidyadhari Campus Buildings
    const buildingsGroup = new THREE.Group();

    // Central Academic Block (Navy Blue)
    const mainBlockGeo = new THREE.BoxGeometry(7, 3.5, 3.5);
    const mainBlockMat = new THREE.MeshStandardMaterial({
      color: 0x002B66,
      roughness: 0.3,
      metalness: 0.4
    });
    const mainBlock = new THREE.Mesh(mainBlockGeo, mainBlockMat);
    mainBlock.position.set(0, 1.75, -2);
    mainBlock.castShadow = true;
    buildingsGroup.add(mainBlock);

    // Science & Lab Wing (Cerulean Blue)
    const scienceBlockGeo = new THREE.BoxGeometry(3.5, 2.8, 3.5);
    const scienceBlockMat = new THREE.MeshStandardMaterial({
      color: 0x00A3E0,
      roughness: 0.3,
      metalness: 0.5
    });
    const scienceBlock = new THREE.Mesh(scienceBlockGeo, scienceBlockMat);
    scienceBlock.position.set(-6, 1.4, -1);
    buildingsGroup.add(scienceBlock);

    // Arts & Cultural Pavilion (Sky Blue)
    const artsBlockGeo = new THREE.BoxGeometry(3.5, 2.5, 3.5);
    const artsBlockMat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      roughness: 0.4,
      metalness: 0.3
    });
    const artsBlock = new THREE.Mesh(artsBlockGeo, artsBlockMat);
    artsBlock.position.set(6, 1.25, -1);
    buildingsGroup.add(artsBlock);

    // Sports Ground Turf Area
    const turfGeo = new THREE.BoxGeometry(10, 0.1, 6);
    const turfMat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      roughness: 0.9
    });
    const turf = new THREE.Mesh(turfGeo, turfMat);
    turf.position.set(0, 0.05, 6);
    buildingsGroup.add(turf);

    // Glowing Campus Entrance Arch
    const archGeo = new THREE.TorusGeometry(1.8, 0.15, 12, 24, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x00A3E0,
      emissive: 0x002B66,
      roughness: 0.2
    });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(0, 1.8, 10);
    arch.rotation.y = 0;
    buildingsGroup.add(arch);

    // Interactive Hotspot Markers (Pillars with glowing rings)
    const markerLocations = [
      { id: 'loc-1', x: 0, z: 10, label: 'Main Entrance' },
      { id: 'loc-2', x: 0, z: -2, label: 'Classrooms' },
      { id: 'loc-3', x: -6, z: -1, label: 'Science Wing' },
      { id: 'loc-4', x: 0, z: 6, label: 'Sports Arena' },
      { id: 'loc-5', x: 6, z: -1, label: 'Arts Studio' },
    ];

    const markersGroup = new THREE.Group();
    markerLocations.forEach(loc => {
      const pinGeo = new THREE.SphereGeometry(0.35, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0x00A3E0,
        emissive: 0x002B66,
        roughness: 0.1
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(loc.x, 3.8, loc.z);
      pin.userData = { id: loc.id };
      markersGroup.add(pin);

      // Light beam under marker
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.8, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x00A3E0,
        transparent: true,
        opacity: 0.4
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(loc.x, 1.9, loc.z);
      markersGroup.add(beam);
    });

    scene.add(buildingsGroup);
    scene.add(markersGroup);

    // Animation Loop
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating) {
        angle += 0.003;
        camera.position.x = Math.sin(angle) * 16;
        camera.position.z = Math.cos(angle) * 16;
        camera.lookAt(0, 1.5, 0);
      }

      // Marker pulse animation
      markersGroup.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
          child.position.y = 3.8 + Math.sin(Date.now() * 0.003 + index) * 0.15;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 450;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isRotating]);

  if (!webGLSupported) {
    return null; // Gracefully hand over to 2D Fallback
  }

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden border border-[#00A3E0]/30 bg-gradient-to-b from-[#F0F7FF] via-white to-[#F0F7FF] shadow-xl">
      {/* 3D Canvas Mount Point */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating HUD Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <div className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#00A3E0]/30 text-xs font-bold text-[#002B66] flex items-center gap-1.5 shadow-md">
          <Layers className="w-3.5 h-3.5 text-[#00A3E0] animate-pulse" />
          <span>Vidyadhari Digital Campus 3D Model</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => setIsRotating(!isRotating)}
          aria-label="Toggle camera rotation"
          className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#00A3E0]/30 text-xs font-semibold text-[#002B66] hover:bg-sky-50 flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <RotateCcw className={`w-3.5 h-3.5 text-[#00A3E0] ${isRotating ? 'animate-spin' : ''}`} />
          <span>{isRotating ? 'Auto-Orbit: ON' : 'Auto-Orbit: PAUSED'}</span>
        </button>
      </div>

      {/* Legend & Instructions */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-sky-200 text-[11px] text-slate-700 font-medium shadow-sm">
          📍 Real-time architectural visualization • Interactive zones mapped to Bhimaram campus
        </div>
        <div className="text-[11px] text-[#002B66] tracking-wider uppercase font-bold bg-white/80 px-2.5 py-1 rounded border border-sky-100 shadow-sm">
          Select any of the 9 zones below to step inside
        </div>
      </div>
    </div>
  );
}
