---
class: iml-content
transition: fade
---

# Deterministic heads

<IMLTaskHeads mode="deterministic" />

<!--
NMI paper, Figure 1c and Methods: Model architecture. The classification head predicts process probabilities; assignment predicts reconstructability and symmetric object-to-decay assignment tensors for a specified topology; segmentation uses learnable resonance queries to predict a class and an object mask per query. Assignment and segmentation are trained only in downstream fine-tuning (Table 1). Deterministic describes the forward mapping, not a hard-label-only output. Illustrations are schematic: motion does not depict an optimization trajectory or measured attention. The shared Object Encoder supplies contextual object and event representations.
-->
