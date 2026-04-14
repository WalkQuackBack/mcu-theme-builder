/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Forked from https://github.com/material-components/material-web/blob/593705e49722093b5a3d5439c2c8507116fc636e/catalog/src/utils/material-color-helpers.ts

import {
  argbFromHex,
  Hct,
  hexFromArgb,
} from '@material/material-color-utilities';

/**
 * Converts a hex value to a HCT tuple.
 *
 * @param value A stringified hex color e.g. '#C01075'
 * @return Material Color Utilities HCT color tuple.
 */
export function hctFromHex(value: string) {
  return Hct.fromInt(argbFromHex(value));
}

/**
 * Converts a hue chroma and tone to a hex color value clamped in the hex
 * colorspace.
 *
 * @param hue The hue of the color of value [0,360]
 * @param chroma The chroma of the color of value [0,150]
 * @param tone The tone of the color of value [0,100]
 * @return A clamped, stringified hex color value representing the HCT values.
 */
export function hexFromHct(hue: number, chroma: number, tone: number) {
  const hct = Hct.from(hue, chroma, tone);
  const value = hct.toInt();
  return hexFromArgb(value);
}
