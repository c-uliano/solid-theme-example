import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-theme-provider';
import customThemes from './themes.json';

import styles from './App.module.css';

const App: Component = () => {





  const custom_variants = (name: string, value: string) => {
    // if the current value is a hex color
    // add complementary transparencies
    let pattern = /^#[0-9A-F]{6}$/i;
    if (value.match(pattern)) {
      // Convert hex to RGB
      let hex = value.substring(1); // remove '#'
      let rgb = {
        r: parseInt(hex.substring(0, 2), 16),
        g: parseInt(hex.substring(2, 4), 16),
        b: parseInt(hex.substring(4, 6), 16)
      };
  
    // Convert RGB to HSL
    let hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Calculate darker shades
    let darkenFactor1 = 0.7;
    let darkenFactor2 = 0.5;
    let darkenFactor3 = 0.3;
    let darkHSL1 = [hsl[0], hsl[1], hsl[2] * darkenFactor1];
    let darkHSL2 = [hsl[0], hsl[1], hsl[2] * darkenFactor2];
    let darkHSL3 = [hsl[0], hsl[1], hsl[2] * darkenFactor3];
    let darkRGB1 = hslToRgb(darkHSL1[0], darkHSL1[1], darkHSL1[2]);
    let darkRGB2 = hslToRgb(darkHSL2[0], darkHSL2[1], darkHSL2[2]);
    let darkRGB3 = hslToRgb(darkHSL3[0], darkHSL3[1], darkHSL3[2]);
    let darkHex1 = rgbToHex(darkRGB1[0], darkRGB1[1], darkRGB1[2]);
    let darkHex2 = rgbToHex(darkRGB2[0], darkRGB2[1], darkRGB2[2]);
    let darkHex3 = rgbToHex(darkRGB3[0], darkRGB3[1], darkRGB3[2]);

    // Calculate lighter tints
    let lightenFactor1 = 1.3;
    let lightenFactor2 = 1.5;
    let lightenFactor3 = 1.7;
    let lightHSL1 = [hsl[0], hsl[1], Math.min(1, hsl[2] * lightenFactor1)];
    let lightHSL2 = [hsl[0], hsl[1], Math.min(1, hsl[2] * lightenFactor2)];
    let lightHSL3 = [hsl[0], hsl[1], Math.min(1, hsl[2] * lightenFactor3)];
    let lightRGB1 = hslToRgb(lightHSL1[0], lightHSL1[1], lightHSL1[2]);
    let lightRGB2 = hslToRgb(lightHSL2[0], lightHSL2[1], lightHSL2[2]);
    let lightRGB3 = hslToRgb(lightHSL3[0], lightHSL3[1], lightHSL3[2]);
    let lightHex1 = rgbToHex(lightRGB1[0], lightRGB1[1], lightRGB1[2]);
    let lightHex2 = rgbToHex(lightRGB2[0], lightRGB2[1], lightRGB2[2]);
    let lightHex3 = rgbToHex(lightRGB3[0], lightRGB3[1], lightRGB3[2]);

    return {
      [name + "-alpha_primary"]: value + "f2", // 95%
      [name + "-alpha_secondary"]: value + "99", // 60%
      [name + "-alpha_tertiary"]: value + "4d", // 30%
      [name + "-alpha_quaternary"]: value + "17", // 9%
      [name + "-dark1"]: darkHex1, // 30% darker
      [name + "-dark2"]: darkHex2, // 50% darker
      [name + "-dark3"]: darkHex3, // 70% darker
      [name + "-light1"]: lightHex1,
      [name + "-light2"]: lightHex2,
      [name + "-light3"]: lightHex3
    };
  }
    return {};
  };

  // Converts RGB to HSL
function rgbToHsl(r: number, g: number, b: number): number[] {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

// Converts HSL to RGB
function hslToRgb(h: number, s: number, l: number): number[] {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Converts RGB to hex
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
  






  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ThemeProvider calculate_variants={custom_variants} themes={customThemes} label="change theme" />
        <p>Testing the <code>calculate_variants</code> prop.</p>
      </header>

      <h2>Testing Opacity</h2>
      <div class={styles.flexBox}>
        <div class={styles.boxOne}></div>
        <div class={styles.boxTwo}></div>
        <div class={styles.boxThree}></div>
        <div class={styles.boxFour}></div>
      </div>

      <h2>Testing Shades</h2>
      <div class={styles.flexBox}>
        <div class={styles.boxFive}></div>
        <div class={styles.boxSix}></div>
        <div class={styles.boxSeven}></div>
        <div class={styles.boxEight}></div>
      </div>
      <div class={styles.flexBox}>
        <div class={styles.box13}></div>
        <div class={styles.box14}></div>
        <div class={styles.box15}></div>
        <div class={styles.box16}></div>
      </div>

      <h2>Testing Tints</h2>
      <div class={styles.flexBox}>
        <div class={styles.boxNine}></div>
        <div class={styles.boxTen}></div>
        <div class={styles.boxEleven}></div>
        <div class={styles.boxTwelve}></div>
      </div>

      <div class={styles.flexBox}>
        <div class={styles.box17}></div>
        <div class={styles.box18}></div>
        <div class={styles.box19}></div>
        <div class={styles.box20}></div>
      </div>

    </div>
  );
};

export default App;
