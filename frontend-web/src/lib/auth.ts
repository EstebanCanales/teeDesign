"use client"

import axiosClient from './axios-client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Clase para manejar la autenticación
class AuthService {
  // Iniciar sesión
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await axiosClient.post<AuthResponse>('/auth/login', credentials);
      const { user, token } = (response.data as any).data;
      
      // Guardar el token en localStorage
      localStorage.setItem('auth_token', token);
      
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
  
  // Registrar un nuevo usuario
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await axiosClient.post<AuthResponse>('/auth/register', data);
      const { user, token } = (response.data as any).data;
      
      // Guardar el token en localStorage
      localStorage.setItem('auth_token', token);
      
      return user;
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }
  
  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('auth_token');
  }
  
  // Obtener el usuario actual
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) return null;
      
      const response = await axiosClient.get('/auth/me');
      return (response.data as any).data.user;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }
  
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

// Exportar una instancia única del servicio
const authService = new AuthService();
export default authService; 