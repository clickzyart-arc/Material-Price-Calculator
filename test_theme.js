/**
 * Verification test for Theme Engine & Presets
 */
const storageMock = {};
global.localStorage = {
  getItem: (key) => storageMock[key] || null,
  setItem: (key, val) => { storageMock[key] = val; },
  removeItem: (key) => { delete storageMock[key]; }
};

const rootStyles = {};
global.document = {
  documentElement: {
    style: {
      setProperty: (prop, val) => { rootStyles[prop] = val; },
      getPropertyValue: (prop) => rootStyles[prop] || ''
    }
  }
};

global.window = global;

const fs = require('fs');
const path = require('path');
const themeCode = fs.readFileSync(path.join(__dirname, 'theme.js'), 'utf8');
eval(themeCode);

console.log("--- 1. Testing Theme Presets ---");
console.log("Total presets:", window.THEME_PRESETS.length);
const userPreset = window.THEME_PRESETS.find(p => p.id === "user-charcoal-dark");
console.log("User Preset Colors:", userPreset.colors);

if (userPreset.colors['--primary'] !== '#E94F37' || userPreset.colors['--bg-card'] !== '#393E41') {
  throw new Error("User preset colors mismatch");
}

console.log("--- 2. Testing Theme Application ---");
window.themeManager.applyTheme(userPreset.colors, true);
if (rootStyles['--primary'] !== '#E94F37' || rootStyles['--bg-card'] !== '#393E41') {
  throw new Error("Theme application failed");
}

console.log("--- 3. Testing Hex to Rgba Converter ---");
const rgba = window.themeManager.hexToRgba("#E94F37", 0.4);
console.log("Converted RGBA:", rgba);
if (!rgba.includes("rgba(233, 79, 55, 0.4)")) {
  throw new Error("RGBA conversion failed");
}

console.log("\n>>> THEME ENGINE TESTS PASSED SUCCESSFULLY! <<<");
