import { createRoot } from 'react-dom/client';
import App from './app';
import '../styles/index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    console.error('Element #root not found!');
}