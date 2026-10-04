import { BrainRegion, AnatomicalZone, TumorEntry } from '@/types';
import { tumorClassification } from '@/data/tumorClassification';

/** Map 3D BrainRegion to corresponding AnatomicalZone(s) in taxonomy */
export function regionToZones(region: BrainRegion): AnatomicalZone[] {
  switch (region) {
    case 'frontal':
    case 'parietal':
    case 'temporal':
    case 'occipital':
      return ['cerebrum'];
    case 'cerebellum':
      return ['cerebellum'];
    case 'brainstem':
      return ['brainstem'];
    case 'meninges':
      return ['meninges'];
    case 'ventricles':
      return ['ventricles'];
    case 'sellar':
      return ['sellar'];
    case 'pineal':
      return ['pineal'];
    case 'cranialNerves':
      return ['cranialNerves'];
    case 'spinalCord':
      return ['spinalCord'];
    default:
      return ['cerebrum'];
  }
}

/** Map AnatomicalZone from taxonomy to 3D BrainRegion for model highlighting */
export function zoneToRegion(zone: AnatomicalZone): BrainRegion {
  switch (zone) {
    case 'cerebrum':
      return 'frontal';
    case 'cerebellum':
      return 'cerebellum';
    case 'brainstem':
      return 'brainstem';
    case 'meninges':
      return 'meninges';
    case 'ventricles':
      return 'ventricles';
    case 'sellar':
      return 'sellar';
    case 'pineal':
      return 'pineal';
    case 'cranialNerves':
      return 'cranialNerves';
    case 'spinalCord':
      return 'spinalCord';
    case 'multiple':
      return 'meninges';
    default:
      return 'frontal';
  }
}

/** Get all tumor entries originating in a specific 3D brain region */
export function getTumorsForRegion(region: BrainRegion): TumorEntry[] {
  const targetZones = regionToZones(region);
  return tumorClassification.filter(
    (tumor) => targetZones.includes(tumor.anatomicalOrigin) || tumor.anatomicalOrigin === 'multiple'
  );
}
