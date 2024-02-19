import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-theme-provider';
import customThemes from './themes.json';
import Values from 'values.js';

import styles from './App.module.css';

const App: Component = () => {

  const custom_variants = (name: string, value: string) => {
    // Check if the current value is a hex color
    let pattern = /^#[0-9A-F]{6}$/i;
    if (value.match(pattern)) {

        // store all shades and tints
        // * this is how you set the type for an object, and the type for the key and value
        const variants: {[key: string]: string} = {};
        // * or, you can use the Record utility type which does the same thing, for more info https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type
        // const variants: Record<string, string> = {};

        // Create Values instance with the provided hex color value
        const colorValues = new Values(value);

        // Generate tints and shades using Values.js and merge directly into variants
        colorValues.tints(20).forEach((color, index) => {
          variants[`${name}-lighter_${(index + 1) * 20}`] = color.hexString();
        });

        colorValues.shades(20).forEach((color, index) => {
          variants[`${name}-darker_${(index + 1) * 20}`] = color.hexString();
        });

        // // Generate tints and shades using Values.js
        // const tints = colorValues.tints(20).map((color, index) => ({
        //     [`${name}-lighter_${(index + 1) * 20}`]: color.hexString(),
        // }));
        // const shades = colorValues.shades(20).map((color, index) => ({
        //     [`${name}-darker_${(index + 1) * 20}`]: color.hexString(),
        // }));

        // // Push tints and shades into the variants array
        // tints.forEach(tint => Object.assign(variants, tint));
        // shades.forEach(shade => Object.assign(variants, shade));

        console.log(variants);
        // Return the variants object
        return variants;

    }
    return {};
};

// * customizing the solid-theme-provider, v3
  // const custom_variants = (name: string, value: string) => {
  //   let pattern = /^#[0-9A-F]{6}$/i;
  //   if (value.match(pattern)) {

  //     const variations = [];
      
  //     for (let i = 1; i <= 8; i++) {
  //       const percent = i * 0.1;
  //       const shade = generateColorVariation(value, percent, 'darker');
  //       const tint = generateColorVariation(value, percent, 'lighter');
        
  //       variations.push({
  //         [name + "-darker_" + (i * 10)]: shade,
  //         [name + "-lighter_" + (i * 10)]: tint
  //       });
  //     }
      
  //     return Object.assign({}, ...variations);
  //   }
  //   return {};
  // }

  // const generateColorVariation = (hexColor: string, percent: number, operation: 'darker' | 'lighter') => {
  //   const r = parseInt(hexColor.substring(1, 3), 16);
  //   const g = parseInt(hexColor.substring(3, 5), 16);
  //   const b = parseInt(hexColor.substring(5, 7), 16);

  //   let newR: number, newG: number, newB: number;

  //   if (operation === 'darker') {
  //     newR = Math.floor(r * (1 - percent));
  //     newG = Math.floor(g * (1 - percent));
  //     newB = Math.floor(b * (1 - percent));
  //   } else if (operation === 'lighter') {
  //     newR = Math.floor(r + (255 - r) * percent);
  //     newG = Math.floor(g + (255 - g) * percent);
  //     newB = Math.floor(b + (255 - b) * percent);
  //   }

  //   const newHexColor = "#" + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
  //   return newHexColor;
  // }
  

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ThemeProvider calculate_variants={custom_variants} themes={customThemes} label="change theme" />
        <p>Testing the <code>calculate_variants</code> prop.</p>
      </header>

      <h2>Testing take 2</h2>
      <div class={styles.flexBox}>
        <div class={styles.one}></div>
        <div class={styles.two}></div>
        <div class={styles.three}></div>
        <div class={styles.four}></div>
        <div class={styles.five}></div>
      </div>
      <div class={styles.flexBox}>
        <div class={styles.six}></div>
        <div class={styles.seven}></div>
        <div class={styles.eight}></div>
        <div class={styles.nine}></div>
        <div class={styles.ten}></div>
      </div>
    </div>
  );
};

export default App;
