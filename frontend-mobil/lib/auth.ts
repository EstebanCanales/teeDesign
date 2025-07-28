import AsyncStorage from '@react-native-async-storage/async-storage';

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
  private baseURL = 'http://localhost:3000/api'; // Cambiar según tu configuración

  // Iniciar sesión
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const data = await response.json();
      const { user, token } = data.data;
      
      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('auth_token', token);
      
      return user;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
  
  // Registrar un nuevo usuario
  async register(data: RegisterData): Promise<User> {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al registrar usuario');
      }

      const responseData = await response.json();
      const { user, token } = responseData.data;
      
      // Guardar el token en AsyncStorage
      await AsyncStorage.setItem('auth_token', token);
      
      return user;
    } catch (error) {
      console.error('Error al registrar:', error);
      throw error;
    }
  }
  
  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  
  // Obtener el usuario actual
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (!token) return null;
      
      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        await AsyncStorage.removeItem('auth_token');
        return null;
      }

      const data = await response.json();
      return data.data.user;
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }
  
  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      return !!token;
    } catch (error) {
      return false;
    }
  }

  // Obtener el token
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      return null;
    }
  }
}

// Exportar una instancia única del servicio
const authService = new AuthService();
export default authService; 