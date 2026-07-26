export const levels = [
  {
    key: 'raw',
    label: 'Raw detector',
    description: 'sensor hits, voxels, photons, calorimeter cells',
    color: '#67e8f9',
    icon: 'i-carbon:data-vis-1',
    groups: ['detector']
  },
  {
    key: 'jet',
    label: 'Constituent / jet',
    description: 'particle-flow objects, tracks, clustered jet constituents',
    color: '#c4b5fd',
    icon: 'i-carbon:chart-bubble-packed',
    groups: ['detector']
  },
  {
    key: 'event',
    label: 'Event / analysis',
    description: 'jets, leptons, MET, event objects, theory-level observables',
    color: '#6ee7b7',
    icon: 'i-carbon:network-4',
    groups: ['event']
  },
  {
    key: 'cross',
    label: 'Cross-domain transfer',
    description: 'jet-pretrained representations reused beyond jet tasks',
    color: '#fcd34d',
    icon: 'i-carbon:earth-filled',
    groups: ['event']
  }
]

export const models = [
  {
    id: 'panda',
    name: 'Panda',
    initials: 'PA',
    level: 'raw',
    domain: 'LArTPC / neutrino',
    color: '#67e8f9',
    rarity: 'rare',
    badges: ['D', 'SSL', 'low-label'],
    short: 'Reusable sensor-level representations.',
    arch: 'sparse 3D encoder',
    title: 'Self-distillation of reusable sensor-level representations for HEP',
    published: 'Dec 2025',
    representation: 'Raw detector response: LArTPC sensor hits',
    architecture: 'Hierarchical sparse 3D encoder with prototype self-distillation',
    data: 'Detector-level samples; label-efficiency study',
    summary: 'Panda moves the foundation-model idea down to sensor-level detector data, asking whether low-level LArTPC representations can be reused across segmentation and particle-ID tasks.',
    highlights: [
      'Learns reusable detector-level embeddings without relying on dense labels.',
      'Targets segmentation and particle identification at the sensor level.',
      'Reported label-efficiency gains make it a useful anchor for low-label detector regimes.'
    ],
    tags: ['raw detector', 'self-distillation', 'segmentation', 'particle ID', 'label efficient']
  },
  {
    id: 'neutrino-ssl',
    name: 'Neutrino SSL transformers',
    initials: 'νT',
    level: 'raw',
    domain: 'heterogeneous neutrino detectors',
    color: '#22d3ee',
    rarity: 'rare',
    badges: ['D', 'SSL', 'transfer'],
    short: 'Sparse ViT pretraining over voxelized detectors.',
    arch: 'sparse ViT',
    title: 'Foundation-style models for energy-frontier heterogeneous neutrino detectors',
    published: 'Apr 2026',
    summarizedTitle: true,
    representation: 'Raw detector response: sparse 3D calorimeter voxels',
    architecture: 'Sparse vision transformer with masked reconstruction and relational voxel objectives',
    data: 'Simulation across detector geometries',
    summary: 'This line tests whether self-supervised detector pretraining can transfer across heterogeneous neutrino detector designs and improve downstream energy/classification tasks.',
    highlights: [
      'Combines masked autoencoding with relational voxel-level objectives.',
      'Evaluates classification and energy regression after pretraining.',
      'Frames detector geometry transfer as a foundation-model problem.'
    ],
    tags: ['raw detector', 'sparse ViT', 'masked autoencoder', 'geometry transfer', 'neutrino']
  },
  {
    id: 'calo-moe',
    name: 'Calorimeter FM',
    initials: 'Ca',
    level: 'raw',
    domain: 'calorimetry',
    color: '#38bdf8',
    rarity: 'epic',
    badges: ['G', 'D', 'MoE'],
    short: 'Generalizable shower model with specialist adapters.',
    arch: 'next-token transformer',
    title: 'Generalizable foundation models for calorimetry via MoE and PEFT',
    published: 'Mar 2026',
    summarizedTitle: true,
    representation: 'Raw calorimeter energy deposition patterns',
    architecture: 'Next-token transformer with mixture-of-experts modules and parameter-efficient fine-tuning',
    data: 'Simulated calorimeter showers',
    summary: 'A generative calorimeter foundation model that starts from shower simulation, then adds adaptation paths for new materials, particle types, and regression-style downstream use.',
    highlights: [
      'Pretrains on electromagnetic showers and adapts to new materials.',
      'Uses MoE and PEFT to avoid full retraining for each detector condition.',
      'Illustrates how generative detector models are starting to support downstream tasks.'
    ],
    tags: ['raw detector', 'calorimetry', 'simulation', 'MoE', 'PEFT']
  },
  {
    id: 'fm4dirc',
    name: 'FM4DIRC',
    initials: 'DČ',
    level: 'raw',
    domain: 'DIRC / readout',
    color: '#06b6d4',
    rarity: 'epic',
    badges: ['G', 'D', 'MoE'],
    short: 'Mixed discrete/continuous readout foundation model.',
    arch: 'causal transformer',
    title: 'Foundation models for experimental readout systems combining discrete and continuous data',
    published: 'May 2025',
    representation: 'Raw readout: photon pixel/time sequences with kinematic conditioning',
    architecture: 'Next-token transformer with separate vocabularies, cross-attention, conditioning, and MoE',
    data: 'Detector readout simulation; downstream PID/noise studies',
    summary: 'FM4DIRC extends the foundation-model framing to detector readout streams, where discrete sensor identities and continuous variables have to be modeled together.',
    highlights: [
      'Generates photon pixel/time sequences conditioned on continuous variables.',
      'Supports fine-tuning for particle identification and noise filtering.',
      'Good example of generative detector modeling crossing into analysis tasks.'
    ],
    tags: ['readout', 'discrete + continuous', 'PID', 'noise filtering', 'detector modeling']
  },
  {
    id: 'fm4npp',
    name: 'FM4NPP',
    initials: 'FN',
    level: 'raw',
    domain: 'RHIC / sPHENIX TPC',
    color: '#22d3ee',
    rarity: 'legendary',
    badges: ['D', 'SSL', 'scaling'],
    short: 'Scaling FM on sparse TPC spacepoints.',
    arch: 'Mamba SSM',
    title: 'FM4NPP: A Scaling Foundation Model for Nuclear and Particle Physics',
    published: 'Aug 2025',
    representation: 'Raw detector response: TPC spacepoints (energy, x, y, z)',
    architecture: 'Mamba state-space backbone with hierarchical raster scan serialization and k-NN self-supervision',
    data: '11M+ sPHENIX p+p collision events; downstream track finding, PID, noise tagging',
    summary: 'FM4NPP pretrains on sparse collider spacepoints at RHIC scale, then adapts frozen representations to tracking and segmentation-style downstream tasks with lightweight adapters.',
    highlights: [
      'Demonstrates neural scaling up to 188M parameters on detector spacepoint sequences.',
      'Uses a detector-native self-supervised objective rather than language-style token prediction.',
      'Shows data-efficient adaptation with frozen FM weights across diverse NPP reconstruction tasks.'
    ],
    tags: ['raw detector', 'TPC', 'Mamba', 'scaling', 'track finding', 'self-supervised']
  },
  {
    id: 'vlm-neutrino',
    name: 'Neutrino VLM',
    initials: 'VL',
    level: 'raw',
    domain: 'neutrino images',
    color: '#7dd3fc',
    rarity: 'uncommon',
    badges: ['D', 'VLM'],
    short: 'Vision-language adaptation for neutrino events.',
    arch: 'vision-language transformer',
    title: 'Pretrained vision-language models for neutrino event classification',
    published: 'Aug/Sep 2025',
    summarizedTitle: true,
    representation: 'Raw detector images with text prompts',
    architecture: 'Vision-language transformer adapted to neutrino event classification',
    data: 'Pixelated neutrino interaction samples',
    summary: 'A multimodal branch of detector-level foundation modeling that tests whether pretrained vision-language representations help neutrino classification and interpretability.',
    highlights: [
      'Combines detector images with text embeddings.',
      'Targets neutrino event classification rather than collider jets.',
      'Shows an alternate path: reuse general visual-language pretraining for detector tasks.'
    ],
    tags: ['raw images', 'vision-language', 'classification', 'neutrino']
  },
  {
    id: 'omnilearned',
    name: 'OmniLearn series',
    initials: 'OL',
    level: 'jet',
    domain: 'LHC jets',
    color: '#c4b5fd',
    rarity: 'legendary',
    featured: true,
    badges: ['G', 'D', 'R', 'LHC'],
    short: 'OmniLearn to OmniLearned jet-FM lineage.',
    arch: 'Point-Edge / jet transformer',
    title: 'OmniLearn / OmniLearned lineage for reusable jet representations',
    published: 'Apr 2024 / Feb 2025 / Oct 2025',
    cardSourceLimit: 6,
    representation: 'Jet / constituent-level particle data',
    architecture: 'OmniLearn Point-Edge/jet foundation representation, upgraded in OmniLearned with larger training scale and software support',
    data: 'Jet datasets and benchmarks, including large-scale jet pretraining and downstream evaluations',
    summary: 'The OmniLearn series is the central jet-level FM lineage: the 2024/2025 OmniLearn papers establish reusable jet representations across reconstruction, uncertainty, anomaly, generation, and likelihood tasks; OmniLearned scales this into a larger framework.',
    highlights: [
      'Uses learned jet representations across multiple collider-physics workflows instead of one isolated classifier.',
      'Connects tagging, anomaly detection, generation, likelihood-ratio estimation, and uncertainty workflows.',
      'Provides the base lineage for cross-domain transfer examples such as neutrino, cosmology, and molecular dynamics.'
    ],
    tags: ['jet constituents', 'OmniLearn lineage', 'multi-task', 'generative + discriminative', 'transfer']
  },
  {
    id: 'omnijet',
    name: 'OmniJet-alpha',
    initials: 'OJ',
    level: 'jet',
    domain: 'LHC jets',
    color: '#a78bfa',
    rarity: 'epic',
    badges: ['G', 'D', 'tokens'],
    short: 'Cross-task jet model with tokenized sequences.',
    arch: 'causal transformer',
    title: 'The first cross-task foundation model for particle physics',
    published: 'Mar 2024; MLST Aug 2024',
    representation: 'Tokenized jet constituent sequences',
    architecture: 'Causal transformer with next-token prediction and masked particle modeling',
    data: 'JetClass simulated jets; published in Mach. Learn.: Sci. Technol. 5 035031 (2024)',
    summary: 'OmniJet-alpha is a clean example of language-model-style pretraining applied to particle jets, combining next-token and masked objectives for both generation and tagging.',
    highlights: [
      'Uses tokenized jet sequences as the modeling substrate.',
      'Demonstrates cross-task behavior for tagging and simulation-oriented tasks.',
      'Motivates later work on whether tokenization is necessary for jet FMs.'
    ],
    tags: ['jet constituents', 'next-token', 'masked particle modeling', 'tokenization']
  },
  {
    id: 'sophon',
    name: 'Sophon',
    initials: 'SO',
    level: 'jet',
    domain: 'LHC boosted jets',
    color: '#9f7aea',
    rarity: 'epic',
    badges: ['D', 'SSL', 'LHC'],
    short: '188-class signature-oriented jet pretraining.',
    arch: 'Particle Transformer',
    title: 'Accelerating Resonance Searches via Signature-Oriented Pre-training',
    published: 'May 2024',
    representation: 'Jet / constituent-level large-R jet inputs',
    architecture: 'Particle Transformer (ParT) with 188-class signature-oriented supervised pretraining',
    data: 'JetClass-II dataset spanning resonance and QCD jet signatures',
    summary: 'Sophon learns broad boosted-jet signatures from JetClass-II, then supplies optimized taggers and latent features for model-specific and model-agnostic BSM resonance searches.',
    highlights: [
      'Covers 188 finely categorized jet-signature classes for resonance and QCD backgrounds.',
      'Builds tagging discriminants directly from pretrained outputs or via transfer learning.',
      'Targets sensitivity gains across many boosted final states rather than one topology.'
    ],
    tags: ['jet constituents', 'ParT', 'JetClass-II', 'tagging', 'resonance search', 'transfer']
  },
  {
    id: 'mpmv2',
    name: 'MPMv2',
    initials: 'MP',
    level: 'jet',
    domain: 'LHC jets',
    color: '#b794f4',
    rarity: 'epic',
    badges: ['D', 'SSL'],
    short: 'Tokenization-free masked particle modeling.',
    arch: 'masked-set transformer',
    title: 'Is Tokenization Needed for Masked Particle Modelling?',
    published: 'Sep 2024',
    representation: 'Jet / constituent-level particle sets with kinematics and ID features',
    architecture: 'Masked particle modeling with improved decoder and continuous generative reconstruction targets',
    data: 'JetClass pretraining; JetClass and BTag downstream benchmarks',
    summary: 'MPMv2 refines masked particle modeling for jet foundation models, showing that continuous conditional reconstruction can match or beat VQVAE token targets across classification, vertexing, and track-ID tasks.',
    highlights: [
      'Removes the separate VQVAE tokenizer used in the original MPM pipeline.',
      'Introduces a broader jet-FM benchmark with classification, secondary-vertex, and track-ID tasks.',
      'Keeps simulation-free self-supervision applicable to experimental jet data.'
    ],
    tags: ['jet constituents', 'masked particle modeling', 'self-supervised', 'tokenization-free', 'classification']
  },
  {
    id: 'bumblebee',
    name: 'Bumblebee',
    initials: 'BB',
    level: 'event',
    domain: 'dileptonic top events',
    color: '#6ee7b7',
    rarity: 'rare',
    badges: ['D', 'SSL', 'LHC'],
    short: 'BERT-style event FM over particle four-vectors.',
    arch: 'BERT-style transformer',
    title: 'Foundation model for particle physics discovery',
    published: 'Dec 2024',
    representation: 'Event-level particle four-vectors at generator and reconstruction level',
    architecture: 'BERT-inspired transformer without positional encodings, pretrained with a masked task over particle four-vectors',
    data: 'Dileptonic top-quark event samples; downstream top reconstruction and discovery-style classification tasks',
    summary: 'Bumblebee is an event-level self-supervised model, not a jet-only representation. It learns order-invariant event representations from particle four-vectors and reuses them for dileptonic top reconstruction, toponium discrimination, and initial-state classification.',
    highlights: [
      'Removes positional encodings so event particles are treated as an unordered set.',
      'Uses masked pretraining to capture generator- and reconstruction-level information.',
      'Reports improved dileptonic top reconstruction and strong downstream discrimination performance.'
    ],
    tags: ['event level', 'BERT-style', 'masked pretraining', 'top reconstruction', 'classification']
  },
  {
    id: 'rs3l',
    name: 'RS3L',
    initials: 'RS',
    level: 'jet',
    domain: 'jets / simulation pipeline',
    color: '#8b5cf6',
    rarity: 'rare',
    badges: ['D', 'SSL', 'robust'],
    short: 'Re-simulation pairs for self-supervised pretraining.',
    arch: 'contrastive SSL',
    title: 'Re-simulation-based self-supervised learning for pretraining foundation models',
    published: 'Mar 2024',
    representation: 'Jet / constituent-level data with simulator-derived augmentations',
    architecture: 'Contrastive self-supervised learning using re-simulation pairs',
    data: 'Simulator variations along the HEP pipeline',
    summary: 'RS3L uses re-simulation as physics-aware augmentation, turning detector/simulation variations into pairs for robust self-supervised representation learning.',
    highlights: [
      'Uses the simulator itself as a source of positive pairs.',
      'Targets robust downstream classification and uncertainty mitigation.',
      'Important because the augmentation strategy is HEP-native, not imported blindly from vision.'
    ],
    tags: ['jet constituents', 'self-supervised', 'contrastive', 'robustness', 'uncertainty']
  },
  {
    id: 'tau-transfer',
    name: 'Tau transfer',
    initials: 'τ',
    level: 'jet',
    domain: 'tau reconstruction',
    color: '#a855f7',
    rarity: 'rare',
    badges: ['D', 'transfer'],
    short: 'Fine-tunes OmniJet-alpha for tau ID and regression.',
    arch: 'OmniJet fine-tune',
    title: 'Reconstructing hadronically decaying tau leptons with a jet foundation model',
    published: 'Mar 2025; SciPost 2025',
    representation: 'Jet / constituent-level tau candidates',
    architecture: 'OmniJet-alpha foundation model fine-tuned for tau reconstruction',
    data: 'Tau reconstruction benchmarks',
    summary: 'This is a concrete OmniJet-alpha transfer-learning example: the pretrained jet foundation model is adapted to tau identification and momentum regression.',
    highlights: [
      'Demonstrates cross-task reuse from OmniJet-alpha inside the constituent-level ecosystem.',
      'Targets both tau ID and momentum regression.',
      'Useful evidence that pretraining can reduce task-specific training burden.'
    ],
    tags: ['jet constituents', 'OmniJet-alpha', 'tau ID', 'momentum regression', 'transfer']
  },
  {
    id: 'hep-jepa',
    name: 'HEP-JEPA',
    initials: 'JE',
    level: 'jet',
    domain: 'jets',
    color: '#b794f4',
    rarity: 'uncommon',
    badges: ['D', 'SSL', 'EBM'],
    short: 'Energy-based predictive embedding for jets.',
    arch: 'JEPA / energy-based',
    title: 'Generative energy-based models for particle jets',
    published: 'Feb 2025',
    representation: 'Jet / constituent-level inputs',
    architecture: 'Joint embedding predictive architecture with energy-based training',
    data: 'Jet benchmarks',
    summary: 'HEP-JEPA is another path to reusable jet embeddings, using predictive latent objectives instead of pure supervised tagging.',
    highlights: [
      'Learns latent jet representations through predictive coding.',
      'Supports downstream classification and anomaly-detection-style use.',
      'Broadens the jet FM architecture menu beyond plain transformers.'
    ],
    tags: ['jet constituents', 'JEPA', 'energy-based', 'anomaly detection']
  },
  {
    id: 'joint-opt',
    name: 'Joint optimization',
    initials: 'JO',
    level: 'jet',
    domain: 'di-Higgs 4b jets',
    color: '#b794f4',
    rarity: 'rare',
    badges: ['D', 'analysis'],
    short: 'ParT jet embeddings fine-tuned for analysis optimization.',
    arch: 'Particle Transformer',
    title: 'Finetuning foundation models for joint analysis optimization',
    published: 'Jan 2024',
    summarizedTitle: true,
    representation: 'Jet constituent-level embeddings for heavy-resonance to di-Higgs to four-b-jet searches',
    architecture: 'Particle Transformer (ParT) representation backbone with fine-tuning/domain adaptation for analysis objectives',
    data: 'LHC-style simulated heavy-resonance analysis studies',
    summary: 'This work is best treated as jet/constituent-level representation reuse, because the backbone is a Particle Transformer over jet constituents. Its key point is joint optimization of reconstruction and analysis through fine-tuned embeddings.',
    highlights: [
      'Uses ParT-style jet representations rather than a native whole-event FM.',
      'Quantifies gains in a heavy-resonance to di-Higgs to four-b-jet search.',
      'Important bridge from jet representations into analysis-level optimization.'
    ],
    tags: ['jet constituents', 'ParT', 'analysis optimization', 'fine-tuning', 'domain adaptation']
  },
  {
    id: 'event-transformer',
    name: 'Event transformer',
    initials: 'ET',
    level: 'event',
    domain: 'top-quark events',
    color: '#34d399',
    rarity: 'rare',
    badges: ['D', 'multi-task'],
    short: 'Foundational transformer methodology for collider events.',
    arch: 'multi-task transformer',
    title: 'A methodology for developing foundational transformer models in collider analysis',
    published: 'Nov 2025',
    summarizedTitle: true,
    representation: 'Event-level top-quark final states',
    architecture: 'Multi-task transformer with adaptive attention',
    data: 'Collider event benchmarks',
    summary: 'An event-level foundation-model methodology that processes multiple top-quark final-state signatures and looks for reusable patterns across processes.',
    highlights: [
      'Works directly with event-level analysis objects.',
      'Targets classification/regression across several processes.',
      'Useful stepping stone between jet FMs and full event-analysis FMs.'
    ],
    tags: ['event level', 'multi-task', 'transformer', 'top physics']
  },
  {
    id: 'pecm',
    name: 'PECM',
    initials: 'PE',
    level: 'event',
    domain: 'LHC event analysis',
    color: '#4ade80',
    rarity: 'epic',
    badges: ['D', 'SSL', 'LHC'],
    short: 'GNN event FM on 120M collision events.',
    arch: 'graph neural network',
    title: 'Pretrained Event Classification Model for High Energy Physics Analysis',
    published: 'Dec 2024',
    summarizedTitle: true,
    representation: 'Event-level reconstructed objects: leptons, photons, jets, MET',
    architecture: 'Graph neural network pretrained with multiclass and multilabel discriminative objectives',
    data: '120M simulated pp events across 12 SM processes; seven downstream tasks including ATLAS Open Data',
    summary: 'PECM is a large-scale event-level GNN foundation model pretrained on diverse Higgs and top processes, then fine-tuned for BSM and SM classification tasks with strong low-data gains.',
    highlights: [
      'Pretrains on 120 million events spanning twelve Higgs and top production modes.',
      'Fine-tunes to unseen processes and ATLAS Open Data across simulation frameworks.',
      'CKA analysis shows preserved encoders with task-specialized message-passing layers after fine-tuning.'
    ],
    tags: ['event level', 'GNN', 'multiclass', 'multilabel', 'fine-tuning', 'ATLAS Open Data']
  },
  {
    id: 'event-diffusion',
    name: 'Heavy-ion diffusion',
    initials: 'ED',
    level: 'jet',
    domain: 'heavy-ion point clouds',
    color: '#a78bfa',
    rarity: 'epic',
    badges: ['G', 'diffusion'],
    short: 'Generates particle-level heavy-ion point clouds.',
    arch: 'point-cloud diffusion',
    title: 'Towards foundation models for heavy-ion collision experiments',
    published: 'Dec 2024 / Feb 2025',
    summarizedTitle: true,
    cardSourceLimit: 4,
    representation: 'Particle-level heavy-ion event output as point clouds: momentum vectors plus particle ID',
    architecture: 'Conditional point-cloud diffusion model with event-level conditioning',
    data: 'UrQMD heavy-ion cascade simulation studies',
    summary: 'This work generates full heavy-ion collision outputs, but the modeling substrate is a particle point cloud. For this representation-level slide, it fits better with constituent/particle-level models than with calibrated event-analysis objects.',
    highlights: [
      'Represents each generated particle with momentum information and species ID.',
      'Targets ultra-fast event-by-event heavy-ion simulation.',
      'Shows the generative branch of FM work at particle/point-cloud granularity.'
    ],
    tags: ['particle point cloud', 'heavy-ion', 'diffusion', 'simulation']
  },
  {
    id: 'smeft',
    name: 'SMEFT FM',
    initials: 'SM',
    level: 'event',
    domain: 'theory / collider observables',
    color: '#86efac',
    rarity: 'rare',
    badges: ['D', 'retrieval'],
    short: 'Reusable theory-space representations for colliders.',
    arch: 'contrastive transformer',
    title: 'Reusable theory representations for colliders: a demonstrator SMEFT foundation model',
    published: 'Dec 2025',
    representation: 'Event/theory-level Drell-Yan cross sections and SMEFT deformations',
    architecture: 'Contrastive transformer encoder over theory variations',
    data: 'Theory-level collider observables',
    summary: 'This model shifts the “representation” question from detector data to theory space, learning latent directions corresponding to SMEFT deformations.',
    highlights: [
      'Builds a latent manifold for SMEFT deformations.',
      'Supports classification, anomaly detection, and retrieval-style use.',
      'Expands the FM conversation beyond raw detector or jet representations.'
    ],
    tags: ['theory representation', 'SMEFT', 'contrastive', 'retrieval']
  },
  {
    id: 'evenet',
    name: 'EveNet',
    initials: 'EV',
    level: 'event',
    domain: 'LHC event analysis',
    color: '#00e5ff',
    rarity: 'legendary',
    featured: true,
    badges: ['G', 'D', 'LHC'],
    short: 'Reusable representations at event-analysis level.',
    arch: 'graph transformer',
    title: 'A foundation model for particle collision data analysis',
    published: 'Jan 2026',
    representation: 'Event-level objects: jets, leptons, MET',
    architecture: 'Graph transformer with object-to-token attention and task-specific heads',
    data: 'Large LHC-style event samples',
    summary: 'EveNet is positioned as the integration point for this overview: it tests whether reusable representations can be learned directly from event-analysis objects rather than only detector or constituent-level inputs.',
    highlights: [
      'Targets classification, regression, and generative event simulation in one framework.',
      'Operates on calibrated analysis objects rather than raw detector cells.',
      'Connects the major trends: multi-task pretraining, transfer, reusable embeddings, and generative/discriminative integration.'
    ],
    tags: ['event level', 'graph transformer', 'multi-task', 'generative + discriminative', 'analysis oriented']
  },
  {
    id: 'omni-transfer-neutrino',
    name: 'Jets to neutrino',
    initials: 'Jν',
    level: 'cross',
    domain: 'jets → MINERvA',
    color: '#fcd34d',
    rarity: 'epic',
    badges: ['D', 'transfer'],
    short: 'Transfers OmniLearned to neutrino interaction tasks.',
    arch: 'OmniLearned transfer',
    title: 'Cross-domain transfer with particle physics foundation models',
    published: 'Apr 2026',
    representation: 'Jet / constituent pretraining transferred to raw neutrino detector tasks',
    architecture: 'OmniLearned-style transformer foundation model fine-tuned cross-domain',
    data: 'Jets and neutrino interaction samples',
    summary: 'A strong example of reusable representations across experimental regimes: an OmniLearned-style jet-pretrained FM is adapted to lower-energy neutrino interactions.',
    highlights: [
      'Fine-tunes an OmniLearned-style jet-pretrained model on energy regression and pion final-state classification.',
      'Tests cross-domain reuse rather than same-domain transfer only.',
      'Directly supports the “foundation model = reusable representation” thesis.'
    ],
    tags: ['cross-domain', 'OmniLearned', 'neutrino', 'transfer learning', 'energy regression']
  },
  {
    id: 'omnicosmos',
    name: 'OmniCosmos',
    initials: 'OC',
    level: 'cross',
    domain: 'jets → cosmology',
    color: '#fde68a',
    rarity: 'epic',
    badges: ['D', 'transfer'],
    short: 'Transfers OmniLearned representations to cosmology.',
    arch: 'OmniLearned transfer',
    title: 'Transferring particle physics knowledge across the cosmos',
    published: 'Dec 2025',
    representation: 'Jet-level pretraining transferred to cosmological halos/galaxies',
    architecture: 'OmniLearned-based particle-physics representation fine-tuned for cosmology',
    data: 'N-body simulation tasks',
    summary: 'OmniCosmos asks whether OmniLearned representations learned from particle jets can help cosmological N-body tasks, stretching “foundation” beyond HEP task boundaries.',
    highlights: [
      'Predicts cosmological parameters and halo/galaxy velocities.',
      'Tests OmniLearned transfer across scientific domains, not just HEP datasets.',
      'Useful for students seeing why representation reuse is the central issue.'
    ],
    tags: ['cross-domain', 'OmniLearned', 'cosmology', 'N-body', 'transfer']
  },
  {
    id: 'omnimol',
    name: 'OmniMol',
    initials: 'OM',
    level: 'cross',
    domain: 'jets → molecules',
    color: '#facc15',
    rarity: 'epic',
    badges: ['D', 'transfer'],
    short: 'Particle-physics pretraining for molecular dynamics.',
    arch: 'point-edge transformer',
    title: 'Transferring particle physics knowledge to molecular dynamics',
    published: 'Jan 2026',
    representation: 'Particle/atomic positions and pairwise interactions',
    architecture: 'OmniLearned-based Point-Edge Transformer with interaction-matrix attention bias',
    data: 'Small-molecule potential prediction tasks',
    summary: 'OmniMol is another stress test for reusable physics representations: an OmniLearned-style jet-pretrained structure is transferred to molecular potential prediction.',
    highlights: [
      'Injects pairwise physics through point-edge attention.',
      'Uses OmniLearned particle-physics pretraining for molecular energy regression.',
      'Shows that the FM question is becoming broader than collider analysis alone.'
    ],
    tags: ['cross-domain', 'OmniLearned', 'molecular dynamics', 'point-edge attention', 'energy regression']
  }
]

export const paperLinks = {
  panda: [
    { date: '2025-12-01', label: 'arXiv:2512.01324', url: 'https://arxiv.org/abs/2512.01324' }
  ],
  'neutrino-ssl': [
    { date: '2026-04-08', label: 'arXiv:2604.07037', url: 'https://arxiv.org/abs/2604.07037' }
  ],
  'calo-moe': [
    { date: '2026-03-27', label: 'arXiv:2603.28804', url: 'https://arxiv.org/abs/2603.28804' }
  ],
  fm4dirc: [
    { date: '2025-05-13', label: 'arXiv:2505.08736', url: 'https://arxiv.org/abs/2505.08736' }
  ],
  fm4npp: [
    { date: '2025-08-13', label: 'arXiv:2508.14087', url: 'https://arxiv.org/abs/2508.14087' }
  ],
  'vlm-neutrino': [
    { date: '2025-09-10', label: 'arXiv:2509.08461', url: 'https://arxiv.org/abs/2509.08461' },
    { date: '2025-08-26', label: 'arXiv:2508.19376', url: 'https://arxiv.org/abs/2508.19376' }
  ],
  omnilearned: [
    { date: '2024-04-24', label: 'arXiv:2404.16091', cardLabel: 'arXiv:2404.16091', treeName: 'OmniLearn', url: 'https://arxiv.org/abs/2404.16091' },
    { date: '2025-03-17', label: 'Phys. Rev. D 111, L051504 (2025)', cardLabel: 'PRD 111 L051504', url: 'https://doi.org/10.1103/PhysRevD.111.L051504' },
    { date: '2025-02-19', label: 'arXiv:2502.14652', cardLabel: 'arXiv:2502.14652', treeName: 'OmniLearn', url: 'https://arxiv.org/abs/2502.14652' },
    { date: '2025-03-14', label: 'Phys. Rev. D 111, 054015 (2025)', cardLabel: 'PRD 111 054015', url: 'https://doi.org/10.1103/PhysRevD.111.054015' },
    { date: '2025-10-28', label: 'arXiv:2510.24066', cardLabel: 'arXiv:2510.24066', treeName: 'OmniLearned', url: 'https://arxiv.org/abs/2510.24066' },
    { date: '2026-02-26', label: 'Phys. Rev. D 113, 032020 (2026)', cardLabel: 'PRD 113 032020', url: 'https://doi.org/10.1103/knmd-f5jm' },
    { date: '2026-03-09', label: 'arXiv:2603.08802', cardLabel: 'arXiv:2603.08802', treeName: 'OmniLearn benchmark', url: 'https://arxiv.org/abs/2603.08802' },
    { date: '2026-03-24', label: 'arXiv:2603.23593', cardLabel: 'arXiv:2603.23593', treeName: 'OmniLearned AD', url: 'https://arxiv.org/abs/2603.23593' }
  ],
  omnijet: [
    { date: '2024-03-08', label: 'arXiv:2403.05618', url: 'https://arxiv.org/abs/2403.05618' },
    { date: '2024-08-02', label: 'Mach. Learn.: Sci. Technol. 5 035031 (2024)', cardLabel: 'MLST 5 035031', url: 'https://doi.org/10.1088/2632-2153/ad66ad' },
    { date: '2025-12-03', label: 'arXiv:2512.04149', cardLabel: 'arXiv:2512.04149', treeName: 'OmniJet-α NTP', url: 'https://arxiv.org/abs/2512.04149' }
  ],
  sophon: [
    { date: '2024-05-21', label: 'arXiv:2405.12972', url: 'https://arxiv.org/abs/2405.12972' }
  ],
  mpmv2: [
    { date: '2024-09-19', label: 'arXiv:2409.12589', url: 'https://arxiv.org/abs/2409.12589' }
  ],
  bumblebee: [
    { date: '2024-12-10', label: 'arXiv:2412.07867', url: 'https://arxiv.org/abs/2412.07867' }
  ],
  rs3l: [
    { date: '2024-03-11', label: 'arXiv:2403.07066', url: 'https://arxiv.org/abs/2403.07066' },
    { date: '2025-02-21', label: 'Phys. Rev. D 111, 032010 (2025)', cardLabel: 'PRD 111 032010', url: 'https://doi.org/10.1103/PhysRevD.111.032010' }
  ],
  'tau-transfer': [
    { date: '2025-03-24', label: 'arXiv:2503.19165', url: 'https://arxiv.org/abs/2503.19165' },
    { date: '2025-07-04', label: 'SciPost Phys. Core 8, 046 (2025)', cardLabel: 'SciPost Core 8 046', url: 'https://scipost.org/SciPostPhysCore.8.3.046' }
  ],
  'hep-jepa': [
    { date: '2025-02-06', label: 'arXiv:2502.03933', url: 'https://arxiv.org/abs/2502.03933' }
  ],
  'joint-opt': [
    { date: '2024-01-24', label: 'arXiv:2401.13536', url: 'https://arxiv.org/abs/2401.13536' },
    { date: '2024-06-21', label: 'Mach. Learn.: Sci. Technol. 5 025075 (2024)', cardLabel: 'MLST 5 025075', url: 'https://doi.org/10.1088/2632-2153/ad55a3' }
  ],
  'event-transformer': [
    { date: '2025-11-12', label: 'arXiv:2511.09335', url: 'https://arxiv.org/abs/2511.09335' }
  ],
  pecm: [
    { date: '2024-12-14', label: 'arXiv:2412.10665', url: 'https://arxiv.org/abs/2412.10665' }
  ],
  'event-diffusion': [
    { date: '2024-12-13', label: 'arXiv:2412.10352', url: 'https://arxiv.org/abs/2412.10352' },
    { date: '2025-11-24', label: 'Phys. Rev. C 112, L051902 (2025)', cardLabel: 'PRC 112 L051902', url: 'https://doi.org/10.1103/6ndd-d1nl' },
    { date: '2025-02-22', label: 'arXiv:2502.16330', url: 'https://arxiv.org/abs/2502.16330' },
    { date: '2025-11-24', label: 'Phys. Rev. C 112, 054907 (2025)', cardLabel: 'PRC 112 054907', url: 'https://doi.org/10.1103/wyq5-hlp5' }
  ],
  smeft: [
    { date: '2025-12-17', label: 'arXiv:2512.15862', url: 'https://arxiv.org/abs/2512.15862' }
  ],
  evenet: [
    { date: '2026-01-23', label: 'arXiv:2601.17126', url: 'https://arxiv.org/abs/2601.17126' }
  ],
  'omni-transfer-neutrino': [
    { date: '2026-04-14', label: 'arXiv:2604.12364', url: 'https://arxiv.org/abs/2604.12364' }
  ],
  omnicosmos: [
    { date: '2025-12-30', label: 'arXiv:2512.24422', url: 'https://arxiv.org/abs/2512.24422' }
  ],
  omnimol: [
    { date: '2026-01-15', label: 'arXiv:2601.10791', url: 'https://arxiv.org/abs/2601.10791' }
  ],
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
