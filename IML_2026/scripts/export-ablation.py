"""Export original BSM scatter data using its original plotting functions.
Only load the functions needed for the peak-SIC scatter (no scipy smoothing).
"""
import ast,sys,os,re,json
from pathlib import Path
from functools import reduce
from collections import defaultdict
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.transforms import blended_transform_factory
SOURCE=Path('/Users/avencastmini/PycharmProjects/EveNet_Result_Plot')
sys.path.insert(0,str(SOURCE))
from plot_styles.core.theme import PlotStyle
from plot_styles.utils import apply_nature_axis_style
from plot_styles.style import MODEL_COLORS,MODEL_PRETTY,HEAD_LINESTYLES,BSM_DATASET_MARKERS

def load_functions(path,names):
 tree=ast.parse(path.read_text())
 for node in tree.body:
  if isinstance(node,ast.FunctionDef) and node.name in names:
   exec(compile(ast.Module(body=[node],type_ignores=[]),str(path),'exec'),globals())
load_functions(SOURCE/'paper_plot.py',{'read_bsm_data'})
load_functions(SOURCE/'plot_styles/sic.py',{'compute_sic_with_unc','_draw_sic_scatter','_style_sic_axes'})
data,_=read_bsm_data(str(SOURCE/'data/BSM'))
values=defaultdict(lambda:defaultdict(dict)); errors=defaultdict(lambda:defaultdict(dict))
for _,r in data[data.mass_a=='30'].iterrows():
 sic,unc=compute_sic_with_unc(np.array(r.TPR),np.array(r.FPR),np.array(r.FPR_unc))
 i=np.argmax(sic)
 values[r['head']][r.model][r.train_size]=sic[i]
 errors[r['head']][r.model][r.train_size]=unc[i]
models=['Nominal','Sup(Cls)','SSL','Scratch','SPANet']; heads=['Cls','Cls+Asn','Cls+Seg']; sizes=[10,30,100,300]
style=PlotStyle(base_font_size=16,axis_label_size=16,tick_label_size=14,legend_size=13)
fig,ax=plt.subplots(figsize=(7.5,6))
_draw_sic_scatter(ax,values,errors,models,heads,sizes,BSM_DATASET_MARKERS,style)
_,dummy=plt.subplots(1,2)
_style_sic_axes(dummy[0],dummy[1],ax,heads,y_min=[0,0,.85],scatter_style=style)
from matplotlib.lines import Line2D
handles=[Line2D([],[],color=MODEL_COLORS[m],lw=2,label=MODEL_PRETTY.get(m,m)) for m in models]
handles += [Line2D([],[],color='black',ls=HEAD_LINESTYLES[h],label=h) for h in heads]
ax.legend(handles=handles,fontsize=10,ncol=3,loc='upper left',frameon=False)
fig.savefig(Path(__file__).resolve().parents[1]/'public/figures/auxiliary-heads.svg',bbox_inches='tight')
