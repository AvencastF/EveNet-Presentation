---
class: iml-content iml-closing
transition: fade
---

# <span class="evenet-wordmark">EveNet</span>: from demonstrated transfer to wider use

<div class="discussion-matrix">
<div class="discussion-labels"><span>Discussion topic</span><span>What we observe today</span><span>What remains open</span></div>
<section class="discussion-band"><h2><span i-carbon:flow/>Transfer<br/>&amp; pile-up</h2><div><strong>Delphes → CMS simulation &amp; data</strong><p>Successful adaptation despite changes in detector response, reconstruction and pile-up.</p></div><div><strong>Isolate the pile-up dependence</strong><p>The two CMS tests are encouraging, but are not a controlled pile-up scan.</p></div></section>
<section class="discussion-band"><h2><span i-carbon:deploy/>Analysis<br/>deployment</h2><div><strong>~20M parameters, usable now</strong><p>ONNX integration; several ATLAS analyses; tested with their full systematic variations.</p></div><div><strong>Make analysis use the benchmark</strong><p>Assess transfer, calibration and inference cost together—not model size alone.</p></div></section>
<section class="discussion-band"><h2><span i-carbon:chart-line/>Model<br/>scaling</h2><div><strong>An affordable starting point</strong><p>The current model fits existing analysis workflows and available inference resources.</p></div><div><strong>100M+ as a future direction</strong><p>Explore larger architectures as inference capacity grows; measure the added physics benefit.</p></div></section>
</div>
<div class="discussion-question"><span i-carbon:chat/><div><b>What should qualify a model for routine analysis use?</b><p>Transfer quality · calibration · systematic stability · inference cost</p></div></div>

<!--
Deployment and current ATLAS uptake are the presenter's status update, 10 November 2026, not numerical results from the published paper. “Full set” means the systematic variations used in the participating analyses, not every possible detector, theory or pile-up shift. The ONNX statement concerns the deployed analysis model; it does not assert that all generative sampling paths have been exported or benchmarked. Parameter count alone is not a latency measurement. No quantitative latency or throughput claim is supplied.
The two CMS benchmarks combine changes in detector response, reconstruction, pile-up, selection and downstream adaptation. Their success is not a controlled pile-up ablation or proof of detector independence. No zero-shot claim.
Discussion framing informed by the supplied IML 2.pdf: pages 5 (last mile), 12–15 (reusable event representations, calibration, pile-up and scaling). No claim of CERN endorsement or role in its strategy is made.
-->
