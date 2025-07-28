"use client";

import axios from 'axios';

// Crear una instancia de axios con la configuración base
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para obtener el token de autenticación de forma segura
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('auth_token');
};

// Función para redirigir a la página de login
const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    // Guardar la URL actual para redirigir después del login
    localStorage.setItem('login_redirect', window.location.pathname);
    window.location.href = '/login';
  }
};

// Interceptor para agregar el token de autenticación a las solicitudes
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejar errores de autenticación (401)
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // Solo redirigir si no estamos ya en la página de login
        if (!window.location.pathname.includes('/login')) {
          redirectToLogin();
        }
      }
    }
    
    // Personalizar el mensaje de error según el tipo
    let errorMessage = 'Ocurrió un error. Por favor, intente más tarde.';
    
    if (error.response) {
      // Error de respuesta del servidor
      const serverMessage = error.response.data?.message;
      if (serverMessage) {
        errorMessage = serverMessage;
      } else if (error.response.status === 404) {
        errorMessage = 'Recurso no encontrado.';
      } else if (error.response.status === 403) {
        errorMessage = 'No tiene permisos para realizar esta acción.';
      } else if (error.response.status === 429) {
        errorMessage = 'Demasiadas solicitudes. Intente más tarde.';
      }
    } else if (error.request) {
      // Error de solicitud (no se recibió respuesta)
      errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión.';
    }
    
    // Agregar el mensaje personalizado al error
    error.customMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default axiosClient; 