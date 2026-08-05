import re
from pathlib import Path
classes=set()
for fname in Path('.').glob('*.html'):
    text=fname.read_text(encoding='utf-8')
    for m in re.finditer(r'class\s*=\s*"([^"]+)"', text):
        classes.update(m.group(1).split())
for fname in Path('.').glob('*.css'):
    text=fname.read_text(encoding='utf-8')
    for m in re.finditer(r'\.([A-Za-z0-9_-]+)', text):
        classes.add(m.group(1))
Path('html_css_classes.txt').write_text('\n'.join(sorted(classes)), encoding='utf-8')
print('dumped', len(classes))
