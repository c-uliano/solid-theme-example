import type { Component } from 'solid-js';
import { ThemeProvider } from 'solid-theme-provider';
import customThemes from './themes.json';

import styles from './App.module.css';

const App: Component = () => {






  



  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <ThemeProvider themes={customThemes} label="change theme" />
      </header>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil tempore veritatis possimus repellat esse inventore, tenetur dolorem, perferendis perspiciatis expedita temporibus debitis provident velit. Enim deserunt nobis impedit id tenetur?</p>
    </div>
  );
};

export default App;
