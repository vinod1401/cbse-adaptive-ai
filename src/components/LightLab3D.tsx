"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  APERTURE,
  FOCAL_LENGTH,
  OBJECT_HEIGHT,
  OpticMode,
  Point2,
  computeOptics,
  mirrorSag,
} from "@/lib/optics";

interface LightLab3DProps {
  mode: OpticMode;
  objectDistance: number;
  showPhotons: boolean;
}

const v3 = (p: Point2) => new THREE.Vector3(p.x, p.y, 0);

function rod(a: THREE.Vector3, b: THREE.Vector3, color: string, radius = 0.16, opacity = 1) {
  const len = a.distanceTo(b);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, len, 10),
    new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity })
  );
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
  return mesh;
}

function dashedRod(a: THREE.Vector3, b: THREE.Vector3, color: string) {
  const group = new THREE.Group();
  const len = a.distanceTo(b);
  const dir = b.clone().sub(a).normalize();
  for (let s = 0; s < len; s += 2.4) {
    const e = Math.min(s + 1.4, len);
    group.add(rod(a.clone().addScaledVector(dir, s), a.clone().addScaledVector(dir, e), color, 0.11, 0.75));
  }
  return group;
}

function arrow(x: number, height: number, color: string, opacity = 1) {
  const group = new THREE.Group();
  const sign = Math.sign(height) || 1;
  const head = Math.min(2.2, Math.abs(height) * 0.4);
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.35,
    transparent: opacity < 1,
    opacity,
  });
  const shaftLen = Math.max(Math.abs(height) - head, 0.01);
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, shaftLen, 16), mat);
  shaft.position.y = (sign * shaftLen) / 2;
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.9, head, 20), mat);
  cone.position.y = sign * (shaftLen + head / 2);
  if (sign < 0) cone.rotation.z = Math.PI;
  group.add(shaft, cone);
  group.position.x = x;
  return group;
}

function label(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  ctx.font = "bold 64px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(text, 128, 64);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), depthTest: false, transparent: true })
  );
  sprite.scale.set(6, 3, 1);
  sprite.renderOrder = 10;
  return sprite;
}

/** Spherical mirror: a lathe of the sag profile, turned so its axis is the x-axis. */
function mirrorMesh(concave: boolean) {
  const group = new THREE.Group();
  const profile = (offset: number) => {
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i <= 24; i++) {
      const r = (APERTURE * i) / 24;
      const s = mirrorSag(r);
      pts.push(new THREE.Vector2(r, (concave ? -s : s) + offset));
    }
    const g = new THREE.LatheGeometry(pts, 64);
    g.rotateZ(-Math.PI / 2);
    return g;
  };
  group.add(
    new THREE.Mesh(
      profile(0),
      new THREE.MeshStandardMaterial({
        color: "#e2e8f0",
        metalness: 0.4,
        roughness: 0.15,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      })
    ),
    new THREE.Mesh(
      profile(0.5),
      new THREE.MeshStandardMaterial({
        color: "#475569",
        roughness: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
      })
    )
  );
  return group;
}

function lensMesh(convex: boolean) {
  const k = 1.4 / (APERTURE * APERTURE);
  const half = (r: number) => (convex ? 1.6 - k * r * r : 0.35 + k * r * r);
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= 20; i++) pts.push(new THREE.Vector2((APERTURE * i) / 20, half((APERTURE * i) / 20)));
  for (let i = 20; i >= 0; i--) pts.push(new THREE.Vector2((APERTURE * i) / 20, -half((APERTURE * i) / 20)));
  const g = new THREE.LatheGeometry(pts, 64);
  g.rotateZ(-Math.PI / 2);
  return new THREE.Mesh(
    g,
    new THREE.MeshStandardMaterial({
      color: "#7dd3fc",
      transparent: true,
      opacity: 0.35,
      roughness: 0.05,
      side: THREE.DoubleSide,
    })
  );
}

function disposeTree(obj: THREE.Object3D) {
  obj.traverse((child) => {
    const mesh = child as THREE.Mesh;
    mesh.geometry?.dispose();
    const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    mats.forEach((m: any) => {
      m.map?.dispose();
      m.dispose();
    });
  });
}

interface Photon {
  mesh: THREE.Mesh;
  path: THREE.Vector3[];
  cum: number[];
  offset: number;
}

export function LightLab3D({ mode, objectDistance, showPhotons }: LightLab3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; dynamic: THREE.Group; photons: Photon[] } | null>(null);

  // One-time renderer, camera, lights and principal axis.
  useEffect(() => {
    const mount = mountRef.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#020617");
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(-8, 22, 78);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(-6, 0, 0);
    controls.enableDamping = true;
    controls.minDistance = 25;
    controls.maxDistance = 180;

    scene.add(new THREE.AmbientLight("#ffffff", 0.7));
    const sun = new THREE.DirectionalLight("#ffffff", 1.6);
    sun.position.set(-30, 50, 60);
    scene.add(sun);

    const grid = new THREE.GridHelper(200, 40, "#1e293b", "#0f172a");
    grid.position.y = -22;
    scene.add(grid);
    scene.add(rod(new THREE.Vector3(-100, 0, 0), new THREE.Vector3(100, 0, 0), "#64748b", 0.07));

    const dynamic = new THREE.Group();
    scene.add(dynamic);
    sceneRef.current = { scene, dynamic, photons: [] };

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    let frame = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      frame = requestAnimationFrame(loop);
      const t = clock.getElapsedTime() * 28;
      for (const p of sceneRef.current?.photons ?? []) {
        const total = p.cum[p.cum.length - 1];
        let s = (t + p.offset) % total;
        let i = 1;
        while (i < p.cum.length - 1 && s > p.cum[i]) i++;
        s -= p.cum[i - 1];
        const seg = p.cum[i] - p.cum[i - 1] || 1;
        p.mesh.position.lerpVectors(p.path[i - 1], p.path[i], s / seg);
      }
      controls.update();
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      disposeTree(scene);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  // Rebuild the optical element, object, image, rays and labels on every change.
  useEffect(() => {
    const ctx = sceneRef.current;
    if (!ctx) return;
    disposeTree(ctx.dynamic);
    ctx.dynamic.clear();
    ctx.photons = [];

    const res = computeOptics(mode, objectDistance);
    const g = ctx.dynamic;

    g.add(res.isMirror ? mirrorMesh(mode === "concave-mirror") : lensMesh(mode === "convex-lens"));

    // Axis markers: P/F/C for mirrors, O/F₁/F₂/2F₁/2F₂ for lenses.
    const F = FOCAL_LENGTH;
    const marks: [number, string][] = res.isMirror
      ? [
          [0, "P"],
          [-res.f, "F"],
          [-2 * res.f, "C"],
        ]
      : [
          [0, "O"],
          [-F, "F₁"],
          [F, "F₂"],
          [-2 * F, "2F₁"],
          [2 * F, "2F₂"],
        ];
    for (const [x, text] of marks) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), new THREE.MeshBasicMaterial({ color: "#e2e8f0" }));
      dot.position.x = x;
      const tag = label(text, "#cbd5e1");
      tag.position.set(x, -2.6, 0);
      g.add(dot, tag);
    }

    // Object (orange arrow).
    g.add(arrow(-objectDistance, OBJECT_HEIGHT, "#fb923c"));
    const objTag = label("वस्तु", "#fdba74");
    objTag.position.set(-objectDistance, OBJECT_HEIGHT + 3, 0);
    g.add(objTag);

    // Image: solid green if real, translucent purple if virtual.
    const showImage =
      !res.atInfinity && Math.abs(res.imageX) < 140 && Math.abs(res.imageHeight) < 45;
    if (showImage) {
      const color = res.real ? "#34d399" : "#c084fc";
      g.add(arrow(res.imageX, res.imageHeight, color, res.real ? 1 : 0.55));
      const imgTag = label("प्रतिबिंब", color);
      imgTag.position.set(res.imageX, res.imageHeight + Math.sign(res.imageHeight || 1) * 3, 0);
      g.add(imgTag);
    }

    // Rays + travelling light pulses.
    for (const ray of res.rays) {
      const pts = ray.path.map(v3);
      for (let i = 1; i < pts.length; i++) g.add(rod(pts[i - 1], pts[i], ray.color));
      if (ray.extension) g.add(dashedRod(v3(ray.extension[0]), v3(ray.extension[1]), ray.color));

      if (showPhotons) {
        const cum = [0];
        for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + pts[i].distanceTo(pts[i - 1]));
        for (let k = 0; k < 3; k++) {
          const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.55, 12, 12),
            new THREE.MeshBasicMaterial({ color: "#fffbeb" })
          );
          g.add(mesh);
          ctx.photons.push({ mesh, path: pts, cum, offset: (k * cum[cum.length - 1]) / 3 });
        }
      }
    }
  }, [mode, objectDistance, showPhotons]);

  return <div ref={mountRef} className="w-full h-[55vh] min-h-[340px] rounded-2xl overflow-hidden cursor-grab" />;
}
