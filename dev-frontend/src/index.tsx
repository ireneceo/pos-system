import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { getApiBaseUrl } from './config/api';

// Auto-detect environment and override fetch for API calls
const originalFetch = window.fetch;
const API_BASE_URL = getApiBaseUrl();

window.fetch = (url: string | URL | Request, init?: RequestInit) => {
  // Convert URL to string if needed
  const urlString = typeof url === 'string' ? url : url.toString();

  // If it's an API call and we have a base URL, prepend it
  if (urlString.startsWith('/api/') && API_BASE_URL) {
    const fullUrl = `${API_BASE_URL}${urlString}`;
    console.log(`🌐 API Call: ${urlString} → ${fullUrl}`);
    return originalFetch(fullUrl, init);
  }

  // If it's an API call but API_BASE_URL is empty (like in Codespaces), use relative path
  if (urlString.startsWith('/api/')) {
    console.log(`🌐 API Call (relative): ${urlString}`);
    return originalFetch(url, init);
  }

  // For all other calls, use original fetch
  return originalFetch(url, init);
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
