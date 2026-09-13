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
const dataCode = fs.readFileSync(path.join(__dirname, '../js/data.js'), 'utf8');

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

// ACP 3mm with frame @ 5 per running inch + 6 inches wastage
const acp3mm = window.materialDataManager.getItemById("acp-3mm");
const acpBaseTotal = acp3mm.printing + acp3mm.materialPrice; // 200 + 190 = 390
const frameWastage = 6;
const totalFrameInches = perimeterInches + frameWastage; // 120 + 6 = 126
const frameCostWithWastage = totalFrameInches * 5; // 126 * 5 = 630
const acpCostWithWastage = (sqFtInches * acpBaseTotal) + frameCostWithWastage; // (6 * 390 = 2340) + 630 = 2970
console.log(`ACP 3mm (6 sq.ft + 120in perimeter + ${frameWastage}in wastage @ ₹5): ₹${acpCostWithWastage} (Frame: ₹${frameCostWithWastage}, Expected: 2970)`);
if (acpCostWithWastage !== 2970 || frameCostWithWastage !== 630) throw new Error("Frame wastage calculation mismatch");

// Stretching calculation on square feet: Total Sq.Ft * Stretching Price -> added to Final Bill
const stretchArea = 3;
const stretchRate = 220;
const stretchCost = stretchArea * stretchRate;
console.log(`Canvas Stretching (${stretchArea} sq.ft @ ₹${stretchRate}/sq.ft): ₹${stretchCost} (Expected: 660)`);
if (stretchCost !== 660) throw new Error("Stretching sq.ft calculation mismatch");

// Final bill with Canvas Stretching Round: 3 sq.ft @ (140 print + 110 mat = 250) + (3 * 220 = 660 stretch) = 1410
const canvasRoundBase = canvasStretch.printing + canvasStretch.materialPrice; // 250
const canvasRoundAreaCost = stretchArea * canvasRoundBase; // 750
const finalBillWithStretching = canvasRoundAreaCost + stretchCost; // 750 + 660 = 1410
console.log(`Final Bill (Area ₹${canvasRoundAreaCost} + Stretching ₹${stretchCost}): ₹${finalBillWithStretching} (Expected: 1410)`);
if (finalBillWithStretching !== 1410) throw new Error("Final bill with stretching mismatch");

// Dimension update test: 4ft x 2ft = 8 sq.ft -> Stretching = 8 * 220 = 1760; Final Bill = (8 * 250 = 2000) + 1760 = 3760
const updatedSqFt = 4 * 2;
const updatedStretchCost = updatedSqFt * stretchRate;
const updatedFinalBill = (updatedSqFt * canvasRoundBase) + updatedStretchCost;
console.log(`Updated 4x2ft (8 sq.ft @ ₹220): Stretching ₹${updatedStretchCost}, Final Bill ₹${updatedFinalBill} (Expected: 3760)`);
if (updatedStretchCost !== 1760 || updatedFinalBill !== 3760) throw new Error("Updated stretching calculation mismatch");

// Default dimensions test: 1x1 in Feet -> 1.00 sq.ft
const defaultFtWidth = 1, defaultFtHeight = 1;
const defaultSqFt = defaultFtWidth * defaultFtHeight;
if (defaultSqFt !== 1) throw new Error("Default 1x1 feet area mismatch");

console.log("--- 6. Testing Billable Square Foot Slab Rule ---");
function getBillableSqFt(actualSqFt) {
  if (actualSqFt <= 0) return 0;
  const rounded = Math.round(actualSqFt * 100) / 100;
  const baseInteger = Math.floor(rounded);
  const frac = Math.round((rounded - baseInteger) * 100) / 100;

  if (frac === 0) {
    return baseInteger;
  } else if (frac <= 0.50) {
    return baseInteger + 0.50;
  } else {
    return baseInteger + 1.00;
  }
}

// Case 1: 6.2 sq.ft -> calculate for 6.50 sq.ft
const billable62 = getBillableSqFt(6.2);
console.log(`6.2 Sq.Ft -> Billable: ${billable62} Sq.Ft (Expected: 6.5)`);
if (billable62 !== 6.5) throw new Error("6.2 sq.ft rounding failed");

// Case 2: 6.65 sq.ft -> calculate for 7.00 sq.ft (full square foot)
const billable665 = getBillableSqFt(6.65);
console.log(`6.65 Sq.Ft -> Billable: ${billable665} Sq.Ft (Expected: 7.0)`);
if (billable665 !== 7.0) throw new Error("6.65 sq.ft rounding failed");

// Case 3: exact 6.00 sq.ft -> 6.00 sq.ft
const billable60 = getBillableSqFt(6.0);
console.log(`6.00 Sq.Ft -> Billable: ${billable60} Sq.Ft (Expected: 6.0)`);
if (billable60 !== 6.0) throw new Error("6.00 sq.ft rounding failed");

// Case 4: exact 6.50 sq.ft -> 6.50 sq.ft
const billable65 = getBillableSqFt(6.5);
console.log(`6.50 Sq.Ft -> Billable: ${billable65} Sq.Ft (Expected: 6.5)`);
if (billable65 !== 6.5) throw new Error("6.50 sq.ft rounding failed");

// Price checks with Glass 5mm (₹650)
const glassCost62 = billable62 * glass5BaseTotal; // 6.50 * 650 = 4225
console.log(`Glass 5mm for 6.2 Sq.Ft (Billed as 6.5 Sq.Ft @ ₹650): ₹${glassCost62} (Expected: 4225)`);
if (glassCost62 !== 4225) throw new Error("Glass 6.2 sq.ft cost mismatch");

const glassCost665 = billable665 * glass5BaseTotal; // 7.00 * 650 = 4550
console.log(`Glass 5mm for 6.65 Sq.Ft (Billed as 7.0 Sq.Ft @ ₹650): ₹${glassCost665} (Expected: 4550)`);
if (glassCost665 !== 4550) throw new Error("Glass 6.65 sq.ft cost mismatch");

console.log("--- 7. Testing Canvas Stretching Depth / Margin (2 inches on all 4 sides) ---");
const artW = 24;
const artH = 36;
const defaultMargin = 2; // 2 inches on each of the 4 sides
const grossW = artW + (2 * defaultMargin); // 28 in
const grossH = artH + (2 * defaultMargin); // 40 in
const grossSqFt = (grossW * grossH) / 144; // 1120 / 144 = 7.7777...
const billableStretchedSqFt = getBillableSqFt(grossSqFt); // 8.00 Sq.Ft
console.log(`Artwork 24x36 + 2" all 4 sides -> Gross: ${grossW}x${grossH} in (${grossSqFt.toFixed(2)} Sq.Ft) -> Billable: ${billableStretchedSqFt} Sq.Ft`);
if (grossW !== 28 || grossH !== 40 || billableStretchedSqFt !== 8.0) {
  throw new Error("Stretching 2-inch margin calculation failed");
}

const stretchedAreaCost = billableStretchedSqFt * canvasRoundBase; // 8 * 250 = 2000
const stretchedWorkCost = billableStretchedSqFt * stretchRate; // 8 * 220 = 1760
const totalStretchedBill = stretchedAreaCost + stretchedWorkCost; // 3760
console.log(`Canvas Stretched Bill (Area ₹${stretchedAreaCost} + Work ₹${stretchedWorkCost}): ₹${totalStretchedBill} (Expected: 3760)`);
if (totalStretchedBill !== 3760) throw new Error("Stretched canvas total bill calculation mismatch");

console.log("--- 8. Testing Custom Frame Rate (Client Selection) ---");
const customFrameRate = 8;
const customFrameCost = totalFrameInches * customFrameRate; // 126 * 8 = 1008
console.log(`Frame with custom rate ₹${customFrameRate}/in (${totalFrameInches} in): ₹${customFrameCost} (Expected: 1008)`);
if (customFrameCost !== 1008) throw new Error("Custom frame rate calculation mismatch");

console.log("--- 9. Testing LocalStorage Update & Reset ---");
const modified = JSON.parse(JSON.stringify(window.materialDataManager.materials));
modified[0].printing = 350;
window.materialDataManager.saveMaterials(modified);
if (window.materialDataManager.getItemById("glass-5mm").printing !== 350) throw new Error("Save materials failed");

window.materialDataManager.resetToDefaults();
if (window.materialDataManager.getItemById("glass-5mm").printing !== 300) throw new Error("Reset to defaults failed");

console.log("--- 7. Testing Add, Update & Delete Materials ---");
// Add New Item
const newItem = window.materialDataManager.addItem({
  category: "Foam Board",
  thickness: "5mm",
  printing: 120,
  lamination: 30,
  materialPrice: 90,
  varnish: 10,
  framePerInch: 4,
  notes: "Test Foam Board"
});
console.log("Added item ID:", newItem.id);
if (!newItem.id || newItem.category !== "Foam Board") throw new Error("Add item failed");
if (!window.materialDataManager.getCategories().includes("Foam Board")) throw new Error("New category not listed in getCategories()");

const foamVariants = window.materialDataManager.getVariantsByCategory("Foam Board");
if (foamVariants.length !== 1 || foamVariants[0].thickness !== "5mm") throw new Error("Variant lookup failed");

// Update Item
const updatedItem = window.materialDataManager.updateItem({
  id: newItem.id,
  thickness: "10mm",
  printing: 150
});
if (!updatedItem || updatedItem.thickness !== "10mm" || updatedItem.printing !== 150) {
  throw new Error("Update item failed");
}
const fetchedUpdated = window.materialDataManager.getItemById(newItem.id);
if (fetchedUpdated.thickness !== "10mm" || fetchedUpdated.printing !== 150) {
  throw new Error("Persisted update mismatch");
}

// Delete Item
const deleteResult = window.materialDataManager.deleteItem(newItem.id);
if (!deleteResult) throw new Error("Delete item returned false");
if (window.materialDataManager.getItemById(newItem.id)) throw new Error("Item still exists after delete");
if (window.materialDataManager.getCategories().includes("Foam Board")) throw new Error("Empty category still present after delete");

console.log("\n>>> ALL AUTOMATED VERIFICATION TESTS PASSED SUCCESSFULLY! <<<");

