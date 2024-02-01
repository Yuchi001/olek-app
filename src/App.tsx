import React from 'react';
import {MainPage} from "./components/MainPage/MainPage";
import {TopBar} from "./components/TopBar/TopBar";

function App() {
  return (
    <div style={{ background: 'var(--joy-palette-background-level-2)'}}>
        <TopBar />
        <MainPage />
    </div>
  );
}

export default App;
