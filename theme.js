/**
 * Theme & Dynamic Color Palette Manager
 * Supports full-website dynamic color synchronization for light & dark palettes,
 * including user's #F6F7EB, #E94F37, #393E41 palette and trending light designer themes.
 */

const STORAGE_KEY_THEME = "print_calc_custom_theme_v2";

const THEME_PRESETS = [
  {
    id: "trending-light",
    name: "Modern Minimalist (Trending Light)",
    description: "Clean aesthetic with crisp slate cards, indigo accent & emerald totals",
    colors: {
      "--bg-dark": "#f8fafc",
      "--bg-card": "#ffffff",
      "--bg-elevated": "#f1f5f9",
      "--bg-input": "#ffffff",
      "--primary": "#4f46e5",
      "--primary-glow": "rgba(79, 70, 229, 0.25)",
      "--secondary": "#0ea5e9",
      "--secondary-glow": "rgba(14, 165, 233, 0.25)",
      "--text-main": "#0f172a",
      "--text-muted": "#64748b",
      "--border-color": "#e2e8f0",
      "--border-active": "rgba(79, 70, 229, 0.4)"
    },
    swatches: ["#f8fafc", "#4f46e5", "#0ea5e9"]
  },
  {
    id: "user-ivory-light",
    name: "Ivory Canvas & Flame (Your Palette Light)",
    description: "Your Palette: #F6F7EB Ivory background, #E94F37 Coral Flame, #393E41 Charcoal text",
    colors: {
      "--bg-dark": "#F6F7EB",
      "--bg-card": "#ffffff",
      "--bg-elevated": "#edeee0",
      "--bg-input": "#ffffff",
      "--primary": "#E94F37",
      "--primary-glow": "rgba(233, 79, 55, 0.3)",
      "--secondary": "#393E41",
      "--secondary-glow": "rgba(57, 62, 65, 0.25)",
      "--text-main": "#393E41",
      "--text-muted": "#686f73",
      "--border-color": "rgba(57, 62, 65, 0.18)",
      "--border-active": "rgba(233, 79, 55, 0.4)"
    },
    swatches: ["#F6F7EB", "#E94F37", "#393E41"]
  },
  {
    id: "user-charcoal-dark",
    name: "Sunset Ember & Charcoal (Your Palette Dark)",
    description: "Your Palette Dark: #393E41 Charcoal cards, #E94F37 Flame accent, #F6F7EB Ivory text",
    colors: {
      "--bg-dark": "#25282a",
      "--bg-card": "#393E41",
      "--bg-elevated": "#2d3134",
      "--bg-input": "#202325",
      "--primary": "#E94F37",
      "--primary-glow": "rgba(233, 79, 55, 0.4)",
      "--secondary": "#F6F7EB",
      "--secondary-glow": "rgba(246, 247, 235, 0.35)",
      "--text-main": "#F6F7EB",
      "--text-muted": "#b8bcbe",
      "--border-color": "rgba(246, 247, 235, 0.15)",
      "--border-active": "rgba(233, 79, 55, 0.45)"
    },
    swatches: ["#25282a", "#E94F37", "#393E41"]
  },
  {
    id: "nordic-ocean-light",
    name: "Nordic Ocean & Glacier (Light)",
    description: "Cool glacier white with rich ocean blue & cyan accents",
    colors: {
      "--bg-dark": "#f0f4f8",
      "--bg-card": "#ffffff",
      "--bg-elevated": "#e2e8f0",
      "--bg-input": "#ffffff",
      "--primary": "#0284c7",
      "--primary-glow": "rgba(2, 132, 199, 0.25)",
      "--secondary": "#0d9488",
      "--secondary-glow": "rgba(13, 148, 136, 0.25)",
      "--text-main": "#0f172a",
      "--text-muted": "#475569",
      "--border-color": "#cbd5e1",
      "--border-active": "rgba(2, 132, 199, 0.4)"
    },
    swatches: ["#f0f4f8", "#0284c7", "#0d9488"]
  },
  {
    id: "emerald-mint-light",
    name: "Emerald Mint & Sage (Light)",
    description: "Fresh organic light palette with botanical forest green",
    colors: {
      "--bg-dark": "#f2f8f5",
      "--bg-card": "#ffffff",
      "--bg-elevated": "#e6f2eb",
      "--bg-input": "#ffffff",
      "--primary": "#059669",
      "--primary-glow": "rgba(5, 150, 105, 0.25)",
      "--secondary": "#10b981",
      "--secondary-glow": "rgba(16, 185, 129, 0.25)",
      "--text-main": "#064e3b",
      "--text-muted": "#374151",
      "--border-color": "#d1fae5",
      "--border-active": "rgba(5, 150, 105, 0.4)"
    },
    swatches: ["#f2f8f5", "#059669", "#10b981"]
  },
  {
    id: "warm-sand-amber",
    name: "Warm Sand & Amber (Light)",
    description: "Soft earthy tones with golden amber and deep coffee text",
    colors: {
      "--bg-dark": "#faf8f5",
      "--bg-card": "#ffffff",
      "--bg-elevated": "#f3ede4",
      "--bg-input": "#ffffff",
      "--primary": "#d97706",
      "--primary-glow": "rgba(217, 119, 6, 0.25)",
      "--secondary": "#b45309",
      "--secondary-glow": "rgba(180, 83, 9, 0.25)",
      "--text-main": "#292524",
      "--text-muted": "#78716c",
      "--border-color": "#e7e5e4",
      "--border-active": "rgba(217, 119, 6, 0.4)"
    },
    swatches: ["#faf8f5", "#d97706", "#292524"]
  },
  {
    id: "obsidian-indigo-dark",
    name: "Obsidian Cyber Dark (Night)",
    description: "Deep obsidian dark mode with electric indigo & cyan glow",
    colors: {
      "--bg-dark": "#090d16",
      "--bg-card": "#111827",
      "--bg-elevated": "#1f293d",
      "--bg-input": "#0e1626",
      "--primary": "#6366f1",
      "--primary-glow": "rgba(99, 102, 241, 0.35)",
      "--secondary": "#06b6d4",
      "--secondary-glow": "rgba(6, 182, 212, 0.35)",
      "--text-main": "#f8fafc",
      "--text-muted": "#94a3b8",
      "--border-color": "rgba(255, 255, 255, 0.1)",
      "--border-active": "rgba(99, 102, 241, 0.4)"
    },
    swatches: ["#090d16", "#6366f1", "#06b6d4"]
  }
];

class ThemeManager {
  constructor() {
    this.currentTheme = this.loadSavedTheme() || THEME_PRESETS[0].colors; // Defaults to Trending Light
    this.applyTheme(this.currentTheme, false);
  }

  loadSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading theme:", e);
    }
    return null;
  }

  saveTheme(colors) {
    this.currentTheme = { ...this.currentTheme, ...colors };
    try {
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(this.currentTheme));
      return true;
    } catch (e) {
      console.error("Error saving theme:", e);
      return false;
    }
  }

  resetTheme() {
    try {
      localStorage.removeItem(STORAGE_KEY_THEME);
    } catch (e) {
      console.error("Error clearing theme:", e);
    }
    const defaultColors = THEME_PRESETS[0].colors; // Trending Light Default
    this.currentTheme = { ...defaultColors };
    this.applyTheme(this.currentTheme, true);
    return this.currentTheme;
  }

  applyTheme(colors, persist = false) {
    const root = document.documentElement;
    for (const [prop, val] of Object.entries(colors)) {
      root.style.setProperty(prop, val);
    }
    if (persist) {
      this.saveTheme(colors);
    }
  }

  hexToRgba(hex, alpha = 0.3) {
    let c = (hex || '#000000').replace('#', '');
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const num = parseInt(c, 16) || 0;
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}

// Global Theme Manager instance
window.THEME_PRESETS = THEME_PRESETS;
window.themeManager = new ThemeManager();
