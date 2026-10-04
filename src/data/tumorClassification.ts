import { TumorEntry, TumorCategoryName, AnatomicalZone } from '@/types';

/* ────────────────────────────────────────────────────────────────
   WHO CNS5 Tumor Classification — 10-Category Taxonomy
   Structured for the NeuroScope Classification Explorer.
   
   Source: Louis DN, et al. "The 2021 WHO Classification of Tumors 
   of the Central Nervous System: a summary." Neuro-Oncology. 2021.
   ──────────────────────────────────────────────────────────────── */

/** Map each category to the 3D anatomical zone */
export const categoryZoneMap: Record<TumorCategoryName, AnatomicalZone> = {
  'Gliomas/Neuroepithelial': 'cerebrum',
  'Meningeal': 'meninges',
  'Cranial/Paraspinal Nerve': 'cranialNerves',
  'Sellar/Pituitary': 'sellar',
  'Pineal Region': 'pineal',
  'Embryonal': 'cerebellum',
  'Germ Cell': 'pineal',
  'Mesenchymal/Vascular': 'meninges',
  'PCNSL': 'cerebrum',
  'Metastatic': 'multiple',
};

/** All 10 category names */
export const ALL_CATEGORIES: TumorCategoryName[] = [
  'Gliomas/Neuroepithelial',
  'Meningeal',
  'Cranial/Paraspinal Nerve',
  'Sellar/Pituitary',
  'Pineal Region',
  'Embryonal',
  'Germ Cell',
  'Mesenchymal/Vascular',
  'PCNSL',
  'Metastatic',
];

/** Category display metadata (icon + color accent) */
export const CATEGORY_META: Record<TumorCategoryName, { icon: string; accent: string }> = {
  'Gliomas/Neuroepithelial': { icon: '🧠', accent: '#5AC8FA' },
  'Meningeal':               { icon: '🛡️', accent: '#34D399' },
  'Cranial/Paraspinal Nerve':{ icon: '⚡', accent: '#A78BFA' },
  'Sellar/Pituitary':        { icon: '⚗️', accent: '#E8A33D' },
  'Pineal Region':           { icon: '👁️', accent: '#F472B6' },
  'Embryonal':               { icon: '👶', accent: '#EF4444' },
  'Germ Cell':               { icon: '🌱', accent: '#6EE7B7' },
  'Mesenchymal/Vascular':    { icon: '🦴', accent: '#FB923C' },
  'PCNSL':                   { icon: '🩸', accent: '#F87171' },
  'Metastatic':              { icon: '🎯', accent: '#94A3B8' },
};

export const tumorClassification: TumorEntry[] = [
  /* ──────────────────────────────────────────
     1. Gliomas / Neuroepithelial
     ────────────────────────────────────────── */
  {
    id: 'glio-01',
    name: 'Glioblastoma, IDH-wildtype',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebrum',
    description: 'The most aggressive primary brain tumor in adults. Defined by rapid growth, central necrosis, and microvascular proliferation. Median survival is approximately 15 months with standard therapy.',
  },
  {
    id: 'glio-02',
    name: 'Astrocytoma, IDH-mutant',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [2, 3, 4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebrum',
    description: 'Diffuse infiltrative glioma driven by IDH1/2 mutations. Lower-grade forms grow slowly but inevitably progress. Homozygous CDKN2A/B deletion upgrades it to Grade 4 regardless of histology.',
  },
  {
    id: 'glio-03',
    name: 'Oligodendroglioma, IDH-mutant & 1p/19q-codeleted',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [2, 3],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebrum',
    description: 'Characterized by whole-arm 1p/19q co-deletion and IDH mutation. Often presents with seizures. Relatively chemosensitive, with better prognosis than astrocytoma.',
  },
  {
    id: 'glio-04',
    name: 'Diffuse Midline Glioma, H3 K27-altered',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'brainstem',
    description: 'A devastating pediatric glioma (formerly DIPG) that arises in midline structures — pons, thalamus, or spinal cord. Currently lacks effective treatment options.',
  },
  {
    id: 'glio-05',
    name: 'Pilocytic Astrocytoma',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebellum',
    description: 'The most common childhood brain tumor. Slow-growing, well-circumscribed, and often curable with surgery alone. Typically forms a cyst with a bright mural nodule.',
  },
  {
    id: 'glio-06',
    name: 'Ependymoma',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [2, 3],
    status: 'Variable',
    ageGroup: 'All ages',
    anatomicalOrigin: 'ventricles',
    description: 'Arises from ependymal lining of ventricles or spinal canal. Posterior fossa ependymomas in children are molecularly distinct from supratentorial forms in adults.',
  },
  {
    id: 'glio-07',
    name: 'Ganglioglioma',
    category: 'Gliomas/Neuroepithelial',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebrum',
    description: 'A mixed glioneuronal tumor most common in the temporal lobe. Strongly associated with chronic epilepsy. Surgical resection often cures both the tumor and seizures.',
  },

  /* ──────────────────────────────────────────
     2. Meningeal
     ────────────────────────────────────────── */
  {
    id: 'meni-01',
    name: 'Meningioma, Grade 1',
    category: 'Meningeal',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'The most common primary intracranial tumor (~37% of all). Arises from arachnoid cap cells. Slow-growing and usually curable with complete surgical removal.',
  },
  {
    id: 'meni-02',
    name: 'Meningioma, Grade 2 (Atypical)',
    category: 'Meningeal',
    gradeRange: [2],
    status: 'Variable',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'Intermediate-grade meningioma with elevated mitotic activity (≥4/10 HPF) or specific histologic features. Has a higher recurrence rate than Grade 1.',
  },
  {
    id: 'meni-03',
    name: 'Meningioma, Grade 3 (Anaplastic)',
    category: 'Meningeal',
    gradeRange: [3],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'Aggressive meningioma defined by high mitotic count (≥20/10 HPF), TERT promoter mutation, or CDKN2A/B homozygous deletion. Carries significant mortality risk.',
  },

  /* ──────────────────────────────────────────
     3. Cranial / Paraspinal Nerve
     ────────────────────────────────────────── */
  {
    id: 'nerv-01',
    name: 'Schwannoma (Vestibular)',
    category: 'Cranial/Paraspinal Nerve',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cranialNerves',
    description: 'Benign nerve sheath tumor arising from Schwann cells, most commonly on the vestibular branch of cranial nerve VIII. Causes unilateral hearing loss and tinnitus.',
  },
  {
    id: 'nerv-02',
    name: 'Neurofibroma',
    category: 'Cranial/Paraspinal Nerve',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'All ages',
    anatomicalOrigin: 'cranialNerves',
    description: 'Mixed nerve sheath tumor strongly associated with Neurofibromatosis Type 1 (NF1). Plexiform variants carry risk of malignant transformation.',
  },
  {
    id: 'nerv-03',
    name: 'Malignant Peripheral Nerve Sheath Tumor (MPNST)',
    category: 'Cranial/Paraspinal Nerve',
    gradeRange: [3, 4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cranialNerves',
    description: 'Aggressive soft-tissue sarcoma of nerve sheath origin. Roughly half arise in NF1 patients. Carries poor prognosis with high metastatic potential.',
  },

  /* ──────────────────────────────────────────
     4. Sellar / Pituitary
     ────────────────────────────────────────── */
  {
    id: 'sell-01',
    name: 'Pituitary Neuroendocrine Tumor (PitNET)',
    category: 'Sellar/Pituitary',
    gradeRange: [1, 2],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'sellar',
    description: 'Formerly known as pituitary adenoma. Most common sellar tumor, classified by transcription factors (PIT1, TPIT, SF1). Can cause hormonal excess or visual field defects.',
  },
  {
    id: 'sell-02',
    name: 'Craniopharyngioma (Adamantinomatous)',
    category: 'Sellar/Pituitary',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'sellar',
    description: 'Epithelial tumor from Rathke pouch remnants. Has characteristic calcifications and "machinery oil" cyst fluid. Driven by CTNNB1 mutations in children.',
  },
  {
    id: 'sell-03',
    name: 'Craniopharyngioma (Papillary)',
    category: 'Sellar/Pituitary',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'sellar',
    description: 'Adult-onset variant driven by BRAF V600E mutation (>95%). Solid, non-calcified, and often responds to targeted therapy.',
  },

  /* ──────────────────────────────────────────
     5. Pineal Region
     ────────────────────────────────────────── */
  {
    id: 'pine-01',
    name: 'Pineocytoma',
    category: 'Pineal Region',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'pineal',
    description: 'Slow-growing tumor of mature pineocytes. Well-circumscribed with excellent prognosis after surgical resection.',
  },
  {
    id: 'pine-02',
    name: 'Pineoblastoma',
    category: 'Pineal Region',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'Highly aggressive embryonal tumor of the pineal gland. Can disseminate via cerebrospinal fluid. Associated with RB1 loss (trilateral retinoblastoma).',
  },
  {
    id: 'pine-03',
    name: 'Papillary Tumor of the Pineal Region',
    category: 'Pineal Region',
    gradeRange: [2, 3],
    status: 'Variable',
    ageGroup: 'Adult',
    anatomicalOrigin: 'pineal',
    description: 'Rare neuroepithelial tumor arising near the posterior commissure. Shows variable biological behavior; recurrence is common after incomplete resection.',
  },

  /* ──────────────────────────────────────────
     6. Embryonal
     ────────────────────────────────────────── */
  {
    id: 'embr-01',
    name: 'Medulloblastoma, WNT-activated',
    category: 'Embryonal',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebellum',
    description: 'The molecular subgroup with the best prognosis (>95% long-term survival). Defined by CTNNB1 mutation and monosomy 6. Arises in the cerebellar vermis.',
  },
  {
    id: 'embr-02',
    name: 'Medulloblastoma, SHH-activated',
    category: 'Embryonal',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'All ages',
    anatomicalOrigin: 'cerebellum',
    description: 'Hedgehog pathway-driven subgroup. In infants it typically has excellent prognosis; TP53-mutant forms in older children carry very poor outcomes.',
  },
  {
    id: 'embr-03',
    name: 'Medulloblastoma, Group 3',
    category: 'Embryonal',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebellum',
    description: 'The most aggressive medulloblastoma subgroup. Associated with MYC amplification, high metastatic rate, and the worst overall survival.',
  },
  {
    id: 'embr-04',
    name: 'Medulloblastoma, Group 4',
    category: 'Embryonal',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebellum',
    description: 'The most common medulloblastoma subgroup (~35%). Often presents with isochromosome 17q. Intermediate prognosis between WNT and Group 3.',
  },
  {
    id: 'embr-05',
    name: 'Atypical Teratoid/Rhabdoid Tumor (AT/RT)',
    category: 'Embryonal',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'cerebellum',
    description: 'Highly aggressive infant tumor defined by loss of SMARCB1 (INI1) or SMARCA4. Can occur in posterior fossa or supratentorially. Median age at diagnosis is under 2 years.',
  },

  /* ──────────────────────────────────────────
     7. Germ Cell
     ────────────────────────────────────────── */
  {
    id: 'germ-01',
    name: 'Germinoma',
    category: 'Germ Cell',
    gradeRange: [3],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'The most common intracranial germ cell tumor. Highly radiosensitive with >90% cure rate. Shows strong male predilection in the pineal region.',
  },
  {
    id: 'germ-02',
    name: 'Teratoma (Mature)',
    category: 'Germ Cell',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'Contains mature tissues from all three germ layers (ectoderm, mesoderm, endoderm). AFP-negative. Curable with surgery when fully mature.',
  },
  {
    id: 'germ-03',
    name: 'Teratoma (Immature)',
    category: 'Germ Cell',
    gradeRange: [2, 3],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'Contains incompletely differentiated fetal-type tissues. Graded by amount of immature neuroectodermal elements. Requires chemotherapy.',
  },
  {
    id: 'germ-04',
    name: 'Yolk Sac Tumor',
    category: 'Germ Cell',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'Malignant non-germinomatous GCT producing alpha-fetoprotein (AFP). Aggressive behavior requiring intensive multimodal therapy.',
  },
  {
    id: 'germ-05',
    name: 'Choriocarcinoma',
    category: 'Germ Cell',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Pediatric',
    anatomicalOrigin: 'pineal',
    description: 'Extremely rare, highly malignant GCT producing beta-hCG. Characteristically hemorrhagic and carries the worst prognosis among intracranial GCTs.',
  },

  /* ──────────────────────────────────────────
     8. Mesenchymal / Vascular
     ────────────────────────────────────────── */
  {
    id: 'mese-01',
    name: 'Hemangioblastoma',
    category: 'Mesenchymal/Vascular',
    gradeRange: [1],
    status: 'Benign',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebellum',
    description: 'Highly vascular tumor classically found in the cerebellum. Associated with von Hippel-Lindau (VHL) disease. Often presents with erythrocytosis due to erythropoietin secretion.',
  },
  {
    id: 'mese-02',
    name: 'Solitary Fibrous Tumor',
    category: 'Mesenchymal/Vascular',
    gradeRange: [1, 2, 3],
    status: 'Variable',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'Formerly called hemangiopericytoma. Dural-based mesenchymal tumor defined by the NAB2::STAT6 fusion. Higher grades carry extracranial metastatic risk.',
  },
  {
    id: 'mese-03',
    name: 'Chordoma',
    category: 'Mesenchymal/Vascular',
    gradeRange: [2, 3],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'brainstem',
    description: 'Low-grade but locally destructive tumor arising from notochord remnants at the clivus or sacrum. Characterized by Brachyury (TBXT) expression. High recurrence rate.',
  },

  /* ──────────────────────────────────────────
     9. PCNSL (Primary CNS Lymphoma)
     ────────────────────────────────────────── */
  {
    id: 'pcnsl-01',
    name: 'Primary CNS Diffuse Large B-Cell Lymphoma',
    category: 'PCNSL',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebrum',
    description: 'Accounts for >90% of CNS lymphomas. Classically periventricular with "butterfly" pattern. Highly responsive to methotrexate-based chemotherapy. MYD88 L265P mutation found in >70%.',
  },
  {
    id: 'pcnsl-02',
    name: 'Lymphomatoid Granulomatosis',
    category: 'PCNSL',
    gradeRange: [3, 4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'cerebrum',
    description: 'EBV-driven angiocentric lymphoproliferative disorder. Primarily pulmonary but can involve the CNS. Ranges from indolent to aggressive behavior.',
  },

  /* ──────────────────────────────────────────
     10. Metastatic
     ────────────────────────────────────────── */
  {
    id: 'meta-01',
    name: 'Brain Metastases (Parenchymal)',
    category: 'Metastatic',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'multiple',
    description: 'The most common intracranial tumors overall. Most frequently originate from lung, breast, melanoma, renal cell, and colorectal primaries. Found at gray-white matter junctions.',
  },
  {
    id: 'meta-02',
    name: 'Leptomeningeal Carcinomatosis',
    category: 'Metastatic',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'Diffuse tumor seeding of the subarachnoid space and basilar cisterns. Associated with breast cancer, lung cancer, and melanoma. Presents with cranial neuropathies and hydrocephalus.',
  },
  {
    id: 'meta-03',
    name: 'Dural Metastases',
    category: 'Metastatic',
    gradeRange: [4],
    status: 'Malignant',
    ageGroup: 'Adult',
    anatomicalOrigin: 'meninges',
    description: 'Metastatic deposits involving the dura mater, often mimicking meningioma on imaging. Most common from breast and prostate carcinoma.',
  },
];
