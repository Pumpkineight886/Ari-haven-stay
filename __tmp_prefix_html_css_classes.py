import re
from pathlib import Path

HTML_FILES = list(Path('.').glob('*.html'))
CSS_FILES = list(Path('.').glob('*.css'))

class_pattern = re.compile(r'class\s*=\s*"([^"]+)"')
selector_pattern = re.compile(r'\.([A-Za-z0-9_-]+)')

exclude_prefixes = ('ari-', 'fa-')

def should_prefix(name):
    return not any(name.startswith(pref) for pref in exclude_prefixes)

# replace classes in HTML class attributes
for path in HTML_FILES:
    text = path.read_text(encoding='utf-8')
    def repl(match):
        classes = match.group(1).split()
        classes = [f'ari-{c}' if should_prefix(c) else c for c in classes]
        return f'class="{' '.join(classes)}"'
    new_text = class_pattern.sub(repl, text)
    path.write_text(new_text, encoding='utf-8')

# replace class selectors in CSS files
for path in CSS_FILES:
    text = path.read_text(encoding='utf-8')
    def repl_sel(match):
        name = match.group(1)
        return f'.ari-{name}' if should_prefix(name) else f'.{name}'
    new_text = selector_pattern.sub(repl_sel, text)
    path.write_text(new_text, encoding='utf-8')

print('done')
