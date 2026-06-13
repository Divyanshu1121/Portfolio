import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ThreeBackground.css';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create Custom Round Particle Texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw a smooth radial gradient circle representing a star glow
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createCircleTexture();

    // 3. Create Multi-layered Star Fields (Stargazing Effect)
    // We create 3 layers with different star sizes and colors for depth.
    const layersConfig = [
      { count: 1200, size: 0.6, color: 0xffffff, speed: 0.005 },     // Tiny distant background stars
      { count: 600, size: 1.2, color: 0xdbebff, speed: 0.012 },      // Medium blue-white stars
      { count: 150, size: 2.0, color: 0xfffcf0, speed: 0.025 }       // Bright warm foreground stars
    ];

    const starGroups = [];

    layersConfig.forEach((layer) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      
      for (let i = 0; i < layer.count * 3; i += 3) {
        // Spread stars in a large coordinate field
        positions[i] = (Math.random() - 0.5) * 350;     // X
        positions[i + 1] = (Math.random() - 0.5) * 250; // Y
        positions[i + 2] = (Math.random() - 0.5) * 200; // Z
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        size: layer.size,
        map: particleTexture,
        transparent: true,
        opacity: Math.random() * 0.3 + 0.4,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: layer.color,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);
      
      starGroups.push({
        points,
        geometry,
        material,
        speed: layer.speed,
        baseOpacity: material.opacity
      });
    });

    // 4. Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      // Normalize mouse coordinates to [-0.5, 0.5]
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smoothly interpolate camera/system rotation based on mouse coordinates
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      starGroups.forEach((group, index) => {
        // Slowly rotate layers at slightly different speeds
        const rotMultiplier = (index + 1) * 0.003;
        group.points.rotation.y = elapsedTime * rotMultiplier + targetX * 0.15;
        group.points.rotation.x = elapsedTime * (rotMultiplier * 0.5) + targetY * 0.15;

        // Twinkling animation (modulating opacity dynamically at different frequencies)
        const pulseFrequency = index === 0 ? 1.5 : index === 1 ? 2.8 : 4.5;
        // Oscillate opacity slightly to simulate real twinkling
        group.material.opacity = group.baseOpacity * (0.6 + 0.4 * Math.sin(elapsedTime * pulseFrequency));
        
        // Drifting stars
        const positionArr = group.geometry.attributes.position.array;
        for (let i = 0; i < layerCount(index); i++) {
          const idx = i * 3 + 1; // Y coordinate
          positionArr[idx] += Math.sin(elapsedTime + positionArr[idx - 1] * 0.02) * 0.005;
        }
        group.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    // Helper to get count per group index
    const layerCount = (index) => layersConfig[index].count;

    animate();

    // 6. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 7. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      starGroups.forEach((group) => {
        group.geometry.dispose();
        group.material.dispose();
      });
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="three-bg-container" ref={containerRef} />;
}
