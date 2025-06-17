// Importar las extensiones de Jest para DOM
import '@testing-library/jest-dom';

// Configuración para suprimir warnings de console.error durante las pruebas
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning: ReactDOM.render is no longer supported in React 18/.test(args[0]) ||
    /Warning: useLayoutEffect does nothing on the server/.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
}; 