export const levels = [
  {
    key: 'raw',
    label: 'Raw detector',
    description: 'sensor hits, voxels, photons, calorimeter cells',
    color: '#67e8f9',
    icon: 'i-carbon:data-vis-1',
    groups: [
      'detector'
    ]
  },
  {
    key: 'jet',
    label: 'Constituent / jet',
    description: 'particle-flow objects, tracks, clustered jet constituents',
    color: '#c4b5fd',
    icon: 'i-carbon:chart-bubble-packed',
    groups: [
      'detector'
    ]
  },
  {
    key: 'event',
    label: 'Event / analysis',
    description: 'jets, leptons, MET, event objects, theory-level observables',
    color: '#6ee7b7',
    icon: 'i-carbon:network-4',
    groups: [
      'event'
    ]
  },
  {
    key: 'cross',
    label: 'Cross-domain transfer',
    description: 'jet-pretrained representations reused beyond jet tasks',
    color: '#fcd34d',
    icon: 'i-carbon:earth-filled',
    groups: [
      'event'
    ]
  }
]

export const benchmarkSemantics = {
  ood: 'Benchmark distribution/process/detector/domain differs from the pretraining source; ordinary train/validation/test splits are not OOD.',
  realData: 'Benchmark uses actual experimental or observational data, not only public simulated samples.'
}

export const models = [
  {
    id: 'panda',
    name: 'Panda',
    initials: 'PA',
    level: 'raw',
    color: '#67e8f9',
    rarity: 'rare',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Self-distilled LArTPC point-cloud representations.',
    arch: 'Point Transformer V3',
    title: 'Panda: Self-distillation of Reusable Sensor-level Representations for High Energy Physics',
    classification: 'Detector-level foundation-style SSL; supported within one LArTPC domain.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Supported within domain; no cross-experiment generalization test.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'detector FM candidate'
      ],
      architecture: [
        'Point Transformer V3',
        'teacher-student SSL'
      ],
      domain: [
        'LArTPC',
        'PILArNet-M',
        'panoptic segmentation'
      ],
      evidence: [
        'label efficiency',
        'public data',
        'within-domain downstream reuse'
      ]
    },
    dataset: {
      type: 'custom simulation / LArTPC',
      generator: 'PILArNet-M simulated charge-deposition events with detector-like preprocessing/deconvolution',
      size: '1.2M events total; 1M pretraining events',
      public: 'Yes: code/data reported available',
      link: 'https://github.com/DeepLearnPhysics/Panda',
      multipleDatasets: 'No; one LArTPC corpus',
      mixedSource: 'No mixed-source or cross-domain pretraining'
    },
    representation: {
      inputObjects: 'Voxelized 3D charge-deposition point cloud with (x, y, z, q)',
      pipeline: [
        'LArTPC charge cloud',
        '0.13 MeV threshold + 3 mm voxels',
        'sparse Point Transformer tokens'
      ],
      variableLength: 'Handled by sparse point-cloud processing rather than fixed image padding',
      paddingMasking: 'Global/local/masked crops are used for SSL; no fixed detector-image padding',
      preprocessing: '3 mm voxel grid; low-charge points removed'
    },
    backbone: {
      architectureType: 'Sparse hierarchical Point Transformer V3 encoder',
      baseModel: 'Self-trained on PILArNet-M; no external pretrained base',
      structure: 'Encoder plus optional decoder for segmentation heads',
      objective: 'DINO/iBOT/Sonata-style prototype self-distillation with student and EMA teacher',
      parameters: '~91M encoder parameters; optional ~16M decoder',
      trainableFrozen: 'Pretrained encoder adapted with supervised segmentation heads; freeze policy not central to claim',
      fineTuning: 'Semantic and panoptic segmentation fine-tuning on labeled PILArNet-M subsets'
    },
    summary: 'Panda learns reusable sparse 3D LArTPC charge-cloud representations with self-distillation, then reuses them for semantic and panoptic reconstruction. The evidence is strong for label efficiency inside one simulated detector regime.',
    highlights: [
      'Detector-native SSL on voxelized LArTPC charge clouds.',
      'Large sparse PTv3 encoder with student/EMA-teacher pretraining.',
      'Improves low-label semantic and panoptic segmentation.',
      'Good foundation-style example, but not detector-agnostic.'
    ],
    benchmarks: [
      {
        task: 'Semantic segmentation',
        dataset: 'PILArNet-M',
        metrics: 'mean F1 across label fractions; PTK+FTK reports 85.2/93.7/96.4/97.7/98.8 for 0.01/0.1/1/10/100% labels',
        ood: 'No',
        fmEvidence: 'Moderate: reusable within same detector corpus',
        realData: 'No'
      },
      {
        task: 'Particle and interaction panoptic segmentation',
        dataset: 'PILArNet-M',
        metrics: 'PQ, ARI, purity, efficiency',
        ood: 'No',
        fmEvidence: 'Moderate: multi-task reconstruction reuse',
        realData: 'No'
      },
      {
        task: 'Low-label and convergence scaling',
        dataset: 'PILArNet-M label fractions 0.1%-1%',
        metrics: 'F1/PQ versus label fraction, convergence speed, and event-sample efficiency',
        ood: 'No',
        fmEvidence: 'Strong within-domain label-efficiency evidence',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'A100 40GB GPUs',
      gpu: '4 A100 for pretraining; 4 A100 semantic and 8 A100 panoptic fine-tuning',
      trainingTime: '10M event-samples for pretraining; 20M event-samples for fine-tuning',
      batchSize: '48',
      optimizer: 'AdamW, betas 0.9/0.999, base LR 2.6e-3, 5% warmup + cosine decay, weight decay 0.04->0.20 during pretraining',
      distributedStrategy: 'data-parallel multi-A100 training; exact framework not specified'
    }
  },
  {
    id: 'neutrino-ssl',
    name: 'Neutrino SSL transformers',
    initials: 'νT',
    level: 'raw',
    color: '#22d3ee',
    rarity: 'rare',
    badges: [
      'D',
      'SSL'
    ],
    short: 'FASERCal MAE+Rel pretraining with transfer tests.',
    arch: 'sparse ViT + Perceiver-IO',
    title: 'Towards foundation-style models for energy-frontier heterogeneous neutrino detectors via self-supervised pre-training',
    classification: 'Detector foundation-style SSL with cross-dataset downstream transfer.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Multi-task and cross-dataset transfer, but source pretraining is one simulated detector concept.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'SSL'
      ],
      architecture: [
        'Sparse ViT',
        'MAE+Rel',
        'Perceiver fusion'
      ],
      domain: [
        'neutrino',
        'FASERCal',
        'heterogeneous detector'
      ],
      evidence: [
        'transfer benchmark',
        'OOD detector datasets',
        'Geant4'
      ]
    },
    dataset: {
      type: 'custom simulation / Geant4-full detector concept',
      generator: 'GENIE v3.04.00 neutrino interactions; PYTHIA8 tau/charm decays; Geant4 detector propagation',
      size: '1,118,058 nominal interactions; 108,317 enriched nu_tau CC events; 85/5/10 split',
      public: 'Code/framework public; generated FASERCal training dataset link not specified',
      link: 'https://github.com/saulam/faserDL; https://github.com/rubbiaa/FASER',
      multipleDatasets: 'Yes for evaluation: plastic scintillator benchmark and PILArNet 768^3 release',
      mixedSource: 'Pretraining on FASERCal only; cross-domain evidence is downstream transfer'
    },
    representation: {
      inputObjects: 'Sparse detector hits from 3DCal, AHCAL, ECAL, and muon-system modules',
      pipeline: [
        'sparse voxel/module hits',
        'log charge + occupied patch selection + 75% MAE masking',
        'module-aware ViT tokens fused by Perceiver'
      ],
      variableLength: 'Sparse occupied patches and detector-module tokens are fused with Perceiver-style processing',
      paddingMasking: '75% masked autoencoding; sparse patches avoid dense-volume padding',
      preprocessing: 'Log charge; ECAL as compact 5x5 matrix tokens; muon planes/tracks as separate module tokens'
    },
    backbone: {
      architectureType: 'Sparse ViT-like encoder plus Perceiver-IO fusion',
      baseModel: 'Self-trained on FASERCal simulation',
      structure: 'SpConv patch embeddings; module-aware attention; decoder dimension 256 with 8 heads',
      objective: 'Stage 1 MAE; Stage 2 MAE plus relational ghost, hierarchy, and particle-category objectives',
      parameters: 'dimension 384, 12 heads, MLP ratio 4; total parameter count not specified',
      trainableFrozen: 'Fine-tuning/scratch comparisons reported; exact freeze policy varies by task',
      fineTuning: 'Classification/regression heads fine-tuned for neutrino flavor, charm, energy, and transfer datasets'
    },
    summary: 'This FASERCal model tests whether sparse self-supervised detector tokens can support heterogeneous neutrino reconstruction. It is best framed as a foundation-style detector model with meaningful but source-domain-limited pretraining.',
    highlights: [
      'Combines masked reconstruction with detector-aware relational SSL.',
      'Covers sparse 3D calorimetry, compact ECAL tokens, and muon-system inputs.',
      'Shows low-label gains and transfer to other detector-like benchmarks.',
      'Pretraining corpus is FASERCal simulation, not a mixed detector corpus.'
    ],
    benchmarks: [
      {
        task: 'Six-way neutrino flavor classification',
        dataset: 'FASERCal simulated interactions',
        metrics: 'AUROC scratch -> MAE+Rel: nu_e CC 0.968->0.985, nu_mu CC 0.909->0.958, NC 0.885->0.947, nu_tau had 0.902->0.944, nu_tau e 0.892->0.921, nu_tau mu 0.801->0.835',
        ood: 'No',
        fmEvidence: 'Moderate: source-domain downstream reuse',
        realData: 'No'
      },
      {
        task: 'Charm category classification',
        dataset: 'FASERCal charm samples',
        metrics: 'charm->mu AUROC 0.832->0.891 and FOM 6.97->7.90; charm->had AUROC 0.792->0.877 and FOM 27.10->37.74; charm->e AUROC 0.746->0.809 and FOM 1.75->2.20',
        ood: 'No',
        fmEvidence: 'Moderate: additional downstream task',
        realData: 'No'
      },
      {
        task: 'Kinematic regression',
        dataset: 'FASERCal simulated events',
        metrics: 'residuals and robust spread for energy, momentum, missing pT, dPV',
        ood: 'No',
        fmEvidence: 'Moderate: multi-task reuse',
        realData: 'No'
      },
      {
        task: 'Detector-style transfer',
        dataset: 'public plastic scintillator PID and public PILArNet classification',
        metrics: 'accuracy/AUROC gains over scratch',
        ood: 'Yes: different detector-style datasets',
        fmEvidence: 'Strongest evidence for foundation-style claim',
        realData: 'No'
      },
      {
        task: 'Robustness stress tests',
        dataset: 'FASERCal energy-scale and subsystem ablations',
        metrics: 'task performance under perturbation/ablation',
        ood: 'Partial: detector perturbation/subsystem ablation',
        fmEvidence: 'Supporting robustness evidence',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'GH200 and H100 GPUs',
      gpu: '8 GH200 for pretraining; 1 H100 for fine-tuning/scratch',
      trainingTime: '400 MAE epochs + 100 MAE+Rel epochs',
      batchSize: '512/GPU pretraining; 1024 fine-tuning',
      optimizer: 'Pretraining AdamW LR 1e-4, betas 0.9/0.95, weight decay 0.05, 40 warmup epochs + cosine; fine-tuning AdamW LR 5e-4 pretrained or 1e-3 scratch',
      distributedStrategy: '2 GH200 nodes for pretraining; single H100 fine-tuning/scratch'
    }
  },
  {
    id: 'calo-moe',
    name: 'Calorimeter FM',
    initials: 'Ca',
    level: 'raw',
    color: '#38bdf8',
    rarity: 'epic',
    badges: [
      'G'
    ],
    short: 'PEFT transfer for generative calorimeter showers.',
    arch: 'autoregressive MoE',
    title: 'Generalizable Foundation Models for Calorimetry via Mixtures-of-Experts and Parameter Efficient Fine Tuning',
    classification: 'Generative fast-simulation foundation-style model; not a regression downstream model.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Supported for calorimeter fast-simulation transfer across materials and particle species.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'fast simulation'
      ],
      architecture: [
        'autoregressive transformer',
        'MoE',
        'LoRA',
        'PEFT'
      ],
      domain: [
        'calorimeter',
        'Geant4 showers',
        'fast simulation'
      ],
      evidence: [
        'generative validation',
        'material OOD',
        'particle-species OOD'
      ]
    },
    dataset: {
      type: 'Geant4/full simulation / calorimeter',
      generator: 'ILD-like Si-W ECAL Geant4 electromagnetic showers with W, Ta, and Pb absorbers',
      size: '~950k samples per particle/material; 760k train, 95k validation, 95k test',
      public: 'Code public; datasets reproducible, some material details by request',
      link: 'https://github.com/wmdataphys/FM4CAL; https://github.com/FLC-QU-hep/getting_high',
      multipleDatasets: 'Yes: photons/electrons across multiple absorber materials',
      mixedSource: 'Cross-material and photon-to-electron transfer; no real-detector data'
    },
    representation: {
      inputObjects: 'Raw 30x30x30 calorimeter energy-deposit voxel grids',
      pipeline: [
        'Geant4 shower voxels',
        'nonzero cells sorted by descending energy',
        'spatial cell tokens + discretized energy tokens with energy conditioning'
      ],
      variableLength: 'Sparse nonzero cells serialized with SOS/EOS sequence tokens',
      paddingMasking: 'Autoregressive sequence modeling with start/end tokens; padding not emphasized',
      preprocessing: 'Cell position discretized over 27k cells; energy discretized into ~25k tokens; incident energy prepended'
    },
    backbone: {
      architectureType: 'Dual-stream autoregressive transformer',
      baseModel: 'Self-trained calorimeter shower model',
      structure: 'Energy tokens query spatial tokens via cross-attention, followed by self-attention',
      objective: 'Next-token shower generation conditioned on incident energy/material/species',
      parameters: 'embedding dimension 256; full parameter count not specified',
      trainableFrozen: 'Backbone/vocabulary frozen for new material experts; LoRA trains attention projections for species transfer',
      fineTuning: 'New material expert training; photon-to-electron LoRA plus particle-specific heads/vocabulary'
    },
    summary: 'Calo-MoE is a generative calorimeter fast-simulation model, with evidence centered on shower fidelity and parameter-efficient transfer. It should not be described as a downstream regression benchmark.',
    highlights: [
      'Adapts shower generation across absorber materials with new experts.',
      'Uses LoRA and particle-specific heads for photon-to-electron transfer.',
      'Benchmarks are Geant4 shower observables and generation speed.',
      'Strong PEFT story, narrower than an analysis-wide detector FM.'
    ],
    benchmarks: [
      {
        task: 'Generative shower validation',
        dataset: 'Geant4 photon/electron ECAL showers',
        metrics: 'visible cell energy, total energy, hit multiplicity, longitudinal center-of-gravity, layer energy, radial profile',
        ood: 'No',
        fmEvidence: 'Moderate: validates reusable shower generator',
        realData: 'No'
      },
      {
        task: 'Material transfer',
        dataset: 'Pb/Ta photon and electron showers with reduced and full samples',
        metrics: 'shower-observable agreement against Geant4 across absorber-material shifts',
        ood: 'Yes: absorber-material shift',
        fmEvidence: 'Strong for fast-simulation PEFT/material transfer',
        realData: 'No'
      },
      {
        task: 'Particle-species transfer',
        dataset: 'W electron showers from photon-pretrained model',
        metrics: 'shower-observable agreement',
        ood: 'Yes: photon-to-electron particle-species shift',
        fmEvidence: 'Strong for PEFT reuse',
        realData: 'No'
      },
      {
        task: 'Generation speed',
        dataset: 'tested calorimeter shower setup',
        metrics: '~10.46 ms/event on A100; ~392x faster than Geant4 CPU',
        ood: 'No',
        fmEvidence: 'Supporting simulation utility, not FM by itself',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'A100 for reported inference',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'Not specified in the paper/project.',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'fm4dirc',
    name: 'FM4DIRC',
    initials: 'DČ',
    level: 'raw',
    color: '#06b6d4',
    rarity: 'epic',
    badges: [
      'G',
      'D'
    ],
    short: 'Mixed discrete/continuous DIRC readout sequences.',
    arch: 'next-token MoE',
    title: 'Towards Foundation Models for Experimental Readout Systems Combining Discrete and Continuous Data',
    classification: 'Readout-level generative foundation-style model with same-detector PID/filtering transfer.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Multi-task reuse in one readout system; no broader detector transfer.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'readout model'
      ],
      architecture: [
        'next-token transformer',
        'CMHCA',
        'MoE'
      ],
      domain: [
        'DIRC',
        'Cherenkov',
        'readout'
      ],
      evidence: [
        'generative validation',
        'PID',
        'noise filtering'
      ]
    },
    dataset: {
      type: 'custom simulation / detector readout',
      generator: 'hpDIRC Cherenkov photon hit patterns compared with Geant4/FastDIRC-style simulation references',
      size: '~5M pion tracks and ~5M kaon tracks; 1 < |p| < 10 GeV/c, 25 deg < theta < 160 deg',
      public: 'Code public; official dataset link not specified',
      link: 'https://github.com/wmdataphys/FM4DIRC',
      multipleDatasets: 'Pion and kaon conditional samples plus noise-injection studies',
      mixedSource: 'No broad cross-experiment transfer; same-readout task transfer'
    },
    representation: {
      inputObjects: 'Variable-length Cherenkov photon hit sequences with pixel ID and arrival time',
      pipeline: [
        'photon pixel/time hits',
        'pixel and time bin vocabularies + kinematic conditioning',
        'autoregressive readout token sequence'
      ],
      variableLength: 'Sequences capped around 250 hits with SOS/EOS tokens',
      paddingMasking: 'Autoregressive next-token masking; explicit padding strategy not central',
      preprocessing: 'PMT pixel vocabulary size 6144; time binned to one quarter detector timing resolution, vocabulary size 5920'
    },
    backbone: {
      architectureType: 'Next-token mixed discrete/continuous transformer',
      baseModel: 'Self-trained on simulated hpDIRC readout',
      structure: 'Independent spatial/time embeddings; time queries spatial keys/values; self-attention stack',
      objective: 'Autoregressive readout generation; downstream PID and token-level noise filtering',
      parameters: 'embedding dimension 256, 8 heads; total count not specified',
      trainableFrozen: 'Generative pretraining fine-tuned for sequence-level and token-level heads',
      fineTuning: 'CLS/BCE PID head and focal-loss noise-filtering head'
    },
    summary: 'FM4DIRC extends foundation-style modeling to detector readout streams, where discrete sensor IDs and continuous timing must be modeled together. Evidence is useful but confined to one Cherenkov readout system.',
    highlights: [
      'Combines pixel-ID tokens, time tokens, and continuous track conditioning.',
      'Generates realistic readout sequences and supports PID/noise tasks.',
      'Fine-tuning benefit is task-dependent, especially for filtering.',
      'A rare readout-level example outside calorimetry and tracking.'
    ],
    benchmarks: [
      {
        task: 'Generative closure',
        dataset: 'simulated hpDIRC pion/kaon tracks',
        metrics: 'x/y/time distributions, photon yield, KDE/FastDIRC classifier metrics',
        ood: 'Partial: kinematic scans within same detector/readout',
        fmEvidence: 'Moderate: validates readout generator',
        realData: 'No'
      },
      {
        task: 'Pion/kaon PID',
        dataset: 'hpDIRC tracks at 3 and 6 GeV/c over theta',
        metrics: 'accuracy and separation power',
        ood: 'No',
        fmEvidence: 'Moderate: same-system downstream reuse',
        realData: 'No'
      },
      {
        task: 'Noise filtering',
        dataset: 'PMT dark noise at 100 kHz/cm2 with ~8-10% noise',
        metrics: 'AP and AUC',
        ood: 'Partial: injected dark-noise contamination',
        fmEvidence: 'Partial: downstream reuse with caveat',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'Not specified in the paper/project.',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'fm4npp',
    name: 'FM4NPP',
    initials: 'FN',
    level: 'raw',
    color: '#22d3ee',
    rarity: 'legendary',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Scaling state-space FM on sparse TPC spacepoints.',
    arch: 'Mamba2 SSM',
    title: 'FM4NPP: A Scaling Foundation Model for Nuclear and Particle Physics',
    classification: 'Detector-domain FM with frozen-adapter transfer across TPC reconstruction tasks.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Strong within-detector multi-task reuse; not cross-experiment.'
    },
    tags: {
      modelType: [
        'foundation model',
        'detector reconstruction'
      ],
      architecture: [
        'Mamba2',
        'state-space model',
        'kNN SSL'
      ],
      domain: [
        'TPC',
        'sPHENIX',
        'track finding'
      ],
      evidence: [
        'scaling',
        'frozen adapters',
        'within-detector multi-task reuse'
      ]
    },
    dataset: {
      type: 'Geant4/full simulation / sPHENIX TPC open benchmark',
      generator: 'PYTHIA 8.307 Detroit tune plus full Geant4 sPHENIX geometry, field, electronics, noise, gain, and zero suppression',
      size: '>11M p+p events; mean ~856 spacepoints and 15.6 tracks/event',
      public: 'Paper calls it an open benchmark; direct official dataset URL not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'One main sPHENIX TPC corpus with downstream task labels',
      mixedSource: 'No cross-experiment pretraining; multi-task downstream within same detector'
    },
    representation: {
      inputObjects: 'Variable-size set of reconstructed TPC spacepoints with E, x, y, z or E, r, phi, eta',
      pipeline: [
        'TPC spacepoint cloud',
        'min-max normalized cylindrical features + NeRF-like position features',
        'hierarchical raster-scan Mamba sequence'
      ],
      variableLength: 'Serialized sparse event sequence over r/eta/phi bins rather than dense raster image',
      paddingMasking: 'Sequence batching details not specified; downstream adapters handle variable event size',
      preprocessing: 'Min-max normalization over eta, phi, and radius ranges'
    },
    backbone: {
      architectureType: 'Mamba2 state-space sequence model',
      baseModel: 'Self-trained on sPHENIX TPC simulation',
      structure: 'Six sizes from 0.34M to 188M parameters; frozen FM plus task adapters',
      objective: 'k-next-nearest-neighbor prediction, k=10, with MSE and event-difficulty reweighting',
      parameters: '0.34M to 188M',
      trainableFrozen: 'Pretrained backbone frozen for downstream adapters',
      fineTuning: 'MaskFormer/Mask2Former-like track adapter, PID adapter, and noise-tagging adapter'
    },
    summary: 'FM4NPP is a detector-domain scaling study for sparse TPC spacepoints using Mamba2 rather than a transformer. It demonstrates strong same-detector reuse through frozen adapters for tracking, PID, and noise tagging.',
    highlights: [
      'Uses a state-space backbone, widening the FM architecture menu.',
      'Scales up to 188M parameters on full-simulation TPC spacepoints.',
      'Frozen adapters improve track finding, PID, and noise tagging.',
      'Evidence is within sPHENIX TPC, not cross-experiment.'
    ],
    benchmarks: [
      {
        task: 'Model/data/compute scaling',
        dataset: 'sPHENIX TPC p+p full simulation',
        metrics: 'six model sizes 0.34M/1.3M/5.3M/21M/84M/188M trained with 1/1/4/8/24/64 GPUs for roughly 10/12/20/32/50/72 hours',
        ood: 'No',
        fmEvidence: 'Supporting scaling evidence',
        realData: 'No'
      },
      {
        task: 'Track finding and pipeline comparison',
        dataset: 'sPHENIX TPC downstream labels',
        metrics: 'main Table 2: FM4NPP(m6) ARI 0.9448, efficiency 96.08%, purity 93.08%; official-pipeline high-pT long-track efficiency 94.6% vs model 99.6%',
        ood: 'No',
        fmEvidence: 'Strong within-detector transfer',
        realData: 'No'
      },
      {
        task: 'PID',
        dataset: 'sPHENIX TPC labels',
        metrics: 'main Table 2 reports accuracy 0.9039, macro recall 0.7652, precision 0.8782 for FM4NPP(m6)',
        ood: 'No',
        fmEvidence: 'Moderate: additional downstream task',
        realData: 'No'
      },
      {
        task: 'Noise tagging',
        dataset: 'sPHENIX TPC labels',
        metrics: 'main Table 2 reports accuracy 0.9713, macro recall 0.9367, precision 0.9190 for FM4NPP(m6)',
        ood: 'No',
        fmEvidence: 'Moderate: additional downstream task',
        realData: 'No'
      },
      {
        task: 'Low-label adaptation',
        dataset: 'sPHENIX TPC label subsets',
        metrics: 'task metrics versus label fraction',
        ood: 'No',
        fmEvidence: 'Strong data-efficiency support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'H100/A100 80GB GPUs',
      gpu: 'largest model uses 64 GPUs',
      trainingTime: '~72 hours for largest model',
      batchSize: '256',
      optimizer: 'AdamW, LR 2e-4, weight decay 0.01, 10k warmup, cosine decay, gradient clip 0.1',
      distributedStrategy: '1-64 H100/A100 80GB GPUs depending on model size'
    }
  },
  {
    id: 'vlm-neutrino',
    name: 'Neutrino VLM',
    initials: 'VL',
    level: 'raw',
    color: '#7dd3fc',
    rarity: 'uncommon',
    badges: [
      'D',
      'VLM'
    ],
    short: 'General VLM fine-tuned on LArTPC event-display pixel maps.',
    arch: 'Llama-3.2 Vision QLoRA',
    title: 'Adapting Vision-Language Models for Neutrino Event Classification in High-Energy Physics',
    classification: 'General AI-to-HEP transfer study; not a HEP-native detector-pretrained FM.',
    fmEvidence: {
      level: 'Partial',
      note: 'Transfer from a general VLM is supported; HEP-native foundation-model evidence is not.'
    },
    tags: {
      modelType: [
        'transfer study',
        'VLM adaptation'
      ],
      architecture: [
        'Llama-3.2 Vision',
        'QLoRA',
        '4-bit'
      ],
      domain: [
        'neutrino',
        'LArTPC event displays',
        'pixel maps'
      ],
      evidence: [
        'resolution OOD',
        'prompted classification',
        'general VLM transfer'
      ]
    },
    dataset: {
      type: 'custom simulation / event-display images',
      generator: 'GENIE v3.0.6 neutrino interactions up to 10 GeV; Geant4 v11.2.0 detector deposition; drift/readout smearing into displays',
      size: '~190k events; held-out test samples in the 10k range',
      public: 'Data available from corresponding author on request; code public',
      link: 'https://github.com/dikshantsagar/Neutrino-LLaMa',
      multipleDatasets: 'Nominal 512x512 displays plus 256x256 downsampled OOD displays',
      mixedSource: 'Base VLM pretrained outside HEP; fine-tuned on neutrino images'
    },
    representation: {
      inputObjects: 'Two 2D grayscale event-display projections, XZ and YZ',
      pipeline: [
        'simulated LArTPC depositions',
        'centered/resized event-display pixel maps',
        'VLM image processor + text prompt'
      ],
      variableLength: 'Image input is fixed by VLM image processor; no raw sparse-hit variable-length handling',
      paddingMasking: 'Handled by Llama-3.2-Vision image processor, not detector-specific masking',
      preprocessing: '512x512 nominal maps; 256x256 downsampled OOD test'
    },
    backbone: {
      architectureType: 'Vision-language transformer',
      baseModel: 'meta-llama/Llama-3.2-11B-Vision-Instruct with ViT-h/14 vision encoder',
      structure: 'Frozen/4-bit quantized VLM with low-rank adapters on attention and MLP projections',
      objective: 'Prompted event-class classification and explanation generation',
      parameters: '11B base; ~29.5M trainable QLoRA parameters',
      trainableFrozen: 'Base weights frozen/quantized; QLoRA rank 8, alpha 16, dropout 0.05 trainable',
      fineTuning: 'QLoRA supervised fine-tuning for neutrino event classification'
    },
    summary: 'Neutrino VLM adapts a general vision-language model to LArTPC event-display images. It is a useful transfer and robustness example, but it should not be presented as a HEP-native model trained on raw detector hits.',
    highlights: [
      'Uses derived event-display pixel maps, not raw detector hit tensors.',
      'Fine-tunes Llama-3.2-11B-Vision with QLoRA and a frozen quantized base.',
      'Shows robustness to image-resolution downsampling.',
      'Few-shot frozen VLM is weak, so zero-shot understanding should not be overclaimed.'
    ],
    benchmarks: [
      {
        task: 'Nominal event classification',
        dataset: '512x512 simulated LArTPC event displays',
        metrics: 'Llama-3.2 Vision reports accuracy/precision/recall 0.87 and AUC 0.96 on 512x512 displays',
        ood: 'No',
        fmEvidence: 'Partial: transfer evidence, not HEP-native FM',
        realData: 'No'
      },
      {
        task: 'Baseline comparison',
        dataset: 'same event-display test set',
        metrics: 'ViT-h/14 reports accuracy 0.86, precision 0.86, recall 0.85, AUC 0.96; CNN reports accuracy 0.80, precision 0.80, recall 0.79, AUC 0.94',
        ood: 'No',
        fmEvidence: 'Supporting evidence',
        realData: 'No'
      },
      {
        task: 'Resolution-shift robustness',
        dataset: '512-to-256 downsampled OOD displays',
        metrics: '256x256 displays: Llama accuracy/precision/recall 0.85 and AUC 0.95; ViT accuracy/precision/recall 0.85 and AUC 0.96; CNN accuracy 0.43 and AUC 0.70',
        ood: 'Partial: image-resolution shift',
        fmEvidence: 'Moderate transfer robustness evidence',
        realData: 'No'
      },
      {
        task: 'Few-shot frozen VLM',
        dataset: 'simulated event displays',
        metrics: 'classification behavior; often one-class collapse',
        ood: 'No',
        fmEvidence: 'Caveat: weak zero-shot/few-shot claim',
        realData: 'No'
      },
      {
        task: 'Generated rationales',
        dataset: 'classified event displays',
        metrics: 'qualitative explanations only',
        ood: 'No',
        fmEvidence: 'Limited: no causal physics-faithfulness benchmark',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'NVIDIA A6000 49GB GPUs',
      gpu: '4 A6000',
      trainingTime: '~1 week',
      batchSize: '4/device with gradient accumulation 2',
      optimizer: 'adamw_torch_fused, constant LR 2e-4, warmup ratio 0.03, max grad norm 0.3, one epoch',
      distributedStrategy: '4-bit BitsAndBytes QLoRA fine-tuning'
    }
  },
  {
    id: 'omnilearned',
    name: 'OmniLearn series',
    initials: 'OL',
    level: 'jet',
    color: '#c4b5fd',
    rarity: 'legendary',
    featured: true,
    badges: [
      'G',
      'D',
      'R'
    ],
    short: 'Broad mixed-source jet foundation-model lineage.',
    arch: 'PET / PET v2',
    title: 'OmniLearn / OmniLearned lineage for reusable jet representations',
    cardSourceLimit: 6,
    classification: 'Mature jet-physics foundation model lineage with strong multi-task and mixed-source evidence.',
    fmEvidence: {
      level: 'Strong',
      note: 'Broadest multi-dataset and multi-task evidence among jet entries.'
    },
    tags: {
      modelType: [
        'foundation model',
        'jet FM lineage'
      ],
      architecture: [
        'PET',
        'PET v2',
        'flow matching'
      ],
      domain: [
        'jets',
        'particle clouds',
        'CMS Open Data'
      ],
      evidence: [
        'multi-dataset pretraining',
        'real-data benchmark',
        'OOD transfer'
      ]
    },
    dataset: {
      type: 'mixed Delphes / full simulation / open data / real data downstream',
      generator: 'JetClass MG5_aMC+PYTHIA8+Delphes; later JetClass2, Aspen Open Jets, ATLAS Top, H1 DIS, CMS QCD/BSM, and CMS Open Data sources',
      size: 'Early 100M jets; later >1B jets',
      public: 'Yes: public code/data framework and public/open datasets',
      link: 'https://github.com/ViniciusMikuni/OmniLearned; https://github.com/ViniciusMikuni/OmniLearn',
      multipleDatasets: 'Yes; central to the later framework',
      mixedSource: 'Yes: pp/ep, detector fidelities, real/simulated sources, and many downstream tasks'
    },
    representation: {
      inputObjects: 'Unordered jet constituent point clouds with kinematics, PID, vertex/track features where available',
      pipeline: [
        'jet constituents',
        'relative kinematics + optional PID/track features',
        'PET/PET v2 particle tokens with local pairwise features and summary tokens'
      ],
      variableLength: 'Point-cloud transformer handles variable multiplicity; JetClass-style setup uses up to ~150 particles/jet',
      paddingMasking: 'Masking/padding handled by point-cloud batching; task-specific details vary across lineage',
      preprocessing: 'relative eta/phi, log pT, log E, pairwise physics bias features'
    },
    backbone: {
      architectureType: 'Point-Edge Transformer family',
      baseModel: 'Self-trained on large mixed jet corpora',
      structure: 'Local attention, global attention, physics-informed pairwise bias terms, task heads for classification/generation/flow matching',
      objective: 'Supervised plus generative/flow-matching and sample-identity learning; not primarily masked/contrastive SSL',
      parameters: 'small ~3M; medium ~58M; large ~423M/460M depending on paper',
      trainableFrozen: 'Fine-tuning usually updates all weights with lower backbone learning rate; task heads replaced',
      fineTuning: 'Task-specific heads and full/low-LR backbone adaptation across jet, open-data, and real-data tasks'
    },
    summary: 'OmniLearn and OmniLearned form the strongest jet-level FM lineage in the library, with large mixed-source pretraining and broad downstream reuse. It is the clearest mature HEP foundation-model example on particle-cloud jets.',
    highlights: [
      'Moves from JetClass-scale pretraining to a 1B+ mixed jet corpus.',
      'Covers classification, generation, flavor tagging, unfolding, reweighting, and anomaly detection.',
      'Includes cross-fidelity and real/open-data downstream evidence.',
      'Best anchor for the mature jet-FM claim.'
    ],
    benchmarks: [
      {
        task: 'Top tagging',
        dataset: 'ATLAS-like/Delphes top benchmarks',
        metrics: 'AUC, accuracy, background rejection at fixed signal efficiency',
        ood: 'Partial: dataset/fidelity shift',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'Quark/gluon tagging',
        dataset: 'Pythia and CMS Open Data Q/G settings',
        metrics: 'AUC and rejection metrics',
        ood: 'Yes: CMS Open Data setting for part of benchmark',
        fmEvidence: 'Strong mixed-source evidence',
        realData: 'No'
      },
      {
        task: 'Unfolding/reweighting',
        dataset: 'Z+jets and H1 DIS tasks',
        metrics: 'classifier/reweighting comparison metrics',
        ood: 'Yes: pp to ep / analysis shift',
        fmEvidence: 'Strong breadth evidence',
        realData: 'No'
      },
      {
        task: 'Anomaly detection',
        dataset: 'LHCO R&D plus CMS Open Data/Aspen anomaly-search settings',
        metrics: 'significance and detection threshold',
        ood: 'Yes: real/open-data anomaly-search setting',
        fmEvidence: 'Strong',
        realData: 'Yes: CMS Open Data/Aspen Open Jets where used'
      },
      {
        task: 'Jet generation',
        dataset: 'JetNet/jet-feature distribution tests in earlier work',
        metrics: 'distribution-closure metrics',
        ood: 'No',
        fmEvidence: 'Supporting generative capability',
        realData: 'No'
      },
      {
        task: 'ATLAS flavor tagging',
        dataset: 'open ATLAS-style track dataset',
        metrics: 'background rejection at fixed b/c efficiency',
        ood: 'Partial: open ATLAS-style track dataset shift',
        fmEvidence: 'Strong downstream transfer',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'NERSC Perlmutter A100 GPUs',
      gpu: '32-512 A100 GPUs',
      trainingTime: '~3 passes over 1B-jet corpus',
      batchSize: 'global batch 4096',
      optimizer: 'Lion',
      distributedStrategy: 'large distributed multi-GPU training'
    }
  },
  {
    id: 'omnijet',
    name: 'OmniJet-alpha',
    initials: 'OJ',
    level: 'jet',
    color: '#a78bfa',
    rarity: 'epic',
    badges: [
      'G',
      'D'
    ],
    short: 'Tokenized jet sequences for generation and low-label transfer.',
    arch: 'causal transformer',
    title: 'OmniJet-α: The first cross-task foundation model for particle physics',
    classification: 'Moderate jet FM evidence through autoregressive generation and low-label transfer.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Good low-label transfer and generative representation learning; narrower than OmniLearned.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'generative jet model'
      ],
      architecture: [
        'VQ-VAE',
        'next-token prediction',
        'masked particle modeling'
      ],
      domain: [
        'jets',
        'JetClass',
        'Delphes'
      ],
      evidence: [
        'few-label transfer',
        'top-tagging OOD'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: 'JetClass: MadGraph5_aMC@NLO + PYTHIA + Delphes CMS-like; transfer top-tagging PYTHIA8 + Delphes ATLAS-like',
      size: 'JetClass 100M train / 5M validation / 20M test; top-tagging ~1.2M jets',
      public: 'Code and JetClass are public',
      link: 'https://github.com/uhh-pd-ml/omnijet_alpha',
      multipleDatasets: 'Yes: JetClass plus related top-tagging transfer benchmark',
      mixedSource: 'Related jet transfer; no real-data OOD'
    },
    representation: {
      inputObjects: 'Jet constituents with kinematics, tokenized by VQ-VAE into discrete particle tokens',
      pipeline: [
        'jet constituent sequence',
        'VQ-VAE discrete tokens or continuous decoded features',
        'causal transformer sequence with start/stop tokens'
      ],
      variableLength: 'Autoregressive variable-length sequence with causal masking',
      paddingMasking: 'Causal mask; masked particle modeling introduced in later enhancement',
      preprocessing: 'Original alpha uses pT, eta, phi with approximate/zero mass; later continuous-input NTP adds decoded continuous features'
    },
    backbone: {
      architectureType: 'GPT-like causal transformer over jet tokens',
      baseModel: 'Self-trained on JetClass',
      structure: 'Original three GPT blocks/eight heads/no positional encoding; later prenorm transformer with LayerScale, registers, eight blocks, d=128',
      objective: 'Original next-token prediction; later NTP, MPM, and joint NTP+MPM',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'Fine-tuning and fixed-backbone probes evaluated',
      fineTuning: 'JetClass classification and top-tagging transfer heads'
    },
    summary: 'OmniJet-alpha maps language-model-style next-token prediction onto tokenized jet constituents, then tests whether generative pretraining helps tagging. Later work separates NTP, MPM, and continuous-input variants.',
    highlights: [
      'Clear bridge from NLP token prediction to particle jets.',
      'Uses VQ-VAE tokens for particle-cloud generation.',
      'Low-label transfer benefits are strongest at 100-1000 labels.',
      'Narrower dataset/task scope than OmniLearned.'
    ],
    benchmarks: [
      {
        task: 'Generative quality',
        dataset: 'JetClass q/g and top jets',
        metrics: 'token/reconstructed distributions and classifier separation of generated vs reconstructed',
        ood: 'No',
        fmEvidence: 'Moderate generative representation evidence',
        realData: 'No'
      },
      {
        task: 'JetClass classification',
        dataset: 'JetClass 10-class jets',
        metrics: 'classification performance versus training-set size',
        ood: 'No',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Top-tagging transfer',
        dataset: 'ATLAS-like top-tagging dataset',
        metrics: 'accuracy/AUC/rejection depending on setup',
        ood: 'Partial: related ATLAS-like top-tagging dataset',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Few-label transfer',
        dataset: 'top-tagging with 100-1000 labels',
        metrics: 'performance versus scratch',
        ood: 'Partial: same OOD top-tagging dataset at low labels',
        fmEvidence: 'Strong low-label support',
        realData: 'No'
      },
      {
        task: 'Objective ablations',
        dataset: 'JetClass/top-transfer settings',
        metrics: 'token-ID vs continuous input, NTP vs MPM, probes, extended features',
        ood: 'Partial: mix of JetClass and top-transfer settings',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Original OmniJet-alpha: 30 epochs for VQ-VAE and 30 epochs for transformer; later NTP/MPM study: 1M pretraining steps',
      batchSize: 'Later NTP/MPM study: 1000, or 100 for <=10k-jet fine-tuning; original batch not specified',
      optimizer: 'Original: Adam for VQ-VAE/backbone at LR 1e-3 and AdamW for classifiers at max LR 5e-3, weight decay 0.01; later study: Ranger at LR 1e-3',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'sophon',
    name: 'Sophon',
    initials: 'SO',
    level: 'jet',
    color: '#9f7aea',
    rarity: 'epic',
    badges: [
      'D'
    ],
    short: '188-way supervised signature pretraining for boosted jets.',
    arch: 'Particle Transformer',
    title: 'Accelerating Resonance Searches via Signature-Oriented Pre-training',
    classification: 'Supervised jet-signature foundation-style encoder for resonance and anomaly searches.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Supported for supervised jet signature transfer; narrower than OmniLearned.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'supervised pretraining'
      ],
      architecture: [
        'Particle Transformer',
        '188-way classifier'
      ],
      domain: [
        'boosted jets',
        'JetClass-II',
        'resonance search'
      ],
      evidence: [
        'supervised pretraining',
        'unseen signatures',
        'anomaly search'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: 'MadGraph5_aMC@NLO 2.9.18 + PYTHIA 8.3 resonant signals; QCD from PYTHIA 8.3; Delphes3 CMS-like with pileup 50 and PUPPI',
      size: '~139M labeled jets across 188 classes',
      public: 'Paper states dataset/model will be public; exact official link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'Main JetClass-II plus transfer/anomaly-search benchmarks',
      mixedSource: 'Transfer to related jet signatures and search workflows'
    },
    representation: {
      inputObjects: 'Large-R jet constituents / E-flow objects',
      pipeline: [
        'large-R jet constituents',
        'kinematics + PID + impact-parameter features + scaled four-momenta',
        'Particle Transformer constituent tokens'
      ],
      variableLength: 'Handled by Particle Transformer over constituent clouds',
      paddingMasking: 'Standard ParT-style batching; exact padding not specified',
      preprocessing: 'Sampling/reweighting decorrelates pT and soft-drop mass from labels'
    },
    backbone: {
      architectureType: 'Particle Transformer',
      baseModel: 'Self-trained on JetClass-II',
      structure: 'Six particle-attention blocks plus two class-attention blocks',
      objective: 'Supervised 188-class signature classification',
      parameters: '~2.3M parameters; d=128; 8 heads',
      trainableFrozen: 'Latent vectors used with small downstream MLPs; fine-tuning details vary',
      fineTuning: 'Transfer to new resonance/signature and anomaly-search workflows'
    },
    summary: 'Sophon is a strong supervised-pretraining counterpart to SSL/generative jet FMs. It builds a broad boosted-jet signature encoder and reuses latent features for resonance and anomaly searches.',
    highlights: [
      'Pretrains on 188 fine-grained boosted-jet signatures.',
      'Useful for supervised signature transfer and search workflows.',
      'Includes mass/pT decorrelation strategy in dataset construction.',
      'Not SSL or generative; claim is supervised representation transfer.'
    ],
    benchmarks: [
      {
        task: 'Direct resonance discrimination',
        dataset: 'JetClass-II resonance/QCD classes',
        metrics: 'likelihood-ratio discriminants, background rejection, significance-style metrics',
        ood: 'No',
        fmEvidence: 'Moderate supervised backbone evidence',
        realData: 'No'
      },
      {
        task: 'Unseen/rare signature transfer',
        dataset: 'examples such as X->bs',
        metrics: 'MLP-on-latent classification performance',
        ood: 'Partial: unseen/rare but related jet signatures',
        fmEvidence: 'Strong for supervised transfer',
        realData: 'No'
      },
      {
        task: 'Single-jet resonance search',
        dataset: 'simulated W/Z/top peak search setup',
        metrics: 'peak reconstruction/search sensitivity',
        ood: 'Partial: simulated search-workflow shift',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'SALAD/model-agnostic anomaly detection',
        dataset: 'Sophon latent-space anomaly setup',
        metrics: 'anomaly/search sensitivity metrics',
        ood: 'Partial: latent-space anomaly-search workflow',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Dijet triboson anomaly benchmark',
        dataset: 'triboson anomaly benchmark',
        metrics: 'signal-event requirement/discovery sensitivity',
        ood: 'Partial: simulated triboson anomaly benchmark',
        fmEvidence: 'Moderate',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: '80 epochs, 10M samples per epoch',
      batchSize: '512',
      optimizer: 'Lookahead/RAdam, learning rate 5e-4',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'mpmv2',
    name: 'MPMv2',
    initials: 'MP',
    level: 'jet',
    color: '#b794f4',
    rarity: 'epic',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Tokenization-free masked particle modeling with OOD b-tag transfer.',
    arch: 'MAE-style transformer',
    title: 'Is Tokenization Needed for Masked Particle Modelling?',
    classification: 'Jet/track representation FM evidence with meaningful OOD downstream tasks.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Good multi-task transfer evidence, especially BTag OOD.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'SSL'
      ],
      architecture: [
        'MAE-style',
        'masked particle modeling',
        'conditional flow matching'
      ],
      domain: [
        'jets',
        'tracks',
        'BTag OOD'
      ],
      evidence: [
        'vertex finding',
        'track ID',
        'low-label transfer'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: 'JetClass PYTHIA8/MadGraph + Delphes CMS-like; BTag Delphes ATLAS-like charged-track dataset',
      size: 'JetClass 120M large-R jets; BTag 3M light/charm/bottom jets capped at 15 tracks',
      public: 'JetClass public; BTag public link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'Yes: JetClass pretraining and BTag OOD downstream',
      mixedSource: 'Cross-jet-task and ATLAS-like downstream shift'
    },
    representation: {
      inputObjects: 'Unordered particles/tracks with kinematics, impact parameters, PID, and charge',
      pipeline: [
        'particle/track cloud',
        'continuous features + one-hot labels; neutral impact params zero-padded',
        'masked-set transformer tokens'
      ],
      variableLength: 'Transformer set processing; BTag caps charged tracks at 15',
      paddingMasking: 'Masked particle modeling with encoder/decoder masks',
      preprocessing: 'Feature normalization details not specified; neutral impact parameters zero-padded'
    },
    backbone: {
      architectureType: 'MAE-style transformer encoder/decoder',
      baseModel: 'Self-trained on JetClass',
      structure: 'Encoder 8 layers d=512 8 heads with registers/SwiGLU/LayerScale; decoder 4 layers d=128 4 heads',
      objective: 'Particle ID CE, token targets, direct regression, KMeans, conditional normalizing flow, conditional flow matching, and set-to-set flow matching studied',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'Fixed-backbone probes and fine-tuning evaluated',
      fineTuning: 'Classification, weak supervision, b-tagging, vertexing, and track-ID heads'
    },
    summary: 'MPMv2 asks whether masked particle modeling needs a discrete tokenizer. Its strongest FM evidence is a focused but broad set of downstream jet and track tasks, including BTag distribution shift.',
    highlights: [
      'Removes the separate VQ-VAE tokenizer from the masked-particle pipeline.',
      'Systematically compares reconstruction targets for particle-cloud SSL.',
      'Transfers from JetClass to OOD b-tagging, vertexing, and track ID.',
      'Useful bridge from MAE-style vision methods to particle clouds.'
    ],
    benchmarks: [
      {
        task: 'JetClass 10-class classification',
        dataset: 'JetClass label fractions',
        metrics: 'accuracy/AUC-like classification performance',
        ood: 'No',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'CWoLa weak supervision',
        dataset: 'Jet samples with injected top signals',
        metrics: 'SIC at high background rejection',
        ood: 'Partial: weak-supervision/injected-signal setting',
        fmEvidence: 'Moderate method breadth',
        realData: 'No'
      },
      {
        task: 'BTag three-class classification',
        dataset: 'ATLAS-like BTag',
        metrics: 'accuracy',
        ood: 'Yes: ATLAS-like BTag dataset/task shift',
        fmEvidence: 'Strong OOD support',
        realData: 'No'
      },
      {
        task: 'Secondary vertex finding',
        dataset: 'BTag',
        metrics: 'ARI versus number of vertices',
        ood: 'Yes: ATLAS-like BTag dataset/task shift',
        fmEvidence: 'Strong downstream breadth',
        realData: 'No'
      },
      {
        task: 'Heavy-track identification',
        dataset: 'BTag',
        metrics: 'balanced accuracy',
        ood: 'Yes: ATLAS-like BTag dataset/task shift',
        fmEvidence: 'Strong downstream breadth',
        realData: 'No'
      },
      {
        task: 'Objective/probe ablations',
        dataset: 'JetClass and BTag',
        metrics: 'fixed-backbone and objective comparison metrics',
        ood: 'Partial: includes both source and OOD downstream settings',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: '1,000,000 pretraining steps',
      batchSize: '1000',
      optimizer: 'AdamW, max LR 1e-3, weight decay 1e-5, 50k warmup, exponential decay half-life 100k steps',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'bumblebee',
    name: 'Bumblebee',
    initials: 'BB',
    level: 'event',
    color: '#6ee7b7',
    rarity: 'rare',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Focused event-token SSL for dileptonic ttbar.',
    arch: 'BERT-style transformer',
    title: 'Bumblebee: Foundation Model for Particle Physics Discovery',
    classification: 'Focused event-level prototype; useful but limited/moderate FM evidence.',
    fmEvidence: {
      level: 'Partial',
      note: 'Reusable within a specific event topology; broad FM claim remains weak.'
    },
    tags: {
      modelType: [
        'foundation-style prototype',
        'SSL'
      ],
      architecture: [
        'BERT-style',
        'Cloze pretraining'
      ],
      domain: [
        'event-level',
        'dileptonic ttbar',
        'Delphes'
      ],
      evidence: [
        'order invariant',
        'topology-specific reuse'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: '7M dileptonic ttbar NLO with POWHEG v2; 1M eta_t toy events with MG5_aMC@NLO; PYTHIA + Delphes CMS card',
      size: '8M total generated events; 70/15/15 split',
      public: 'Official dataset link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'ttbar plus toponium toy model',
      mixedSource: 'Limited; same/few related topologies'
    },
    representation: {
      inputObjects: 'Event-level reconstructed and generator-level four-vectors for dileptonic ttbar topology',
      pipeline: [
        'reco/gen event objects',
        'pT/eta/phi/mass/b-tag + level/PDG/mask embeddings',
        'order-invariant BERT event tokens'
      ],
      variableLength: 'Topology-specific token set; no positional encoding',
      paddingMasking: 'Mask-status embedding for Cloze pretraining',
      preprocessing: 'Neutrinos represented through MET-like tokens; generator-level information omitted for downstream classification'
    },
    backbone: {
      architectureType: 'Bidirectional transformer encoder',
      baseModel: 'Self-trained on dileptonic ttbar samples',
      structure: '8 layers, d_model 768, 16 heads',
      objective: 'Cloze-style masked four-vector reconstruction with MSE',
      parameters: '~57M',
      trainableFrozen: 'Fine-tuning with classification heads; exact freeze policy not central',
      fineTuning: 'Top reconstruction and classification heads'
    },
    summary: 'Bumblebee demonstrates masked event-token pretraining for a specific dileptonic top topology. It improves some reconstruction/classification tasks but should not be framed as broad discovery-grade FM evidence.',
    highlights: [
      'Order-invariant BERT-style event representation.',
      'Uses both generator and reconstruction information during pretraining.',
      'Improves top reconstruction and some classification tasks.',
      'Toponium benchmark is not uniformly better than supervised transformer baselines.'
    ],
    benchmarks: [
      {
        task: 'Top reconstruction',
        dataset: 'dileptonic ttbar Delphes samples',
        metrics: 'ttbar invariant-mass resolution; 10-20% improvement over supervised transformer',
        ood: 'No',
        fmEvidence: 'Moderate within-topology support',
        realData: 'No'
      },
      {
        task: 'Toponium versus ttbar classification',
        dataset: 'toponium toy + ttbar',
        metrics: 'AUROC 0.877; improves over DNN but below supervised transformer in cited comparison',
        ood: 'Partial: related toponium toy signal',
        fmEvidence: 'Limited/caveated',
        realData: 'No'
      },
      {
        task: 'Initial-state gg versus qqbar classification',
        dataset: 'dileptonic ttbar',
        metrics: 'AUROC 0.625',
        ood: 'No',
        fmEvidence: 'Moderate task reuse',
        realData: 'No'
      },
      {
        task: 'Embedding/pretraining ablations',
        dataset: 'ttbar/toponium tasks',
        metrics: 'task performance changes',
        ood: 'No',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'V100 GPUs',
      gpu: '2 V100',
      trainingTime: '~10 epochs',
      batchSize: '16',
      optimizer: 'Adam, betas 0.9/0.999, epsilon 1e-8, weight decay 1e-3, dropout 0.05, peak LR about 1e-4 with 9000-iteration warmup and linear decay',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'rs3l',
    name: 'RS3L',
    initials: 'RS',
    level: 'jet',
    color: '#8b5cf6',
    rarity: 'rare',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Resimulation-pair contrastive pretraining for robust jets.',
    arch: 'DynamicEdgeConv SSL',
    title: 'Re-Simulation-based Self-Supervised Learning for Pre-Training Physics Foundation Models',
    classification: 'Robust jet-representation SSL with strong systematic/OOD evidence in a narrow scope.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Supported for robust jet representations; narrower task scope than OmniLearned.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'contrastive SSL'
      ],
      architecture: [
        'DynamicEdgeConv',
        'SimCLR'
      ],
      domain: [
        'jets',
        'resimulation pairs',
        'Delphes'
      ],
      evidence: [
        'systematics robustness',
        'OOD W tagging',
        'public Zenodo'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: 'MG5_aMC@NLO pp->Z+jet and pp->HZ,H->bb,Z->nunu at 13 TeV; nominal PYTHIA8 CP5; resim with seeds, FSR up/down, Herwig7',
      size: '5M events, 50/50 QCD/Higgs',
      public: 'Yes: Zenodo DOI',
      link: 'https://doi.org/10.5281/zenodo.10633815',
      multipleDatasets: 'Nominal plus resimulation/augmentation variants',
      mixedSource: 'Resimulation domain variation plus W-vs-QCD OOD benchmark'
    },
    representation: {
      inputObjects: 'Top 100 Delphes E-flow candidates in anti-kT R=0.8 jets',
      pipeline: [
        'resimulated jet constituents',
        '15 per-particle features',
        'DynamicEdgeConv graph embedding'
      ],
      variableLength: 'Top 100 candidates fixed/capped for graph processing',
      paddingMasking: 'Capped particle list; detailed padding not specified',
      preprocessing: 'pT > 450 GeV, mass > 10 GeV, |eta| < 0.1'
    },
    backbone: {
      architectureType: 'DynamicEdgeConv GNN',
      baseModel: 'Self-trained with resimulation positive pairs',
      structure: 'k=24 DynamicEdgeConv stack with global sum pooling to 8D latent',
      objective: 'SimCLR contrastive loss on resimulation views',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'Fine-tuning for tagging tasks; BERT-like transformer cross-check not primary',
      fineTuning: 'Higgs-vs-QCD and W-vs-QCD tagging'
    },
    summary: 'RS3L turns the simulator itself into a physics-aware augmentation source. Its foundation-style value is robustness: representations learn invariance to seeds, shower variations, and generator choices.',
    highlights: [
      'Positive pairs come from re-simulating the same hard events.',
      'Directly targets systematic robustness rather than generic image augmentations.',
      'Public dataset with explicit simulator variation structure.',
      'Strong robustness/OOD story, but task breadth is narrow.'
    ],
    benchmarks: [
      {
        task: 'Higgs-vs-QCD tagging',
        dataset: 'Z+jet and HZ/H->bb Delphes resimulation dataset',
        metrics: 'ROC/background rejection at fixed Higgs efficiency',
        ood: 'No',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Simulator robustness',
        dataset: 'seed/FSR/Herwig resimulation variants',
        metrics: 'Wasserstein distances of tagger outputs',
        ood: 'Yes: simulator/shower systematic variations',
        fmEvidence: 'Strong robustness support',
        realData: 'No'
      },
      {
        task: 'OOD W-vs-QCD tagging',
        dataset: 'W jets transfer benchmark',
        metrics: 'background rejection at fixed W efficiency',
        ood: 'Yes: W-vs-QCD task/process shift',
        fmEvidence: 'Strong within jet domain',
        realData: 'No'
      },
      {
        task: 'Data efficiency',
        dataset: 'reduced-label tagging settings',
        metrics: 'performance versus supervised sample size',
        ood: 'No: reduced-label study, not distribution shift',
        fmEvidence: 'Moderate',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'MIT Satori and subMIT clusters; exact GPU model not specified',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: '100 nominal jets plus 100 resimulated/augmented jets per minibatch',
      optimizer: 'Not specified in the paper/project.',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'tau-transfer',
    name: 'Tau transfer',
    initials: 'τ',
    level: 'jet',
    color: '#a855f7',
    rarity: 'rare',
    badges: [
      'D'
    ],
    short: 'OmniJet-alpha transfer to full-sim tau reconstruction.',
    arch: 'OmniJet fine-tune',
    title: 'Reconstructing hadronically decaying tau leptons with a jet foundation model',
    classification: 'Derivative transfer study, not a new tau-pretrained foundation model.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Good transfer study derived from OmniJet-alpha.'
    },
    tags: {
      modelType: [
        'transfer study',
        'derivative FM use'
      ],
      architecture: [
        'OmniJet-alpha',
        'VQ-VAE tokenizer',
        'GPT-style transformer'
      ],
      domain: [
        'tau reconstruction',
        'tau reconstruction dataset',
        'full simulation'
      ],
      evidence: [
        'cross-fidelity OOD',
        'regression',
        'low-data transfer'
      ]
    },
    dataset: {
      type: 'mixed Delphes pretraining + full simulation downstream',
      generator: 'OmniJet-alpha JetClass Delphes pretraining; full-simulation/reconstruction tau downstream dataset',
      size: 'Downstream scans from ~10^3 to 10^6 jets; key examples ~10^4 jets',
      public: 'Yes: Fuτure dataset and software DOIs are provided',
      link: 'https://doi.org/10.5281/zenodo.12664634; https://doi.org/10.5281/zenodo.15005034',
      multipleDatasets: 'Yes: JetClass pretraining plus full-simulation tau downstream dataset',
      mixedSource: 'Yes: cross-process, cross-granularity, and cross-fidelity transfer'
    },
    representation: {
      inputObjects: 'Tau-candidate reconstructed particle/constituent features',
      pipeline: [
        'reconstructed tau candidates',
        'OmniJet-alpha tokenizer with frozen VQ-VAE',
        'tokenized sequence processed by GPT backbone'
      ],
      variableLength: 'Handled through OmniJet-alpha tokenized sequence processing',
      paddingMasking: 'Autoregressive/token-sequence handling from OmniJet-alpha; tokenizer frozen',
      preprocessing: 'Task-specific tau candidate features; exact normalization not specified'
    },
    backbone: {
      architectureType: 'OmniJet-alpha transfer stack',
      baseModel: 'OmniJet-alpha pretrained on JetClass',
      structure: 'Frozen tokenizer plus GPT blocks with task heads',
      objective: 'Fine-tuned classification/regression from generative jet pretraining',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'Tokenizer frozen in all strategies; scratch, fixed backbone, and unfreezing/fine-tuning compared',
      fineTuning: 'Best performance generally from fine-tuning pretrained GPT blocks on the tau reconstruction dataset'
    },
    summary: 'Tau Transfer is an honest cross-fidelity reuse test: a jet-pretrained OmniJet-alpha model is adapted to a full-simulation tau reconstruction dataset. It supports transfer learning, not a new standalone tau FM.',
    highlights: [
      'Transfers from Delphes jet pretraining to full-sim/reco tau tasks.',
      'Targets tau ID, visible pT regression, and decay-mode reconstruction.',
      'Fine-tuning improves visible-pT resolution by about 50-55% over scratch.',
      'Pretraining helps low-data settings, but specialist ParT can still win some tasks.',
      'Clear derivative evidence for reusable jet representations.'
    ],
    benchmarks: [
      {
        task: 'Hadronic tau ID',
        dataset: 'full-simulation tau reconstruction dataset',
        metrics: 'AUC and mis-ID rate at fixed efficiency',
        ood: 'Yes: JetClass/Delphes to full-simulation tau reconstruction',
        fmEvidence: 'Moderate derivative transfer',
        realData: 'No'
      },
      {
        task: 'Visible tau pT regression',
        dataset: 'full-simulation tau reconstruction dataset',
        metrics: 'pT resolution; about 50-55% improvement over scratch when fine-tuned',
        ood: 'Yes: JetClass/Delphes to full-simulation tau reconstruction',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Decay-mode reconstruction',
        dataset: 'full-simulation tau reconstruction dataset',
        metrics: 'AUC',
        ood: 'Yes: JetClass/Delphes to full-simulation tau reconstruction',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Fine-tuning strategy ablation',
        dataset: 'full-simulation tau label-size scans',
        metrics: 'performance versus unfreezing schedule/layers',
        ood: 'Yes: ablation on the tau OOD downstream setting',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Backbone retrained for 7 epochs on 20M JetClass q/g and t->bqq jets; downstream tau models trained 100 epochs',
      batchSize: '4096 jets per downstream batch; backbone batch not specified',
      optimizer: 'Ranger for VQ-VAE and backbone; downstream optimizer not specified',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'hep-jepa',
    name: 'HEP-JEPA',
    initials: 'JE',
    level: 'jet',
    color: '#b794f4',
    rarity: 'uncommon',
    badges: [
      'D',
      'SSL'
    ],
    short: 'Latent-prediction SSL for jets; partial evidence.',
    arch: 'JEPA SSL',
    title: 'HEP-JEPA: A foundation model for collider physics using joint embedding predictive architecture',
    classification: 'JEPA / latent-prediction SSL demonstrator with partial foundation-model evidence.',
    fmEvidence: {
      level: 'Partial',
      note: 'Methodologically useful; downstream breadth and gains are limited.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'SSL'
      ],
      architecture: [
        'JEPA',
        'latent prediction',
        'Transformer'
      ],
      domain: [
        'jets',
        'JetClass',
        'top tagging',
        'quark-gluon'
      ],
      evidence: [
        'few-shot',
        'modest OOD transfer'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation plus no-detector simulated q/g',
      generator: 'JetClass MadGraph/PYTHIA + Delphes CMS-like; top TQTR and Pythia8 no-detector q/g downstream',
      size: 'JetClass 100M train / 5M validation / 20M test; top and q/g datasets each 2M samples',
      public: 'Project site public; JetClass public',
      link: 'https://hep-jepa.github.io/',
      multipleDatasets: 'Yes: JetClass plus top/QG transfer',
      mixedSource: 'Related jet transfer; no real-data transfer'
    },
    representation: {
      inputObjects: 'Particle vectors with angular, mass/energy, pT, and distance-to-jet features',
      pipeline: [
        'jet particle cloud',
        'eta/phi farthest-point patching + kNN grouping',
        'PointNet-style patch tokens with spatial context/target masks'
      ],
      variableLength: 'Patchified particle cloud; kNN groups and transformer tokens handle multiplicity',
      paddingMasking: 'Spatially coherent context and target masks with masking scales',
      preprocessing: 'Physics-aware patching; pairwise physics-bias terms'
    },
    backbone: {
      architectureType: 'JEPA transformer',
      baseModel: 'Self-trained on JetClass',
      structure: 'Context encoder, target encoder, predictor, EMA target encoder; 12 blocks, 8 registers, physics-bias pair terms',
      objective: 'Smooth L1 loss in embedding space; no data-space reconstruction or generation',
      parameters: '~2.5M',
      trainableFrozen: 'Fine-tuning for downstream classification; EMA target frozen by design during pretraining',
      fineTuning: 'JetClass few-shot, top tagging, and quark/gluon classification'
    },
    summary: 'HEP-JEPA is a latent-prediction SSL model for jets, not a generative, energy-based, or anomaly-detection benchmark. It is valuable for methodology, with strongest gains in few-shot JetClass settings.',
    highlights: [
      'Correct framing is JEPA/latent prediction, not EBM or generation.',
      'Uses physics-aware patching and pairwise biases.',
      'Few-shot JetClass gains fade at full labels.',
      'Top/QG transfer gains are modest and below strong specialist baselines.'
    ],
    benchmarks: [
      {
        task: 'JetClass few-shot classification',
        dataset: 'JetClass label fractions',
        metrics: 'macro accuracy scratch -> HEP-JEPA: 0.505->0.564 at 0.05% labels, 0.586->0.624 at 0.5%, 0.668->0.669 at 2%, 0.683->0.685 at 10%, 0.698->0.698 at 100%',
        ood: 'No',
        fmEvidence: 'Moderate only at low labels',
        realData: 'No'
      },
      {
        task: 'Top tagging transfer',
        dataset: 'TQTR top-tagging dataset',
        metrics: 'accuracy: scratch 0.927, HEP-JEPA frozen 0.928, HEP-JEPA fine-tuned 0.929; ParticleNet 0.940, ParT 0.944',
        ood: 'Partial: related TQTR jet dataset shift',
        fmEvidence: 'Partial',
        realData: 'No'
      },
      {
        task: 'Quark/gluon transfer',
        dataset: 'Pythia8 no-detector q/g dataset',
        metrics: 'accuracy: scratch 0.819, HEP-JEPA frozen 0.821, supervised frozen 0.823; ParticleNet 0.840, ParT 0.843',
        ood: 'Partial: no-detector Pythia q/g dataset shift',
        fmEvidence: 'Partial',
        realData: 'No'
      },
      {
        task: 'Architecture/objective ablations',
        dataset: 'JetClass/top/QG settings',
        metrics: 'masking, physics bias, registers, augmentation comparisons',
        ood: 'Partial: includes source and related-transfer settings',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'RTX 2080Ti GPUs',
      gpu: 'Not specified in the paper/project.',
      trainingTime: '~320 GPU-hours',
      batchSize: 'effective batch size 2048',
      optimizer: 'Not specified in the paper/project.',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'joint-opt',
    name: 'Joint optimization',
    initials: 'JO',
    level: 'jet',
    color: '#b794f4',
    rarity: 'rare',
    badges: [
      'D'
    ],
    short: 'Fine-tuning pretrained jet backbones for analysis objectives.',
    arch: 'ParT + DeepSets',
    title: 'Finetuning Foundation Models for Joint Analysis Optimization',
    classification: 'Method support for FM adaptation; not a new standalone foundation model.',
    fmEvidence: {
      level: 'Partial',
      note: 'Strong downstream adaptation example rather than a new FM.'
    },
    tags: {
      modelType: [
        'adaptation method',
        'transfer study'
      ],
      architecture: [
        'ParT backbone',
        'DeepSets event head'
      ],
      domain: [
        'HH->4b',
        'CMS Open Data simulation',
        'event analysis'
      ],
      evidence: [
        'joint fine-tuning',
        'domain adaptation',
        'low-data transfer'
      ]
    },
    dataset: {
      type: 'CMS Open Data simulation plus Delphes pretraining',
      generator: 'ParT weights from JetClass; downstream CMS Open Data simulated G->HH and QCD/Xbb-style full simulation/reconstruction',
      size: 'Xbb pretraining ~22M jets; event-level study up to 10M simulated events with mass points',
      public: 'CMS Open Data samples and modified analysis tool referenced',
      link: 'https://github.com/cms-opendata-analyses/HiggsToBBNtupleProducerTool',
      multipleDatasets: 'Yes: JetClass and CMS Open Data simulation',
      mixedSource: 'Yes: JetClass to CMS event-level HH analysis'
    },
    representation: {
      inputObjects: 'Jet constituents processed by ParT plus optional high-level jet/event features',
      pipeline: [
        'jet constituents',
        'ParT latent or scalar Xbb score + jet features',
        'DeepSets over up to five jets'
      ],
      variableLength: 'Event head handles set of up to five jets',
      paddingMasking: 'Missing jets handled by fixed event set; detailed mask not specified',
      preprocessing: 'Variants use scalar score + high-level features, latent vector + high-level features, or latent vector only'
    },
    backbone: {
      architectureType: 'Particle Transformer backbone plus event-level DeepSets head',
      baseModel: 'JetClass-pretrained ParT',
      structure: 'Final softmax removed; event head optimizes BCE signal/background objective',
      objective: 'Joint analysis optimization via supervised event-level loss',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'Frozen, fine-tuned, scratch, and JetClass-initialized variants compared',
      fineTuning: 'Backbone fine-tuned jointly with event head for G->HH->4b'
    },
    summary: 'Joint Analysis Optimization shows why foundation models should often be fine-tuned for the final analysis objective. It is evidence for adaptation workflows, not a new foundation model.',
    highlights: [
      'Repurposes a pretrained jet model inside an event-level HH search.',
      'Compares frozen scalar use, latent use, scratch, and joint fine-tuning.',
      'Fine-tuning improves background rejection and data efficiency.',
      'Good bridge from object-level FMs to full analysis optimization.'
    ],
    benchmarks: [
      {
        task: 'G->HH->4b event classification',
        dataset: 'CMS Open Data simulated HH/QCD samples',
        metrics: 'background rejection at 90% signal efficiency: S+HLF frozen 350±10, fine-tuned 550±20, scratch 540±10; V+HLF frozen 390±10, fine-tuned 640±40, scratch 540±50; V-only frozen 170±20, fine-tuned 680±20, scratch 590±10',
        ood: 'Partial: JetClass ParT to CMS Open Data simulation',
        fmEvidence: 'Partial: adaptation evidence',
        realData: 'No'
      },
      {
        task: 'Low-data/domain adaptation',
        dataset: 'same event-level HH study with reduced data',
        metrics: 'data-efficiency factors for fine-tuning: S+HLF 53, V+HLF 67, V-only 14',
        ood: 'Partial: same CMS simulation downstream with reduced data',
        fmEvidence: 'Moderate support for fine-tuning FMs',
        realData: 'No'
      },
      {
        task: 'Representation strategy ablation',
        dataset: 'HH event study',
        metrics: 'scalar Xbb + features vs latent + features vs latent only',
        ood: 'Partial: same CMS simulation downstream',
        fmEvidence: 'Method support',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: '512 for Xbb backbone pretraining; 256 for end-to-end event training',
      optimizer: 'Lookahead(k=6, alpha=0.5) with RAdam betas 0.95/0.999, epsilon 1e-5 for backbone/full pipeline; Adam for frozen head-only training',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'event-transformer',
    name: 'Event transformer',
    initials: 'ET',
    level: 'event',
    color: '#34d399',
    rarity: 'rare',
    badges: [
      'D'
    ],
    short: 'Early top-multiplicity event-transformer methodology.',
    arch: 'preliminary transformer',
    title: 'A Methodology for Developing Foundational Transformer Models in Collider Physics Analysis',
    classification: 'Preliminary methodology/prototype, not mature FM evidence.',
    fmEvidence: {
      level: 'Preliminary',
      note: 'Transfer learning and broad downstream reuse are weak/not demonstrated.'
    },
    tags: {
      modelType: [
        'preliminary',
        'methodology'
      ],
      architecture: [
        'small event transformer',
        'masked reconstruction'
      ],
      domain: [
        'event-level',
        'top multiplicity',
        'Delphes CMS'
      ],
      evidence: [
        'preliminary',
        'entropy OOD demo'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation',
      generator: 'MadGraph5 and CompHEP hard processes; Delphes CMS-like detector at 13 TeV',
      size: '8,198,428 events across zero-, one-, two-, three-, and four-top classes',
      public: 'Official dataset link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'Multiple top-multiplicity processes within one workflow',
      mixedSource: 'No clear cross-domain pretraining'
    },
    representation: {
      inputObjects: 'Fixed tabular event-object representation with object kinematics and event counts',
      pipeline: [
        'top-multiplicity events',
        'objects sorted by energy + standardized features + zero padding',
        'linear token embedding for transformer'
      ],
      variableLength: 'Fixed maximum object counts: 12 jets including 4 b-jets plus 4 leptons',
      paddingMasking: 'Missing objects zero-padded; 30% variable masking for reconstruction',
      preprocessing: 'pT, eta, phi, Px, Py, Pz plus counts and MET standardized for reconstruction'
    },
    backbone: {
      architectureType: 'Small tabular/event Transformer',
      baseModel: 'Self-trained on top-multiplicity simulation',
      structure: 'Linear embedding, multi-head self-attention, flattening, final linear output',
      objective: 'Masked variable reconstruction and supervised top-count classification',
      parameters: 'Four small variants with embedding dimensions 16/20/125 and 1/5 heads; total count not specified',
      trainableFrozen: 'Transfer/frozen adaptation not clearly demonstrated',
      fineTuning: 'Supervised top-multiplicity classification after/with reconstruction training'
    },
    summary: 'The Event Transformer entry should be treated as an early methodology slide: masked event-variable reconstruction plus top-count classification. It does not yet establish mature event-level foundation-model transfer.',
    highlights: [
      'Uses tabular event-object tokens rather than a broad event FM corpus.',
      'Masked reconstruction and top-count classification are demonstrated.',
      'OOD result is an entropy demo, not a robust transfer benchmark.',
      'Keep the label preliminary to avoid overclaiming.'
    ],
    benchmarks: [
      {
        task: 'Masked reconstruction',
        dataset: 'top-multiplicity Delphes events',
        metrics: 'reconstruction loss and variable-distribution comparisons',
        ood: 'No',
        fmEvidence: 'Method support only',
        realData: 'No'
      },
      {
        task: 'Representation visualization',
        dataset: 'same top-multiplicity events',
        metrics: 't-SNE before/after training',
        ood: 'No',
        fmEvidence: 'Illustrative only',
        realData: 'No'
      },
      {
        task: 'Top-count classification',
        dataset: 'zero- to four-top Delphes classes',
        metrics: 'mean one-vs-rest ROC AUC: Small_1h 0.9128, Small_5h 0.9121, Large_1h 0.9172, Large_5h 0.9169',
        ood: 'No',
        fmEvidence: 'Preliminary',
        realData: 'No'
      },
      {
        task: 'Entropy OOD example',
        dataset: 'SM-trained model on scalar-DM single-top events',
        metrics: 'entropy separation example; no robust metric table',
        ood: 'Partial demo: scalar-DM single-top process',
        fmEvidence: 'Weak/preliminary',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'AdamW, LR 1e-4, no weight decay',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'pecm',
    name: 'PECM',
    initials: 'PE',
    level: 'event',
    color: '#4ade80',
    rarity: 'epic',
    badges: [
      'D',
    ],
    short: 'Compact event-graph pretraining across SM processes.',
    arch: 'event GNN',
    title: 'Pretrained Event Classification Model for High Energy Physics Analysis',
    classification: 'Moderate-to-good event-level pretraining evidence with explicit downstream transfer.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Multi-task transfer is real; model scale and representation breadth are modest.'
    },
    tags: {
      modelType: [
        'foundation-style',
        'event pretraining'
      ],
      architecture: [
        'fully connected event graph',
        'GNN',
        'multiclass pretraining'
      ],
      domain: [
        'event-level',
        'ATLAS Open Data',
        'SM processes'
      ],
      evidence: [
        'fine-tuning',
        'full-simulation benchmark',
        'time-to-target'
      ]
    },
    dataset: {
      type: 'Delphes fast simulation + ATLAS Open Data full-simulation MC downstream',
      generator: 'MadGraph@NLO 2.7.3 at NLO QCD; MadSpin; PYTHIA 8.235; Delphes 3.4.2 ATLAS fast simulation',
      size: '~120M pretraining events across 12 SM processes',
      public: 'ATLAS Open Data downstream samples public; generated pretraining sample publicness not specified',
      link: 'https://atlas-opendata.web.cern.ch/',
      multipleDatasets: 'Yes: generated pretraining, generated downstream, and ATLAS Open Data tasks',
      mixedSource: 'Yes: pretraining to BSM/open-data downstream tasks'
    },
    representation: {
      inputObjects: 'Fully connected graph of jets, electrons, muons, photons, and MET',
      pipeline: [
        'event objects',
        'node/edge/global features',
        'fully connected graph network'
      ],
      variableLength: 'Variable-size events handled directly by GNN',
      paddingMasking: 'Placeholders for undefined node fields; no dense padding requirement',
      preprocessing: 'Node pT/eta/phi/E/b-tag/charge/type; edge Delta eta/phi/R; global node count'
    },
    backbone: {
      architectureType: 'Graph neural network',
      baseModel: 'Self-trained on 12-process SM pretraining corpus',
      structure: 'Node/edge/global encoders to dimension 64; four graph-processing steps',
      objective: '12-class multiclass CE or 41-label multilabel objective; multiclass usually better downstream',
      parameters: '~400k',
      trainableFrozen: 'Final layer replaced; pretrained layers lower LR; frozen transfer tried and performed poorly',
      fineTuning: 'Fine-tuning on five generated tasks and two ATLAS Open Data tasks'
    },
    summary: 'PECM is a compact event-graph pretraining model with explicit downstream tables. It provides solid event-level transfer evidence, though at modest scale and with a narrower representation than EveNet.',
    highlights: [
      'Pretrains on a broad 12-process SM event corpus.',
      'Fine-tunes to generated BSM/SM tasks and ATLAS Open Data tasks.',
      'Shows time-to-target and low-data benefits.',
      'Multiclass pretraining is generally more useful than multilabel pretraining.'
    ],
    benchmarks: [
      {
        task: 'Five generated binary classification tasks',
        dataset: 'ttH gamma gamma CP, FCNC vs tHq, ttW vs ttt, stop+H vs ttH, WH vs ZH',
        metrics: 'accuracy and ROC AUC across 1e3 to 1e7 examples/class',
        ood: 'Yes: downstream processes absent from SM pretraining mix',
        fmEvidence: 'Moderate/good',
        realData: 'No'
      },
      {
        task: 'ATLAS Open Data Higgs production',
        dataset: 'ATLAS Open Data Higgs diphoton production',
        metrics: 'baseline 71.17% accuracy / 90.11% AUC; multiclass pretraining +0.35 accuracy points / +0.41 AUC points; multilabel pretraining -1.65 / -0.26',
        ood: 'Yes: ATLAS Open Data downstream task',
        fmEvidence: 'Good',
        realData: 'No'
      },
      {
        task: 'ATLAS Open Data triboson',
        dataset: 'ATLAS Open Data triboson dataset',
        metrics: 'baseline 54.10% accuracy / 73.90% AUC; multiclass pretraining +5.02 accuracy points / +3.12 AUC points; multilabel pretraining -8.21 / -6.05',
        ood: 'Yes: ATLAS Open Data downstream task',
        fmEvidence: 'Good',
        realData: 'No'
      },
      {
        task: 'CKA interpretability',
        dataset: 'downstream fine-tuned PECM models',
        metrics: 'layer adaptation similarity',
        ood: 'No',
        fmEvidence: 'Supporting evidence',
        realData: 'No'
      },
      {
        task: 'Time-to-target',
        dataset: 'downstream PECM task suite',
        metrics: 'compute/time amortization estimates',
        ood: 'Partial: downstream task suite includes OOD tasks',
        fmEvidence: 'Supporting practical FM value',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'NERSC Perlmutter; single A100 also used for 400 GPU-hour hyperparameter sweep',
      gpu: 'A100 for hyperparameter sweep; Perlmutter for pretraining',
      trainingTime: '45.5 GPU-hours for multiclass pretraining; 60 GPU-hours for multilabel pretraining',
      batchSize: '1024',
      optimizer: 'initial LR 1e-4 with 0.99 epoch decay; exact optimizer name not specified',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'event-diffusion',
    name: 'Heavy-ion diffusion',
    initials: 'ED',
    level: 'event',
    color: '#a78bfa',
    rarity: 'epic',
    badges: [
      'G'
    ],
    short: 'Heavy-ion point-cloud diffusion surrogate, toward FM.',
    arch: 'point-cloud diffusion',
    title: 'Toward a foundation model for heavy-ion collision experiments based on point-cloud diffusion',
    cardSourceLimit: 4,
    classification: 'Generative surrogate supported; broad foundation-model transfer not yet shown.',
    fmEvidence: {
      level: 'Partial',
      note: 'Strong simulation acceleration evidence, no downstream task suite.'
    },
    tags: {
      modelType: [
        'generative surrogate',
        'toward FM'
      ],
      architecture: [
        'HEIDi',
        'point-cloud diffusion',
        'normalizing flow'
      ],
      domain: [
        'heavy-ion',
        'UrQMD',
        'event generation'
      ],
      evidence: [
        'generative validation',
        'centrality interpolation',
        'speedup'
      ]
    },
    dataset: {
      type: 'custom simulation / theory-level heavy-ion generator',
      generator: 'UrQMD cascade simulation',
      size: '18k Au-Au events at 10 AGeV b=1 fm; conditional setup 30k events across b=1,3,5 fm',
      public: 'Official dataset link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'Different impact parameters for centrality conditioning',
      mixedSource: 'No cross-domain training; interpolation within UrQMD parameter space'
    },
    representation: {
      inputObjects: 'Generated particle-level event point clouds with momentum vector and one-hot species ID',
      pipeline: [
        'UrQMD particle event',
        'pad to fixed cloud with fake/padding particles',
        'conditional diffusion point cloud'
      ],
      variableLength: 'Padded to 1084 particles',
      paddingMasking: 'Fake/padding particles included',
      preprocessing: 'Particle-level output, not detector readout'
    },
    backbone: {
      architectureType: 'Conditional point-cloud diffusion',
      baseModel: 'Self-trained on UrQMD events',
      structure: 'PointNet-style encoder, normalizing-flow decoder for latent event conditioning, diffusion generator',
      objective: 'Generate full event point clouds conditioned on latent/global variables and optional impact parameter',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'No downstream fine-tuning benchmark',
      fineTuning: 'Not demonstrated'
    },
    summary: 'HEIDi/Event Diffusion is a strong generative surrogate for heavy-ion event generation, including centrality interpolation and speedup. It is best labeled as toward FM, since downstream reuse is not shown.',
    highlights: [
      'Generates full particle-level heavy-ion point clouds.',
      'Reproduces multiple UrQMD observables with large speedup.',
      'Tests impact-parameter interpolation at b=4 fm.',
      'No transfer-learning or downstream analysis suite yet.'
    ],
    benchmarks: [
      {
        task: 'Generated-vs-UrQMD validation',
        dataset: 'UrQMD Au-Au events',
        metrics: 'multiplicities, rapidity, pT spectra, momentum components, net charge, correlations',
        ood: 'No',
        fmEvidence: 'Partial: generative surrogate validation',
        realData: 'No'
      },
      {
        task: 'Centrality interpolation',
        dataset: 'conditional UrQMD b=1,3,5 fm training; b=4 fm test',
        metrics: 'observable agreement at unseen impact parameter',
        ood: 'Partial: impact-parameter interpolation within UrQMD',
        fmEvidence: 'Moderate for conditional simulation',
        realData: 'No'
      },
      {
        task: 'Generation speed',
        dataset: 'tested UrQMD setup',
        metrics: '~30 ms/event on A100 versus ~3 s/event UrQMD cascade',
        ood: 'No',
        fmEvidence: 'Utility evidence, not broad FM',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'A100 for reported generation speed',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'Not specified in the paper/project.',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'smeft',
    name: 'SMEFT FM',
    initials: 'SM',
    level: 'event',
    color: '#86efac',
    rarity: 'rare',
    badges: [
      'D'
    ],
    short: 'Theory-space SMEFT representation demonstrator.',
    arch: 'MLP contrastive encoder',
    title: 'Reusable theory representations for colliders: a demonstrator SMEFT foundation model',
    classification: 'Theory-space demonstrator only; not a transformer and not broad FM evidence.',
    fmEvidence: {
      level: 'Demonstrator',
      note: 'Conceptually useful reusable theory embedding, no process/detector transfer.'
    },
    tags: {
      modelType: [
        'demonstrator only',
        'theory representation'
      ],
      architecture: [
        'MLP contrastive encoder',
        'Dirichlet prior'
      ],
      domain: [
        'SMEFT',
        'Drell-Yan',
        'theory-level'
      ],
      evidence: [
        'uncertainty',
        'retrieval',
        'demonstrator'
      ]
    },
    dataset: {
      type: 'theory-level',
      generator: 'MadGraph5 neutral-current Drell-Yan pp -> mu+ mu- at tree-level SMEFT with CT18LO PDFs',
      size: '100 SMEFT universes x 10^4 replicas = 10^6 training examples',
      public: 'Official dataset/code link not specified',
      link: 'Not specified in the paper/project.',
      multipleDatasets: 'Binned m_ll and muon pT differential cross sections',
      mixedSource: 'No process transfer; one theory setup'
    },
    representation: {
      inputObjects: 'Fixed-length vectors of binned Drell-Yan differential cross sections',
      pipeline: [
        'SMEFT cross-section bins',
        'replicas sampled around covariance/uncertainty',
        'MLP latent vector'
      ],
      variableLength: 'Fixed-length vector; no event tokens or particle clouds',
      paddingMasking: 'None specified; not a token model',
      preprocessing: 'Binned m_ll and muon pT observables with uncertainty/covariance sampling'
    },
    backbone: {
      architectureType: 'Feed-forward MLP contrastive encoder',
      baseModel: 'Self-trained on SMEFT universes',
      structure: 'Three dense blocks with BatchNorm, ReLU, Dropout, 2D latent output; additional Dirichlet-prior classification/uncertainty head',
      objective: 'Supervised contrastive pair loss: same-universe replicas positive, different universes negative',
      parameters: 'Not specified in the paper/project.',
      trainableFrozen: 'All MLP components trained for demonstrator; no external frozen base',
      fineTuning: 'No transfer fine-tuning to other processes or detectors'
    },
    summary: 'The SMEFT entry must be corrected to a feed-forward contrastive encoder over binned theory vectors. It is a useful theory-space FM demonstrator, not a transformer or broad collider foundation model.',
    highlights: [
      'Uses binned Drell-Yan cross-section vectors, not events or tokens.',
      'Learns a 2D latent geometry for SMEFT deformation directions.',
      'Supports uncertainty-aware classification and retrieval-style queries.',
      'Demonstrator only: no process, detector, or real-data transfer.'
    ],
    benchmarks: [
      {
        task: 'Latent geometry check',
        dataset: '100 SMEFT universes with replicas',
        metrics: 'alignment of latent directions with SMEFT shape distortions',
        ood: 'No',
        fmEvidence: 'Demonstrator support',
        realData: 'No'
      },
      {
        task: 'Classification with uncertainty',
        dataset: 'SMEFT universe replicas',
        metrics: 'Dirichlet-prior entropy and mutual information',
        ood: 'Partial: anomaly/OOD-style uncertainty behavior',
        fmEvidence: 'Demonstrator only',
        realData: 'No'
      },
      {
        task: 'Retrieval',
        dataset: 'SMEFT universes near SM uncertainty contours',
        metrics: 'nearest-neighbor universes within 1, 3, and 6 sigma regions',
        ood: 'No',
        fmEvidence: 'Conceptual reusable-embedding evidence',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'Not specified in the paper/project.',
      gpu: 'Not specified in the paper/project.',
      trainingTime: 'early stopping used; exact time not specified',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'Adam, LR 1e-6',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'evenet',
    name: 'EveNet',
    initials: 'EV',
    level: 'event',
    color: '#00e5ff',
    rarity: 'legendary',
    featured: true,
    badges: [
      'G',
      'D',
      'SSL',
      'R'
    ],
    short: 'Event-level FM for discriminative and generative analysis tasks.',
    arch: 'Point-Edge Transformer',
    title: 'EveNet: A Foundation Model for Particle Collision Data Analysis',
    classification: 'Strong event-level analysis foundation model with realistic downstream transfer caveats.',
    fmEvidence: {
      level: 'Strong',
      note: 'Strongly supported for event-level analysis; full experimental deployment remains future work.'
    },
    tags: {
      modelType: [
        'foundation model',
        'event-level FM'
      ],
      architecture: [
        'Point-Edge Transformer',
        'masked diffusion',
        'assignment',
        'segmentation'
      ],
      domain: [
        'LHC events',
        'CMS Open Data',
        'real collision data'
      ],
      evidence: [
        'real-data benchmark',
        'systematics robustness',
        'OOD downstream tasks'
      ]
    },
    dataset: {
      type: 'Delphes pretraining + CMS Open Data simulation + real data downstream',
      generator: 'MadGraph5_aMC@NLO matrix elements, PYTHIA shower/hadronization, Delphes generic detector; CMS full-sim Open Data and DoubleMuon collision data downstream',
      size: '2.93B generated and 543M selected pretraining events; four downstream datasets',
      public: 'Datasets/checkpoints and code reported public',
      link: 'https://huggingface.co/datasets/Avencast/EveNet; https://github.com/EveNet-HEP',
      multipleDatasets: 'Yes: large pretraining corpus plus four downstream datasets',
      mixedSource: 'Yes: fast simulation to full CMS simulation and real CMS collision data'
    },
    representation: {
      inputObjects: 'Event-level point cloud of jets, b-jets, leptons, photons, MET/invisible tokens, and global observables',
      pipeline: [
        'reconstructed event objects',
        'object/global features + task conditioning/diffusion time',
        'Point-Edge Transformer event tokens'
      ],
      variableLength: 'Variable event content handled as point cloud/object tokens',
      paddingMasking: 'Task heads handle masked reconstruction, assignment, segmentation, classification, and generation',
      preprocessing: 'Task-specific object selection, conditioning variables, diffusion time steps for generative heads'
    },
    backbone: {
      architectureType: 'Point-Edge Transformer event backbone',
      baseModel: 'Self-trained on large Delphes event corpus',
      structure: 'Shared encoder plus classification, assignment, segmentation, SSL generative, and supervised generative heads',
      objective: 'Stage I SSL generative masked reconstruction; Stage II classification + SSL generation + supervised generation',
      parameters: 'Stage I 18.8M encoder + 1.3M head; Stage II 18.8M encoder + 3.8M heads',
      trainableFrozen: 'Fine-tuning jointly optimizes encoder/decoders with lower encoder LR than task heads',
      fineTuning: 'Mass-point search, exotic Higgs, ttbar quantum correlation, and DoubleMuon anomaly detection'
    },
    summary: 'EveNet is the event-level centerpiece: a multi-head Point-Edge Transformer pretrained on hundreds of millions of simulated events and transferred to CMS simulation and real collision-data workflows.',
    highlights: [
      'Integrates classification, assignment, segmentation, and generative reconstruction.',
      'Transfers from fast-sim pretraining to CMS full-sim Open Data and real DoubleMuon data.',
      'Shows sensitivity, data-efficiency, convergence, and systematics robustness gains.',
      'Strong FM evidence, with deployment caveats around full experimental systematics.'
    ],
    benchmarks: [
      {
        task: 'Heavy scalar X->YH_SM->bbWW* search',
        dataset: 'CMS Open Data simulation grid',
        metrics: 'maximum SIC; individual mass-point and parameterized training',
        ood: 'Yes: CMS full-sim Open Data process grid absent from Delphes pretraining',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'Exotic Higgs H_SM->aa->4b',
        dataset: 'QCD backgrounds and signal samples',
        metrics: 'SIC and pairing efficiency; EveNet-Full ~4.1 SIC vs scratch 1.6 and SPANet 1.4',
        ood: 'Yes: exotic Higgs downstream process absent from pretraining',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'Dileptonic ttbar quantum correlation',
        dataset: 'ttbar downstream sample',
        metrics: 'precision on D and lepton-quark pairing efficiency',
        ood: 'Partial: CMS full-sim downstream task; ttbar overlaps pretraining process family',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'DoubleMuon anomaly detection / Upsilon rediscovery',
        dataset: 'CMS Open Data DoubleMuon 2016 real collision data',
        metrics: 'median l-reweighted significance; calibrated EveNet-Full ~7.6 sigma vs CATHODE 6.4 sigma',
        ood: 'Yes: real CMS DoubleMuon collision data',
        fmEvidence: 'Strong',
        realData: 'Yes: CMS Open Data DoubleMuon 2016'
      },
      {
        task: 'Systematics robustness',
        dataset: 'JES and soft-MET variations',
        metrics: 'stability under variations without retraining',
        ood: 'Partial: systematic variations, not a new process/dataset',
        fmEvidence: 'Strong supporting evidence',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'NERSC Perlmutter, NVIDIA A100 GPUs and CPU cores',
      gpu: '512 A100 GPUs; 16,384 CPU cores',
      trainingTime: 'Not specified in the paper/project.',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'LION with EMA and cosine schedule',
      distributedStrategy: 'PyTorch Lightning and Ray distributed training'
    }
  },
  {
    id: 'omni-transfer-neutrino',
    name: 'Jets to neutrino',
    initials: 'Jν',
    level: 'cross',
    color: '#fcd34d',
    rarity: 'epic',
    badges: [
      'D'
    ],
    short: 'OmniLearned jet priors transferred to MINERvA neutrino tasks.',
    arch: 'PET2 transfer',
    title: 'Cross-Domain Transfer with Particle Physics Foundation Models: From Jets to Neutrino Interactions',
    classification: 'Cross-domain transfer evidence; not a standalone neutrino-pretrained FM.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Supports transferable particle-cloud priors from jets to neutrino interactions.'
    },
    tags: {
      modelType: [
        'cross-domain transfer',
        'derivative FM use'
      ],
      architecture: [
        'PET2',
        'point-global transformer baselines'
      ],
      domain: [
        'MINERvA Open Data',
        'neutrino',
        'scintillator calorimeter'
      ],
      evidence: [
        'available-energy regression',
        'pion final states',
        'cross-domain OOD'
      ]
    },
    dataset: {
      type: 'simulated MINERvA Open Data',
      generator: 'Standard MINERvA Monte Carlo playlists; exact generator/simulation chain not specified beyond playlists',
      size: '6M training, 700k validation, 700k test events',
      public: 'Yes: MINERvA Open Data and code public',
      link: 'https://minerva.fnal.gov/opendata/; https://github.com/gregorkrz/minerva-ml',
      multipleDatasets: 'Yes: Medium Energy FHC playlists 1A and 1B',
      mixedSource: 'Yes: OmniLearned pretrained on high-Q2 pp/ep data and fine-tuned on few-GeV neutrino interactions'
    },
    representation: {
      inputObjects: 'Variable-length reconstructed-object tokens plus global engineered features',
      pipeline: [
        'MINERvA reconstructed objects',
        'token caps + kinematics/PID/dE/dx/space/time features + 15 global features',
        'PET2 or point-global transformer input'
      ],
      variableLength: 'Up to 33 objects/event: muon, photons, blobs, and prongs',
      paddingMasking: 'Capped token sets; undefined channels zero-filled',
      preprocessing: 'eta, phi, log pT, log E, integer PID/node type, log mean dE/dx, x/y/z/time, type-summed globals'
    },
    backbone: {
      architectureType: 'OmniLearned PET2 transfer and point-global transformer baselines',
      baseModel: 'OmniLearned-small and OmniLearned-medium pretrained on mixed jet/collider data',
      structure: 'Small ~3M with 8 trunk blocks, 2 head blocks, 4 tokens/particle, width 128, 8 heads; medium ~53M frozen',
      objective: 'Separate classification and regression fine-tuning',
      parameters: '~3M small; ~53M medium',
      trainableFrozen: 'Small fine-tuned; medium backbone frozen due to compute constraints',
      fineTuning: 'Available-energy regression and pion final-state classification heads'
    },
    summary: 'Jets-to-neutrino transfer tests whether an OmniLearned particle-cloud prior survives a large domain shift to MINERvA reconstructed objects. It is strong evidence for reusable priors, not for a neutrino-native FM.',
    highlights: [
      'Uses processed MINERvA object tokens, not raw detector hits.',
      'Transfers from high-energy jet/collider pretraining to few-GeV neutrino interactions.',
      'Covers energy regression and charged/neutral pion final-state tagging.',
      'Pretrained small model improves performance and compute efficiency.'
    ],
    benchmarks: [
      {
        task: 'Available hadronic energy regression',
        dataset: 'MINERvA playlists 1A/1B simulation',
        metrics: 'Smooth L1 loss, IQR and MPV of residual ratio versus q3',
        ood: 'Yes: collider jets to MINERvA neutrino interactions',
        fmEvidence: 'Strong cross-domain transfer',
        realData: 'No'
      },
      {
        task: 'CC1pi+/- tagging',
        dataset: 'MINERvA pion final-state labels',
        metrics: 'AUPRC, AUROC, TPR at fixed FPR, binned by pion energy/angle',
        ood: 'Yes: collider jets to MINERvA neutrino interactions',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'CCNpi+/- tagging',
        dataset: 'MINERvA',
        metrics: 'AUPRC, AUROC, TPR at fixed FPR, binned by W',
        ood: 'Yes: collider jets to MINERvA neutrino interactions',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'CC1pi0 tagging',
        dataset: 'MINERvA',
        metrics: 'AUPRC, AUROC, TPR at fixed FPR, binned by pion kinematics',
        ood: 'Yes: collider jets to MINERvA neutrino interactions',
        fmEvidence: 'Strong',
        realData: 'No'
      },
      {
        task: 'Compute efficiency',
        dataset: 'MINERvA validation tasks',
        metrics: 'validation loss versus FLOPs and steps; pretrained OmniLearned-small reaches Transformer-small validation loss in about 45% fewer steps for classification and 50% fewer steps for regression',
        ood: 'Yes: compute study on MINERvA downstream tasks',
        fmEvidence: 'Supporting foundation-model utility',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'A100 GPU',
      gpu: 'single A100',
      trainingTime: '~6 hours classification; ~8 hours regression for OmniLearned-small',
      batchSize: '2048',
      optimizer: 'Adam, learning rate 1e-4',
      distributedStrategy: 'single-GPU fine-tuning'
    }
  },
  {
    id: 'omnicosmos',
    name: 'OmniCosmos',
    initials: 'OC',
    level: 'cross',
    color: '#fde68a',
    rarity: 'epic',
    badges: [
      'D'
    ],
    short: 'Jet-pretrained PET adapted to cosmological halo point clouds.',
    arch: 'OmniLearned transfer',
    title: 'OmniCosmos: Transferring Particle Physics Knowledge Across the Cosmos',
    classification: 'Far-transfer evidence for point-cloud priors beyond collider physics.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Useful far-transfer support, less central to LHC slide claims.'
    },
    tags: {
      modelType: [
        'far transfer',
        'derivative FM use'
      ],
      architecture: [
        'OmniLearned PET',
        'geometric pairwise features'
      ],
      domain: [
        'cosmology',
        'CosmoBench',
        'CAMELS-SAM',
        'Quijote'
      ],
      evidence: [
        'parameter regression',
        'velocity prediction',
        'far-transfer OOD'
      ]
    },
    dataset: {
      type: 'cosmological simulation',
      generator: 'CosmoBench CAMELS-SAM and Quijote dark-matter simulation suites',
      size: 'Up to 5000 halos/simulation; splits 600/204/196 CAMELS-SAM and 19651/6550/6551 Quijote',
      public: 'CosmoBench datasets public; code points to OmniLearned repository',
      link: 'https://github.com/ViniciusMikuni/OmniLearned',
      multipleDatasets: 'Yes: CAMELS-SAM and Quijote',
      mixedSource: 'Yes: jet-pretrained OmniLearned adapted to cosmological halo point clouds'
    },
    representation: {
      inputObjects: 'Point cloud of dark-matter halos/galaxies using positions as input',
      pipeline: [
        'halo positions',
        'geometric pairwise features + KNN neighborhoods',
        'adapted OmniLearned PET tokens'
      ],
      variableLength: 'OmniLearned handles variable multiplicity, but memory limits use to small model',
      paddingMasking: 'Not specified; point-cloud batching inherited from PET framework',
      preprocessing: 'coordinate differences, Euclidean distance, cosine distances; k=10 CAMELS-SAM and k=20 Quijote best studies'
    },
    backbone: {
      architectureType: 'Adapted OmniLearned Point-Edge Transformer',
      baseModel: 'OmniLearned-small pretrained on ~1B mixed jets',
      structure: 'Eight transformer blocks; incompatible input layers randomly initialized; output heads replaced',
      objective: 'Cosmological parameter regression and per-halo velocity prediction',
      parameters: '~2M trainable parameters in adapted setup',
      trainableFrozen: 'New/incompatible layers use higher learning rate; matching pretrained body loaded',
      fineTuning: 'Fine-tune/adapt for CAMELS-SAM and Quijote regression tasks'
    },
    summary: 'OmniCosmos stretches the OmniLearned particle-cloud prior into cosmological simulations. It is useful far-transfer evidence, strongest in low-data regimes, but outside the LHC detector/event core.',
    highlights: [
      'Adapts jet-pretrained point-edge attention to halo point clouds.',
      'Predicts cosmological parameters and halo velocities.',
      'Gains are modest but clearest in low-data settings.',
      'Conceptual cross-domain support rather than direct LHC evidence.'
    ],
    benchmarks: [
      {
        task: 'CAMELS-SAM parameter regression',
        dataset: 'CAMELS-SAM',
        metrics: 'R2 for Omega_m and sigma_8; 0.87/0.92 vs scratch 0.83/0.89',
        ood: 'Yes: jets to cosmology simulation domain',
        fmEvidence: 'Moderate far-transfer support',
        realData: 'No'
      },
      {
        task: 'CAMELS-SAM halo velocity prediction',
        dataset: 'CAMELS-SAM',
        metrics: 'R2_v; 0.301 vs scratch 0.299 and GNN 0.2865',
        ood: 'Yes: jets to cosmology simulation domain',
        fmEvidence: 'Partial/modest',
        realData: 'No'
      },
      {
        task: 'Quijote parameter regression',
        dataset: 'Quijote',
        metrics: 'R2; 0.849/0.871 vs scratch 0.838/0.868',
        ood: 'Yes: jets to cosmology simulation domain',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Quijote halo velocity prediction',
        dataset: 'Quijote',
        metrics: 'R2_v 0.471 vs scratch 0.470 and LLS 0.4347',
        ood: 'Yes: jets to cosmology simulation domain',
        fmEvidence: 'Partial/modest',
        realData: 'No'
      },
      {
        task: 'Data efficiency',
        dataset: 'CAMELS-SAM and Quijote simulation subsets',
        metrics: 'performance versus number of simulations',
        ood: 'Yes: data-efficiency study in cosmology domain',
        fmEvidence: 'Moderate in low-data regimes',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'OmniLearned base trained on NERSC Perlmutter; OmniCosmos fine-tuning hardware not specified',
      gpu: 'OmniLearned base: 32-512 A100 GPUs; OmniCosmos fine-tuning GPU count not specified',
      trainingTime: 'OmniLearned base: three passes over the 1B-jet corpus; OmniCosmos fine-tuning time not specified',
      batchSize: 'OmniLearned base: global batch 4096; OmniCosmos batch size scanned but final value not specified',
      optimizer: 'OmniLearned base uses Lion; OmniCosmos optimizer not specified',
      distributedStrategy: 'Not specified in the paper/project.'
    }
  },
  {
    id: 'omnimol',
    name: 'OmniMol',
    initials: 'OM',
    level: 'cross',
    color: '#facc15',
    rarity: 'epic',
    badges: [
      'D'
    ],
    short: 'Jet-pretrained PET adapted to molecular energy/force prediction.',
    arch: 'OmniLearned PET transfer',
    title: 'OmniMol: Transferring Particle Physics Knowledge to Molecular Dynamics with Point-Edge Transformers',
    classification: 'Far-transfer evidence for point-edge priors; benefits strongest in low-data or low-compute settings.',
    fmEvidence: {
      level: 'Moderate',
      note: 'Strong conceptual cross-domain evidence with task-specific caveats.'
    },
    tags: {
      modelType: [
        'far transfer',
        'derivative FM use'
      ],
      architecture: [
        'OmniLearned PET',
        'LoRA',
        'full fine-tuning',
        'conservative forces'
      ],
      domain: [
        'molecular dynamics',
        'OMoL25',
        'MLIP'
      ],
      evidence: [
        'energy/force regression',
        'low-data transfer',
        'A100 inference'
      ]
    },
    dataset: {
      type: 'molecular dynamics / molecular potential data',
      generator: 'OMoL25/oMol large-scale molecular dataset and Val-Comp evaluation',
      size: 'oMol-4M, oMol-100M/140M, and 100k subset studies',
      public: 'Code public; OMoL25 dataset source cited',
      link: 'https://github.com/ibrahimEls/OmniMol',
      multipleDatasets: 'Yes: different oMol sizes/subsets and Val-Comp evaluation',
      mixedSource: 'Yes: OmniLearned jet-pretrained PET adapted to molecular point clouds'
    },
    representation: {
      inputObjects: 'Variable-size molecular point clouds of atoms',
      pipeline: [
        'atom coordinates + atomic number + optional charge/spin',
        'centering + molecular pairwise features + standardization',
        'PET atom tokens with molecular heads'
      ],
      variableLength: 'Unordered variable-size atom point cloud; KNN local neighborhoods use k=15',
      paddingMasking: 'Not specified; point-cloud batching inherited from PET implementation',
      preprocessing: 'per-molecule centering; bag-of-atoms energy baseline plus residual; energy/force standardization'
    },
    backbone: {
      architectureType: 'Adapted OmniLearned Point-Edge Transformer',
      baseModel: 'OmniLearned jet-pretrained PET',
      structure: 'Molecular input encoders, bias MLP, per-atom force head, per-atom energy correction head, optional conservative/equivariant variant',
      objective: 'Energy and force regression for molecular learned interatomic potentials',
      parameters: 'small/medium/large direct variants reported as 2.2M/43.3M/306.3M parameters',
      trainableFrozen: 'LoRA rank 96 adapters freeze base body; full fine-tuning trains matching weights',
      fineTuning: 'LoRA or full fine-tuning on oMol training subsets; conservative variant derives forces from energy gradients'
    },
    summary: 'OmniMol adapts a jet-pretrained PET into a molecular learned interatomic potential. Pretraining helps most when molecular data or compute are limited; advantages shrink with large molecular training budgets.',
    highlights: [
      'Swaps in molecular encoders and energy/force heads around a PET body.',
      'Compares LoRA, full fine-tuning, direct forces, and conservative variants.',
      'Low-data and low-compute regimes show the clearest transfer gains.',
      'Far-transfer story, not direct LHC detector/event evidence.'
    ],
    benchmarks: [
      {
        task: 'Energy and force regression',
        dataset: 'Val-Comp',
        metrics: 'oMol-4M/Val-Comp MAE: OmniMol-m-d 1.341 meV/atom and 15.687 meV/A; OmniMol-l-d not reported in this table; eSEN-md-d 1.32/6.78 and AllScAIP-md-ft-cons 0.90/7.67',
        ood: 'Yes: jets to molecular-potential domain',
        fmEvidence: 'Moderate far-transfer support',
        realData: 'No'
      },
      {
        task: 'oMol-4M full-data comparison',
        dataset: 'oMol-4M',
        metrics: 'oMol-4M/Val-Comp: OmniMol-s-d 2.939/35.748, s-d-pt 3.018/34.938, m-d 1.341/15.687, m-d-pt 1.441/16.980 meV/atom and meV/A',
        ood: 'Yes: jets to molecular-potential domain',
        fmEvidence: 'Partial: pretrained advantage reduced with enough data',
        realData: 'No'
      },
      {
        task: 'oMol-100M/140M scaling',
        dataset: 'large oMol training sets',
        metrics: 'oMol-100M/140M: OmniMol-m-d 1.263/14.47 and OmniMol-l-d 1.04/13.59 versus eSEN-md-d 0.84/4.76 and AllScAIP-md-d 0.64/5.24',
        ood: 'Yes: jets to molecular-potential domain',
        fmEvidence: 'Partial/moderate',
        realData: 'No'
      },
      {
        task: '100k low-data subset',
        dataset: 'oMol 100k subset',
        metrics: '100k oMol subset: pretraining advantage +12.3%/+19.5% for OmniMol-s-d and +29.4%/+26.9% for OmniMol-m-d on energy/force MAE',
        ood: 'Yes: jets to molecular-potential domain',
        fmEvidence: 'Strongest support',
        realData: 'No'
      },
      {
        task: 'Low-compute two-pass training',
        dataset: 'oMol-4M two-pass setup',
        metrics: 'two-pass oMol-4M: OmniMol-m-d-pt 28.31/128.57 vs scratch 62.34/298.63 meV/atom and meV/A; reported advantage +54.6%/+56.9%',
        ood: 'Yes: low-compute study in molecular domain',
        fmEvidence: 'Moderate',
        realData: 'No'
      },
      {
        task: 'Inference speed',
        dataset: 'A100 O(100)-atom systems',
        metrics: 'one A100-40GB, O(100)-atom systems: OmniMol-m-d 9.861 ms / 184.00 atom-ns/day vs eSEN-md-d 34.199 ms / 53.05 and AllScAIP-md-d 28.289 ms / 64.14',
        ood: 'No',
        fmEvidence: 'Utility evidence',
        realData: 'No'
      }
    ],
    pretrainingResources: {
      hardware: 'A100-40GB GPUs',
      gpu: '32/128/512 A100-40GB for small/medium/large',
      trainingTime: '100 passes for oMol-4M; 15 passes for oMol-100M/140M',
      batchSize: 'Not specified in the paper/project.',
      optimizer: 'AdamW with OneCycle LR; LR 1e-3/3e-4/1e-4 for small/medium/large, betas 0.95/0.99, weight decay 1e-4',
      distributedStrategy: 'large multi-GPU training'
    }
  }
]

export const paperLinks = {
  panda: [
    {
      date: '2025-12-01',
      label: 'arXiv:2512.01324',
      url: 'https://arxiv.org/abs/2512.01324'
    }
  ],
  'neutrino-ssl': [
    {
      date: '2026-04-08',
      label: 'arXiv:2604.07037',
      url: 'https://arxiv.org/abs/2604.07037'
    }
  ],
  'calo-moe': [
    {
      date: '2026-03-27',
      label: 'arXiv:2603.28804',
      url: 'https://arxiv.org/abs/2603.28804'
    }
  ],
  fm4dirc: [
    {
      date: '2025-05-13',
      label: 'arXiv:2505.08736',
      url: 'https://arxiv.org/abs/2505.08736'
    }
  ],
  fm4npp: [
    {
      date: '2025-08-13',
      label: 'arXiv:2508.14087',
      url: 'https://arxiv.org/abs/2508.14087'
    }
  ],
  'vlm-neutrino': [
    {
      date: '2025-09-10',
      label: 'arXiv:2509.08461',
      url: 'https://arxiv.org/abs/2509.08461'
    },
    {
      date: '2025-08-26',
      label: 'arXiv:2508.19376',
      url: 'https://arxiv.org/abs/2508.19376'
    }
  ],
  omnilearned: [
    {
      date: '2024-04-24',
      label: 'arXiv:2404.16091',
      cardLabel: 'arXiv:2404.16091',
      treeName: 'OmniLearn',
      url: 'https://arxiv.org/abs/2404.16091'
    },
    {
      date: '2025-03-17',
      label: 'Phys. Rev. D 111, L051504 (2025)',
      cardLabel: 'PRD 111 L051504',
      url: 'https://doi.org/10.1103/PhysRevD.111.L051504'
    },
    {
      date: '2025-02-19',
      label: 'arXiv:2502.14652',
      cardLabel: 'arXiv:2502.14652',
      treeName: 'OmniLearn',
      url: 'https://arxiv.org/abs/2502.14652'
    },
    {
      date: '2025-03-14',
      label: 'Phys. Rev. D 111, 054015 (2025)',
      cardLabel: 'PRD 111 054015',
      url: 'https://doi.org/10.1103/PhysRevD.111.054015'
    },
    {
      date: '2025-10-28',
      label: 'arXiv:2510.24066',
      cardLabel: 'arXiv:2510.24066',
      treeName: 'OmniLearned',
      url: 'https://arxiv.org/abs/2510.24066'
    },
    {
      date: '2026-02-26',
      label: 'Phys. Rev. D 113, 032020 (2026)',
      cardLabel: 'PRD 113 032020',
      url: 'https://doi.org/10.1103/knmd-f5jm'
    },
    {
      date: '2026-03-09',
      label: 'arXiv:2603.08802',
      cardLabel: 'arXiv:2603.08802',
      treeName: 'OmniLearn benchmark',
      url: 'https://arxiv.org/abs/2603.08802'
    },
    {
      date: '2026-03-24',
      label: 'arXiv:2603.23593',
      cardLabel: 'arXiv:2603.23593',
      treeName: 'OmniLearned AD',
      url: 'https://arxiv.org/abs/2603.23593'
    }
  ],
  omnijet: [
    {
      date: '2024-03-08',
      label: 'arXiv:2403.05618',
      url: 'https://arxiv.org/abs/2403.05618'
    },
    {
      date: '2024-08-02',
      label: 'Mach. Learn.: Sci. Technol. 5 035031 (2024)',
      cardLabel: 'MLST 5 035031',
      url: 'https://doi.org/10.1088/2632-2153/ad66ad'
    },
    {
      date: '2025-12-03',
      label: 'arXiv:2512.04149',
      cardLabel: 'arXiv:2512.04149',
      treeName: 'OmniJet-α NTP',
      url: 'https://arxiv.org/abs/2512.04149'
    }
  ],
  sophon: [
    {
      date: '2024-05-21',
      label: 'arXiv:2405.12972',
      url: 'https://arxiv.org/abs/2405.12972'
    }
  ],
  mpmv2: [
    {
      date: '2024-09-19',
      label: 'arXiv:2409.12589',
      url: 'https://arxiv.org/abs/2409.12589'
    }
  ],
  bumblebee: [
    {
      date: '2024-12-10',
      label: 'arXiv:2412.07867',
      url: 'https://arxiv.org/abs/2412.07867'
    }
  ],
  rs3l: [
    {
      date: '2024-03-11',
      label: 'arXiv:2403.07066',
      url: 'https://arxiv.org/abs/2403.07066'
    },
    {
      date: '2025-02-21',
      label: 'Phys. Rev. D 111, 032010 (2025)',
      cardLabel: 'PRD 111 032010',
      url: 'https://doi.org/10.1103/PhysRevD.111.032010'
    }
  ],
  'tau-transfer': [
    {
      date: '2025-03-24',
      label: 'arXiv:2503.19165',
      url: 'https://arxiv.org/abs/2503.19165'
    },
    {
      date: '2025-07-04',
      label: 'SciPost Phys. Core 8, 046 (2025)',
      cardLabel: 'SciPost Core 8 046',
      url: 'https://scipost.org/SciPostPhysCore.8.3.046'
    }
  ],
  'hep-jepa': [
    {
      date: '2025-02-06',
      label: 'arXiv:2502.03933',
      url: 'https://arxiv.org/abs/2502.03933'
    }
  ],
  'joint-opt': [
    {
      date: '2024-01-24',
      label: 'arXiv:2401.13536',
      url: 'https://arxiv.org/abs/2401.13536'
    },
    {
      date: '2024-06-21',
      label: 'Mach. Learn.: Sci. Technol. 5 025075 (2024)',
      cardLabel: 'MLST 5 025075',
      url: 'https://doi.org/10.1088/2632-2153/ad55a3'
    }
  ],
  'event-transformer': [
    {
      date: '2025-11-12',
      label: 'arXiv:2511.09335',
      url: 'https://arxiv.org/abs/2511.09335'
    }
  ],
  pecm: [
    {
      date: '2024-12-14',
      label: 'arXiv:2412.10665',
      url: 'https://arxiv.org/abs/2412.10665'
    }
  ],
  'event-diffusion': [
    {
      date: '2024-12-13',
      label: 'arXiv:2412.10352',
      url: 'https://arxiv.org/abs/2412.10352'
    },
    {
      date: '2025-11-24',
      label: 'Phys. Rev. C 112, L051902 (2025)',
      cardLabel: 'PRC 112 L051902',
      url: 'https://doi.org/10.1103/6ndd-d1nl'
    },
    {
      date: '2025-02-22',
      label: 'arXiv:2502.16330',
      url: 'https://arxiv.org/abs/2502.16330'
    },
    {
      date: '2025-11-24',
      label: 'Phys. Rev. C 112, 054907 (2025)',
      cardLabel: 'PRC 112 054907',
      url: 'https://doi.org/10.1103/wyq5-hlp5'
    }
  ],
  smeft: [
    {
      date: '2025-12-17',
      label: 'arXiv:2512.15862',
      url: 'https://arxiv.org/abs/2512.15862'
    }
  ],
  evenet: [
    {
      date: '2026-01-23',
      label: 'arXiv:2601.17126',
      url: 'https://arxiv.org/abs/2601.17126'
    }
  ],
  'omni-transfer-neutrino': [
    {
      date: '2026-04-14',
      label: 'arXiv:2604.12364',
      url: 'https://arxiv.org/abs/2604.12364'
    }
  ],
  omnicosmos: [
    {
      date: '2025-12-30',
      label: 'arXiv:2512.24422',
      url: 'https://arxiv.org/abs/2512.24422'
    }
  ],
  omnimol: [
    {
      date: '2026-01-15',
      label: 'arXiv:2601.10791',
      url: 'https://arxiv.org/abs/2601.10791'
    }
  ]
}

export function modelsForLevelKey(levelKey) {
  return models.filter(model => model.level === levelKey)
}

export function modelById(id) {
  return models.find(model => model.id === id) ?? null
}

export function linksFor(model) {
  return paperLinks[model.id] ?? []
}

export function compactLinksFor(model) {
  return linksFor(model).slice(0, model.cardSourceLimit ?? 2)
}

export function firstSourceDate(model) {
  return linksFor(model)[0]?.date ?? '2024-01-01'
}

export function sourceYear(model) {
  return Number(firstSourceDate(model).slice(0, 4))
}

export function isArxiv(source) {
  return source.label.startsWith('arXiv:')
}

export function cardRef(source) {
  const label = source.cardLabel ?? source.label
  if (label.startsWith('arXiv:')) return label.slice(6)
  return label
}

/** Prefer arXiv entries so journal versions of the same paper are not duplicate leaves. */
export function treeSourcesFor(model) {
  const sources = linksFor(model)
  const arxiv = sources.filter(isArxiv)
  return arxiv.length > 0 ? arxiv : sources
}

function seriesBaseName(model) {
  return model.name
    .replace(/\s+series$/i, '')
    .replace(/\s+lineage$/i, '')
    .trim()
}

/** One tree leaf per distinct paper (arXiv when available, else sole source). */
export function treeLeaves() {
  return models.flatMap(model => {
    const sources = treeSourcesFor(model)
    const base = seriesBaseName(model)

    if (sources.length <= 1) {
      const source = sources[0]
      const date = source?.date ?? '2024-01-01'
      return [{
        leafId: model.id,
        modelId: model.id,
        level: model.level,
        name: model.name,
        arxivRef: source && isArxiv(source) ? cardRef(source) : null,
        sourceUrl: source?.url ?? null,
        date,
        color: model.color,
        featured: model.featured,
        summarizedTitle: model.summarizedTitle
      }]
    }

    return sources.map((source, sourceIndex) => ({
      leafId: `${model.id}-${cardRef(source)}`,
      modelId: model.id,
      level: model.level,
      name: source.treeName ?? base,
      arxivRef: cardRef(source),
      sourceUrl: source.url,
      date: source.date,
      color: model.color,
      featured: Boolean(model.featured && sourceIndex === 0),
      summarizedTitle: false
    }))
  })
}
