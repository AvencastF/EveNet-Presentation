# Foundation Model Entries: Final Verification and Curation Review

Review date: 2026-05-23

Scope: Slide 4, Slide 5, and `AI_LHC_2026/data/foundationModels.js`.

Local evidence reviewed: downloaded HTML/PDF/text resources in `/Users/avencast/Desktop/Work/FM_papers`, extracted to `/private/tmp/FM_text`, plus the current `foundationModels.js` library.

Status labels used below:

- VERIFIED: current library/slides are broadly accurate.
- NEEDS UPDATE: the entry is useful but should be corrected or sharpened.
- MISSING INFO: the paper/project does not specify enough detail.
- POSSIBLY INCORRECT: current wording appears misleading or contradicted by the source.

## High-Priority Corrections

- POSSIBLY INCORRECT: `smeft` is not a contrastive transformer in the demonstrator. It uses a small feed-forward contrastive encoder over binned theory cross-section vectors.
- POSSIBLY INCORRECT: `hep-jepa` should not carry `G`, `EBM`, or anomaly-detection implications. It is a JEPA/latent-prediction SSL model, not a generative or energy-based model in the paper.
- NEEDS UPDATE: `event-transformer` is preliminary and does not yet demonstrate broad downstream transfer. It should be framed as a methodology/prototype, not as a mature event-level foundation model.
- NEEDS UPDATE: `calo-moe` should not mention regression-style downstream use. Its benchmarks are generative calorimeter shower validation and transfer/PEFT across material and particle species.
- NEEDS UPDATE: `vlm-neutrino` is a QLoRA fine-tune of Llama-3.2-Vision on derived LArTPC event-display pixel maps, not a native HEP foundation model trained on raw detector hits.
- NEEDS UPDATE: `neutrino-ssl` pretraining is on a simulated FASERCal detector concept; transfer to other detector geometries is evaluated downstream, not part of the source pretraining corpus.
- NEEDS UPDATE: publicness is vague in several entries. Mark dataset public only when the paper gives a repository, DOI, Open Data portal, Hugging Face dataset, Zenodo record, or explicit availability statement.

## 1. Panda

Source checked: `panda_01_2512.01324`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- VERIFIED: detector-level / raw-sensor-level positioning is appropriate.
- NEEDS UPDATE: dataset should be named explicitly: PILArNet-M simulated LArTPC charge-deposition events, not generic "detector-level samples".
- NEEDS UPDATE: representation should say voxelized 3D charge-deposition point cloud `(x, y, z, q)` on a 3 mm grid.
- NEEDS UPDATE: add tags such as `LArTPC`, `Point Transformer V3`, `teacher-student SSL`, `panoptic segmentation`, and `PILArNet-M`.
- VERIFIED: badges for detector representation, SSL, and label-efficiency are supported.

Dataset verification:

- Type: custom simulated LArTPC dataset, not CMS Open Data, not ATLAS Open Data, not Delphes.
- Simulation: PILArNet-M, simulated LArTPC charge depositions after detector-like preprocessing/deconvolution. The paper describes raw 3D charge clouds with deposited charge/energy.
- Size: 1.2M simulated events total; 1M used for pretraining.
- Public: paper says code/data are available; project repository is `https://github.com/DeepLearnPhysics/Panda`.
- Multiple datasets: no, one LArTPC corpus.
- Cross-domain training: no multi-detector or mixed-source pretraining.

Representation:

- VERIFIED: input is a sparse 3D point cloud of voxelized LArTPC charge depositions.
- Preprocessing: points below about 0.13 MeV are removed; voxels are on a 3 mm grid.
- Variable length: handled by sparse point-cloud processing rather than fixed image padding.
- Tokenization: no discrete particle-token vocabulary; point-native sparse 3D representation.

Backbone and training:

- VERIFIED: Point Transformer V3 sparse hierarchical encoder.
- Parameters: about 91M encoder parameters, with optional 16M decoder.
- Pretraining: DINO/iBOT/Sonata-style self-distillation with student/EMA teacher, global/local/masked crops, and prototype prediction.
- Resources: pretraining uses 10M event-samples, batch 48, 4 A100 40GB GPUs. Fine-tuning uses 4 A100 for semantic tasks and 8 A100 for panoptic tasks.

Benchmarks and downstream tests:

- Semantic segmentation on PILArNet-M: macro/per-class F1; Panda improves low-label and full-label performance over UResNet and PTv3 scratch.
- Particle/interaction panoptic segmentation: PQ, ARI, purity, and efficiency.
- Data-efficiency tests: strong gains at 0.1% to 1% labels; the pretrained model approaches or exceeds scratch models with far fewer labels.
- Parameter/transfer efficiency: reports faster/fewer-image convergence for semantic and panoptic tasks.
- OOD/generalization: no true cross-detector OOD test. Claims are strongest for reusable LArTPC sensor-level representations, not broad detector-agnostic transfer.

Summary and highlights:

- Goal: learn reusable LArTPC sensor-level representations from large simulated charge clouds.
- Key contribution: self-distilled Point Transformer V3 encoder for segmentation and particle/interaction reconstruction.
- Main finding: pretraining greatly improves label efficiency and panoptic reconstruction.
- Presentation highlight: a strong detector-level foundation-style example, but still within one detector/data regime.

Foundation-model capability assessment: SUPPORTED WITHIN DOMAIN. The work demonstrates reusable sensor-level representations and multiple downstream reconstruction tasks, but not cross-experiment generalization.

## 2. Neutrino SSL / FASERCal Foundation-Style Model

Source checked: `neutrino-ssl_02_2604.07037`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: replace "simulation across detector geometries" with "FASERCal simulated heterogeneous detector, with transfer tests to other public detector datasets."
- NEEDS UPDATE: add tags `FASERCal`, `Geant4`, `GENIE`, `MAE+Rel`, `Perceiver fusion`, `heterogeneous detector`, and `transfer benchmark`.
- VERIFIED: `SSL` and transfer-oriented framing are supported.
- NEEDS UPDATE: use "foundation-style" unless the slide is explicitly distinguishing strong/weak foundation-model evidence.

Dataset verification:

- Type: custom simulated FASERCal detector concept for forward neutrinos at the LHC.
- Not CMS Open Data or ATLAS Open Data. Not Delphes.
- Simulation chain: GENIE v3.04.00 for neutrino interactions; PYTHIA8 for tau/charm decays; Geant4 for detector propagation.
- Size: nominal sample of 1,118,058 neutrino interactions in 3DCal modules; enriched nu_tau charged-current sample of 108,317 events. Split 85/5/10 train/validation/test.
- Public: code/framework public at `https://github.com/rubbiaa/FASER`; official generated training dataset link: Not specified in the paper/project.
- Multiple datasets: yes for evaluation. Transfer uses a public fine-grained plastic scintillator benchmark and a public PILArNet 768^3 release.
- Cross-domain training: pretraining is on FASERCal; cross-domain evidence is downstream transfer.

Representation:

- 3DCal: sparse 3D voxel hits/charge, patchified into occupied detector patches.
- AHCAL: sparse calorimeter volume tokens.
- ECAL: compact 5x5 matrix tokens.
- Muon system: up to 10 hit planes/track.
- Preprocessing: log charge; only occupied patches retained; 75% masking in MAE pretraining.
- Variable length: handled through sparse patch tokens and Perceiver-style fusion.

Backbone and training:

- Sparse ViT-like encoder with SpConv patch embeddings, module-aware attention, and Perceiver-IO fusion.
- Dimension 384, 12 heads, MLP ratio 4. Decoder dimension 256, 8 heads.
- Pretraining: Stage 1 masked autoencoding for 400 epochs; Stage 2 MAE plus relational objectives for 100 epochs.
- Relational objectives include ghost labels, hierarchy, and particle categories.
- Resources: pretraining on 8 GH200 GPUs; fine-tuning/scratch on 1 H100; batch/GPU 512 for pretraining and 1024 for fine-tuning.

Benchmarks and downstream tests:

- Source-domain flavor classification: six-way neutrino classification; metric AUROC and confusion/purity/efficiency/FOM.
- Charm classification: four-way charm categories; metric AUROC and class efficiencies.
- Regression tasks: visible energy/momentum, missing pT, primary lepton/hadronic jet momentum, and vertex dPV; metrics include residuals and robust spread.
- Data efficiency: tests from about 10^2 to 10^5 labels; MAE+Rel can match scratch models with about an order of magnitude fewer labels in some tasks.
- Transfer tests: public plastic-scintillator PID benchmark and public PILArNet classification benchmark; reports accuracy/AUROC gains over scratch.
- OOD/stress: energy-scale and subsystem-ablation tests; useful robustness evidence.

Summary and highlights:

- Goal: learn reusable heterogeneous-detector representations for forward neutrino reconstruction.
- Key contribution: sparse multimodal detector-token architecture with MAE plus relational self-supervision.
- Main finding: pretraining improves flavor/charm classification, regression, and transfer to other detector-style datasets.
- Presentation highlight: one of the stronger detector-level entries for heterogeneous detector inputs and transfer benchmarking.

Foundation-model capability assessment: MODERATELY SUPPORTED. It demonstrates multi-task and cross-dataset transfer, but pretraining remains tied to a specific simulated detector concept.

## 3. Calo-MoE / FM4CAL

Source checked: `calo-moe_03_2603.28804`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- POSSIBLY INCORRECT: remove "regression-style downstream use"; no such downstream regression benchmark is presented.
- NEEDS UPDATE: data should say Geant4 ILD-like Si-W ECAL showers across W/Ta/Pb, photons/electrons, 10-100 GeV.
- NEEDS UPDATE: add tags `calorimeter fast simulation`, `Geant4`, `next-token generation`, `MoE`, `LoRA`, and `PEFT`.
- VERIFIED: diffusion/generative or generative-model framing is appropriate only if expressed as autoregressive shower generation, not diffusion.

Dataset verification:

- Type: custom Geant4 electromagnetic calorimeter simulation. Not CMS/ATLAS Open Data and not Delphes.
- Geometry: ILD-like Si-W ECAL adapted to multiple absorber materials W, Ta, Pb.
- Particles: photons and electrons, 10-100 GeV.
- Size: each particle/material dataset has about 950k samples, with 760k train, 95k validation, 95k test.
- Public: code at `https://github.com/wmdataphys/FM4CAL`; datasets are reproducible through `https://github.com/FLC-QU-hep/getting_high`, with some material modification information available by request.
- Multiple datasets: yes, multiple materials and particle species.
- Cross-domain training: transfer across absorber materials and from photon to electron showers.

Representation:

- Raw calorimeter energy deposits on a 30x30x30 voxel grid.
- Sparse nonzero cells are serialized into sequences.
- Spatial position is a discrete pixel/cell token over 27k possible cells.
- Energy is discretized into about 25k tokens.
- Sequence ordered by descending energy; initial particle energy is prepended as conditioning; SOS/EOS tokens used.

Backbone and training:

- Dual-stream autoregressive transformer derived from OmniJet-alpha-c ideas.
- Cross multi-head attention lets energy tokens query spatial tokens, followed by self-attention.
- Embedding dimension 256.
- Fixed-routing mixture-of-experts for material/particle experts.
- Transfer: new material trains a new expert with backbone/vocab frozen; new particle species uses LoRA on attention projections plus particle-specific output heads/vocabulary.

Benchmarks and downstream tests:

- Generative shower validation against Geant4: visible cell energy, total energy, hit multiplicity, longitudinal center-of-gravity, energy per layer, radial profile.
- Material transfer: Pb photon generation using 1k, 10k, and full Pb samples while training only a new expert.
- Particle transfer: photon-to-electron transfer in W using LoRA and particle-specific heads/vocab.
- Electron material transfer: Ta/Pb electron showers.
- Speed: reports A100 inference around 10.46 ms/event and about 392x faster than Geant4 CPU for the tested setup.
- Transfer learning: yes, PEFT and expert transfer are central.
- OOD: material/species transfer is an OOD-like test, but no real-detector transfer.

Summary and highlights:

- Goal: build reusable calorimeter shower generators that adapt cheaply across materials and particle species.
- Key contribution: MoE plus PEFT strategy for autoregressive calorimeter fast simulation.
- Main finding: material and species adaptation works with far fewer new parameters/data than full retraining.
- Presentation highlight: strong example of PEFT for simulation foundation models; do not present as a downstream-regression model.

Foundation-model capability assessment: SUPPORTED FOR FAST-SIM TRANSFER. Strong for generative calorimeter simulation reuse; not a general detector-analysis foundation model.

## 4. FM4DIRC

Source checked: `fm4dirc_04_2505.08736`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: data should specify simulated hpDIRC Cherenkov readout, about 5M pion tracks and 5M kaon tracks.
- NEEDS UPDATE: representation should include discrete PMT pixel ID plus continuous/binned photon arrival time.
- NEEDS UPDATE: add tags `DIRC`, `Cherenkov`, `next-token`, `CMHCA`, `Geant4`, `MoE`, `PID`, and `noise filtering`.
- VERIFIED: detector-readout-level placement is appropriate.

Dataset verification:

- Type: custom simulated hpDIRC readout. Not CMS/ATLAS Open Data and not Delphes.
- Simulation: hpDIRC Cherenkov photon hit patterns compared to Geant4/FastDIRC-style simulation references.
- Size: about 5M tracks per particle type for pions and kaons.
- Kinematics: 1 < |p| < 10 GeV/c and 25 deg < theta < 160 deg.
- Public: code at `https://github.com/wmdataphys/FM4DIRC`; official dataset link: Not specified in the paper/project.
- Multiple datasets: pion and kaon conditional samples, plus noise-injection studies.
- Cross-domain training: not broad cross-experiment transfer; transfer is across tasks using the same readout.

Representation:

- Variable-length Cherenkov photon hit sequence, capped around 250 hits.
- Spatial token: PMT pixel ID, vocabulary size 6144.
- Timing token: photon arrival time binned to one quarter of detector timing resolution, vocabulary size 5920.
- Conditioning: track momentum and polar angle embedded as continuous conditioning tokens.
- SOS/EOS tokens used; autoregressive variable-length generation.

Backbone and training:

- Next-token transformer with independent spatial/time embeddings.
- Cross multi-head attention uses time queries and spatial keys/values, followed by self-attention.
- Embedding dimension 256, 8 heads, prenorm, L2-normalized queries/keys with learned scale.
- Class-conditional MoE for pion/kaon generation.
- Downstream heads: sequence-level PID via CLS/BCE and token-level noise filtering via focal loss.

Benchmarks and downstream tests:

- Generative closure: x/y/time distributions, photon yield, KDE/FastDIRC classifier metrics at fixed momentum/angle.
- PID: pion/kaon separation versus theta at 3 and 6 GeV/c; metrics include accuracy and separation power.
- Noise filtering: PMT dark noise at 100 kHz/cm2, about 8-10% noise; metrics AP and AUC.
- Transfer learning: fine-tuning from generative pretraining is tested; benefit is task-dependent and limited for filtering.
- OOD: kinematic scans, but no cross-detector OOD.

Summary and highlights:

- Goal: unify generative readout modeling, PID, and noise filtering for DIRC photon sequences.
- Key contribution: mixed discrete/continuous readout transformer for Cherenkov detectors.
- Main finding: the model generates realistic hit patterns and supports PID/noise-filtering tasks.
- Presentation highlight: a rare readout-level foundation-model example outside calorimetry/tracking.

Foundation-model capability assessment: MODERATE. Multi-task reuse is demonstrated in one readout system, but broader transfer is not shown.

## 5. FM4NPP

Source checked: `fm4npp_05_2508.14087`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: do not tag as transformer; backbone is Mamba2/state-space.
- NEEDS UPDATE: data should specify PYTHIA8 plus full Geant4 sPHENIX TPC p+p events at sqrt(s)=200 GeV.
- NEEDS UPDATE: add tags `Mamba2`, `state-space model`, `TPC spacepoints`, `sPHENIX`, `Geant4`, `frozen adapters`, and `kNN self-supervision`.
- VERIFIED: detector/tracking representation and foundation-model framing are supported.

Dataset verification:

- Type: custom full-simulation sPHENIX/RHIC TPC events. Not CMS/ATLAS Open Data and not Delphes.
- Simulation chain: PYTHIA 8.307 Detroit tune; full Geant4 as-built sPHENIX geometry, CAD detector, 1.4T field, FTFP_BERT_HP physics list, electronics effects, noise, gain, zero suppression.
- Size: more than 11M p+p events; mean about 856 spacepoints and 15.6 tracks/event.
- Public: paper calls it an open benchmark dataset; direct official dataset URL: Not specified in the paper/project.
- Multiple datasets: one main sPHENIX TPC corpus, with downstream task labels.
- Cross-domain training: no cross-experiment pretraining; multi-task downstream within same detector.

Representation:

- Event is a variable-size set of reconstructed TPC spacepoints.
- Features: `(E, x, y, z)` or cylindrical `(E, r, phi, eta)`.
- Normalization: min-max normalization over eta, phi, and radius ranges.
- Ordering/variable length: hierarchical raster scan across r/eta/phi bins; no fixed image raster.
- Positional encoding: NeRF-like sine/cosine position features.

Backbone and training:

- Mamba2 state-space model in six sizes from 0.34M to 188M parameters.
- Self-supervised task: k-next-nearest-neighbor prediction, k=10, predicting larger-radius neighbors with MSE and event-difficulty reweighting.
- Downstream: frozen pretrained FM plus task adapters.
- Track-finding adapter resembles MaskFormer/Mask2Former query decoding with Hungarian matching, Dice/focal/classification losses.
- Resources: H100/A100 80GB; largest model uses 64 GPUs for about 72 hours; batch 256; AdamW.

Benchmarks and downstream tests:

- Scaling studies: model, data, and compute scaling.
- Track finding: ARI, efficiency, purity; FM4NPP(m6) reaches 0.9448 ARI, 96.08% efficiency, 93.08% purity in the reported table.
- Official sPHENIX pipeline comparison: high efficiency for selected tracks.
- PID: accuracy, macro recall, precision; FM4NPP improves over SAGEConv, OneFormer3D, and adapter-only baselines.
- Noise tagging: accuracy, macro recall, precision; FM4NPP improves overall accuracy/precision.
- Data efficiency: low-label studies show larger FMs retain advantage.
- Transfer learning: adapter transfer across track finding, PID, and noise tagging.
- OOD: not cross-detector; mostly same-detector multi-task generalization.

Summary and highlights:

- Goal: learn reusable detector-space representations for TPC reconstruction tasks.
- Key contribution: state-space scaling model for sparse tracking point clouds.
- Main finding: frozen pretrained adapters outperform specialist baselines on track finding, PID, and noise tagging.
- Presentation highlight: strong detector-reconstruction FM case and useful contrast to transformer-heavy entries.

Foundation-model capability assessment: SUPPORTED WITHIN DETECTOR DOMAIN. Strong multi-task reuse, but not yet cross-experiment.

## 6. Neutrino VLM / Neutrino-LLaMA

Sources checked: `vlm-neutrino_06_2508.19376`, `vlm-neutrino_06_2509.08461`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: representation should say derived LArTPC event-display pixel maps, not raw detector images.
- NEEDS UPDATE: architecture should explicitly name `meta-llama/Llama-3.2-11B-Vision-Instruct`, 4-bit quantization, and QLoRA.
- NEEDS UPDATE: add tags `LLaMA 3.2 Vision`, `QLoRA`, `pixel maps`, `event displays`, `OOD downsampling`, and `prompted classification`.
- VERIFIED: VLM/multimodal transfer framing is appropriate.
- NEEDS UPDATE: avoid implying the VLM learned HEP-native detector representations from scratch.

Dataset verification:

- Type: custom simulated modular LArTPC event-display dataset. Not CMS/ATLAS Open Data and not Delphes.
- Simulation chain: GENIE v3.0.6 for nu_e/nu_mu interactions up to 10 GeV; Geant4 v11.2.0 for detector energy deposition; drift/readout smearing into event displays.
- Size: about 190k events, with held-out test samples in the 10k range.
- Public: 2509 paper says data are available from corresponding author on request; code at `https://github.com/dikshantsagar/Neutrino-LLaMa`.
- Multiple datasets: nominal 512x512 event displays and OOD/downsampled 256x256 displays.
- Cross-domain training: base model is a general vision-language model trained outside HEP; fine-tuned on neutrino images.

Representation:

- Two 2D grayscale event-display pixel maps, XZ and YZ projections.
- The images are centered and resized to 512x512; OOD test uses 256x256 downsampled images.
- Text prompts are used for constrained classification/explanation, but the physical input is image projection, not raw hit tensors.
- Padding/masking: handled by the VLM image processor, not by detector-specific sparse masking.

Backbone and training:

- Base model: Llama-3.2-11B-Vision-Instruct with high-resolution ViT-h/14 vision encoder and language decoder.
- Base weights frozen/quantized with 4-bit BitsAndBytes.
- Fine-tuning: QLoRA rank 8, alpha 16, dropout 0.05 on attention and MLP projections.
- Trainable parameters: about 29.5M.
- Resources: 4 NVIDIA A6000 49GB GPUs, batch 4/device, gradient accumulation 2, about one week.

Benchmarks and downstream tests:

- Nominal classification: nu_e CC / nu_mu CC / NC event-class classification; metrics accuracy, precision, recall, AUC.
- Baselines: CNN and fully fine-tuned ViT-h/14.
- OOD downsampling: 512-to-256 pixel resolution shift; VLM and ViT remain strong while CNN collapses.
- Few-shot frozen VLM: poor performance, often predicting one class; important caveat against zero-shot overclaiming.
- Explanations: generated rationales are shown, but no causal/physics-faithfulness benchmark is provided.
- Transfer learning: yes, transfer from a general pretrained VLM to simulated neutrino event displays.

Summary and highlights:

- Goal: adapt a general VLM to neutrino event-display classification.
- Key contribution: QLoRA fine-tuning of a large general VLM for HEP image-like inputs.
- Main finding: strong classification and resolution-shift robustness, but not zero-shot neutrino understanding.
- Presentation highlight: useful example for general AI-to-HEP transfer, distinct from HEP-native foundation models.

Foundation-model capability assessment: TRANSFER SUPPORTED, HEP-NATIVE FM NOT SUPPORTED. It demonstrates reuse of a general VLM, not a detector-pretrained HEP FM.

## 7. OmniLearn / OmniLearned

Sources checked: `omnilearned_07_2404.16091`, `omnilearned_07_2502.14652`, `omnilearned_07_2510.24066`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: this is one of the strongest reusable jet/particle-cloud FM entries.
- NEEDS UPDATE: dataset field should distinguish the earlier JetClass 100M pretraining from the later OmniLearned 1B+ mixed-data pretraining.
- NEEDS UPDATE: add tags `PET/PET v2`, `flow matching`, `multi-dataset pretraining`, `CMS Open Data`, `ATLAS full simulation`, `H1`, `anomaly detection`, `unfolding/reweighting`, and `flavor tagging`.
- NEEDS UPDATE: avoid tagging as SSL; pretraining is supervised plus generative/flow-matching and sample-identity learning, not primarily masked/contrastive SSL.

Dataset verification:

- Early OmniLearn: JetClass 100M Delphes fast-simulation jets, MadGraph5_aMC@NLO plus PYTHIA8 plus Delphes CMS-like detector.
- Later OmniLearned: more than 1B jets across JetClass, JetClass2, Aspen Open Jets, ATLAS Top, H1 DIS, CMS QCD, and CMS BSM samples.
- Dataset mix includes Delphes, ATLAS full simulation, H1 Geant3, CMS simulated/open samples, and real CMS open collision data in downstream AD.
- Public: code/data at `https://github.com/ViniciusMikuni/OmniLearned` for the later framework; earlier code at `https://github.com/ViniciusMikuni/OmniLearn`.
- Multiple datasets: yes, central to the 2026 framework.
- Cross-domain/mixed-source training: yes, across pp, ep, detector fidelities, and real/simulated sources.

Representation:

- Jet as unordered particle/constituent point cloud.
- Common features: relative eta/phi, log pT, log E, optional PID and vertex/track features.
- Up to about 150 particles per jet in the main JetClass-style setup.
- PET/PET v2 includes local pairwise physics features and global attention, with learnable summary tokens.
- Variable length handled by point-cloud transformer processing.

Backbone and training:

- Point-Edge Transformer family with local attention plus global attention and physics-informed pairwise bias terms.
- Output heads for jet classification and generation/flow matching.
- Later sizes: small about 3M, medium about 58M, large about 423M/460M parameters depending on paper wording.
- Training: Perlmutter, 32-512 A100 GPUs, global batch 4096, about three passes over the 1B-jet corpus, Lion optimizer.
- Fine-tuning: generally all weights are fine-tuned with lower backbone learning rate; task heads replaced.

Benchmarks and downstream tests:

- Top tagging: ATLAS-like/Delphes top benchmarks; metrics AUC, accuracy, background rejection at fixed signal efficiency.
- Quark/gluon tagging: Pythia and CMS Open Data Q/G settings; AUC and rejection metrics.
- Unfolding/reweighting: Z+jets and H1 DIS reweighting tasks using classifier/reweighting comparisons.
- Anomaly detection: LHCO R&D and CMS Open Data/Aspen anomaly-search settings; significance and detection threshold.
- Jet generation: JetNet/jet-feature distribution tests in earlier work.
- ATLAS flavor tagging: b/c/light/tau tagging on open ATLAS-style track dataset; metrics background rejection at fixed b/c efficiency.
- Transfer learning: extensive across datasets, tasks, detector fidelities, and real/sim settings.
- OOD/generalization: yes, especially CMS Open Data AD and cross-experiment/fidelity studies.

Summary and highlights:

- Goal: a broad reusable particle-cloud representation for jet physics.
- Key contribution: PET/PET v2 multi-task pretrained backbone with a very large mixed jet corpus.
- Main finding: broad transfer across jet classification, generation, flavor tagging, unfolding/reweighting, and anomaly detection.
- Presentation highlight: this is the clearest mature HEP foundation-model example in the slide set.

Foundation-model capability assessment: STRONGLY SUPPORTED FOR JET PHYSICS. It has the broadest multi-dataset and multi-task evidence among the entries.

## 8. OmniJet

Sources checked: `omnijet_08_2403.05618`, `omnijet_08_2512.04149`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: clarify that original OmniJet-alpha used next-token prediction; masked particle modeling is introduced in the later enhancement paper.
- NEEDS UPDATE: data should include JetClass plus the later top-tagging transfer dataset.
- NEEDS UPDATE: add tags `VQ-VAE`, `next-token prediction`, `masked particle modeling`, `continuous-input NTP`, `JetClass`, and `Delphes`.
- VERIFIED: generative/autoregressive tokenized particle-cloud framing is accurate.

Dataset verification:

- Pretraining: JetClass, 100M train / 5M validation / 20M test jets, MadGraph5_aMC@NLO plus PYTHIA plus Delphes CMS-like.
- Later transfer: top-tagging dataset of about 1.2M jets, PYTHIA8 plus Delphes ATLAS-like, R=0.8, pT 550-650 GeV.
- Type: Delphes fast simulation, not CMS/ATLAS Open Data.
- Public: code at `https://github.com/uhh-pd-ml/omnijet_alpha`; JetClass is public.
- Multiple datasets: JetClass plus top-tagging transfer benchmark in the 2025 paper.
- Cross-domain training: transfer across related jet datasets; no detector-real-data transfer.

Representation:

- Jet constituents tokenized by a VQ-VAE into discrete tokens.
- Original input uses kinematics such as pT, eta, phi with mass approximated/zero in original alpha setup.
- Later work adds continuous-input NTP, using decoded continuous features as input and token IDs as targets.
- Variable length: autoregressive sequence with start/stop tokens and causal masking.

Backbone and training:

- Original: GPT-like causal transformer, three GPT blocks, eight heads, no positional encoding.
- Later: prenorm transformer with LayerScale, registers, eight blocks, dimension 128, and classifier head.
- Pretraining objectives: original next-token prediction; later next-token prediction, masked particle modeling, and joint NTP+MPM.
- Base pretrained model used: self-trained on JetClass, not an external language/vision foundation model.

Benchmarks and downstream tests:

- Generative quality: token/reconstructed distributions for q/g and top jets; classifier separation between generated and reconstructed samples.
- JetClass classification: 10-class classification versus training-set size.
- Top-tagging transfer: fine-tuning from JetClass to ATLAS-like top dataset; metrics accuracy/AUC/rejection depending on experiment.
- Few-label transfer: pretrained backbone gives large gains at 100-1000 labels compared with scratch.
- Ablations: token-ID input versus continuous input, NTP versus MPM, fixed-backbone probes, extended features.
- OOD: top-tagging dataset is related but out-of-training-distribution; no real-data OOD.

Summary and highlights:

- Goal: use tokenized particle sequences for generative and discriminative jet tasks.
- Key contribution: VQ-VAE plus autoregressive transformer for jet constituents, later improved by continuous-input and masked-object objectives.
- Main finding: generative pretraining improves low-data classification and transfer.
- Presentation highlight: useful bridge between NLP-style token prediction and particle-cloud FMs.

Foundation-model capability assessment: MODERATE. Good low-label transfer and generative representation learning, but narrower than OmniLearned.

## 9. Sophon

Source checked: `sophon_09_2405.12972`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: jet-physics foundation-model framing is reasonable.
- NEEDS UPDATE: data should name JetClass-II, 188 classes, about 139M labeled jets, Delphes CMS-like with pileup and PUPPI.
- NEEDS UPDATE: add tags `supervised pretraining`, `Particle Transformer`, `188-way signature classifier`, `Delphes`, `PUPPI`, `resonance search`, and `anomaly search`.
- NEEDS UPDATE: do not label as SSL or generative.

Dataset verification:

- Type: custom Delphes CMS-like fast-simulation jet dataset, not CMS/ATLAS Open Data.
- Dataset: JetClass-II, 188 jet-origin/signature classes, about 139M labeled jets.
- Generation: MadGraph5_aMC@NLO 2.9.18 plus PYTHIA 8.3 for resonant signals; QCD from PYTHIA 8.3; Delphes3 CMS-like detector with average pileup 50 and PUPPI.
- Public: paper states dataset/model will be publicly available; exact official link: Not specified in the paper/project.
- Multiple datasets: main JetClass-II plus transfer/anomaly-search benchmarks.
- Cross-domain training: transfer to related jet signatures and search workflows.

Representation:

- Large-R jet constituents/E-flow objects.
- Features include kinematics, particle ID, impact-parameter-related information, jet kinematics, and scaled four-momenta.
- Sampling/reweighting decorrelates pT and soft-drop mass from class labels.
- Variable-length constituent cloud handled by Particle Transformer.

Backbone and training:

- Particle Transformer with six particle-attention blocks and two class-attention blocks.
- Embedding dimension 128, eight heads, about 2.3M parameters.
- Supervised 188-way classification pretraining.
- Train: batch 512, learning rate 5e-4, 80 epochs, 10M samples per epoch, Lookahead/RAdam.

Benchmarks and downstream tests:

- Direct resonance discrimination: likelihood-ratio discriminants such as X->bb versus QCD; metrics background rejection/significance style.
- Transfer to unseen/rare signatures such as X->bs using a small MLP on latent vectors.
- Single-jet resonance search: reconstructs known W/Z/top peaks in simulated search setup.
- SALAD/model-agnostic use: uses Sophon latent space for anomaly detection.
- Dijet triboson anomaly benchmark: signal-event requirement/discovery sensitivity comparisons.
- Transfer learning: yes, latent transfer to new resonance tasks.
- OOD: related unseen signatures, not real data.

Summary and highlights:

- Goal: build a general supervised signature encoder for boosted-jet physics.
- Key contribution: high-granularity 188-class supervised pretraining for downstream searches.
- Main finding: latent representations transfer to new resonance/anomaly tasks with less data.
- Presentation highlight: strong supervised-pretraining counterpart to SSL/generative jet FMs.

Foundation-model capability assessment: SUPPORTED FOR SUPERVISED JET SIGNATURE TRANSFER. Breadth is narrower than OmniLearned but practically compelling.

## 10. MPMv2

Source checked: `mpmv2_10_2409.12589`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: masked particle modeling and transfer framing are accurate.
- NEEDS UPDATE: dataset should say JetClass pretraining plus BTag OOD downstream dataset.
- NEEDS UPDATE: add tags `MAE-style`, `particle reconstruction`, `BTag OOD`, `vertex finding`, `track ID`, `continuous reconstruction`, and `conditional flow matching`.

Dataset verification:

- Pretraining: JetClass, 120M large-R jets, Delphes CMS-like, PYTHIA8/MadGraph sources.
- Downstream OOD: BTag dataset, 3M light/charm/bottom jets, Delphes ATLAS-like, charged particles only and capped at 15 tracks.
- Type: Delphes fast simulation; not CMS/ATLAS Open Data.
- Public: JetClass is public; BTag public link: Not specified in the paper/project.
- Multiple datasets: yes, JetClass and BTag.
- Cross-domain training: yes, cross-jet-task and ATLAS-like OOD downstream evaluation.

Representation:

- Unordered set of particles/tracks.
- Features: continuous kinematics and track impact parameters plus particle type/charge one-hot labels.
- Neutral impact parameters zero-padded.
- Variable length handled by transformer set processing; BTag caps charged tracks at 15.

Backbone and training:

- MAE-style transformer encoder/decoder for masked particle modeling.
- Encoder: eight layers, dimension 512, eight heads, registers, SwiGLU, LayerScale.
- Decoder: four layers, dimension 128, four heads.
- Reconstruction objectives studied: particle ID CE, VQ-VAE token classification, direct regression, KMeans token classification, conditional normalizing flow, conditional flow matching, and set-to-set flow matching.

Benchmarks and downstream tests:

- JetClass 10-class classification across training-set sizes; metric accuracy/AUC-like classification performance.
- CWoLa weak supervision with injected top signals; metric SIC at high background rejection.
- BTag three-class classification OOD; metric accuracy.
- Secondary vertex finding on BTag; metric ARI versus number of vertices.
- Heavy-track identification; metric balanced accuracy.
- Fixed-backbone probes and objective ablations.
- Transfer learning: yes, multiple downstream tasks from JetClass pretraining.
- OOD: BTag dataset provides meaningful distribution and task shift.

Summary and highlights:

- Goal: improve jet-particle representations through masked particle modeling.
- Key contribution: systematic reconstruction-objective comparison for particle-cloud pretraining.
- Main finding: pretrained encoders improve low-label classification, weak supervision, OOD b-tagging, vertexing, and track ID.
- Presentation highlight: useful for explaining how masked modeling translates from language/vision to particle clouds.

Foundation-model capability assessment: SUPPORTED FOR JET/TRACK REPRESENTATIONS. Good multi-task transfer evidence, especially BTag OOD.

## 11. Bumblebee

Source checked: `bumblebee_11_2412.07867`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: emphasize topology specificity: dileptonic ttbar/event-level reconstruction.
- NEEDS UPDATE: add tags `Delphes`, `dileptonic ttbar`, `BERT-style`, `Cloze pretraining`, `generator+reco`, and `order invariant`.
- NEEDS UPDATE: avoid overclaiming broad discovery performance; one toponium classifier benchmark is weaker than a supervised transformer baseline.

Dataset verification:

- Type: custom Delphes fast-simulation event samples. Not CMS/ATLAS Open Data.
- Generation: 7M dileptonic ttbar NLO events with POWHEG v2; 1M eta_t toponium toy events with MadGraph5_aMC@NLO; both showered/hadronized with PYTHIA and processed through Delphes CMS card.
- Split: 70/15/15 train/validation/test.
- Public: official dataset link: Not specified in the paper/project.
- Multiple datasets: ttbar and toponium toy model.
- Cross-domain training: limited; same/few related topologies.

Representation:

- Event-level reconstructed and generator-level four-vectors for dileptonic ttbar topology.
- Token features: pT, eta, phi, mass, b-tag score.
- Learned embeddings for reco/gen level, modified PDG ID, and mask status.
- Neutrinos are represented through MET-like tokens; no positional encoding.

Backbone and training:

- BERT-like bidirectional transformer encoder.
- Eight layers, d_model 768, 16 heads, about 57M parameters.
- Pretraining objective: Cloze-style masked 4-vector reconstruction with MSE.
- Fine-tuning: classification heads; generator-level information omitted for downstream classification.
- Resources: 2 V100 GPUs, batch 16, about 10 epochs.

Benchmarks and downstream tests:

- Top reconstruction: ttbar invariant-mass resolution; reports 10-20% improvement over a supervised transformer.
- Toponium versus ttbar classification: AUC; Bumblebee improves over DNN but is below a supervised transformer in the cited comparison.
- Initial-state gg versus qqbar classification: AUC; Bumblebee improves over DNN and supervised transformer baseline.
- Ablations of embeddings/pretraining.
- Transfer learning: limited transfer to related ttbar/toponium tasks.
- OOD: no broad OOD test.

Summary and highlights:

- Goal: use masked event-token pretraining for event reconstruction and top-quark analyses.
- Key contribution: BERT-style mixed reco/gen event representation.
- Main finding: useful for reconstruction and some classification tasks, but not uniformly superior to supervised transformer baselines.
- Presentation highlight: good event-level masked modeling example, but should be presented as a focused prototype.

Foundation-model capability assessment: LIMITED/MODERATE. Reusable within a specific event topology; broad FM claim remains weak.

## 12. RS3L

Source checked: `rs3l_12_2403.07066`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- NEEDS UPDATE: data field should explicitly name Z+jet and HZ/H->bb simulations with Pythia/Herwig resimulation pairs.
- NEEDS UPDATE: add tags `resimulation pairs`, `SimCLR`, `DynamicEdgeConv`, `systematics robustness`, and `public Zenodo`.
- VERIFIED: SSL and robustness framing are accurate.

Dataset verification:

- Type: Delphes CMS-like fast-simulation resimulation dataset; not CMS/ATLAS Open Data.
- Generation: hard scattering pp->Z+jet and pp->HZ, H->bb, Z->nunu at 13 TeV using MadGraph5_aMC@NLO; nominal PYTHIA8 CP5; augmentations with different seeds, FSR up/down, and Herwig7.
- Size: 5M events, 50/50 QCD/Higgs.
- Public: Zenodo DOI `https://doi.org/10.5281/zenodo.10633815`.
- Multiple datasets: nominal plus multiple resimulation/augmentation variants.
- Cross-domain training: resimulation-based domain variation, plus OOD W-vs-QCD benchmark.

Representation:

- Jet as graph/point cloud of top 100 Delphes E-flow candidates.
- Features: 15 per-particle kinematic, charge, displacement, and particle-type features.
- anti-kT R=0.8 jets, pT > 450 GeV, mass > 10 GeV, |eta| < 0.1.

Backbone and training:

- DynamicEdgeConv GNN stack with k=24.
- Global sum pooling to 8D latent representation.
- SimCLR contrastive loss with resimulation views as positive pairs.
- BERT-like transformer cross-check reported but DynamicEdgeConv is the main architecture.

Benchmarks and downstream tests:

- In-distribution Higgs-vs-QCD tagging: ROC/background rejection at fixed Higgs efficiency.
- Robustness: Wasserstein distances of tagger output under seed/FSR/Herwig variations.
- OOD W-vs-QCD tagging: tests transfer to W jets; metrics background rejection at fixed W efficiency.
- Data efficiency: RS3L fine-tuning with fewer labels competes with larger fully supervised samples.
- Transfer learning: yes, resimulation SSL to Higgs and W tagging.
- OOD: yes, Herwig/FSR variations and W transfer.

Summary and highlights:

- Goal: learn robust jet representations invariant to simulator variations.
- Key contribution: resimulation-based SSL positive pairs.
- Main finding: improves robustness and OOD W-tag transfer.
- Presentation highlight: best entry for systematic/resimulation-motivated SSL.

Foundation-model capability assessment: SUPPORTED FOR ROBUST JET REPRESENTATIONS. Strong robustness evidence, narrower task scope than OmniLearned.

## 13. Tau Transfer

Source checked: `tau-transfer_13_2503.19165`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: data should name JetClass Delphes pretraining and FuTau full-simulation/reconstruction downstream tau dataset.
- NEEDS UPDATE: add tags `OmniJet-alpha transfer`, `FuTau`, `full simulation`, `cross-granularity transfer`, `tau reconstruction`, and `regression`.
- NEEDS UPDATE: be explicit that the pretrained tokenizer/backbone comes from OmniJet-alpha, not a new tau-pretrained foundation model.

Dataset verification:

- Pretraining: OmniJet-alpha pretrained on JetClass Delphes jets.
- Downstream: FuTau hadronic tau reconstruction dataset, described as full simulation and reconstruction.
- Type: cross-fidelity transfer from Delphes pp-like jet pretraining to full-sim/reco tau events. Not CMS/ATLAS Open Data in the paper.
- Size: downstream training scans from about 10^3 to 10^6 jets; key examples use about 10^4 jets.
- Public: official dataset link: Not specified in the paper/project.
- Multiple datasets: JetClass pretraining plus FuTau downstream.
- Cross-domain training: yes, cross-process and cross-granularity transfer.

Representation:

- Reuses OmniJet-alpha tokenization/constituent sequence machinery.
- Downstream tau inputs are reconstructed tau-candidate particle/constituent features.
- Variable length handled through tokenized sequence processing; tokenizer remains frozen in tested strategies.

Backbone and training:

- Base: OmniJet-alpha backbone with VQ-VAE/tokenizer and GPT-style transformer.
- Fine-tuning strategies: scratch, fixed pretrained backbone, and fine-tuning/unfreezing after part of training.
- Tokenizer is frozen in all strategies.
- Best performance generally from fine-tuning pretrained GPT blocks.

Benchmarks and downstream tests:

- Hadronic tau ID binary classification; metrics AUC and mis-ID rate at fixed efficiency.
- Visible tau pT regression; metric resolution.
- Decay-mode reconstruction; metric AUC.
- Ablations: unfreezing schedule and number of pretrained layers.
- Transfer learning: yes, main point of the work.
- OOD: cross-fidelity and cross-physics transfer from JetClass/Delphes to FuTau full simulation.

Summary and highlights:

- Goal: test whether jet-generative pretraining transfers to tau reconstruction.
- Key contribution: cross-granularity reuse of OmniJet-alpha.
- Main finding: improves low-data tau ID/regression/decay-mode tasks, though specialist ParticleTransformer can still win some classification settings.
- Presentation highlight: honest example where transfer helps but does not automatically beat task-specific architectures.

Foundation-model capability assessment: MODERATE. Good transfer study, but as a derivative of OmniJet rather than a new foundation model.

## 14. HEP-JEPA

Source checked: `hep-jepa_14_2502.03933`.

Overall status: POSSIBLY INCORRECT in current tags/badges.

`foundationModels.js` corrections:

- POSSIBLY INCORRECT: remove `G` and `EBM`; the paper is not a generative model benchmark and not an energy-based model.
- POSSIBLY INCORRECT: remove `anomaly detection` if present; it is not a downstream benchmark in the paper.
- NEEDS UPDATE: tags should be `JEPA`, `latent prediction`, `SSL`, `JetClass`, `few-shot`, `top tagging transfer`, and `quark-gluon transfer`.
- VERIFIED: transformer/particle-cloud pretraining framing is accurate.

Dataset verification:

- Pretraining: JetClass, 100M training / 5M validation / 20M test jets.
- Simulation: MadGraph/PYTHIA plus Delphes CMS-like detector.
- Downstream: top-tagging TQTR dataset with 2M samples; quark/gluon dataset with 2M Pythia8 no-detector jets.
- Type: Delphes fast simulation plus simulated no-detector q/g. Not CMS/ATLAS Open Data.
- Public: project site `https://hep-jepa.github.io/`; JetClass is public.
- Multiple datasets: yes, JetClass plus top/QG transfer.
- Cross-domain training: related jet transfer, not real-data transfer.

Representation:

- Particle vector includes angular, mass/energy, pT, and distance-to-jet features.
- Particles are patchified in eta/phi by farthest-point sampling and kNN grouping.
- PointNet-style tokenization of patches.
- Context/target masks use spatially coherent masking with target and context scales.

Backbone and training:

- JEPA with context encoder, target encoder, predictor, and EMA target encoder.
- Transformer with 12 blocks, eight registers, physics-bias pair terms.
- About 2.5M parameters.
- Pretraining loss: Smooth L1 in embedding space, not reconstruction/generation in data space.
- Resources: about 320 GPU-hours on RTX 2080Ti.

Benchmarks and downstream tests:

- JetClass few-shot classification: macro accuracy versus label fraction; strongest gain at very low labels, fades at full labels.
- Top tagging transfer: TQTR accuracy; HEP-JEPA fine-tuned is modest and below ParticleNet/ParT baselines.
- Quark/gluon transfer: accuracy; modest gains over scratch, below ParticleNet/ParT.
- Ablations: masking strategy, physics bias terms, registers, augmentations.
- Transfer learning: yes, but gains are modest outside JetClass few-shot.
- OOD: related jet-dataset transfer only; no strong OOD.

Summary and highlights:

- Goal: adapt JEPA latent prediction to collider jets.
- Key contribution: masked latent prediction with physics-aware patching and pairwise biases.
- Main finding: improves few-shot JetClass learning, with limited gains on top/QG transfer.
- Presentation highlight: useful for explaining non-generative SSL, but avoid overclaiming.

Foundation-model capability assessment: PARTIAL. Good methodological evidence, limited downstream breadth.

## 15. Joint Analysis Optimization

Source checked: `joint-opt_15_2401.13536`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- NEEDS UPDATE: clarify that this is a fine-tuning/domain-adaptation method around a pretrained ParT jet backbone, not a new standalone foundation model.
- NEEDS UPDATE: data should specify CMS Open Data simulated Xbb/G->HH samples plus JetClass-pretrained ParT weights.
- NEEDS UPDATE: add tags `CMS Open Data simulation`, `ParT backbone`, `DeepSets event head`, `joint fine-tuning`, `domain adaptation`, and `HH->4b`.

Dataset verification:

- Pretrained model: ParT weights from JetClass 100M simulated large-R jets.
- Downstream: CMS Open Data simulated G->HH and QCD/Xbb-style samples, full CMS simulation/reconstruction through Open Data workflows.
- Size: Xbb pretraining uses about 22M jets; event-level study uses up to 10M simulated events with signal mass points.
- Type: CMS Open Data simulation, plus JetClass Delphes pretraining.
- Public: CMS Open Data samples and modified analysis tool are referenced.
- Multiple datasets: yes, JetClass and CMS Open Data simulation.
- Cross-domain training: yes, JetClass to CMS event-level HH analysis.

Representation:

- Jet constituents processed by ParT.
- Optional high-level jet features pT, eta, phi, jet mass, soft-drop mass.
- Event represented as a set of up to five jets through a DeepSets analysis head.
- Three variants: scalar Xbb score plus high-level features, latent vector plus high-level features, and latent vector only.

Backbone and training:

- Reconstruction-level ParT backbone with final softmax removed.
- Event-level DeepSets head.
- Strategies: frozen, fine-tuned, and scratch; optional JetClass initialization.
- Fine-tuning updates the backbone for the event-level BCE loss.

Benchmarks and downstream tests:

- Event-level G->HH->4b signal-vs-background classification.
- Metrics: background rejection at 90% signal efficiency, AUC/SIC in appendix, and data efficiency.
- Fine-tuning improves background rejection substantially over frozen scalar-head baselines.
- JetClass initialization improves low-data and latent-only setups.
- Transfer learning: yes, from jet tagger to event-level analysis.
- OOD: domain adaptation from JetClass to CMS simulation; no real collision-data test.

Summary and highlights:

- Goal: optimize an analysis end-to-end by fine-tuning a pretrained jet model.
- Key contribution: shows pretrained object-level representations can be repurposed for event-level objectives.
- Main finding: joint fine-tuning improves sensitivity and data efficiency over frozen use.
- Presentation highlight: good evidence that foundation models should be fine-tuned for final analysis objectives, not only used as frozen feature extractors.

Foundation-model capability assessment: METHOD SUPPORT, NOT NEW FM. Strong downstream adaptation example.

## 16. Event Transformer Methodology

Source checked: `event-transformer_16_2511.09335`.

Overall status: POSSIBLY INCORRECT / NEEDS UPDATE.

`foundationModels.js` corrections:

- POSSIBLY INCORRECT: current "multi-task transformer with adaptive attention" wording is too strong; no adaptive attention mechanism is established.
- NEEDS UPDATE: describe as a preliminary tabular/event Transformer methodology for top-multiplicity classification and masked-variable reconstruction.
- NEEDS UPDATE: remove or weaken downstream-regression/multi-task claims unless explicitly limited to planned work.
- NEEDS UPDATE: add tags `preliminary`, `Delphes CMS`, `top multiplicity`, `masked reconstruction`, and `entropy OOD demo`.

Dataset verification:

- Type: custom Delphes CMS-like simulation. Not CMS/ATLAS Open Data.
- Generation: MadGraph5 and CompHEP hard processes; Delphes CMS-like detector at 13 TeV.
- Size: 8,198,428 simulated events across zero-, one-, two-, three-, and four-top classes.
- Public: official dataset link: Not specified in the paper/project.
- Multiple datasets: multiple top-multiplicity processes, but one simulation workflow.
- Cross-domain training: no clear cross-domain pretraining.

Representation:

- Fixed tabular event-object representation.
- Per object: pT, eta, phi, Px, Py, Pz.
- Event-wide features: jet, b-jet, neutrino, lepton counts and MET.
- Max object counts: 12 jets including 4 b-jets, plus 4 leptons; missing objects zero-padded.
- Objects sorted by energy; standardized features for reconstruction.

Backbone and training:

- Transformer over tabular/event tokens with linear embedding, multi-head self-attention, flattening, and final linear output.
- Four small variants with embedding dimensions 16/20/125 and 1/5 attention heads.
- Pretraining: masked variable reconstruction with 30% mask.
- Supervised task: top-multiplicity classification.

Benchmarks and downstream tests:

- Masked reconstruction loss and variable-distribution comparisons.
- t-SNE before/after training.
- Supervised top-count classification; metric ROC AUC, best mean around 0.91-0.92.
- OOD/example: entropy of SM-trained transformer probabilities used to separate scalar-DM single-top events; no robust metric table.
- Transfer learning: weak/not demonstrated as a fine-tuning transfer benchmark.
- Foundation-model support: preliminary.

Summary and highlights:

- Goal: propose a pathway toward event-level transformer foundation models.
- Key contribution: tabular event-object transformer with masked reconstruction and top-count classification.
- Main finding: transformer can learn useful event features, but broad FM transfer remains future work.
- Presentation highlight: use only as "early methodology" or omit if space is limited.

Foundation-model capability assessment: WEAK/PRELIMINARY. Current slide should not present it as mature FM evidence.

## 17. PECM

Source checked: `pecm_17_2412.10665`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: event-graph pretraining and transfer framing are supported.
- NEEDS UPDATE: data should specify 120M Delphes ATLAS-like generated events plus ATLAS Open Data transfer tasks.
- NEEDS UPDATE: add tags `fully connected event graph`, `Delphes ATLAS`, `ATLAS Open Data`, `multiclass pretraining`, `fine-tuning`, and `time-to-target`.
- NEEDS UPDATE: note that multiclass pretraining works better than multilabel pretraining in most reported downstream tasks.

Dataset verification:

- Pretraining: about 120M Delphes events across 12 SM processes.
- Simulation chain: MadGraph@NLO 2.7.3 at NLO QCD; MadSpin; PYTHIA 8.235; Delphes 3.4.2 ATLAS fast simulation.
- Downstream simulated tasks: ttH gamma gamma CP, FCNC vs tHq, ttW vs ttt, stop+H vs ttH, WH vs ZH.
- ATLAS Open Data tasks: Higgs diphoton production and triboson datasets from ATLAS Open Data release.
- Public: ATLAS Open Data samples are public; pretraining generated sample publicness: Not specified in the paper/project.
- Multiple datasets: yes, generated pretraining plus generated downstream and ATLAS Open Data.
- Cross-domain training: yes, pretraining to BSM/open-data downstream tasks.

Representation:

- Fully connected graph per event.
- Nodes: jets, electrons, muons, photons, and MET.
- Node features: pT, eta, phi, E, b-tag, charge, object type; placeholders for undefined fields.
- Edge features: Delta eta, Delta phi, Delta R.
- Global feature: node count.
- Variable-size events handled directly by GNN.

Backbone and training:

- DGL/PyTorch graph network with node/edge/global encoders to dimension 64.
- Four graph-processing steps with edge/node/global update MLPs.
- About 400k parameters.
- Pretraining options: 12-class multiclass CE or 41-label multilabel objective.
- Fine-tuning: final layer replaced; pretrained layers lower learning rate; frozen transfer was tried and performed poorly.

Benchmarks and downstream tests:

- Five Delphes binary classification tasks; metrics accuracy and ROC AUC across 1e3 to 1e7 examples/class.
- ATLAS Open Data Higgs production task; metrics accuracy/AUC.
- ATLAS Open Data triboson task; metrics accuracy/AUC.
- CKA interpretability of which layers adapt.
- Computational efficiency/time-to-target and pretraining amortization estimates.
- Transfer learning: yes, fine-tuning across multiple downstream tasks.
- OOD: generated-to-ATLAS-Open-Data transfer, but still simulation/open-data analysis contexts.

Summary and highlights:

- Goal: pretrain an event graph classifier for reuse across HEP analyses.
- Key contribution: compact graph-network pretraining over a broad SM process corpus.
- Main finding: multiclass pretraining improves low-data downstream tasks and time-to-target; multilabel objective is not consistently beneficial.
- Presentation highlight: strong event-level pretraining example with explicit downstream tables.

Foundation-model capability assessment: MODERATE/GOOD. Multi-task transfer is real; model scale and representation breadth are modest.

## 18. Event Diffusion / HEIDi

Sources checked: `event-diffusion_18_2412.10352`, `event-diffusion_18_2502.16330`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: particle point-cloud diffusion and heavy-ion simulation framing are accurate.
- NEEDS UPDATE: do not imply downstream analysis transfer; benchmarks are generative surrogate validation.
- NEEDS UPDATE: add tags `HEIDi`, `UrQMD`, `point-cloud diffusion`, `normalizing flow`, `heavy-ion`, `centrality conditioning`, and `event generation`.

Dataset verification:

- Type: custom theoretical heavy-ion event simulation. Not CMS/ATLAS, not Delphes, not Geant4 detector simulation.
- Generator: UrQMD cascade simulation.
- Main setup: Au-Au at 10 AGeV, impact parameter b=1 fm, 18k events.
- Conditional setup: 30k events across b=1, 3, 5 fm, with interpolation tested at b=4 fm.
- Public: official dataset link: Not specified in the paper/project.
- Multiple datasets: different impact parameters for centrality conditioning.
- Cross-domain training: no; conditional interpolation within UrQMD parameter space.

Representation:

- Fixed-size particle point cloud, padded to 1084 particles.
- Particle features include momentum vector and one-hot particle species ID; fake/padding particles included.
- Generated event is particle-level output, not detector readout.

Backbone and training:

- HEIDi combines a PointNet-style encoder, normalizing-flow decoder for latent event conditioning, and conditional point-cloud diffusion.
- Diffusion generates full event point clouds conditioned on latent/global variables.
- For impact-parameter conditioning, b is appended to the latent condition.

Benchmarks and downstream tests:

- Generated-vs-UrQMD validation: mean multiplicities by hadron species, multiplicity distributions, rapidity, pT spectra, px/py/pz, net charge, and correlations.
- Centrality interpolation: b=4 fm tested despite not being in training set.
- Speed: about 30 ms/event on A100 versus about 3 s/event for UrQMD cascade in the tested setup.
- Transfer learning: no downstream fine-tuning benchmark.
- OOD: limited parameter interpolation across impact parameter, not cross-generator or detector OOD.

Summary and highlights:

- Goal: ultra-fast event-by-event heavy-ion event generation.
- Key contribution: point-cloud diffusion for full particle-level heavy-ion outputs.
- Main finding: reproduces many UrQMD observables and interpolates centrality, with large speedup.
- Presentation highlight: best generative heavy-ion surrogate example, but "toward FM" rather than demonstrated multi-task FM.

Foundation-model capability assessment: GENERATIVE SURROGATE SUPPORTED; BROAD FM NOT YET. Strong simulation acceleration evidence, no downstream task suite.

## 19. SMEFT FM Demonstrator

Source checked: `smeft_19_2512.15862`.

Overall status: POSSIBLY INCORRECT in current architecture.

`foundationModels.js` corrections:

- POSSIBLY INCORRECT: change `contrastive transformer` to `feed-forward contrastive encoder`.
- POSSIBLY INCORRECT: architecture should be "MLP encoder over binned Drell-Yan cross-section vectors", not "transformer encoder over theory variations".
- NEEDS UPDATE: data should say MadGraph5 theory-level neutral-current Drell-Yan SMEFT universes; no detector simulation.
- NEEDS UPDATE: add tags `theory-level`, `Drell-Yan`, `SMEFT`, `contrastive`, `uncertainty`, `retrieval`, and `Dirichlet prior`.

Dataset verification:

- Type: theory-level collider observable dataset, not detector-level events.
- Not CMS Open Data, not ATLAS Open Data, not Delphes, not Geant4.
- Generator: MadGraph5 for neutral-current Drell-Yan pp -> mu+ mu- at tree-level SMEFT; CT18LO PDFs.
- SMEFT setup: Warsaw basis dimension-6, U(3)^5 flavor symmetry, 60 real Wilson coefficients; linear interference order only.
- Size: 100 SMEFT universes, each with 10^4 replicas, yielding 10^6 training examples.
- Public: official dataset/code link: Not specified in the paper/project.
- Multiple datasets: binned m_ll and muon pT differential cross sections.
- Cross-domain training: no process transfer; one theory setup.

Representation:

- Fixed-length vector of binned differential cross sections in m_ll and muon pT.
- Replicas are sampled around covariance/uncertainty of the binned observables.
- No event tokens, particle clouds, or transformer tokenization.

Backbone and training:

- MLP encoder with three dense blocks, BatchNorm, ReLU, Dropout, outputting a 2D latent.
- Supervised contrastive pair loss: positives are replicas of the same SMEFT universe; negatives are different universes.
- Additional Dirichlet prior network head for classification/uncertainty.
- Adam with very small learning rate and early stopping.

Benchmarks and downstream tests:

- Latent geometry: checks whether latent directions align with SMEFT shape distortions.
- Classification with uncertainty: Dirichlet prior network over 100 universe classes; entropy/mutual information used for OOD/anomaly-style behavior.
- Retrieval: nearest-neighbor retrieval of SMEFT universes compatible with SM uncertainty contours; reports universes within 1, 3, and 6 sigma regions.
- No transfer to other processes, detectors, or real data.
- Foundation-model support: demonstrator only.

Summary and highlights:

- Goal: learn reusable theory-space representations for SMEFT deformations.
- Key contribution: contrastive representation of theory-level cross-section variations.
- Main finding: latent space can support classification, uncertainty, anomaly/retrieval-style searches.
- Presentation highlight: conceptually useful expansion beyond detector data, but architecture must be corrected.

Foundation-model capability assessment: DEMONSTRATOR ONLY. Interesting reusable theory embedding, not yet broad FM evidence.

## 20. EveNet

Source checked: `evenet_20_2601.17126`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: event-level, multi-task, generative plus discriminative framing is supported.
- NEEDS UPDATE: architecture should say `Point-Edge Transformer event backbone` rather than generic graph transformer.
- NEEDS UPDATE: data should say 3B generated / 543M selected Delphes events for pretraining, plus CMS Open Data simulation and collision-data downstream tasks.
- NEEDS UPDATE: representation should include jets, leptons, photons, MET, global observables, and point-cloud event objects.
- NEEDS UPDATE: add tags `Point-Edge Transformer`, `Delphes pretraining`, `CMS Open Data`, `masked diffusion`, `assignment`, `segmentation`, `neutrino generation`, `systematics robustness`.

Dataset verification:

- Pretraining type: custom large-scale Delphes fast simulation with generic detector setup; not CMS/ATLAS Open Data for pretraining.
- Generator chain: MadGraph5_aMC@NLO for matrix elements, PYTHIA for shower/hadronization, Delphes generic detector.
- Size: about 2.93B generated events, 543M selected/used events after preselections.
- Pretraining processes: QCD, ttbar, ttbarW, ttbarZ, W+jets, Z+jets, WW, ZZ, WZ, and SM Higgs WW* final states.
- Downstream CMS Open Data simulation: X->YH_SM->bbWW* grid with CMS full-sim Open Data samples and SM backgrounds.
- Downstream collision data: CMS Open Data DoubleMuon 2016 for Upsilon resonance anomaly detection.
- Public: datasets/checkpoints reported at `https://huggingface.co/datasets/Avencast/EveNet`; code/configs at `https://github.com/EveNet-HEP`.
- Multiple datasets: yes, large pretraining corpus plus four downstream datasets.
- Cross-domain/mixed-source training: pretraining on fast simulation; downstream includes full CMS simulation and real CMS collision data.

Representation:

- Event-level point cloud of reconstructed physics objects and global observables.
- Objects include jets, b-jets, leptons, photons, MET/invisible-object tokens depending on task.
- Uses conditioning variables and diffusion time steps for generative heads.
- Variable event content handled as point cloud / object tokens; task heads handle assignment, segmentation, classification, and generation.

Backbone and training:

- Point-Edge Transformer encoder.
- Decoders/heads: classification, assignment, segmentation, self-supervised generative masked reconstruction, and supervised generative invisible-object reconstruction.
- Stage I: SSL generative masked reconstruction, 18.8M encoder + 1.3M head.
- Stage II: full pretraining with classification, self-supervised generation, and supervised generation, 18.8M encoder + 3.8M heads.
- Resources: Perlmutter, 512 NVIDIA A100 GPUs and 16,384 CPU cores; PyTorch Lightning and Ray; LION optimizer with EMA and cosine schedule.
- Fine-tuning: encoder and decoders jointly optimized, encoder LR typically lower than task heads.

Benchmarks and downstream tests:

- Task 1: X->YH_SM->bbWW* heavy scalar search using CMS Open Data simulation. Metric: maximum SIC. Tests individual mass-point fine-tuning and parameterized training; EveNet-Full beats scratch, XGBoost, and TabPFN on average and converges faster.
- Task 2: exotic Higgs H_SM->aa->4b with QCD backgrounds. Metrics: SIC and pairing efficiency. EveNet-Full reaches SIC about 4.1 in reported full-data comparison versus 1.6 scratch and 1.4 SPANet; low-data gains persist.
- Task 3: dileptonic ttbar quantum-correlation measurement. Metrics: precision on D and lepton-quark pairing efficiency. EveNet-Full improves precision and low-data pairing; includes supervised neutrino generation.
- Task 4: CMS Open Data DoubleMuon anomaly detection / Upsilon rediscovery. Metrics: median l-reweighted significance; calibrated EveNet-Full reaches about 7.6 sigma versus 6.4 sigma published CATHODE benchmark; scratch fails after physical calibration.
- Systematics: JES and soft-MET variation tests without retraining; EveNet-Full is more stable than scratch.
- Transfer learning: yes, fast-sim pretraining to full CMS simulation and real collision data.
- OOD/generalization: yes, downstream processes absent from pretraining, full-sim detector effects, real collision dimuon data.

Summary and highlights:

- Goal: an event-level HEP foundation model integrating discriminative and generative analysis tasks.
- Key contribution: multi-head Point-Edge Transformer pretrained on hundreds of millions of simulated events and evaluated on realistic analysis workflows.
- Main finding: strong data efficiency, sensitivity, convergence, and systematics robustness across four downstream settings.
- Presentation highlight: strongest event-level entry and natural centerpiece for slides 4-5.

Foundation-model capability assessment: STRONGLY SUPPORTED FOR EVENT-LEVEL ANALYSIS, with the caveat that definitive deployment in full experimental analyses with complete systematic treatment remains future work.

## 21. Cross-Domain Transfer: Jets to Neutrino Interactions

Source checked: `omni-transfer-neutrino_21_2604.12364`.

Overall status: NEEDS UPDATE.

`foundationModels.js` corrections:

- NEEDS UPDATE: representation should not say "raw neutrino detector tasks"; it uses processed MINERvA reconstructed-object tokens plus global features.
- NEEDS UPDATE: data should specify simulated MINERvA Open Data Medium Energy FHC playlists 1A and 1B.
- NEEDS UPDATE: architecture should name OmniLearned PET2 small/medium checkpoints and the point-global transformer baselines.
- NEEDS UPDATE: add tags `MINERvA Open Data`, `scintillator calorimeter`, `PET2`, `available-energy regression`, `pion final states`, and `medium transfer`.
- VERIFIED: cross-domain transfer from jet-pretrained OmniLearned to neutrino tasks is supported.

Dataset verification:

- Type: simulated MINERvA Open Data, not CMS/ATLAS, not Delphes.
- Detector: MINERvA segmented scintillator tracking calorimeter in the NuMI beam.
- Source: Medium Energy Forward Horn Current playlists 1A and 1B. Playlist 1A has helium and water targets empty; 1B has full helium and empty water target.
- Size: 6M training events, 700k validation, 700k test.
- Generator/simulation chain: Not specified in the paper/project beyond the standard MINERvA Monte Carlo playlists.
- Public: data at `https://minerva.fnal.gov/opendata/`; code at `https://github.com/gregorkrz/minerva-ml`.
- Multiple datasets: yes, playlists 1A and 1B.
- Cross-domain training: yes. Base OmniLearned is pretrained on high-Q2 pp and ep collision data; fine-tuned/evaluated on few-GeV neutrino interactions.

Representation:

- Variable-length set of reconstructed-object tokens.
- Objects: up to one MINOS-matched muon, up to two reconstructed photons, up to 20 calorimetric blobs, and up to 10 track-based prongs; caps give at most 33 objects/event.
- Token features: eta, phi, log(pT), log(E), integer PID/node type, log(mean dE/dx), spatial x/y/z, and time with zeros for undefined channels.
- Global features: 15 event-level engineered quantities including recoil energies, passive energy, Michel count, muon count, diphoton mass, prong count, and type-summed energies.
- Variable length handled by transformer/PET2 token processing.

Backbone and training:

- Models compared: MLP on global features, point-global ViT-style transformers, OmniLearned-small PET2, OmniLearned-medium PET2, and randomly initialized OmniLearned-small-rw.
- OmniLearned-small: about 3M parameters, eight trunk blocks, two head blocks, four tokens/particle, width 128, eight heads.
- OmniLearned-medium: about 53M parameters; backbone frozen due to compute constraints.
- Training: Adam, learning rate 1e-4, batch size 2048; separate classification and regression models.
- Resources: single A100 GPU; classification about 6 hours for OmniLearned-small; regression about 8 hours.

Benchmarks and downstream tests:

- Available hadronic energy regression: target log(1 + E_available); metrics Smooth L1 training loss, IQR and MPV of residual ratio versus q3.
- CC1pi+/- tagging: binary classification from a shared five-class model; metrics AUPRC, AUROC, and TPR at fixed FPR matched to a cut-based baseline, binned by true pion energy and angle.
- CCNpi+/- tagging: same metrics, binned by hadronic invariant mass W.
- CC1pi0 tagging: same metrics, binned by pion kinematics.
- Compute efficiency: validation loss versus FLOPs and training steps; pretrained OmniLearned-small beats similarly sized scratch/transformer baselines.
- OOD/generalization: strong domain shift from collider jets to few-GeV neutrino events; not a held-out detector OOD test beyond playlist variation.
- Foundation-model support: good evidence for transferable geometric/kinematic priors, but the model is not pretrained on neutrino data.

Summary and highlights:

- Goal: test whether a jet-pretrained particle FM transfers to few-GeV neutrino reconstruction.
- Key contribution: medium-transfer benchmark from OmniLearned to MINERvA Open Data simulation.
- Main finding: pretrained OmniLearned improves performance and compute efficiency for energy regression and pion final-state classification.
- Presentation highlight: one of the clearest "reusable representation across experimental regimes" studies.

Foundation-model capability assessment: CROSS-DOMAIN TRANSFER SUPPORTED. It supports the foundation-model thesis for particle-cloud priors, but not a standalone neutrino FM.

## 22. OmniCosmos

Source checked: `omnicosmos_22_2512.24422`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: cross-domain transfer from OmniLearned to cosmology is supported.
- NEEDS UPDATE: data should say CosmoBench CAMELS-SAM and Quijote dark-matter halo point clouds, not just generic N-body simulation tasks.
- NEEDS UPDATE: architecture should mention loading the small OmniLearned PET and replacing/adapting input encoders and output heads.
- NEEDS UPDATE: add tags `CosmoBench`, `CAMELS-SAM`, `Quijote`, `halo point cloud`, `cosmological parameter regression`, and `velocity prediction`.

Dataset verification:

- Type: cosmological simulation point-cloud datasets, not HEP detector data.
- Not CMS/ATLAS, not Delphes, not Geant4.
- Dataset source: CosmoBench.
- Datasets used: CAMELS-SAM and Quijote simulation suites.
- CAMELS-SAM: dark-matter-only simulations, 100 cMpc/h box, dark matter particle mass about 1e8 Msun/h.
- Quijote: 1000 cMpc/h box, dark matter particle mass about 1e12 Msun/h.
- Size: up to 5000 most massive halos per simulation; official splits are 600/204/196 for CAMELS-SAM and 19651/6550/6551 for Quijote.
- Public: CosmoBench datasets are public; code for paper points to `https://github.com/ViniciusMikuni/OmniLearned`.
- Multiple datasets: yes, CAMELS-SAM and Quijote.
- Cross-domain training: yes, OmniLearned pretrained on particle-physics jets, adapted to cosmological halo point clouds.

Representation:

- Point cloud of dark-matter halos/galaxies, using positions as input.
- Pairwise features replace jet physics features: coordinate differences, Euclidean distance, cosine distance, and cosine distance between a point and neighbor difference vector.
- KNN local neighborhoods use k=10 for CAMELS-SAM and k=20 for Quijote in best studies.
- Variable point count: OmniLearned can handle variable multiplicity, but memory restricts use to small model because cosmology point clouds have about ten times more points than jets.

Backbone and training:

- Starts from pretrained OmniLearned-small with eight transformer blocks and about 2M trainable parameters in the adapted setup.
- Incompatible input layers are randomly initialized; new layers use higher learning rate.
- Output heads replaced for cosmological parameter regression and per-halo velocity prediction.
- Base pretrained model: OmniLearned, trained on about 1B jets from mixed particle-physics datasets.

Benchmarks and downstream tests:

- CAMELS-SAM parameter regression for Omega_m and sigma_8; metric R2. OmniCosmos reports 0.87/0.92 versus scratch 0.83/0.89 and previous baselines lower.
- CAMELS-SAM halo velocity prediction; metric R2_v. OmniCosmos 0.301 versus scratch 0.299 and GNN 0.2865.
- Quijote parameter regression; metric R2. OmniCosmos 0.849/0.871 versus scratch 0.838/0.868; matches/surpasses 2PCF and other baselines depending on parameter.
- Quijote halo velocity prediction; R2_v 0.471 versus scratch 0.470 and LLS 0.4347.
- Data-efficiency tests: gains strongest with hundreds to thousands of simulations; less pronounced at full data.
- Transfer learning: yes, far cross-domain transfer.
- OOD: cross-domain from jets to cosmology; no observational-real-data OOD.

Summary and highlights:

- Goal: test whether particle-physics point-cloud pretraining helps cosmological simulation tasks.
- Key contribution: adapts OmniLearned PET to halo point clouds through new geometric pairwise features and heads.
- Main finding: pretraining helps low-data cosmological parameter and velocity prediction.
- Presentation highlight: good "far transfer" story, but outside LHC foundation-model core.

Foundation-model capability assessment: FAR-TRANSFER SUPPORTED. Useful for the foundation-model concept, less directly relevant to LHC slide claims.

## 23. OmniMol

Source checked: `omnimol_23_2601.10791`.

Overall status: VERIFIED with refinements.

`foundationModels.js` corrections:

- VERIFIED: cross-domain transfer from OmniLearned/PET to molecular dynamics is supported.
- NEEDS UPDATE: data should say OMoL25/oMol molecular dataset and Val-Comp evaluation, not generic small-molecule potential tasks.
- NEEDS UPDATE: architecture should mention swapped molecular encoders/heads, direct force and energy heads, LoRA/full fine-tuning, and optional conservative/equivariant variant.
- NEEDS UPDATE: add tags `OMoL25`, `MLIP`, `energy/force regression`, `LoRA`, `full fine-tuning`, `conservative forces`, `equivariance`, and `A100 inference`.

Dataset verification:

- Type: molecular dynamics / molecular potential dataset, not HEP detector data.
- Not CMS/ATLAS, not Delphes, not Geant4.
- Dataset: OMoL25/oMol large-scale molecular dataset.
- Training sizes: oMol-4M, oMol-100M/140M, and 100k subset studies; Val-Comp used for evaluation.
- Public: code at `https://github.com/ibrahimEls/OmniMol`; OMoL25 dataset source is cited in paper.
- Multiple datasets/splits: yes, different oMol sizes/subsets and Val-Comp evaluation.
- Cross-domain training: yes, OmniLearned jet-pretrained PET adapted to molecular point clouds.

Representation:

- Molecule as unordered variable-size point cloud of atoms.
- Atom features: Cartesian coordinates, atomic number, and optional charge/spin.
- Pairwise local features: coordinate differences, distance, inverse-distance powers, learned atomic feature interactions, and Gaussian radial basis functions.
- KNN local neighborhoods use k=15.
- Preprocessing: per-molecule centering; energy decomposed into bag-of-atoms baseline plus residual; energy/force standardization.

Backbone and training:

- Base: OmniLearned Point-Edge Transformer body.
- Modifications: replace input encoders and output heads for molecular priors.
- Heads: per-atom force prediction and per-atom energy correction summed to molecular energy.
- LoRA: rank 96 adapters on transformer body matrices with base body frozen; molecular encoders, bias MLP, and heads trained.
- Full fine-tuning: loads matching body/input weights, trains all matching weights; heads initialized for molecular task.
- Conservative/equivariant variant: forces from energy gradients and modified pairwise features/angles to better satisfy physical constraints.
- Resources: AdamW; 32/128/512 A100-40GB GPUs for small/medium/large; OneCycle LR; 100 passes for oMol-4M and 15 passes for oMol-100M/140M.

Benchmarks and downstream tests:

- Energy and force regression on Val-Comp; metrics MAE meV/atom and meV/A.
- Full oMol-4M training comparison: OmniMol small/medium variants versus eSEN, AllScAIP, Transformer-1B, TransIP; pretrained advantage is reduced or absent with enough data.
- oMol-100M/140M scaling: OmniMol medium/large compared to GNN/all-to-all transformer baselines.
- 100k low-data subset: pretraining improves OmniMol-s-d, OmniMol-s-cons, and OmniMol-m-d energy/force MAE.
- Low-compute two-pass oMol-4M: pretraining can improve direct variants substantially, especially OmniMol-m-d.
- Inference speed: A100 O(100)-atom systems; OmniMol-m is about 3x faster than comparable GNN baselines with moderate error tradeoff.
- Transfer learning: yes, far cross-domain transfer from jet physics to molecular potentials.
- OOD: cross-domain transfer, but no separate molecular OOD benchmark beyond Val-Comp/subset scaling.

Summary and highlights:

- Goal: adapt a jet-pretrained PET into a molecular learned interatomic potential.
- Key contribution: shows point-edge attention priors and pretrained weights can transfer to molecular energy/force prediction.
- Main finding: pretraining helps most in low-data or low-compute regimes; benefits shrink with large molecular training budgets.
- Presentation highlight: compelling "foundation representations beyond collider physics" example, but not central to LHC detector/event slides.

Foundation-model capability assessment: FAR-TRANSFER SUPPORTED. Strong conceptual cross-domain evidence, with task-specific caveats.

## Suggested Library-Wide Tag Cleanup

Use these tag additions/removals to keep Slide 4/5 honest:

- Add `Geant4` only where full detector or calorimeter simulation is actually Geant4-based: Neutrino SSL, FM4NPP, VLM-Neutrino, Calo-MoE, FM4DIRC if the paper explicitly ties readout simulation to Geant4 comparisons.
- Add `Delphes` to entries based on fast simulation: Calo-style no, OmniLearn early, OmniJet, Sophon, MPMv2, Bumblebee, RS3L, Event Transformer, PECM pretraining, EveNet pretraining.
- Use `CMS Open Data` only for downstream/open-data tasks: OmniLearned CMS AD/QG where applicable, Joint-opt CMS Open Data simulation, EveNet CMS Open Data simulation and DoubleMuon data.
- Use `ATLAS Open Data` only for PECM downstream and any explicitly named ATLAS Open Data tasks; avoid for generic ATLAS-like Delphes simulation.
- Remove `Transformer` where the backbone is not a transformer: FM4NPP uses Mamba2; SMEFT uses an MLP demonstrator.
- Remove `Generative Model` from HEP-JEPA; keep for OmniJet, Calo-MoE, FM4DIRC, Event Diffusion, EveNet, and OmniLearned if paired with flow matching/generation.
- Use `Foundation Model` confidently for OmniLearned and EveNet; use `foundation-style`, `demonstrator`, or `transfer study` for weaker/narrower entries.

## Dataset Publicness Checklist

Clearly public or explicitly linked:

- Panda: repository says data/code available.
- RS3L: Zenodo DOI.
- OmniLearn/OmniLearned: GitHub and public datasets/open sources.
- Joint-opt: CMS Open Data simulation.
- EveNet: Hugging Face dataset/checkpoints and GitHub reported.
- Omni-transfer-neutrino: MINERvA Open Data and GitHub.
- OmniCosmos: CosmoBench plus OmniLearned GitHub.
- OmniMol: OmniMol GitHub and cited OMoL25 dataset.

Publicness not fully specified or available only on request:

- FM4DIRC: code public; dataset link: Not specified in the paper/project.
- FM4NPP: paper describes an open benchmark, but direct dataset link was not found in the reviewed text.
- VLM-Neutrino: data available on request, code public.
- Bumblebee: dataset publicness: Not specified in the paper/project.
- Event Transformer: dataset publicness: Not specified in the paper/project.
- SMEFT demonstrator: dataset/code publicness: Not specified in the paper/project.
- Event Diffusion/HEIDi: dataset publicness: Not specified in the paper/project.
