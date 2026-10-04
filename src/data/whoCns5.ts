import { TumorCategory } from '@/types';

export const whoCns5Taxonomy: TumorCategory[] = [
  {
    id: "cat-1",
    name: "Gliomas, Glioneuronal Tumors, and Neuronal Tumors",
    description: "Primary brain tumors arising from glial or neuronal cells. This category is subdivided into adult-type diffuse, pediatric-type diffuse, circumscribed astrocytic, and glioneuronal/neuronal tumors.",
    primaryLocations: ["frontal", "parietal", "temporal", "cerebellum", "brainstem", "spinalCord"],
    icon: "🧠",
    subtypes: [
      {
        name: "Astrocytoma, IDH-mutant",
        grades: [2, 3, 4],
        molecularMarkers: ["IDH1/2 mutation", "ATRX loss", "TP53 mutation", "CDKN2A/B deletion (defines Grade 4)"],
        description: "Adult-type diffuse infiltrative glioma. Homozygous deletion of CDKN2A/B defines it as CNS WHO grade 4 regardless of histological features.",
        locations: ["frontal", "temporal", "parietal"],
      },
      {
        name: "Oligodendroglioma, IDH-mutant and 1p/19q-codeleted",
        grades: [2, 3],
        molecularMarkers: ["IDH1/2 mutation", "1p/19q co-deletion", "TERT promoter mutation"],
        description: "Adult-type diffuse glioma characterized by whole-arm 1p/19q co-deletion.",
        locations: ["frontal"],
      },
      {
        name: "Glioblastoma, IDH-wildtype",
        grades: [4],
        molecularMarkers: ["IDH-wildtype", "TERT promoter mutation", "EGFR amplification", "+7/-10 copy-number changes"],
        description: "The most aggressive adult diffuse glioma. Characterized by necrosis and microvascular proliferation.",
        locations: ["frontal", "temporal", "parietal"],
      },
      {
        name: "Diffuse midline glioma, H3 K27-altered",
        grades: [4],
        molecularMarkers: ["H3 K27M mutation", "Loss of H3K27me3"],
        description: "Aggressive pediatric-type high-grade glioma primarily affecting midline structures like the pons (DIPG).",
        locations: ["brainstem", "spinalCord"],
      },
      {
        name: "Pilocytic astrocytoma",
        grades: [1],
        molecularMarkers: ["KIAA1549::BRAF fusion"],
        description: "Circumscribed, slow-growing glioma most common in children. Often cystic with a mural nodule.",
        locations: ["cerebellum", "brainstem"],
      },
      {
        name: "Ganglioglioma",
        grades: [1],
        molecularMarkers: ["BRAF V600E mutation"],
        description: "Mixed glioneuronal tumor, highly epileptogenic, commonly found in the temporal lobe.",
        locations: ["temporal"],
      }
    ]
  },
  {
    id: "cat-2",
    name: "Choroid Plexus Tumors",
    description: "Primary intraventricular papillary neoplasms originating from the choroid plexus epithelium.",
    primaryLocations: ["ventricles"],
    icon: "🌊",
    subtypes: [
      {
        name: "Choroid plexus papilloma (CPP)",
        grades: [1],
        description: "Benign papillary tumor. Typically found in lateral ventricles in children and fourth ventricle in adults.",
        locations: ["ventricles"],
      },
      {
        name: "Atypical choroid plexus papilloma (aCPP)",
        grades: [2],
        description: "Displays elevated mitotic activity compared to standard CPP.",
        locations: ["ventricles"],
      },
      {
        name: "Choroid plexus carcinoma (CPC)",
        grades: [3],
        molecularMarkers: ["TP53 mutation (often Li-Fraumeni syndrome)"],
        description: "Malignant variant. Presents as a massive bulky lesion in infants.",
        locations: ["ventricles"],
      }
    ]
  },
  {
    id: "cat-3",
    name: "Embryonal Tumors",
    description: "Highly malignant, small round blue cell neoplasms of early childhood, predominantly located in the posterior fossa.",
    primaryLocations: ["cerebellum", "brainstem"],
    icon: "👶",
    subtypes: [
      {
        name: "Medulloblastoma, WNT-activated",
        grades: [4],
        molecularMarkers: ["CTNNB1 mutation", "Monosomy 6"],
        description: "Subgroup with the best prognosis (>95% cure).",
        locations: ["cerebellum", "brainstem"],
      },
      {
        name: "Medulloblastoma, SHH-activated",
        grades: [4],
        molecularMarkers: ["PTCH1, SUFU, SMO mutations", "TP53 (mutant or wildtype)"],
        description: "Can be TP53-mutant (poor prognosis) or wildtype. Desmoplastic/nodular histology is common.",
        locations: ["cerebellum"],
      },
      {
        name: "Atypical teratoid/rhabdoid tumor (AT/RT)",
        grades: [4],
        molecularMarkers: ["Loss of SMARCB1 (INI1) or SMARCA4"],
        description: "Highly aggressive infantile tumor. Can occur in posterior fossa or supratentorially.",
        locations: ["cerebellum", "frontal", "temporal"],
      }
    ]
  },
  {
    id: "cat-4",
    name: "Pineal Tumors",
    description: "Neoplasms arising in the pineal parenchymal organ or specialized local neuroepithelium.",
    primaryLocations: ["pineal"],
    icon: "👁️",
    subtypes: [
      {
        name: "Pineocytoma",
        grades: [1],
        description: "Benign, mature pineocytic differentiation.",
        locations: ["pineal"],
      },
      {
        name: "Pineoblastoma",
        grades: [4],
        molecularMarkers: ["RB1 loss", "DICER1 mutations"],
        description: "Aggressive tumor invading the posterior third ventricle and tectum.",
        locations: ["pineal"],
      },
      {
        name: "Papillary tumor of the pineal region (PTPR)",
        grades: [2, 3],
        molecularMarkers: ["PTEN mutations"],
        description: "Originates near the posterior commissure.",
        locations: ["pineal"],
      }
    ]
  },
  {
    id: "cat-5",
    name: "Cranial and Paraspinal Nerve Tumors",
    description: "Nerve sheath neoplasms and related tumors, including paragangliomas.",
    primaryLocations: ["cranialNerves", "spinalCord"],
    icon: "⚡",
    subtypes: [
      {
        name: "Schwannoma",
        grades: [1],
        molecularMarkers: ["NF2 inactivation (Chr 22q loss)"],
        description: "Benign nerve sheath tumor. Most common is vestibular schwannoma (CN VIII) at the cerebellopontine angle.",
        locations: ["cranialNerves", "spinalCord"],
      },
      {
        name: "Neurofibroma",
        grades: [1],
        molecularMarkers: ["NF1 inactivation"],
        description: "Associated with Neurofibromatosis Type 1. Affects cranial, spinal, and peripheral nerve roots.",
        locations: ["cranialNerves", "spinalCord"],
      },
      {
        name: "Malignant peripheral nerve sheath tumor (MPNST)",
        grades: [2, 3, 4],
        molecularMarkers: ["NF1 loss", "CDKN2A/B loss", "PRC2 inactivation"],
        description: "Aggressive malignancy of major nerve trunks and plexuses.",
        locations: ["spinalCord"],
      }
    ]
  },
  {
    id: "cat-6",
    name: "Meningiomas",
    description: "Now designated as a single biological entity graded 1 to 3 based on histopathology and specific molecular criteria.",
    primaryLocations: ["meninges"],
    icon: "🛡️",
    subtypes: [
      {
        name: "Grade 1 Meningioma",
        grades: [1],
        molecularMarkers: ["KLF4/TRAF7 (secretory subtype)"],
        description: "Accounts for ~80%. Subtypes include Meningothelial, Fibrous, Transitional, Psammomatous.",
        locations: ["meninges"],
      },
      {
        name: "Grade 2 Meningioma (Atypical)",
        grades: [2],
        description: "Defined by >=4 mitoses/10 HPF or 3/5 specific histologic criteria.",
        locations: ["meninges"],
      },
      {
        name: "Grade 3 Meningioma (Anaplastic)",
        grades: [3],
        molecularMarkers: ["TERT promoter mutation", "Homozygous CDKN2A/B deletion"],
        description: "Sui Generis Grade 3 regardless of histology if TERT or CDKN2A/B altered. Or based on >=20 mitoses.",
        locations: ["meninges"],
      }
    ]
  },
  {
    id: "cat-7",
    name: "Mesenchymal, Non-Meningothelial Tumors",
    description: "Aligned with soft tissue/bone classification; includes vascular, fibroblastic, myogenic, and chondro-osseous entities.",
    primaryLocations: ["meninges", "cerebellum"],
    icon: "🦴",
    subtypes: [
      {
        name: "Solitary fibrous tumor (SFT)",
        grades: [1, 2, 3],
        molecularMarkers: ["NAB2::STAT6 gene fusion"],
        description: "Formerly hemangiopericytoma. Dural-based, mimicking meningioma.",
        locations: ["meninges"],
      },
      {
        name: "Hemangioblastoma",
        grades: [1],
        molecularMarkers: ["VHL mutation"],
        description: "Highly vascular tumor, classically in the cerebellum.",
        locations: ["cerebellum", "spinalCord"],
      },
      {
        name: "Chordoma",
        grades: [2, 3],
        molecularMarkers: ["Brachyury (TBXT) expression"],
        description: "Arises from notochord remnants, classically at the clivus / skull base.",
        locations: ["meninges"],
      }
    ]
  },
  {
    id: "cat-8",
    name: "Melanocytic Tumors",
    description: "Primary neoplasms arising from leptomeningeal melanocytes.",
    primaryLocations: ["meninges"],
    icon: "🌑",
    subtypes: [
      {
        name: "Meningeal melanocytoma",
        grades: [1],
        molecularMarkers: ["GNAQ or GNA11 mutations"],
        description: "Benign leptomeningeal tumor.",
        locations: ["meninges"],
      },
      {
        name: "Meningeal melanoma",
        grades: [3],
        molecularMarkers: ["GNAQ, GNA11, PLCB4"],
        description: "Malignant leptomeningeal tumor.",
        locations: ["meninges"],
      }
    ]
  },
  {
    id: "cat-9",
    name: "Haematolymphoid Tumors",
    description: "Divided into Lymphomas and Histiocytic Neoplasms involving the CNS.",
    primaryLocations: ["ventricles", "meninges"],
    icon: "🩸",
    subtypes: [
      {
        name: "Primary CNS diffuse large B-cell lymphoma (PCNSL)",
        grades: [4],
        molecularMarkers: ["MYD88 L265P mutation (>70%)", "CD79B mutation"],
        description: "Malignant haematolymphoid (>90% of CNS lymphomas). Classically periventricular.",
        locations: ["ventricles"],
      },
      {
        name: "Langerhans cell histiocytosis (LCH)",
        grades: [1],
        molecularMarkers: ["BRAF V600E (>50%)"],
        description: "Clonal histiocytic disorder affecting the hypothalamic-pituitary axis.",
        locations: ["sellar"],
      }
    ]
  },
  {
    id: "cat-10",
    name: "Germ Cell Tumors",
    description: "Identical to gonadal GCTs; occur along the midline neuroaxis in children and young adults.",
    primaryLocations: ["pineal", "sellar"],
    icon: "🌱",
    subtypes: [
      {
        name: "Germinoma",
        grades: [3],
        molecularMarkers: ["C-KIT (CD117) positive"],
        description: "Highly radiosensitive. Strong male predilection in pineal region, female in suprasellar.",
        locations: ["pineal", "sellar"],
      },
      {
        name: "Teratoma (Mature/Immature)",
        grades: [1, 2, 3],
        description: "Multineage differentiation. AFP negative.",
        locations: ["pineal", "sellar"],
      },
      {
        name: "Yolk sac tumor",
        grades: [4],
        molecularMarkers: ["Elevated AFP"],
        description: "Malignant non-germinomatous GCT.",
        locations: ["pineal", "sellar"],
      },
      {
        name: "Choriocarcinoma",
        grades: [4],
        molecularMarkers: ["Elevated beta-hCG"],
        description: "Highly malignant, hemorrhagic NGGCT.",
        locations: ["pineal"],
      }
    ]
  },
  {
    id: "cat-11",
    name: "Tumors of the Sellar Region",
    description: "Tumors arising in the pituitary fossa, neurohypophysis, infundibulum, and Rathke's pouch.",
    primaryLocations: ["sellar"],
    icon: "⚗️",
    subtypes: [
      {
        name: "Pituitary neuroendocrine tumor (PitNET)",
        grades: [1, 2],
        molecularMarkers: ["GNAS, PRKAR1A, AIP"],
        description: "Also known as pituitary adenoma. Classified by transcription factors (PIT1, TPIT, SF1).",
        locations: ["sellar"],
      },
      {
        name: "Adamantinomatous craniopharyngioma",
        grades: [1],
        molecularMarkers: ["CTNNB1 (beta-catenin) mutation"],
        description: "Classically pediatric. Machinery oil cyst fluid.",
        locations: ["sellar"],
      },
      {
        name: "Papillary craniopharyngioma",
        grades: [1],
        molecularMarkers: ["BRAF V600E mutation (>95%)"],
        description: "Almost exclusively found in adults.",
        locations: ["sellar"],
      }
    ]
  },
  {
    id: "cat-12",
    name: "Metastases to the CNS",
    description: "Secondary neoplasms reaching the CNS hematogenously or via direct contiguity.",
    primaryLocations: ["frontal", "parietal", "temporal", "occipital", "cerebellum", "meninges"],
    icon: "🎯",
    subtypes: [
      {
        name: "Intraparenchymal Brain Metastases",
        grades: [4],
        description: "Most common from lung, breast, melanoma, RCC. Typically found at gray-white matter junctions.",
        locations: ["frontal", "parietal", "temporal", "occipital", "cerebellum"],
      },
      {
        name: "Leptomeningeal Carcinomatosis",
        grades: [4],
        description: "Tumor seeding in the subarachnoid space and basilar cisterns.",
        locations: ["meninges", "spinalCord"],
      }
    ]
  }
];
