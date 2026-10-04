import { createNoise3D } from 'simplex-noise';

export const noise3D = createNoise3D();

export function fbm(x: number, y: number, z: number, octaves: number, lacunarity: number, gain: number, scale: number) {
  let total = 0;
  let frequency = scale;
  let amplitude = 1.0;
  let maxAmplitude = 0;

  for (let i = 0; i < octaves; i++) {
    total += noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
    maxAmplitude += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return total / maxAmplitude;
}
