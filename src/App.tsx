import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-theme-provider';
import customThemes from './themes.json';

import styles from './App.module.css';

const App: Component = () => {

  const custom_variants = (name: string, value: string) => {
    const pattern = /^#[0-9A-F]{6}$/i;
    if (!value.match(pattern)) return {};
  
    // Convert hex to RGB
    const hex = value.substring(1); // remove '#'
    const rgb = {
      r: parseInt(hex.substring(0, 2), 16),
      g: parseInt(hex.substring(2, 4), 16),
      b: parseInt(hex.substring(4, 6), 16)
    };
  
    // Convert RGB to HSL
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
    // Calculate darker shades
    const darkenFactors = [0.7, 0.5, 0.3];
    const darkHex = darkenFactors.map(factor => {
      const darkHSL = [hsl[0], hsl[1], hsl[2] * factor];
      const darkRGB = hslToRgb(darkHSL[0], darkHSL[1], darkHSL[2]);
      return rgbToHex(darkRGB[0], darkRGB[1], darkRGB[2]);
    });
  
    // Calculate lighter tints
    const lightenFactors = [1.3, 1.5, 1.7];
    const lightHex = lightenFactors.map(factor => {
      const lightHSL = [hsl[0], hsl[1], Math.min(1, hsl[2] * factor)];
      const lightRGB = hslToRgb(lightHSL[0], lightHSL[1], lightHSL[2]);
      return rgbToHex(lightRGB[0], lightRGB[1], lightRGB[2]);
    });
  
    return {
      [name + "-alpha_primary"]: value + "f2", // 95%
      [name + "-alpha_secondary"]: value + "99", // 60%
      [name + "-alpha_tertiary"]: value + "4d", // 30%
      [name + "-alpha_quaternary"]: value + "17", // 9%
      // allow for mispelled 'quarternary' for backwards compatibility
      [name + "-alpha_quarternary"]: value + "17", // 9%
      [name + "-dark30"]: darkHex[0], // 30% darker
      [name + "-dark50"]: darkHex[1], // 50% darker
      [name + "-dark70"]: darkHex[2], // 70% darker
      [name + "-light30"]: lightHex[0], // 30% lighter
      [name + "-light50"]: lightHex[1], // 50% lighter
      [name + "-light70"]: lightHex[2] // 70% lighter
    };
  };
  
  // Converts RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number): number[] => {
    let h = 0, s = 0, l = 0; // Initialize h, s, and l
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: 
          h = (g - b) / d + (g < b ? 6 : 0); 
          break;
        case g: 
          h = (b - r) / d + 2; 
          break;
        case b: 
          h = (r - g) / d + 4; 
          break;
      }
      h /= 6;
    }
  
    return [h, s, l];
  }
  
  // Converts HSL to RGB
  const hslToRgb = (h: number, s: number, l: number): number[] => {
    let r, g, b;
  
    if (s === 0) {
      r = g = b = l;
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
  const rgbToHex = (r: number, g: number, b: number): string => {
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
