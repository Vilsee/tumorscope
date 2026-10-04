export interface PubMedArticle { pmid: string; title: string; abstract: string; authors: string[]; journal: string; year: number; doi?: string; }
export interface ClinicalTrial { nctId: string; title: string; status: string; phase: string; conditions: string[]; interventions: string[]; summary?: string; }
export interface ResearchProject { projectNum: string; title: string; piName: string; organization: string; fiscalYear: number; awardAmount: number; abstract?: string; }
export interface GHODataPoint { indicator: string; country: string; year: number; value: number; sex?: string; }

export type BrainRegion = 'frontal' | 'parietal' | 'temporal' | 'occipital' | 'cerebellum' | 'brainstem' | 'spinalCord' | 'ventricles' | 'pineal' | 'cranialNerves' | 'meninges' | 'sellar';

export interface TumorSubtype {
  name: string;
  grades: number[];
  molecularMarkers?: string[];
  description: string;
  locations: BrainRegion[];
}

export interface TumorCategory {
  id: string;
  name: string;
  description: string;
  primaryLocations: BrainRegion[];
  icon: string;
  subtypes: TumorSubtype[];
}

/* ────────────────────────────────────────
   New 10-Category Tumor Classification
   ──────────────────────────────────────── */

/** Anatomical zones mapped to the 3D brain model */
export type AnatomicalZone = 'cerebrum' | 'cerebellum' | 'brainstem' | 'meninges' | 'ventricles' | 'sellar' | 'pineal' | 'cranialNerves' | 'spinalCord' | 'multiple';

export type TumorStatus = 'Benign' | 'Malignant' | 'Variable';
export type AgeGroup = 'Pediatric' | 'Adult' | 'All ages';

export type TumorCategoryName =
  | 'Gliomas/Neuroepithelial'
  | 'Meningeal'
  | 'Cranial/Paraspinal Nerve'
  | 'Sellar/Pituitary'
  | 'Pineal Region'
  | 'Embryonal'
  | 'Germ Cell'
  | 'Mesenchymal/Vascular'
  | 'PCNSL'
  | 'Metastatic';

export interface TumorEntry {
  /** Unique ID */
  id: string;
  /** Tumor name */
  name: string;
  /** One of the 10 WHO taxonomy categories */
  category: TumorCategoryName;
  /** WHO grade range, e.g. [1], [2,3], [4] */
  gradeRange: number[];
  /** Benign, Malignant, or Variable */
  status: TumorStatus;
  /** Typical age group affected */
  ageGroup: AgeGroup;
  /** Primary anatomical origin mapped to 3D model zone */
  anatomicalOrigin: AnatomicalZone;
  /** Short plain-language description */
  description: string;
}
