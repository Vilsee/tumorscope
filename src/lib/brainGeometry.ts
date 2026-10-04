import { Vector3, BufferGeometry } from 'three';
import { fbm } from './noise';

export function applyBrainDisplacement(
  geometry: BufferGeometry,
  scale: number = 1.5,
  octaves: number = 4,
  displacementStrength: number = 0.15
) {
  const posAttribute = geometry.attributes.position;
  const vertex = new Vector3();
  const normal = new Vector3();
  
  if (!geometry.attributes.normal) {
      geometry.computeVertexNormals();
  }
  const normAttribute = geometry.attributes.normal;

  for (let i = 0; i < posAttribute.count; i++) {
    vertex.fromBufferAttribute(posAttribute, i);
    normal.fromBufferAttribute(normAttribute, i);

    // Create gyri and sulci using FBM
    const noiseVal = fbm(vertex.x, vertex.y, vertex.z, octaves, 2.0, 0.5, scale);
    
    vertex.addScaledVector(normal, noiseVal * displacementStrength);
    
    posAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  posAttribute.needsUpdate = true;
}
