import re
import glob
from pathlib import Path

# Collect class names from HTML class attributes and CSS selectors.
class_names = set()
for fname in glob.glob('*.html') + glob.glob('*.css'):
    text = Path(fname).read_text(encoding='utf-8')
    for m in re.finditer(r'class\s*=\s*"([^"]+)"', text):
        class_names.update(m.group(1).split())
    if fname.endswith('.css'):
        for m in re.finditer(r'\.([A-Za-z0-9_-]+)', text):
            class_names.add(m.group(1))

# Only rename class names, not font-awesome or existing JS properties.
# Exclude known external classes or names that are not CSS classes.
exclude = { 'fa-solid', 'fa-user', 'fa-bars', 'fa-xmark', 'fa-brands', 'fa-facebook-f', 'fa-instagram', 'fa-twitter', 'fa-youtube', 'fa-chevron-right', 'fa-arrow-right' }
class_names = sorted([c for c in class_names if c not in exclude and re.match(r'^[A-Za-z0-9_-]+$', c)])
mapping = {c: f'ari-{c}' for c in class_names}

# Replace class attributes in HTML.
html_files = glob.glob('*.html')
for fname in html_files:
    path = Path(fname)
    text = path.read_text(encoding='utf-8')
    def replace_class_attr(match):
        original = match.group(1)
        tokens = original.split()
        return 'class="' + ' '.join(mapping.get(token, token) for token in tokens) + '"'
    text = re.sub(r'class\s*=\s*"([^"]+)"', replace_class_attr, text)
    path.write_text(text, encoding='utf-8')

# Replace class selectors in CSS.
css_files = glob.glob('*.css')
for fname in css_files:
    path = Path(fname)
    text = path.read_text(encoding='utf-8')
    for old, new in mapping.items():
        text = re.sub(r'(?<![A-Za-z0-9_-])\.' + re.escape(old) + r'(?![A-Za-z0-9_-])', '.' + new, text)
    path.write_text(text, encoding='utf-8')

# Replace class references in JS string literals and selectors.
js_files = glob.glob('*.js')
for fname in js_files:
    path = Path(fname)
    text = path.read_text(encoding='utf-8')
    # Replace selector tokens like .className
    for old, new in mapping.items():
        text = re.sub(r'(?<![A-Za-z0-9_-])\.' + re.escape(old) + r'(?![A-Za-z0-9_-])', '.' + new, text)
    # Replace direct class list string tokens within quoted strings.
    def replace_in_string(match):
        quote = match.group(1)
        content = match.group(2)
        tokens = content.split()
        new_content = ' '.join(mapping.get(token, token) for token in tokens)
        return quote + new_content + quote
    text = re.sub(r'(["\'])([^"\']*?)(\1)', replace_in_string, text)
    path.write_text(text, encoding='utf-8')

print('renamed', len(mapping), 'classes')
