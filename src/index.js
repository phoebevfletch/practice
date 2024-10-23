import React from 'react';
import ReactDOM from 'react-dom/client';  // Use the new 'react-dom/client'
import App from './App';  // Your root component (adjust path if necessary)

// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Create the React root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

