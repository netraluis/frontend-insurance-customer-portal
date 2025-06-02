const fs = require('fs');
const path = require('path');

// 🔒 Ruta fija a la carpeta de traducciones
const localesPath = path.resolve(__dirname, 'app/locales-text');

// Verificación de existencia
if (!fs.existsSync(localesPath)) {
  console.error(`❌ La carpeta no existe: ${localesPath}`);
  process.exit(1);
}

const files = fs.readdirSync(localesPath).filter(file => file.endsWith('.json'));

const getKeys = (obj, prefix = '') =>
  Object.keys(obj).flatMap(key => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return typeof obj[key] === 'object' && obj[key] !== null
      ? getKeys(obj[key], fullKey)
      : fullKey;
  });

const getValueByPath = (obj, path) =>
  path.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);

const setValueByPath = (obj, path, value) => {
  const keys = path.split('.');
  keys.reduce((acc, key, i) => {
    if (i === keys.length - 1) {
      acc[key] = value;
    } else {
      acc[key] = acc[key] || {};
    }
    return acc[key];
  }, obj);
};

const allContent = {};
let referenceKeys = null;
let referenceFile = null;

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(localesPath, file), 'utf8'));
  allContent[file] = content;

  if (!referenceKeys) {
    referenceKeys = getKeys(content);
    referenceFile = file;
  }
});

files.forEach(file => {
  const content = allContent[file];
  const newOrdered = {};

  referenceKeys.forEach(key => {
    const value = getValueByPath(content, key);
    setValueByPath(newOrdered, key, value !== undefined ? value : '');
  });

  const fullPath = path.join(localesPath, file);
  console.log(`✍️ Escribiendo: ${fullPath}`);
  fs.writeFileSync(fullPath, JSON.stringify(newOrdered, null, 2), 'utf8');
});

console.log(`\n✅ Todos los archivos se han reordenado según ${referenceFile}`);
