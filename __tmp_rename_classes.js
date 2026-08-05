const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.');
const htmlCssFiles = files.filter(f => f.endsWith('.html') || f.endsWith('.css'));
const jsFiles = files.filter(f => f.endsWith('.js'));
const classes = new Set();
const FA_EXCLUDE = /^fa(-|$)/;
const ALLOWED = /^[A-Za-z0-9_-]+$/;

for (const fname of htmlCssFiles) {
  const text = fs.readFileSync(fname, 'utf8');
  for (const m of text.matchAll(/class\s*=\s*"([^"]+)"/g)) {
    for (const token of m[1].split(/\s+/).filter(Boolean)) {
      if (ALLOWED.test(token) && !FA_EXCLUDE.test(token) && !token.startsWith('ari-')) classes.add(token);
    }
  }
  for (const m of text.matchAll(/class\s*=\s*'([^']+)'/g)) {
    for (const token of m[1].split(/\s+/).filter(Boolean)) {
      if (ALLOWED.test(token) && !FA_EXCLUDE.test(token) && !token.startsWith('ari-')) classes.add(token);
    }
  }
  if (fname.endsWith('.css')) {
    for (const m of text.matchAll(/\.([A-Za-z0-9_-]+)/g)) {
      const token = m[1];
      if (ALLOWED.test(token) && !FA_EXCLUDE.test(token) && !token.startsWith('ari-')) classes.add(token);
    }
  }
}

const mapping = {};
for (const cls of Array.from(classes).sort()) {
  mapping[cls] = 'ari-' + cls;
}

function replaceClassAttr(text) {
  return text.replace(/class\s*=\s*"([^"]+)"/g, (_, value) => {
    return 'class="' + value.split(/\s+/).map(tok => mapping[tok] || tok).join(' ') + '"';
  }).replace(/class\s*=\s*'([^']+)'/g, (_, value) => {
    return "class='" + value.split(/\s+/).map(tok => mapping[tok] || tok).join(' ') + "'";
  });
}

function replaceCssSelectors(text) {
  for (const [oldClass, newClass] of Object.entries(mapping)) {
    text = text.replace(new RegExp('(?<![A-Za-z0-9_-])\\.' + oldClass + '(?![A-Za-z0-9_-])', 'g'), '.' + newClass);
  }
  return text;
}

function replaceJsText(text) {
  for (const [oldClass, newClass] of Object.entries(mapping)) {
    text = text.replace(new RegExp('(?<![A-Za-z0-9_-])\\.' + oldClass + '(?![A-Za-z0-9_-])', 'g'), '.' + newClass);
  }
  text = text.replace(/(["'])(.*?)\1/g, (match, quote, content) => {
    const replaced = content.split(/(\s+)/).map(token => {
      if (mapping[token]) return mapping[token];
      return token;
    }).join('');
    return quote + replaced + quote;
  });
  return text;
}

for (const fname of htmlCssFiles) {
  const filePath = path.join('.', fname);
  let text = fs.readFileSync(filePath, 'utf8');
  text = replaceClassAttr(text);
  if (fname.endsWith('.css')) {
    text = replaceCssSelectors(text);
  }
  fs.writeFileSync(filePath, text, 'utf8');
}

for (const fname of jsFiles) {
  const filePath = path.join('.', fname);
  let text = fs.readFileSync(filePath, 'utf8');
  text = replaceJsText(text);
  fs.writeFileSync(filePath, text, 'utf8');
}

console.log('Renamed', Object.keys(mapping).length, 'classes');
