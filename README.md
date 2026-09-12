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
- **Holes**: Pre-configured at ₹100 per hole (e.g. for Glass).
- **Frame**: Additional frame charge of ₹5 per running inch of perimeter (for ACP, WPVC, Canvas).
- **Stretching**: Canvas labor/stretching charge (default ₹220).

### 4. Dynamic Price Editing (Zero Maintenance)
- **On-the-Fly Overrides**: Directly adjust Printing, Lamination, Material Price, or Varnish on the calculator card without altering master tables.
- **Rate Card Master**: A dedicated spreadsheet view of all 20+ materials where any rate can be edited, saved to browser `localStorage`, exported to JSON, or reset to original spreadsheet defaults.

### 5. Multi-Item Quotation & Professional Print Invoices
- Add multiple products with different dimensions, quantities, and extras to the quotation basket.
- Generate professional, print/PDF-ready estimates formatted for A4 printing with customer name, contact, itemized breakdown, and terms.
- Local quotation history for recalling past estimates.

## How to Run

Simply open `index.html` in any web browser (Chrome, Edge, Firefox, Safari), or serve with any static web server:

```bash
# Python
python -m http.server 3000

# Node.js npx
npx serve .
```

No database or server configuration is required. All data persists reliably in the browser's local storage.
