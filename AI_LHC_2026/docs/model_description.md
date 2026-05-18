# EveNet — Canonical Model Description

This document describes the **architecture**, **data flow**, and the **intended purpose** of each major component in EveNet. It is the canonical reference for slide generation, diagram rendering, animation sequencing, and any downstream tooling.

---

## 1. Overview

EveNet is a **foundation model for high-energy physics events** that unifies discriminative and generative reasoning over particle collision events.

The model is designed to:
- Represent collider events as structured point clouds.
- Learn latent event structure with self-supervision.
- Perform physics process classification.
- Assign reconstructed objects to truth partons (resonance mapping).
- Produce conditional generation of missing elements (e.g., neutrinos) via diffusion.

The core idea: **data-driven tokens** derived from both particle-level and event-level inputs are shared across different task heads with consistent semantics.

---

## 2. Inputs

### 2.1 Particle-Level Input

- `x ∈ ℝ^(18×7)`
  - A structured matrix of up to 18 reconstructed object features.
  - Padded to fixed length with masks.
  - Feature columns:
    ```
    [E, pT, η, φ, isBTag, isLepton, charge]
    ```
    where isBTag, isLepton ∈ {0,1}, charge ∈ {−1,0,+1}.

- `x_mask ∈ {0,1}^18`
  - A binary indicator for valid vs padded particle rows.
  - Used to enforce permutation invariance and ignore padding.

> NOTE: This representation treats each event as a fixed-length point cloud with feature vectors and masks.

---

### 2.2 Global Conditions

- `globals ∈ ℝ^(10×1)`
  - Event-level conditions (e.g., scalar summary statistics).
  - Provides context to diffusion, classification, segmentation, and assignment.

- `global_mask ∈ {0,1}^(10×1)` (optional)
  - In practice may be all ones, but is included for consistency.

---

## 3. Backbone Encoder

EveNet has a dual encoder backbone that abstracts physics structure into tokens.

---

### 3.1 Point–Edge Transformer (PET)

**Input:**  
- Particle point cloud: `x`  
- Mask: `x_mask`

**Purpose:**
- Learn relational structure between particles.
- Encode both the “point” representation and pairwise “edges” between particles.
- Preserve permutation symmetry of particle cloud.

**Outputs:**
- `particle_tokens ∈ ℝ^(18×D)`
  - One token per (real) particle.
  - Embeddings are aware of local and global context via message passing.

---

### 3.2 Global Embedding Encoder

**Input:**  
- `globals` + optional `global_mask`

**Purpose:**
- Encode event-level metadata using a transformer backbone.
- Provides high-level context to discriminative and generative tasks.

**Outputs:**
- `condition_tokens ∈ ℝ^(Ng×D)`
  - A small set of latent vectors representing context.

---

## 4. Object Encoder

Used only for **deterministic tasks** (classification, segmentation, assignment).

**Input:**
- `particle_tokens`
- `condition_tokens`
- masks

**Process:**
- Cross-attention between condition and particle tokens.
- Pools global summary into a single vector.

**Outputs:**
- `object_embeddings ∈ ℝ^(18×D)`
  - Token set refined for downstream tasks.
- `event_token ∈ ℝ^(1×D)`
  - A global summary embedding used by classification.

---

## 5. Deterministic Heads

All of these are **non-generative**, meaning they do *not* alter the input and do *not* use diffusion.

---

### 5.1 Classification Head

**Input:**  
- `event_token`

**Purpose:**
- Global physics process classification (multi-class).
- Optionally regression (e.g., scores, observables).

---

### 5.2 Assignment Head

**Input:**  
- `object_embeddings` (+ optionally `event_token`)

**Purpose:**
- Symmetry-aware mapping of reconstructed objects to underlying truth partons.
- Includes:
  - Resonance detection.
  - Resonance mapping.

**Constraints:**
- Requires known decay topology (rigid, less general).

---

### 5.3 Segmentation Head

**Input:**  
- `object_embeddings`

**Mechanism:**
- Query-based set prediction:
  - Each “learnable query” produces a class + a mask over particles.
  - Permutation invariance preserved.

**Purpose:**
- Resonance clustering.
- Resonance classification.

---

## 6. Generative Heads (Diffusion-Based)

When any generative head is active, the encoder behavior changes:

---

### 6.1 Noise Injection & Time Token

- A diffusion noise term is added to `x`: `x_noisy = x + noise(t)`

- A time embedding token `t` is produced and appended to conditioning.

This altered input is fed into PET.

---

### 6.2 Supervised Generative Head

**Inputs:**
- `particle_tokens(t)`
- `condition_tokens`
- `class_token` (generation condition)
- `time_embedding`
- `position_embedding`

**Purpose:**
- Predict missing or latent object features (e.g., neutrino kinematics).
- Conditional diffusion for target outputs.

---

### 6.3 Self-Supervised Generative Head

**Inputs:**
- `particle_tokens(t)`
- `condition_tokens`
- `time_embedding`

**Mechanism:**
- Mask part of the point cloud.
- Diffuse backward to reconstruct.

**Purpose:**
- Learn latent event structure without labeled targets.

---

## 7. Data Flow Summary

- x, x_mask ──► PET ─► particle_tokens
- globals ──► GlobalEmbedding ─► condition_tokens

particle_tokens + condition_tokens ─► ObjectEncoder ─►
├─► Classification Head
├─► Assignment Head
└─► Segmentation Head

In generative mode:
x + noise(t) ─► PET(t) ─►
├─► Supervised Gen Head
└─► Self-Supervised Gen Head

---

## 8. High-Level Intent

EveNet is designed to:
- **Unify discriminative and generative reasoning**
- **Maintain permutation invariance**
- **Provide modular extensibility (new tasks, new heads)**
- **Leverage diffusion models for high-dimension conditional outputs**