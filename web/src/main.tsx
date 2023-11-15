import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'nprogress/nprogress.css';
import { configure } from "mobx";
import { StrictMode } from "react";
import { HashRouter } from "react-router-dom";

configure({
  enforceActions: "never"
})
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <App/>
    </HashRouter>
  </StrictMode>
)
