import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import "./components/material-web/theme-changer.js";
import "./components/cards.js";
import "./components/output.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  render() {
    return html`
      <aside>
        <theme-changer></theme-changer>
        <awesome-output-element></awesome-output-element>
      </aside>
      <cool-material-three-cards></cool-material-three-cards>
    `
  }

  static styles = css`
    :host {
      font-family: 'Segoe UI', Roboto, sans-serif;
      min-width: 100%;
      min-height: 100%;
      display: flex;
      gap: 2rem;
      box-sizing: border-box;
    }
    aside {
      background-color: var(--md-sys-color-surface-container);
      padding: 1rem;
      border-radius: 1rem;
      & > *:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    @media (max-width: 600px) {
      :host {
        flex-direction: column;
      }
    }
  `
}
