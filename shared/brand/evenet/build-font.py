"""Build Option C as an EveNet ligature; retain readable type for variant suffixes.
Requires fontTools. DM Sans is distributed under the adjacent OFL license.
Run from the repository root: python shared/brand/evenet/build-font.py
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.pens.transformPen import TransformPen
from fontTools.svgLib.path import parse_path
from fontTools.feaLib.builder import addOpenTypeFeaturesFromString
base=Path(__file__).resolve().parent
font=TTFont(base/'DM-Sans-source.ttf')
font=instantiateVariableFont(font,{'wght':700,'opsz':14},inplace=True)
paths=[
'M8 10H60V25H25V42H55V56H25V75H60V90H8Z',
'M69 36H87L99 70L111 36H129L108 90H90Z',
'M139 36H174L186 49V70H150V76H183V90H140L133 80V48ZM150 49V58H170V49Z',
'M199 90V10H216L247 61V10H264V90H247L216 39V90Z',
'M283 36H318L330 49V70H294V76H327V90H284L277 80V48ZM294 49V58H314V49Z',
'M345 20H361V36H376V50H361V74H376V90H352L345 82V50H336V36H345Z']
pen=TTGlyphPen(None)
for path in paths:parse_path(path,TransformPen(pen,(8.75,0,0,-8.75,-70,787.5)))
glyph='EveNetMark'
font.setGlyphOrder(font.getGlyphOrder()+[glyph]);font['glyf'][glyph]=pen.glyph();font['hmtx'][glyph]=(3290,0)
cmap=font.getBestCmap()
features=['feature liga {']
for name in ['EveNet','evenet','EVENET']:
 features.append('sub '+' '.join(cmap[ord(c)] for c in name)+' by '+glyph+';')
features.append('} liga;')
addOpenTypeFeaturesFromString(font,'\n'.join(features))
for record in font['name'].names:
 if record.nameID in [1,4,6,16,17,2]:
  value={1:'EveNet Engineered',4:'EveNet Engineered',6:'EveNetEngineered',16:'EveNet Engineered',17:'Regular',2:'Regular'}[record.nameID]
  record.string=value.encode(record.getEncoding())
font.flavor='woff2';font.save(base/'EveNet-Engineered.woff2')
