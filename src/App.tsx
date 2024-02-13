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
    let darkenFactor1 = 0.7;
    let darkenFactor2 = 0.5;
    let darkenFactor3 = 0.3;
    let darkR1 = Math.max(0, Math.round(rgb.r * darkenFactor1));
    let darkG1 = Math.max(0, Math.round(rgb.g * darkenFactor1));
    let darkB1 = Math.max(0, Math.round(rgb.b * darkenFactor1));
    let darkHex1 = `#${((1 << 24) + (darkR1 << 16) + (darkG1 << 8) + darkB1).toString(16).slice(1)}`;

    let darkR2 = Math.max(0, Math.round(rgb.r * darkenFactor2));
    let darkG2 = Math.max(0, Math.round(rgb.g * darkenFactor2));
    let darkB2 = Math.max(0, Math.round(rgb.b * darkenFactor2));
    let darkHex2 = `#${((1 << 24) + (darkR2 << 16) + (darkG2 << 8) + darkB2).toString(16).slice(1)}`;

    let darkR3 = Math.max(0, Math.round(rgb.r * darkenFactor3));
    let darkG3 = Math.max(0, Math.round(rgb.g * darkenFactor3));
    let darkB3 = Math.max(0, Math.round(rgb.b * darkenFactor3));
    let darkHex3 = `#${((1 << 24) + (darkR3 << 16) + (darkG3 << 8) + darkB3).toString(16).slice(1)}`;

    // Calculate lighter tints
    let lightenFactor1 = 1.3;
    let lightenFactor2 = 1.5;
    let lightenFactor3 = 1.7;
    let lightR1 = Math.min(255, Math.round(rgb.r * lightenFactor1));
    let lightG1 = Math.min(255, Math.round(rgb.g * lightenFactor1));
    let lightB1 = Math.min(255, Math.round(rgb.b * lightenFactor1));
    let lightHex1 = `#${((1 << 24) + (lightR1 << 16) + (lightG1 << 8) + lightB1).toString(16).slice(1)}`;

    let lightR2 = Math.min(255, Math.round(rgb.r * lightenFactor2));
    let lightG2 = Math.min(255, Math.round(rgb.g * lightenFactor2));
    let lightB2 = Math.min(255, Math.round(rgb.b * lightenFactor2));
    let lightHex2 = `#${((1 << 24) + (lightR2 << 16) + (lightG2 << 8) + lightB2).toString(16).slice(1)}`;

    let lightR3 = Math.min(255, Math.round(rgb.r * lightenFactor3));
    let lightG3 = Math.min(255, Math.round(rgb.g * lightenFactor3));
    let lightB3 = Math.min(255, Math.round(rgb.b * lightenFactor3));
    let lightHex3 = `#${((1 << 24) + (lightR3 << 16) + (lightG3 << 8) + lightB3).toString(16).slice(1)}`;

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
        <div class={styles.box17}></div>
        <div class={styles.box18}></div>
        <div class={styles.box19}></div>
        <div class={styles.box20}></div>
      </div>

      <h2>Testing Tints</h2>
      <div class={styles.flexBox}>
        <div class={styles.boxNine}></div>
        <div class={styles.boxTen}></div>
        <div class={styles.boxEleven}></div>
        <div class={styles.boxTwelve}></div>
      </div>

      <div class={styles.flexBox}>
        <div class={styles.box13}></div>
        <div class={styles.box14}></div>
        <div class={styles.box15}></div>
        <div class={styles.box16}></div>
      </div>

    </div>
  );
};

export default App;
