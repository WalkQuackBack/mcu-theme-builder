/**
 * @license
 * Copyright 2026 WalkQuackBack
 * SPDX-License-Identifier: Apache-2.0
 */

import { Hct, hexFromArgb, argbFromHex, DynamicScheme, SchemeFidelity, SchemeMonochrome, SchemeNeutral, SchemeTonalSpot, SchemeVibrant, SchemeContent, Variant, SchemeExpressive, SchemeRainbow, SchemeFruitSalad, MaterialDynamicColors } from '@material/material-color-utilities';

// Define custom event types
export class ChangeColorEvent extends CustomEvent<string> {
  static readonly eventName = 'change-color';
  constructor(hexColor: string) {
    super(ChangeColorEvent.eventName, { detail: hexColor, bubbles: true, composed: true });
  }
}

export class ChangeContrastLevelEvent extends CustomEvent<number> {
  static readonly eventName = 'change-contrast-level';
  constructor(contrastLevel: number) {
    super(ChangeContrastLevelEvent.eventName, { detail: contrastLevel, bubbles: true, composed: true });
  }
}

export class ChangeDarkModeEvent extends CustomEvent<ColorMode> {
  static readonly eventName = 'change-dark-mode';
  constructor(mode: ColorMode) {
    super(ChangeDarkModeEvent.eventName, { detail: mode, bubbles: true, composed: true });
  }
}

export class ChangeSchemeEvent extends CustomEvent<SchemeType> {
  static readonly eventName = 'change-scheme';
  constructor(scheme: SchemeType) {
    super(ChangeSchemeEvent.eventName, { detail: scheme, bubbles: true, composed: true });
  }
}

export type ColorMode = 'light' | 'dark' | 'auto';
// Expanded based on Variant enum for exhaustiveness
export type SchemeType = 'monochrome' | 'neutral' | 'tonal-spot' | 'vibrant' | 'expressive' | 'fidelity' | 'content' | 'rainbow' | 'fruit-salad' | 'cmf';

const LOCAL_STORAGE_SEED_COLOR_KEY = 'mcu_seed_color';
const LOCAL_STORAGE_COLOR_MODE_KEY = 'mcu_color_mode';
const LOCAL_STORAGE_CONTRAST_LEVEL_KEY = 'mcu_contrast_level';
const LOCAL_STORAGE_SCHEME_KEY = 'mcu_scheme';

class ThemeStore extends EventTarget {
  private _selectedColorMode: ColorMode = 'auto';
  private _selectedScheme: SchemeType = 'content';
  private _hexColor: string = '#6750A4'; // Default seed color
  private _hue: number = 0;
  private _chroma: number = 0;
  private _tone: number = 0;
  private _contrastLevel: number = 0;

  constructor() {
    super();
    this.initializeState();
  }

  private initializeState() {
    // Attempt to load from localStorage, otherwise use defaults
    this._selectedColorMode = (localStorage.getItem(LOCAL_STORAGE_COLOR_MODE_KEY) as ColorMode) || 'auto';
    this._hexColor = localStorage.getItem(LOCAL_STORAGE_SEED_COLOR_KEY) || '#6750A4';
    this._contrastLevel = parseFloat(localStorage.getItem(LOCAL_STORAGE_CONTRAST_LEVEL_KEY) || '0');
    this._selectedScheme = (localStorage.getItem(LOCAL_STORAGE_SCHEME_KEY) as SchemeType) || 'content';

    this.updateHctFromHex(this._hexColor);
  }

  get selectedColorMode(): ColorMode {
    return this._selectedColorMode;
  }

  set selectedColorMode(mode: ColorMode) {
    if (this._selectedColorMode !== mode) {
      this._selectedColorMode = mode;
      localStorage.setItem(LOCAL_STORAGE_COLOR_MODE_KEY, mode);
      this.dispatchEvent(new ChangeDarkModeEvent(mode));
      this.applyTheme();
    }
  }

  get selectedScheme(): SchemeType {
    return this._selectedScheme;
  }

  set selectedScheme(scheme: SchemeType) {
    if (this._selectedScheme !== scheme) {
      this._selectedScheme = scheme;
      localStorage.setItem(LOCAL_STORAGE_SCHEME_KEY, scheme);
      this.dispatchEvent(new ChangeSchemeEvent(scheme));
      this.applyTheme();
    }
  }

  get hexColor(): string {
    return this._hexColor;
  }

  set hexColor(hex: string) {
    if (this._hexColor !== hex) {
      this._hexColor = hex;
      localStorage.setItem(LOCAL_STORAGE_SEED_COLOR_KEY, hex);
      this.updateHctFromHex(hex);
      this.dispatchEvent(new ChangeColorEvent(hex));
      this.applyTheme();
    }
  }

  get hue(): number {
    return this._hue;
  }

  set hue(value: number) {
    if (this._hue !== value) {
      this._hue = value;
      this.updateHexFromHct();
    }
  }

  get chroma(): number {
    return this._chroma;
  }

  set chroma(value: number) {
    if (this._chroma !== value) {
      this._chroma = value;
      this.updateHexFromHct();
    }
  }

  get tone(): number {
    return this._tone;
  }

  set tone(value: number) {
    if (this._tone !== value) {
      this._tone = value;
      this.updateHexFromHct();
    }
  }

  get contrastLevel(): number {
    return this._contrastLevel;
  }

  set contrastLevel(level: number) {
    if (this._contrastLevel !== level) {
      this._contrastLevel = level;
      localStorage.setItem(LOCAL_STORAGE_CONTRAST_LEVEL_KEY, level.toString());
      this.dispatchEvent(new ChangeContrastLevelEvent(level));
      this.applyTheme();
    }
  }

  private updateHctFromHex(hexColor: string) {
    const hct = Hct.fromInt(argbFromHex(hexColor));
    this._hue = hct.hue;
    this._chroma = hct.chroma;
    this._tone = hct.tone;
  }

  private updateHexFromHct() {
    this._hexColor = hexFromArgb(Hct.from(this._hue, this._chroma, this._tone).toInt());
    localStorage.setItem(LOCAL_STORAGE_SEED_COLOR_KEY, this._hexColor);
    this.dispatchEvent(new ChangeColorEvent(this._hexColor));
    this.applyTheme();
  }

  applyTheme() {
    const isDark = this.selectedColorMode === 'dark' || (this.selectedColorMode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const sourceColorArgb = argbFromHex(this.hexColor);
    const sourceColorHct = Hct.fromInt(sourceColorArgb); // Convert ARGB to Hct

    let scheme: DynamicScheme;
    switch (this.selectedScheme) {
      case 'monochrome':
        scheme = new SchemeMonochrome(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'neutral':
        scheme = new SchemeNeutral(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'tonal-spot':
        scheme = new SchemeTonalSpot(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'vibrant':
        scheme = new SchemeVibrant(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'expressive':
        scheme = new SchemeExpressive(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'fidelity':
        scheme = new SchemeFidelity(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'content':
        scheme = new SchemeContent(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'rainbow':
        scheme = new SchemeRainbow(sourceColorHct, isDark, this.contrastLevel);
        break;
      case 'fruit-salad':
        scheme = new SchemeFruitSalad(sourceColorHct, isDark, this.contrastLevel);
        break;
      default:
        // Fallback to content scheme if selectedScheme is not recognized
        console.warn(`Unknown scheme type: ${this.selectedScheme}. Falling back to 'content'.`);
        scheme = new SchemeContent(sourceColorHct, isDark, this.contrastLevel);
        break;
    }

    // Iterate through all MaterialDynamicColors properties and apply them
    for (const key in MaterialDynamicColors) {
        const dynamicColor = (MaterialDynamicColors as any)[key];
        if (typeof dynamicColor === 'object' && dynamicColor !== null && typeof dynamicColor.getArgb === 'function') {
            const argbColor = dynamicColor.getArgb(scheme);
            const hexColor = hexFromArgb(argbColor);
            // Convert camelCase to kebab-case for CSS custom property names
            const cssVarName = `--md-sys-color-${key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()}`;
            document.documentElement.style.setProperty(cssVarName, hexColor);
        }
    }
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
  }
}

export const themeStore = new ThemeStore();

// Expose available schemes
export function getAvailableSchemes(): SchemeType[] {
  const variants = Object.values(Variant).filter(
    (value) => typeof value === 'string'
  ) as string[];

  return variants.map(v => v.toLowerCase().replace(/_/g, '-')) as SchemeType[];
}