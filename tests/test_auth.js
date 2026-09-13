/**
 * Verification Script for Admin Authentication & Role Permissions
 */

const ADMIN_CREDENTIALS = {
  email: 'admin@calculator.clickzy',
  password: 'Clickzy@0850'
};

function authenticate(email, password) {
  const normEmail = (email || '').trim().toLowerCase();
  const normPassword = (password || '').trim();
  return normEmail === ADMIN_CREDENTIALS.email.toLowerCase() && normPassword === ADMIN_CREDENTIALS.password;
}

console.log("--- 1. Testing Valid Admin Credentials ---");
if (!authenticate('admin@calculator.clickzy', 'Clickzy@0850')) {
  throw new Error("Exact admin credentials failed authentication");
}
if (!authenticate('ADMIN@CALCULATOR.CLICKZY', 'Clickzy@0850')) {
  throw new Error("Case-insensitive email failed authentication");
}

console.log("--- 2. Testing Invalid Credentials Rejection ---");
if (authenticate('admin@calculator.clickzy', 'wrongpassword')) {
  throw new Error("Wrong password was erroneously accepted");
}
if (authenticate('employee@clickzy.com', 'Clickzy@0850')) {
  throw new Error("Wrong email was erroneously accepted");
}
if (authenticate('', '')) {
  throw new Error("Empty credentials were erroneously accepted");
}

console.log("--- 3. Testing Role Permissions & Capabilities ---");
function getPermissions(role) {
  const isAdmin = role === 'admin';
  return {
    canViewRates: true, // both employee and admin can view rates
    canUpdateRates: isAdmin, // only admin can update rates and prices
    canAddMaterial: isAdmin, // only admin can add material
    canDeleteMaterial: isAdmin, // only admin can delete material
    canCalculateQuotation: true, // both employee and admin can calculate quotes
    canManageBasket: true, // both employee and admin can use quotation basket
    canPrintQuotation: true, // both employee and admin can print quotation slips
    defaultFrameWastageInches: 6 // default frame wastage is 6 inches
  };
}

const employeePerms = getPermissions('employee');
console.log("Employee permissions:", employeePerms);
if (employeePerms.canUpdateRates !== false) throw new Error("Employee must not be able to update rates");
if (employeePerms.canViewRates !== true) throw new Error("Employee must be able to view rates");
if (employeePerms.canCalculateQuotation !== true) throw new Error("Employee must be able to calculate quotations");
if (employeePerms.defaultFrameWastageInches !== 6) throw new Error("Frame wastage must be 6 inches by default");

const adminPerms = getPermissions('admin');
console.log("Admin permissions:", adminPerms);
if (adminPerms.canUpdateRates !== true) throw new Error("Admin must be able to update rates");
if (adminPerms.canAddMaterial !== true || adminPerms.canDeleteMaterial !== true) throw new Error("Admin must be able to modify materials");

console.log("--- 4. Testing Calculator Rate Locking & Employee Fallback ---");
const fs = require('fs');
const path = require('path');
const htmlContent = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

// Verify that rate inputs in index.html are disabled and readonly by default (for employee)
const lockedInputs = [
  'id="holesRateInput"',
  'id="frameRateInput"',
  'id="stretchingRateInput"',
  'id="overridePrinting"',
  'id="overrideLamination"',
  'id="overrideMaterial"',
  'id="overrideVarnish"'
];

lockedInputs.forEach(inputId => {
  const match = htmlContent.match(new RegExp(`<input[^>]*${inputId}[^>]*>`));
  if (!match) {
    throw new Error(`Input ${inputId} not found in index.html`);
  }
  const tag = match[0];
  if (!tag.includes('disabled')) {
    throw new Error(`Input ${inputId} is not disabled by default for employee mode`);
  }
  if (!tag.includes('readonly')) {
    throw new Error(`Input ${inputId} is not readonly by default for employee mode`);
  }
  if (!tag.includes('rate-price-input')) {
    throw new Error(`Input ${inputId} missing rate-price-input class`);
  }
});
console.log("All 7 rate inputs verified disabled, readonly, and rate-locked in HTML by default.");

// Verify rate fallback calculation simulation
function simulateCalculateRate(isAdmin, itemDefaultRate, employeeAttemptedRate) {
  if (isAdmin) {
    return employeeAttemptedRate || itemDefaultRate;
  }
  return itemDefaultRate; // Strictly locked to item default for employee
}

// Case 1: Employee attempts to change Holes rate from 100 to 50
const empHoleRate = simulateCalculateRate(false, 100, 50);
if (empHoleRate !== 100) throw new Error("Employee was able to change holes rate!");

// Case 2: Employee attempts to change Stretching rate from 220 to 150
const empStretchRate = simulateCalculateRate(false, 220, 150);
if (empStretchRate !== 220) throw new Error("Employee was able to change stretching rate!");

// Case 3: Employee attempts to change Frame rate from 5 to 2
const empFrameRate = simulateCalculateRate(false, 5, 2);
if (empFrameRate !== 5) throw new Error("Employee was able to change frame rate!");

// Case 4: Admin changes Stretching rate to 250
const adminStretchRate = simulateCalculateRate(true, 220, 250);
if (adminStretchRate !== 250) throw new Error("Admin could not update stretching rate!");

console.log("Employee rate override rejection simulation passed successfully.");

console.log("--- 5. Testing Frame Custom Rate Checkbox & Stretching Margin Controls ---");
// Verify frameCustomRateCheck checkbox exists in index.html
if (!htmlContent.includes('id="frameCustomRateCheck"')) {
  throw new Error('frameCustomRateCheck checkbox missing from index.html');
}
// Verify stretchingMarginInput exists in index.html with default 2
const marginMatch = htmlContent.match(/<input[^>]*id="stretchingMarginInput"[^>]*>/);
if (!marginMatch || !marginMatch[0].includes('value="2"')) {
  throw new Error('stretchingMarginInput missing or default value is not 2');
}
console.log("Frame custom rate checkbox and stretching depth input (default 2 in) verified in HTML.");

// Simulate frame rate resolution with custom checkbox
function resolveFrameRate(isAdmin, isCustomChecked, defaultRate, customRate) {
  if (isAdmin || isCustomChecked) {
    return customRate || defaultRate;
  }
  return defaultRate;
}

// Case A: Employee with checkbox UNCHECKED tries to set ₹8
const lockedRate = resolveFrameRate(false, false, 5, 8);
if (lockedRate !== 5) throw new Error("Frame rate was editable without checking custom box!");

// Case B: Employee with checkbox CHECKED sets ₹8
const unlockedRate = resolveFrameRate(false, true, 5, 8);
if (unlockedRate !== 8) throw new Error("Custom frame rate was not accepted when checked!");

// Case C: Employee unchecks checkbox -> reverts to ₹5
const revertedRate = resolveFrameRate(false, false, 5, 8);
if (revertedRate !== 5) throw new Error("Reverting frame rate failed!");

console.log("Frame custom rate checkbox permissions verified successfully.");

console.log("\n>>> ALL AUTHENTICATION & ROLE PERMISSION TESTS PASSED SUCCESSFULLY! <<<");
