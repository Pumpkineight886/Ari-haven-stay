const fs = require('fs');
const glob = require('glob');
const path = require('path');
const classRegex = /class\s*=\s*"([^"]+)"/g;
const selectorRegex = /\.([A-Za-z0-9_-]+)/g;
const classes = new Set();
for (const fname of glob.sync('*.html').concat(glob.sync('*.css'))) {
  const text = fs.readFileSync(fname, 'utf8');
  for (const m of text.matchAll(classRegex)) {
    for (const token of m[1].split(/\s+/).filter(Boolean)) classes.add(token);
  }
  if (fname.endsWith('.css')) {
    for (const m of text.matchAll(selectorRegex)) classes.add(m[1]);
  }
}
fs.writeFileSync('class_dump.json', JSON.stringify(Array.from(classes).sort(), null, 2), 'utf8');
console.log('dumped', classes.size);
