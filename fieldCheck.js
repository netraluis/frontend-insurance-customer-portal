const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'app/locales-text');
const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

const getKeys = (obj, prefix = '') =>
  Object.keys(obj).flatMap(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && obj[key] !== null
      ? getKeys(obj[key], fullKey)
      : fullKey;
  });

const allKeys = {};
let referenceKeys = null;

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf8'));
  const keys = getKeys(content);
  allKeys[file] = new Set(keys);

  if (!referenceKeys) {
    referenceKeys = new Set(keys);
  }
});

// Comparar
for (const [file, keys] of Object.entries(allKeys)) {
  const missing = [...referenceKeys].filter(k => !keys.has(k));
  const extra = [...keys].filter(k => !referenceKeys.has(k));

  if (missing.length || extra.length) {
    console.log(`\nEn archivo ${file}:`);
    if (missing.length) console.log('  ❌ Faltan claves:', missing);
    if (extra.length) console.log('  ⚠️  Claves extra:', extra);
  } else {
    console.log(`✅ ${file} tiene todas las claves`);
  }
}
