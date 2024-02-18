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
        const variants = {};

        // Create Values instance with the provided hex color value
        const colorValues = new Values(value);

        // Generate tints and shades using Values.js
        const tints = colorValues.tints(20).map((color, index) => ({
            [`${name}-lighter_${(index + 1) * 20}`]: color.hexString(),
        }));
        const shades = colorValues.shades(20).map((color, index) => ({
            [`${name}-darker_${(index + 1) * 20}`]: color.hexString(),
        }));

        // Push tints and shades into the variants array
        tints.forEach(tint => Object.assign(variants, tint));
        shades.forEach(shade => Object.assign(variants, shade));

        console.log(variants);
        // Return the variants object
        return variants;

    }
    return {};
};

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
