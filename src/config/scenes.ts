export const scenes = [
  {
    name: "Hero",
    start: 0,
    end: 0.08,
    camera: [7, 5, 10],
    target: [0, 1, 0],
    fov: 36,
  },
  {
    name: "Found",
    start: 0.08,
    end: 0.24,
    camera: [2.1, 3.0, 8.5],
    target: [0, 1.3, 0],
    fov: 34,
  },
  {
    name: "Answered",
    start: 0.24,
    end: 0.38,
    camera: [-1.2, 3.1, 9.5],
    target: [0, 1.3, 0],
    fov: 35,
  },
  {
    name: "Booked",
    start: 0.38,
    end: 0.5,
    camera: [1.6, 3.0, 8.7],
    target: [0, 1.2, 0],
    fov: 35,
  },
  {
    name: "Nurtured",
    start: 0.5,
    end: 0.62,
    camera: [-.8, 3.4, 10],
    target: [0, 1, 0],
    fov: 36,
  },
  {
    name: "Tracked",
    start: 0.62,
    end: 0.8,
    camera: [1.5, 3.1, 9],
    target: [0, 1, 0],
    fov: 36,
  },
  {
    name: "Closed",
    start: 0.8,
    end: 0.92,
    camera: [0, 3.4, 10],
    target: [0, 1.2, 0],
    fov: 36,
  },
  {
    name: "Complete",
    start: 0.92,
    end: 1,
    camera: [0, 4, 12],
    target: [0, 1, 0],
    fov: 38,
  },
];
export const poses = {
  seated: { hip: 0.9, leg: -1.45, arm: -0.9 },
  standing: { hip: 1.35, leg: 0, arm: 0 },
  handshake: { hip: 1.35, leg: 0, arm: -1.2 },
};
export const progress = { value: 0 };
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};
