/**
 * Material Pricing Master Data & LocalStorage Management
 * Based on Price Date: 01-09-2026
 */

const DEFAULT_MATERIALS_DATA = [
  // GLASS
  {
    id: "glass-5mm",
    category: "Glass",
    thickness: "5mm",
    printing: 300,
    lamination: 0,
    materialPrice: 250,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 100,
    defaultStretchingRate: 0,
    notes: "100 per hole"
  },
  {
    id: "glass-6mm",
    category: "Glass",
    thickness: "6mm",
    printing: 300,
    lamination: 0,
    materialPrice: 290,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 100,
    defaultStretchingRate: 0,
    notes: "100 per hole"
  },
  {
    id: "glass-8mm",
    category: "Glass",
    thickness: "8mm",
    printing: 300,
    lamination: 0,
    materialPrice: 370,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 100,
    defaultStretchingRate: 0,
    notes: "100 per hole"
  },

  // CLEAR ACRYLIC
  {
    id: "clear-acrylic-2mm",
    category: "Clear Acrylic",
    thickness: "2mm",
    printing: 300,
    lamination: 0,
    materialPrice: 190,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "clear-acrylic-4mm",
    category: "Clear Acrylic",
    thickness: "4mm",
    printing: 300,
    lamination: 0,
    materialPrice: 300,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "clear-acrylic-6mm",
    category: "Clear Acrylic",
    thickness: "6mm",
    printing: 300,
    lamination: 0,
    materialPrice: 440,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "clear-acrylic-8mm",
    category: "Clear Acrylic",
    thickness: "8mm",
    printing: 300,
    lamination: 0,
    materialPrice: 580,
    varnish: 100,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },

  // MILKY ACRYLIC
  {
    id: "milky-acrylic-2mm",
    category: "Milky Acrylic",
    thickness: "2mm",
    printing: 200,
    lamination: 0,
    materialPrice: 200,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "milky-acrylic-4mm",
    category: "Milky Acrylic",
    thickness: "4mm",
    printing: 200,
    lamination: 0,
    materialPrice: 320,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "milky-acrylic-6mm",
    category: "Milky Acrylic",
    thickness: "6mm",
    printing: 200,
    lamination: 0,
    materialPrice: 470,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },
  {
    id: "milky-acrylic-8mm",
    category: "Milky Acrylic",
    thickness: "8mm",
    printing: 200,
    lamination: 0,
    materialPrice: 610,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },

  // ACP
  {
    id: "acp-3mm",
    category: "ACP",
    thickness: "3mm",
    printing: 200,
    lamination: 0,
    materialPrice: 190,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },
  {
    id: "acp-3mm-emboss",
    category: "ACP",
    thickness: "3mm sheet Full Emboss (2mm to 3mm)",
    printing: 600,
    lamination: 0,
    materialPrice: 190,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },

  // WPVC
  {
    id: "wpvc-8mm",
    category: "WPVC",
    thickness: "8mm",
    printing: 200,
    lamination: 0,
    materialPrice: 190,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },
  {
    id: "wpvc-12mm",
    category: "WPVC",
    thickness: "12mm",
    printing: 200,
    lamination: 0,
    materialPrice: 240,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },

  // CANVAS
  {
    id: "canvas-roll-to-roll",
    category: "Canvas",
    thickness: "Roll to Roll",
    printing: 140,
    lamination: 260,
    materialPrice: 100,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },
  {
    id: "canvas-emboss-fill",
    category: "Canvas",
    thickness: "Roll to Roll Emboss Fill (0.5mm to 1mm)",
    printing: 240,
    lamination: 260,
    materialPrice: 110,
    varnish: 0,
    framePerInch: 5,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: "5 per inch extra frame"
  },
  {
    id: "canvas-stretching-round",
    category: "Canvas",
    thickness: "Canvas Stretching Round",
    printing: 140,
    lamination: 0,
    materialPrice: 110,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 220,
    notes: "220 Stretching"
  },

  // STONE
  {
    id: "stone-standard",
    category: "Stone",
    thickness: "Standard",
    printing: 300,
    lamination: 0,
    materialPrice: 0,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  },

  // WOODEN
  {
    id: "wooden-standard",
    category: "Wooden",
    thickness: "Standard",
    printing: 300,
    lamination: 0,
    materialPrice: 0,
    varnish: 0,
    framePerInch: 0,
    defaultHoleRate: 0,
    defaultStretchingRate: 0,
    notes: ""
  }
];

const STORAGE_KEY_MATERIALS = "print_calc_materials_v1";
const STORAGE_KEY_QUOTES = "print_calc_saved_quotes_v1";

class MaterialDataManager {
  constructor() {
    this.materials = this.loadMaterials();
  }

  loadMaterials() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MATERIALS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error("Error reading localStorage:", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_MATERIALS_DATA));
  }

  saveMaterials(materials) {
    this.materials = materials;
    try {
      localStorage.setItem(STORAGE_KEY_MATERIALS, JSON.stringify(materials));
      return true;
    } catch (e) {
      console.error("Error saving materials:", e);
      return false;
    }
  }

  resetToDefaults() {
    this.materials = JSON.parse(JSON.stringify(DEFAULT_MATERIALS_DATA));
    try {
      localStorage.removeItem(STORAGE_KEY_MATERIALS);
    } catch (e) {
      console.error("Error resetting materials:", e);
    }
    return this.materials;
  }

  getCategories() {
    const categories = [];
    this.materials.forEach(item => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return categories;
  }

  getVariantsByCategory(category) {
    return this.materials.filter(item => item.category === category);
  }

  getItemById(id) {
    return this.materials.find(item => item.id === id);
  }

  addItem(newItem) {
    if (!newItem.category || !newItem.thickness) {
      throw new Error("Category and thickness are required");
    }
    const cleanSlug = str => (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const baseSlug = `${cleanSlug(newItem.category)}-${cleanSlug(newItem.thickness)}` || `item-${Date.now()}`;
    let generatedId = newItem.id || baseSlug;
    let counter = 1;
    while (this.materials.some(m => m.id === generatedId)) {
      generatedId = `${baseSlug}-${counter++}`;
    }

    const itemToAdd = {
      id: generatedId,
      category: String(newItem.category).trim(),
      thickness: String(newItem.thickness).trim(),
      printing: parseFloat(newItem.printing) || 0,
      lamination: parseFloat(newItem.lamination) || 0,
      materialPrice: parseFloat(newItem.materialPrice) || 0,
      varnish: parseFloat(newItem.varnish) || 0,
      framePerInch: parseFloat(newItem.framePerInch) || 0,
      defaultHoleRate: parseFloat(newItem.defaultHoleRate) || 0,
      defaultStretchingRate: parseFloat(newItem.defaultStretchingRate) || 0,
      notes: String(newItem.notes || '').trim()
    };

    this.materials.push(itemToAdd);
    this.saveMaterials(this.materials);
    return itemToAdd;
  }

  deleteItem(id) {
    const initialLen = this.materials.length;
    this.materials = this.materials.filter(item => item.id !== id);
    if (this.materials.length !== initialLen) {
      this.saveMaterials(this.materials);
      return true;
    }
    return false;
  }

  updateItem(updatedItem) {
    const idx = this.materials.findIndex(item => item.id === updatedItem.id);
    if (idx !== -1) {
      this.materials[idx] = {
        ...this.materials[idx],
        category: updatedItem.category !== undefined ? String(updatedItem.category).trim() : this.materials[idx].category,
        thickness: updatedItem.thickness !== undefined ? String(updatedItem.thickness).trim() : this.materials[idx].thickness,
        printing: updatedItem.printing !== undefined ? (parseFloat(updatedItem.printing) || 0) : this.materials[idx].printing,
        lamination: updatedItem.lamination !== undefined ? (parseFloat(updatedItem.lamination) || 0) : this.materials[idx].lamination,
        materialPrice: updatedItem.materialPrice !== undefined ? (parseFloat(updatedItem.materialPrice) || 0) : this.materials[idx].materialPrice,
        varnish: updatedItem.varnish !== undefined ? (parseFloat(updatedItem.varnish) || 0) : this.materials[idx].varnish,
        framePerInch: updatedItem.framePerInch !== undefined ? (parseFloat(updatedItem.framePerInch) || 0) : this.materials[idx].framePerInch,
        defaultHoleRate: updatedItem.defaultHoleRate !== undefined ? (parseFloat(updatedItem.defaultHoleRate) || 0) : this.materials[idx].defaultHoleRate,
        defaultStretchingRate: updatedItem.defaultStretchingRate !== undefined ? (parseFloat(updatedItem.defaultStretchingRate) || 0) : this.materials[idx].defaultStretchingRate,
        notes: updatedItem.notes !== undefined ? String(updatedItem.notes).trim() : this.materials[idx].notes
      };
      this.saveMaterials(this.materials);
      return this.materials[idx];
    }
    return false;
  }

  // Quotations persistence
  getSavedQuotes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_QUOTES);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading saved quotes:", e);
      return [];
    }
  }

  saveQuote(quote) {
    try {
      const quotes = this.getSavedQuotes();
      quotes.unshift(quote); // newest first
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotes));
      return true;
    } catch (e) {
      console.error("Error saving quote:", e);
      return false;
    }
  }

  deleteQuote(quoteId) {
    try {
      let quotes = this.getSavedQuotes();
      quotes = quotes.filter(q => q.id !== quoteId);
      localStorage.setItem(STORAGE_KEY_QUOTES, JSON.stringify(quotes));
      return true;
    } catch (e) {
      console.error("Error deleting quote:", e);
      return false;
    }
  }
}

// Global instance
window.materialDataManager = new MaterialDataManager();
