import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-theme-provider';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {


  const custom_variants = (name: string, value: string) => {
    let pattern = /^#[0-9A-F]{6}$/i;
    if (value.match(pattern)) {
      const shades = generateShadeTints(value, (percent) => (1 - percent));
      const tints = generateShadeTints(value, (percent) => percent);
  
      return {
        [`${name}-dark_primary`]: shades[0],
        [`${name}-dark_secondary`]: shades[2],
        [`${name}-dark_tertiary`]: shades[4],
        [`${name}-dark_quaternary`]: shades[6],
  
        [`${name}-light_primary`]: tints[0],
        [`${name}-light_secondary`]: tints[2],
        [`${name}-light_tertiary`]: tints[4],
        [`${name}-light_quaternary`]: tints[6],

        [`${name}-alpha_primary`]: value + "f2", // 95%
        [`${name}-alpha_secondary`]: value + "99", // 60%
        [`${name}-alpha_tertiary`]: value + "4d", // 30%
        [`${name}-alpha_quaternary`]: value + "17", // 9%
      };
    }
    return {};
  };
  
  function generateShadeTints(hexColor: string, modifierFn: (percent: number) => number): string[] {
    const variants = [];
    for (let i = 1; i <= 8; i++) {
      const percent = i * 0.1;
      const variant = generateShadeTint(hexColor, percent, modifierFn);
      variants.push(variant);
    }
    return variants;
  }
  
  function generateShadeTint(hexColor: string, percent: number, modifierFn: (percent: number) => number): string {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const newR = Math.floor(r * modifierFn(percent));
    const newG = Math.floor(g * modifierFn(percent));
    const newB = Math.floor(b * modifierFn(percent));
    return `#${((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1)}`;
  }
  





  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ThemeProvider calculate_variants={custom_variants} />
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
