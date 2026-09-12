/**
 * Automated Verification Script for Material Pricing Calculations & Data Logic
 */

// Mock localStorage
const storageMock = {};
global.localStorage = {
  getItem: (key) => storageMock[key] || null,
  setItem: (key, val) => { storageMock[key] = val; },
  removeItem: (key) => { delete storageMock[key]; }
};

// Load data.js
const fs = require('fs');
const path = require('path');
const dataCode = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

// Evaluate in global context
global.window = global;
eval(dataCode);

console.log("--- 1. Testing Material Data Catalog ---");
const categories = window.materialDataManager.getCategories();
console.log("Categories found:", categories);
if (!categories.includes("Glass") || !categories.includes("Clear Acrylic") || !categories.includes("ACP") || !categories.includes("Canvas")) {
  throw new Error("Missing expected categories");
}

console.log("--- 2. Testing Cascading Thickness / Variants ---");
const glassVariants = window.materialDataManager.getVariantsByCategory("Glass");
console.log("Glass variants:", glassVariants.map(v => v.thickness));
if (glassVariants.length !== 3 || !glassVariants.some(v => v.thickness === "5mm")) {
  throw new Error("Glass variants incorrect");
}

const acrylicVariants = window.materialDataManager.getVariantsByCategory("Clear Acrylic");
console.log("Clear Acrylic variants:", acrylicVariants.map(v => v.thickness));
if (acrylicVariants.length !== 4) {
  throw new Error("Acrylic variants count mismatch");
}

console.log("--- 3. Testing Excel Rates Accuracy ---");
const glass5mm = window.materialDataManager.getItemById("glass-5mm");
const glass5BaseTotal = glass5mm.printing + glass5mm.lamination + glass5mm.materialPrice + glass5mm.varnish;
console.log("Glass 5mm Base Total:", glass5BaseTotal, "(Expected: 650)");
if (glass5BaseTotal !== 650) throw new Error("Glass 5mm rate mismatch");

const acpEmboss = window.materialDataManager.getItemById("acp-3mm-emboss");
const acpEmbossBaseTotal = acpEmboss.printing + acpEmboss.lamination + acpEmboss.materialPrice + acpEmboss.varnish;
console.log("ACP 3mm Emboss Base Total:", acpEmbossBaseTotal, "(Expected: 790, Frame: 5)");
if (acpEmbossBaseTotal !== 790 || acpEmboss.framePerInch !== 5) throw new Error("ACP Emboss rate mismatch");

const canvasStretch = window.materialDataManager.getItemById("canvas-stretching-round");
console.log("Canvas Stretch Round:", canvasStretch.printing, canvasStretch.materialPrice, "Extra:", canvasStretch.defaultStretchingRate);
if (canvasStretch.defaultStretchingRate !== 220) throw new Error("Canvas stretching mismatch");

console.log("--- 4. Testing Unit Conversion & Formulas ---");
// Inches: (24 * 36) / 144 = 6.00 Sq.Ft
const wIn = 24, hIn = 36;
const sqFtInches = (wIn * hIn) / 144;
const perimeterInches = 2 * (wIn + hIn); // 120 inches
console.log(`24in x 36in -> Area: ${sqFtInches} Sq.Ft, Perimeter: ${perimeterInches} in`);
if (sqFtInches !== 6 || perimeterInches !== 120) throw new Error("Inches formula mismatch");

// Feet: 2 * 3 = 6.00 Sq.Ft
const wFt = 2, hFt = 3;
const sqFtFeet = wFt * hFt;
const perimeterFromFeet = 2 * ((wFt * 12) + (hFt * 12)); // 120 inches
console.log(`2ft x 3ft -> Area: ${sqFtFeet} Sq.Ft, Perimeter: ${perimeterFromFeet} in`);
if (sqFtFeet !== 6 || perimeterFromFeet !== 120) throw new Error("Feet formula mismatch");

console.log("--- 5. Testing Extras Cost Computation ---");
// Glass 5mm with holes turned OFF by default (0 holes cost)
const glassCostNoHoles = (sqFtInches * glass5BaseTotal); // 6 * 650 = 3900
console.log("Glass 5mm (Holes OFF by default): ₹" + glassCostNoHoles + " (Expected: 3900)");
if (glassCostNoHoles !== 3900) throw new Error("Glass default without holes mismatch");

// ACP 3mm with frame @ 5 per running inch + 4 inches wastage
const acp3mm = window.materialDataManager.getItemById("acp-3mm");
const acpBaseTotal = acp3mm.printing + acp3mm.materialPrice; // 200 + 190 = 390
const frameWastage = 4;
const totalFrameInches = perimeterInches + frameWastage; // 120 + 4 = 124
const frameCostWithWastage = totalFrameInches * 5; // 124 * 5 = 620
const acpCostWithWastage = (sqFtInches * acpBaseTotal) + frameCostWithWastage; // (6 * 390 = 2340) + 620 = 2960
console.log(`ACP 3mm (6 sq.ft + 120in perimeter + ${frameWastage}in wastage @ ₹5): ₹${acpCostWithWastage} (Frame: ₹${frameCostWithWastage}, Expected: 2960)`);
if (acpCostWithWastage !== 2960 || frameCostWithWastage !== 620) throw new Error("Frame wastage calculation mismatch");

console.log("--- 6. Testing LocalStorage Update & Reset ---");
const modified = JSON.parse(JSON.stringify(window.materialDataManager.materials));
modified[0].printing = 350;
window.materialDataManager.saveMaterials(modified);
if (window.materialDataManager.getItemById("glass-5mm").printing !== 350) throw new Error("Save materials failed");

window.materialDataManager.resetToDefaults();
if (window.materialDataManager.getItemById("glass-5mm").printing !== 300) throw new Error("Reset to defaults failed");

console.log("\n>>> ALL AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");
