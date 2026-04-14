/**
 * @license
 * Copyright 2026 WalkQuackBack
 * SPDX-License-Identifier: Apache-2.0
 */

import { css, html, LitElement, type PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { themeStore, ChangeColorEvent, ChangeContrastLevelEvent, ChangeDarkModeEvent, ChangeSchemeEvent, type ColorMode, type SchemeType } from '../store/theme.ts';
import { DynamicScheme, Hct, MaterialDynamicColors, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

/**
 * A small set of controls that allows the user to change the theme and preview
 * color values.
 */
@customElement('awesome-output-element')
export class ThemeChanger extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @state() selectedColorMode: ColorMode = themeStore.selectedColorMode;
  @state() selectedScheme: SchemeType = themeStore.selectedScheme;
  @state() hexColor: string = themeStore.hexColor;
  @state() hue: number = themeStore.hue;
  @state() chroma: number = themeStore.chroma;
  @state() tone: number = themeStore.tone;
  @state() contrastLevel: number = themeStore.contrastLevel;

  @state() amICopyingRightNow: boolean = false;
  @state() theValueOfTheInputElement: string = "";

  @query('#output') private inputEl!: HTMLTextAreaElement;

  connectedCallback() {
    super.connectedCallback();
    themeStore.addEventListener(ChangeColorEvent.eventName, this.handleColorChange as EventListener);
    themeStore.addEventListener(ChangeContrastLevelEvent.eventName, this.handleContrastLevelChange as EventListener);
    themeStore.addEventListener(ChangeDarkModeEvent.eventName, this.handleDarkModeChange as EventListener);
    themeStore.addEventListener(ChangeSchemeEvent.eventName, this.handleSchemeChange as EventListener);
    this.updateLocalState();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    themeStore.removeEventListener(ChangeColorEvent.eventName, this.handleColorChange as EventListener);
    themeStore.removeEventListener(ChangeContrastLevelEvent.eventName, this.handleContrastLevelChange as EventListener);
    themeStore.removeEventListener(ChangeDarkModeEvent.eventName, this.handleDarkModeChange as EventListener);
    themeStore.removeEventListener(ChangeSchemeEvent.eventName, this.handleSchemeChange as EventListener);
  }

  private handleColorChange = (e: ChangeColorEvent) => {
    this.hexColor = e.detail;
    this.updateHctFromHex(this.hexColor);
  };

  private handleContrastLevelChange = (e: ChangeContrastLevelEvent) => {
    this.contrastLevel = e.detail;
  };

  private handleDarkModeChange = (e: ChangeDarkModeEvent) => {
    this.selectedColorMode = e.detail;
  };

  private handleSchemeChange = (e: ChangeSchemeEvent) => {
    this.selectedScheme = e.detail;
  };

  private updateLocalState() {
    this.selectedColorMode = themeStore.selectedColorMode;
    this.selectedScheme = themeStore.selectedScheme;
    this.hexColor = themeStore.hexColor;
    this.hue = themeStore.hue;
    this.chroma = themeStore.chroma;
    this.tone = themeStore.tone;
    this.contrastLevel = themeStore.contrastLevel;
  }

  private updateHctFromHex(hexColor: string) {
    const hct = Hct.fromInt(argbFromHex(hexColor));
    this.hue = hct.hue;
    this.chroma = hct.chroma;
    this.tone = hct.tone;
  }

  private copyToClipboard() {
    const copyText = this.inputEl.value
    this.amICopyingRightNow = true;
    navigator.clipboard.writeText(copyText).then(() => {
      console.log('Copied to clipboard successfully!');
    }).catch(err => {
      console.error('Failed to copy to clipboard: ', err);
    });
    setTimeout(() => {
      this.amICopyingRightNow = false;
    }, 2000);
  }

  protected shouldUpdate(_changedProperties: PropertyValues): boolean {
    this.theValueOfTheInputElement =
`/* Theme Parameters */
/* Seed Color (Hex): ${this.hexColor} */
/* Hue: ${this.hue.toFixed(2)} */
/* Chroma: ${this.chroma.toFixed(2)} */
/* Tone: ${this.tone.toFixed(2)} */
/* Contrast Level: ${this.contrastLevel} */
/* Color Scheme: ${this.selectedScheme} */

`
this.seedpile();
    return true;
  }

  seedpile() {
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
            this.theValueOfTheInputElement += `#__m3.rgb(${key.replace(/([A-Z])/g, '-$1').toLowerCase()}, ${hexColor});\n`;
        }
    }
  }


  render() {
    return html`
      <h2>Output</h2>
      <output>
        <textarea name="output" id="output" rows="15" cols="40" readonly wrap="off" .value=${this.theValueOfTheInputElement} ></textarea>
      </output>
      <button @click=${this.copyToClipboard}>${this.amICopyingRightNow ? 'Copied!' : 'Copy to Clipboard'}</button>
    `;
  }

  static styles = css`
  :host {
      display: flex;
      flex-direction: column;
  }
    textarea {
      background: var(--md-sys-color-surface-dim);
      color: var(--md-sys-color-on-surface);
      border: 2px solid var(--md-sys-color-outline);
      border-radius: 4px;
      white-space: nowrap;
    }
    h2 {
      margin-block: 0 0.5rem;
    }
    button {
      border-radius: 100px;
      padding: 12px 16px;
      border: none;
      background-color: transparent;
      color: var(--md-sys-color-primary);
      border: 1px solid var(--md-sys-color-outline);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
      &:focus-visible {
        outline: 2px solid var(--md-sys-color-secondary);
        outline-offset: 2px;
      }
    }
  `;
}
