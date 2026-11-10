---
clicks: 1
transition: fade
class: nju-refined nju-architecture
glowOpacity: 0.08
---

# <span class="evenet-wordmark gradient-animated">EveNet</span> architecture

<NJUAnimatedEveNet scene="core" :step="$clicks" />

<!--
The five heads follow this talk: classification, assignment, segmentation, ReconGeneration, TruthGeneration.
Initial: an encapsulated EveNet box receives a particle cloud and global conditions.
Data flows continuously through the closed housing.
1. The interlocking panels retract while flow continues, revealing PET, Object Encoder and all five branches in one automatic sequence. PET is the point-edge Transformer: attention plus local geometric message passing produces particle features. GlobalEmbedding embeds event-wide conditions. ObjectEncoder jointly processes particle features, global conditions and a learned event-summary token, returning contextual object features, updated global features and the event summary. Classification, assignment and segmentation consume these outputs. This is the discriminative interface in this implementation, not a claim that all discriminative models require this module.
The generation heads use their own time-conditioned Transformer blocks to predict per-particle diffusion vectors directly from PET features and embedded global conditions. Thus bypassing ObjectEncoder does not remove event conditioning or attention. The diffusion sampling path does not call ObjectEncoder. During joint training, the generation schedule can also evaluate discriminative heads through ObjectEncoder; the generative prediction still uses PET outputs directly.
Generation-head design verified against the implementation: both are separate EventGenerationHead instances. ReconGeneration passes num_point_cloud and never enables position encoding. TruthGeneration passes num_x=None and enables learned target-slot encoding in the neutrino schedule when neutrino_position_encode is true (enabled in network-20M.yaml and network-100M.yaml). PointCloudPositionalEmbedding uses cumulative indices of time_mask to identify generated slots; the added embeddings are masked off on observed particles. These indices are target-slot identities, not spatial coordinates. The common decoder family therefore has task-specific conditioning and separate weights, rather than two fundamentally unrelated architectures.
PET is permutation equivariant at the particle-feature level, not invariant: consistently permuting features, coordinates and masks permutes the output features. This is an architectural statement, with the usual caveats for stochastic training and exact nearest-neighbour ties. Main paper line 316 explicitly uses permutation-equivariant.
PET shows local neighbourhood connections together with long-range attention across the particle cloud. The Object Encoder shows particle and global-condition tokens exchanging information, producing contextual object tokens and a distinct event-summary token. The graph connectivity, token counts, positions and pulse timing are schematic, not architectural measurements or learned attention weights.
Code: EveNet-Full/evenet/network/evenet_model.py, forward(), lines 532–649; body/object_encoder.py, forward().
Optional Regression and standalone GlobalGeneration are outside this talk's five-head scope.
Animation reference: https://animejs.com/; Anime.js 4.5.0 (MIT). The opening uses a 1600 ms click transition; idle loops repeat independently every 2.5 seconds. Inactive slides and reduced-motion views do not loop.
-->
