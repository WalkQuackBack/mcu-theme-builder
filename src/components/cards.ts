import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('cool-material-three-cards')
export class Cards extends LitElement {
  render() {
    return html`
      <div class="card" style="--bg:var(--md-sys-color-background);--fg:var(--md-sys-color-on-background)">
        background
    </div>
    <div class="card" style="--bg:var(--md-sys-color-error);--fg:var(--md-sys-color-on-error)">
        error
    </div>
    <div class="card" style="--bg:var(--md-sys-color-error-container);--fg:var(--md-sys-color-on-error-container)">
        error-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-inverse-on-surface);--fg:var(--md-sys-color-inverse-surface)">
        inverse-on-surface
    </div>
    <div class="card" style="--bg:var(--md-sys-color-inverse-primary);--fg:var(--md-sys-color-primary)">
        inverse-primary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-inverse-surface);--fg:var(--md-sys-color-inverse-on-surface)">
        inverse-surface
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-background);--fg:var(--md-sys-color-background)">
        on-background
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-error);--fg:var(--md-sys-color-error)">
        on-error
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-error-container);--fg:var(--md-sys-color-error-container)">
        on-error-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-primary);--fg:var(--md-sys-color-primary)">
        on-primary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-primary-container);--fg:var(--md-sys-color-primary-container)">
        on-primary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-primary-fixed);--fg:var(--md-sys-color-primary-fixed)">
        on-primary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-primary-fixed-variant);--fg:var(--md-sys-color-primary-fixed)">
        on-primary-fixed-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-secondary);--fg:var(--md-sys-color-secondary)">
        on-secondary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-secondary-container);--fg:var(--md-sys-color-secondary-container)">
        on-secondary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-secondary-fixed);--fg:var(--md-sys-color-secondary-fixed)">
        on-secondary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-secondary-fixed-variant);--fg:var(--md-sys-color-secondary-fixed)">
        on-secondary-fixed-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-surface);--fg:var(--md-sys-color-surface)">
        on-surface
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-surface-variant);--fg:var(--md-sys-color-surface-variant)">
        on-surface-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-tertiary);--fg:var(--md-sys-color-tertiary)">
        on-tertiary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-tertiary-container);--fg:var(--md-sys-color-tertiary-container)">
        on-tertiary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-tertiary-fixed);--fg:var(--md-sys-color-tertiary-fixed)">
        on-tertiary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-on-tertiary-fixed-variant);--fg:var(--md-sys-color-tertiary-fixed)">
        on-tertiary-fixed-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-outline);--fg:var(--md-sys-color-inverse-on-surface)">
        outline
    </div>
    <div class="card" style="--bg:var(--md-sys-color-outline-variant);--fg:var(--md-sys-color-on-surface)">
        outline-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-primary);--fg:var(--md-sys-color-on-primary)">
        primary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-primary-container);--fg:var(--md-sys-color-on-primary-container)">
        primary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-primary-fixed);--fg:var(--md-sys-color-on-primary-fixed)">
        primary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-primary-fixed-dim);--fg:var(--md-sys-color-on-primary-fixed)">
        primary-fixed-dim
    </div>
    <div class="card" style="--bg:var(--md-sys-color-scrim);--fg:var(--md-sys-color-on-surface)">
        scrim
    </div>
    <div class="card" style="--bg:var(--md-sys-color-secondary);--fg:var(--md-sys-color-on-secondary)">
        secondary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-secondary-container);--fg:var(--md-sys-color-on-secondary-container)">
        secondary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-secondary-fixed);--fg:var(--md-sys-color-on-secondary-fixed)">
        secondary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-secondary-fixed-dim);--fg:var(--md-sys-color-on-secondary-fixed)">
        secondary-fixed-dim
    </div>
    <div class="card" style="--bg:var(--md-sys-color-shadow);--fg:var(--md-sys-color-on-surface)">
        shadow
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-container-lowest);--fg:var(--md-sys-color-on-surface)">
        surface-container-lowest
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface);--fg:var(--md-sys-color-on-surface)">
        surface
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-dim);--fg:var(--md-sys-color-on-surface)">
        surface-dim
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-container-low);--fg:var(--md-sys-color-on-surface)">
        surface-container-low
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-container);--fg:var(--md-sys-color-on-surface)">
        surface-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-container-high);--fg:var(--md-sys-color-on-surface)">
        surface-container-high
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-container-highest);--fg:var(--md-sys-color-on-surface)">
        surface-container-highest
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-bright);--fg:var(--md-sys-color-on-surface)">
        surface-bright
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-variant);--fg:var(--md-sys-color-on-surface-variant)">
        surface-variant
    </div>
    <div class="card" style="--bg:var(--md-sys-color-surface-tint);--fg:var(--md-sys-color-on-primary)">
        surface-tint
    </div>
    <div class="card" style="--bg:var(--md-sys-color-tertiary);--fg:var(--md-sys-color-on-tertiary)">
        tertiary
    </div>
    <div class="card" style="--bg:var(--md-sys-color-tertiary-container);--fg:var(--md-sys-color-on-tertiary-container)">
        tertiary-container
    </div>
    <div class="card" style="--bg:var(--md-sys-color-tertiary-fixed);--fg:var(--md-sys-color-on-tertiary-fixed)">
        tertiary-fixed
    </div>
    <div class="card" style="--bg:var(--md-sys-color-tertiary-fixed-dim);--fg:var(--md-sys-color-on-tertiary-fixed)">
        tertiary-fixed-dim
    </div>
    `
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      flex-grow: 1;
      gap: 2px;
    }
    .card {
      position: relative;
      background: var(--bg);
      color: var(--fg);
      padding: 1rem;
      box-sizing: border-box;
      outline: 2px solid hsl(0 0% 50% / 50%);
    }
  `
}
