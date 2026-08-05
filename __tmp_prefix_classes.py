import re
from pathlib import Path

exclude_prefixes = ('ari-', 'fa-')
allowed = re.compile(r'^[A-Za-z0-9_-]+$')

html_files = list(Path('.').glob('*.html'))
css_files = list(Path('.').glob('*.css'))

class_attr_re = re.compile(r'class\s*=\s*"([^"]+)"')
class_attr_single_re = re.compile(r'class\s*=\s*\'([^\']+)\'')
css_class_re = re.compile(r'(?<![A-Za-z0-9_-])\.([A-Za-z0-9_-]+)(?![A-Za-z0-9_-])')

mapping = {}

# gather class names from html and css
for path in html_files + css_files:
    text = path.read_text(encoding='utf-8')
    for m in class_attr_re.finditer(text):
        for cls in m.group(1).split():
            if allowed.match(cls) and not cls.startswith(exclude_prefixes):
                mapping[cls] = 'ari-' + cls
    for m in class_attr_single_re.finditer(text):
        for cls in m.group(1).split():
            if allowed.match(cls) and not cls.startswith(exclude_prefixes):
                mapping[cls] = 'ari-' + cls
    if path.suffix == '.css':
        for m in css_class_re.finditer(text):
            cls = m.group(1)
            if allowed.match(cls) and not cls.startswith(exclude_prefixes):
                mapping[cls] = 'ari-' + cls

# apply replacements to html
for path in html_files:
    text = path.read_text(encoding='utf-8')
    def repl(match):
        classes = match.group(1).split()
        classes = [mapping.get(cls, cls) for cls in classes]
        return f'class="{' '.join(classes)}"'
    text = class_attr_re.sub(repl, text)
    def repl_single(match):
        classes = match.group(1).split()
        classes = [mapping.get(cls, cls) for cls in classes]
        return f"class='{' '.join(classes)}'"
    text = class_attr_single_re.sub(repl_single, text)
    path.write_text(text, encoding='utf-8')

# apply replacements to css
for path in css_files:
    text = path.read_text(encoding='utf-8')
    text = css_class_re.sub(lambda m: '.' + mapping.get(m.group(1), m.group(1)), text)
    path.write_text(text, encoding='utf-8')

print('class count', len(mapping))
