---
class: iml-content
transition: fade
---

# Generative heads

<IMLTaskHeads mode="generative" />

<!--
Verified against the NMI PDF in Zotero, item XE5Q655S, attachment VHZ2LXS8: Figure 1b and Methods, Model architecture.
ReconGeneration (SS-Gen): perturb selected reconstructed input objects; condition on unperturbed information and diffusion time to reconstruct their original features. The supervision is derived from the input itself. There are NO truth-level particle targets and no external physics labels. Full perturbation gives full-event generation in the same formulation.
TruthGeneration (Sup-Gen): inject noised invisible-particle tokens and denoise them conditioned on observed objects and global missing transverse momentum. Invisible-particle simulation truth defines the training targets. These truth targets are not inputs at inference.
Both use diffusion-vector prediction, with task-specific decoder weights and different target-token choices. Generative decoding uses the PET features and global conditions, bypassing the Object Encoder. The two clouds and trajectories are schematic; they are not an explicit likelihood, calibrated uncertainty or measured distribution. Do not apply a shared truth-target statement to both heads.
-->
