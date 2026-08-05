import re
import glob
classes = set()
for fname in glob.glob('*.html') + glob.glob('*.css'):
    with open(fname, 'r', encoding='utf-8') as f:
        text = f.read()
    for m in re.finditer(r'class\s*=\s*"([^"]+)"', text):
        classes.update(m.group(1).split())
    if fname.endswith('.css'):
        for m in re.finditer(r'\.([A-Za-z0-9_-]+)', text):
            classes.add(m.group(1))
for c in sorted(classes):
    print(c)
