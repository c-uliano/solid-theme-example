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
  
      // Calculate darker shades
      let darkenFactor = 0.8;
      let darkenR = Math.round(rgb.r * darkenFactor);
      let darkenG = Math.round(rgb.g * darkenFactor);
      let darkenB = Math.round(rgb.b * darkenFactor);
      let darkHex = `#${((1 << 24) + (darkenR << 16) + (darkenG << 8) + darkenB).toString(16).slice(1)}`;
  
      // Calculate lighter tints
      let lightenFactor = 1.2;
      let lightenR = Math.round(rgb.r * lightenFactor);
      let lightenG = Math.round(rgb.g * lightenFactor);
      let lightenB = Math.round(rgb.b * lightenFactor);
      let lightHex = `#${((1 << 24) + (lightenR << 16) + (lightenG << 8) + lightenB).toString(16).slice(1)}`;
  
      return {
        [name + "-alpha_primary"]: value + "f2", // 95%
        [name + "-alpha_secondary"]: value + "99", // 60%
        [name + "-alpha_tertiary"]: value + "4d", // 30%
        [name + "-alpha_quaternary"]: value + "17", // 9%
        [name + "-dark"]: darkHex,
        [name + "-light"]: lightHex
      };
    }
    return {};
  };
  






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

    </div>
  );
};

export default App;
