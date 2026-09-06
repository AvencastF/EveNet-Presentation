---
clicks: 0
transition: fade
class: nju-refined
glowOpacity: 0.08
---

# Classification

<NJUAnimatedEveNet scene="classification" :step="1" />

<!--
Each colored point depicts an illustrative event embedding, not an individual particle. The displayed regions are a teaching aid rather than measured inference or a training trajectory.
Classification consumes the ObjectEncoder object embeddings and event token, and produces process probabilities. The bars are schematic and deliberately unnumbered; their labels are examples rather than an actual sample prediction.
Source: EveNet-Full/evenet/network/heads/classification/classification_head.py, ClassificationHead.forward().
Visual concept reuses the event-cluster semantics of the original ClassificationIllustration rather than using unlabeled particle dots.
-->

---
clicks: 0
transition: fade
class: nju-refined
glowOpacity: 0.08
---

# Assignment

<NJUAnimatedEveNet scene="assignment" :step="1" />

<!--
A hadronic top provides a concrete configured topology: t to bW, W to qq. The six jets and selected indices are schematic.
Assignment scores valid object-to-daughter combinations for the configured topology. The displayed j1 to b, j3 and j5 to q/q correspondence is a selected illustrative candidate. Equivalent daughter permutations are handled through the configured symmetry; the forward pass returns assignment distributions rather than making a hard selection.
Source: EveNet-Full/evenet/network/heads/assignment/assignment_head.py, SharedAssignmentHead.forward(); symmetric_attention.py.
Visual concept follows the original AssignmentIllustration's labeled decay tree and token-to-daughter links, enlarged for presentation.
-->

---
clicks: 0
transition: fade
class: nju-refined
glowOpacity: 0.08
---

# Segmentation

<NJUAnimatedEveNet scene="segmentation" :step="1" />

<!--
Each query predicts a resonance class and a binary mask over exactly the same 12 numbered input particles.
Query 1: top, particles 1/2/5. Query 2: top, particles 7/8/12. Query 3: Z, particles 9/10.
These are illustrative candidate groups; particle labels are indices, not flavor or truth assignments. The mask columns correspond exactly to those indices. Real predictions are class and mask logits; the drawing uses crisp masks for readability, and does not imply that masks must be exclusive or that each class can occur only once. Two queries can predict two instances of top.
Source: EveNet-Full/evenet/network/heads/segmentation/segmentation_head.py, forward_prediction_heads().
Visual concept follows the original SegmentationIllustration's explicit instance groups and resonance classes.
-->

---
clicks: 0
transition: fade
class: nju-refined
glowOpacity: 0.08
---

# Self-supervised generation

<NJUAnimatedEveNet scene="self" :step="1" />

<!--
The paper defines a self-supervised generative objective over reconstructed-object features: perturb part of a particle cloud and learn denoising from its clean values; perturb the entire cloud to obtain full particle-cloud generation. The drawing retains the partial-perturbation example, not conventional HEP event reconstruction. Event generation and completion are the capabilities; denoising is the mechanism.
The paper demonstrates conditional background generation for the dimuon analysis (main.tex, anomaly-detection generation procedure). Fast simulation is a potential application of generative event modelling, not a demonstrated detector-simulation replacement or speed benchmark in the cited paper. Particle completion refers to the selected visible-feature targets; invisible truth targets belong to the supervised head.
Head distinction: ReconGeneration uses the same EventGenerationHead family as TruthGeneration, with separate weights, particle-count conditioning and no positional slot embedding. Labels on this slide describe that configuration.
Paper: /Users/avencastmini/EveNet_Paper/main.tex, Model architecture, self-supervised generation paragraph (line 337), and background generation (lines 398–410).
Source: EveNet-Full/evenet/network/evenet_model.py, forward() and predict_diffusion_vector(mode='event'); heads/generation/generation_head.py, EventGenerationHead.forward().
-->

---
clicks: 0
transition: fade
class: nju-refined
glowOpacity: 0.08
---

# Supervised generation

<NJUAnimatedEveNet scene="supervised" :step="1" />

<!--
The supervised generative head infers invisible event components conditioned on observed objects and global quantities, including missing transverse momentum. Truth-level target features supervise the denoising objective; inference starts with noised invisible-particle queries. Neutrino momenta are the demonstrated example. Other hidden quantities require appropriate target definitions and training; this diagram does not claim that arbitrary hidden physics quantities are already supported.
Head distinction: TruthGeneration adds learned embeddings to generated target slots, indexed by cumulative time_mask. Visible particles receive no such slot embedding. This option is enabled in the supplied 20M and 100M configs. It distinguishes ordered target roles while the visible event remains the conditioning input; num_x is not supplied to this head.
Paper: /Users/avencastmini/EveNet_Paper/main.tex, Model architecture, supervised generation paragraph (line 340).
The sample-space drawing is schematic: the model does not return an explicit normalized likelihood. The contours illustrate possible sample regions, not measured densities.
Source: EveNet-Full/evenet/network/evenet_model.py, predict_diffusion_vector(mode='neutrino'); heads/generation/generation_head.py, EventGenerationHead.forward().
-->
