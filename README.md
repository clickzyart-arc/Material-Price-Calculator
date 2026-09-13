# Material Price Master & Quotation Suite

A modern, responsive, zero-maintenance web application for calculating material costs, digital printing, lamination, varnish, framing, and fabrication extras across 20+ material variants with cascading product & thickness dropdowns and real-time editable rates.

## Features

### 1. Cascading Material & Thickness Selection
- **Product / Material Dropdown**: Glass, Clear Acrylic, Milky Acrylic, ACP, WPVC, Canvas, Stone, Wooden.
- **Thickness / Variant Dropdown**: Automatically populates with corresponding thicknesses (e.g. 5mm, 6mm, 8mm for Glass; 2mm, 4mm, 6mm, 8mm for Acrylic; 3mm & Full Emboss for ACP, etc.).

### 2. Dual Unit System & Precise Calculation Engine
- **Inches Mode**:
  $$\text{Sq. Ft.} = \frac{\text{Width} \times \text{Height}}{144}$$
  $$\text{Border Running Inches (Perimeter)} = 2 \times (\text{Width} + \text{Height})$$
- **Feet Mode**:
  $$\text{Sq. Ft.} = \text{Width} \times \text{Height}$$
  $$\text{Border Running Inches (Perimeter)} = 2 \times (\text{Width} \times 12 + \text{Height} \times 12)$$

### 3. Dynamic Extra Charges
- **Holes**: Fabrication holes with configurable quantity (rate ₹100 per hole).
- **Frame**: Additional frame charge of ₹5 per running inch of perimeter + default **6 inches wastage** (for ACP, WPVC, Canvas).
- **Stretching**: Canvas labor/stretching charge calculated on square footage (Total Sq.Ft $\times$ default ₹220) and added directly to the final bill.

### 4. Role-Based Access & Rate Security
- **Employee Mode**: Employees can view all rates and prices, configure dimensions, calculate estimates, manage quotation baskets, and print formal quotation slips. Rates are strictly view-only to prevent unauthorized price changes.
- **Administrator Mode**: Only authenticated Admins (`admin@calculator.clickzy` / `Clickzy@0850`) can edit, add, or delete rates in the Rate Card Master, or apply on-the-fly price overrides.

### 5. Multi-Item Quotation & Professional Print Invoices
- Add multiple products with different dimensions, quantities, and extras to the quotation basket.
- Generate professional, print/PDF-ready estimates formatted for A4 printing with customer name, contact, itemized breakdown, and terms.
- Local quotation history for recalling past estimates.

## How to Run on Localhost

### Option 1: Fast Node Server (Recommended)
In your terminal, run:

```bash
npm start
```
or
```bash
node server.js
```
- Starts a local server at `http://localhost:3000`
- Automatically opens your default browser on Windows!

### Option 2: Using NPX
```bash
npx serve .
```

### Option 3: Direct File Opening
You can also double-click [index.html](file:///c:/Users/mehul/Documents/Calculator/index.html) to open it directly in Chrome, Edge, or Firefox. (Running via `http://localhost` is recommended for full PWA and Service Worker features).
