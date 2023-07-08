import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import 'nprogress/nprogress.css';

createRoot(document.getElementById('root') as HTMLElement).render(
    <App />
)
