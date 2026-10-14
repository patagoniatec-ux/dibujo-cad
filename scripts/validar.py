"""Validación sin dependencias del contenido y las rutas del sitio estático."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
root=Path(__file__).resolve().parents[1]
errors=[]
def check(url,source):
    if not url or url.startswith(('#','mailto:')): return
    parts=urlsplit(url)
    if parts.scheme or parts.netloc: return
    target=(source.parent/unquote(parts.path)).resolve()
    if not target.is_relative_to(root) or not target.exists(): errors.append(f'{source.name}: ruta inexistente {url}')
class Links(HTMLParser):
    def __init__(self,source): super().__init__(); self.source=source
    def handle_starttag(self,tag,attrs):
        values=dict(attrs)
        for name in ('href','src'):
            if values.get(name): check(values[name],self.source)
for source in root.glob('*.html'): Links(source).feed(source.read_text())
data=json.loads((root/'data/contenido.json').read_text())
ids=set()
for key in ('activities','library','tutorials','news','gallery','services'):
    for item in data[key]:
        assert item.get('id') and item.get('title'),f'{key}: faltan ID o título'
        if item['id'] in ids: errors.append(f'ID repetido: {item["id"]}')
        ids.add(item['id'])
        for name in ('url','image'): check(item.get(name,''),root/'index.html')
if errors: raise SystemExit('\n'.join(errors))
print(f'Validación correcta: {len(list(root.glob("*.html")))} páginas y {len(ids)} recursos.')
