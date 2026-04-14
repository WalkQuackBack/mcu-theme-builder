/**
 * @license
 * Copyright 2026 WalkQuackBack
 * SPDX-License-Identifier: Apache-2.0
 */

import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

import { themeStore, ChangeColorEvent, ChangeContrastLevelEvent, ChangeDarkModeEvent, ChangeSchemeEvent, type ColorMode, type SchemeType, getAvailableSchemes } from '../../store/theme.ts';
import { Hct, argbFromHex } from '@material/material-color-utilities';

import './hct-slider.ts';
import type { HCTSlider } from './hct-slider.ts';

/**
 * A small set of controls that allows the user to change the theme and preview
 * color values.
 */
@customElement('theme-changer')
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

  @query('#color-input') private inputEl!: HTMLInputElement;

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
    this.updateHctFromHex(e.detail);
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

  render() {
    return html`
      <div id="head-wrapper">
        <h2>Theme Controls</h2>
      </div>
      ${this.renderHexPicker()}
      <hr />
      ${this.renderHctPicker()}
      <hr />
      ${this.renderContrastSlider()}
      <hr />
      ${this.renderSchemePicker()}
      <hr />
      ${this.renderColorModePicker()}
    `;
  }

  protected renderHexPicker() {
    return html`
      <div>
        <label id="hex" for="color-input">
          <span class="label">Hex Source Color</span>
          <span class="input-wrapper">
            <div class="overflow">
              <input
                id="color-input"
                @input=${this.onHexPickerInput}
                type="color"
                .value=${live(this.hexColor)} />
            </div>
          </span>
        </label>
      </div>
    `;
  }

  private renderHctPicker() {
    return html`
      <div class="sliders">
        <hct-slider
          .value=${live(this.hue)}
          type="hue"
          label="Hue"
          max="360"
          @input=${this.onSliderInput}></hct-slider>
        <label>${this.hue.toFixed(0)}</label>
        <hct-slider
          .value=${live(this.chroma)}
          .color=${this.hexColor}
          type="chroma"
          label="Chroma"
          max="150"
          @input=${this.onSliderInput}></hct-slider>
        <label>${this.chroma.toFixed(0)}</label>
        <hct-slider
          .value=${live(this.tone)}
          type="tone"
          label="Tone"
          max="100"
          @input=${this.onSliderInput}></hct-slider>
        <label>${this.tone.toFixed(0)}</label>
      </div>
    `;
  }

  private renderContrastSlider() {
    return html`
      <div class="contrast-slider">
        <label for="contrast-input">
          <span class="label">Contrast Level</span>
          <span class="value">${this.contrastLevel.toFixed(2)}</span>
        </label>
        <input
          id="contrast-input"
          type="range"
          min="-1"
          max="1"
          step="0.1"
          .value=${live(String(this.contrastLevel))}
          @input=${this.onContrastInput}
          aria-label="Contrast level slider" />
      </div>
    `;
  }

  private renderSchemePicker() {
    const schemes: SchemeType[] = getAvailableSchemes();
    return html`
      <label for="scheme-select">Color Scheme</label>
      <select id="scheme-select" @change=${this.onSchemeChange} .value=${this.selectedScheme}>
        ${schemes.map(scheme => html`<option value=${scheme} ?selected=${this.selectedScheme === scheme}>
          ${scheme}
        </option>`)}
      </select>
    `;
  }

  private renderColorModePicker() {
    return html`
      <div class="segmented-button-set" aria-label="Color mode">
        ${this.renderModeButton('dark', 'Dark')}
        ${this.renderModeButton('auto', 'Auto')}
        ${this.renderModeButton('light', 'Light')}
      </div>
    `;
  }

  private renderModeButton(mode: ColorMode, label: string) {
    return html`
      <button
        data-value=${mode}
        title=${mode}
        aria-label="${mode} color scheme"
        ?aria-pressed=${this.selectedColorMode === mode}
        @click=${this.onColorModeSelection}
        class=${this.selectedColorMode === mode ? 'selected' : ''}
      >
        ${label}
      </button>
    `;
  }

  private onSliderInput(e: Event) {
    const input = e.target as HCTSlider;
    const type = input.type as 'hue' | 'chroma' | 'tone';
    //@ts-ignore
    const value = parseFloat(input.value);

    // Update internal state first to reflect changes immediately
    (this as any)[type] = value;

    // Dispatch to store to trigger global state update and theme application
    themeStore.hue = this.hue;
    themeStore.chroma = this.chroma;
    themeStore.tone = this.tone;
  }

  private updateHctFromHex(hexColor: string) {
    const hct = Hct.fromInt(argbFromHex(hexColor));
    this.hue = hct.hue;
    this.chroma = hct.chroma;
    this.tone = hct.tone;
  }

  private onHexPickerInput() {
    themeStore.hexColor = this.inputEl.value;
  }

  firstUpdated() {
    themeStore.applyTheme(); // Apply theme on initial load
  }

  private onColorModeSelection(e: Event) {
    const button = e.target as HTMLButtonElement;
    const value = button.dataset.value as ColorMode;
    themeStore.selectedColorMode = value;
    themeStore.applyTheme();
  }

  private onSchemeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const value = select.value as SchemeType;
    themeStore.selectedScheme = value;
    themeStore.applyTheme();
  }

  private onContrastInput(e: Event) {
    const input = e.target as HTMLInputElement;
    themeStore.contrastLevel = parseFloat(input.value);
    themeStore.applyTheme();
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .sliders {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    hr {
      width: 100%;
      border-color: var(--md-sys-color-outline)
    }

    h2 {
      margin-block: 0 0.5rem;
    }

    #hex {
      display: flex;
      justify-content: space-between;
      input[type="color"] {
        border: none;
      }
    }

    select {
      border-radius: 4px;
      padding: 8px;
      border: none;
      background: var(--md-sys-color-surface-container);
      border: 1px solid var(--md-sys-color-outline);
      font: inherit;
      cursor: pointer;
      color: var(--md-sys-color-on-surface);
      &:focus {
        outline: 3px solid var(--md-sys-color-primary);
        outline-offset: -3px;
      }
    }
    

    button {
      border-radius: 100px;
      padding: 12px 16px;
      border: none;
      background-color: var(--md-sys-color-secondary-container);
      color: var(--md-sys-color-on-secondary-container);
      font: inherit;
      font-weight: 500;
      cursor: pointer;
      &.selected {
        background-color: var(--md-sys-color-primary);
        color: var(--md-sys-color-on-primary);
      }
      &:focus-visible {
        outline: 2px solid var(--md-sys-color-secondary);
        outline-offset: 2px;
      }
    }
  `;
}
