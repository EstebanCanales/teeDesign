import authService from './auth';

export interface TShirtColors {
  body: string;
  leftSleeve: string;
  rightSleeve: string;
  collar: string;
}

export interface TeeDesign {
  id?: string;
  name: string;
  userId?: string;
  creator?: {
    id: string;
    name: string;
  };
  colors: TShirtColors;
  isPublic: boolean;
  likes?: number;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Interfaz para adaptar los datos al formato esperado por la API
interface ApiDesign {
  name: string;
  baseColor: string;
  sleeveLeftColor: string;
  sleeveRightColor: string;
  collarColor: string;
  isPublic: boolean;
}

class DesignService {
  private baseURL = 'http://localhost:3000/api'; // Cambiar según tu configuración

  // Adaptar el diseño para la API
  private adaptDesignForApi(design: Omit<TeeDesign, 'id'>): ApiDesign {
    return {
      name: design.name,
      baseColor: design.colors.body,
      sleeveLeftColor: design.colors.leftSleeve,
      sleeveRightColor: design.colors.rightSleeve,
      collarColor: design.colors.collar,
      isPublic: design.isPublic
    };
  }
  
  // Adaptar la respuesta de la API a nuestro modelo
  private adaptApiResponse(apiResponse: any): TeeDesign {
    return {
      id: apiResponse.id || apiResponse._id,
      name: apiResponse.name,
      userId: apiResponse.user,
      colors: {
        body: apiResponse.baseColor || '#ffffff',
        leftSleeve: apiResponse.sleeveLeftColor || '#ffffff',
        rightSleeve: apiResponse.sleeveRightColor || '#ffffff',
        collar: apiResponse.collarColor || '#ffffff'
      },
      isPublic: apiResponse.isPublic || false,
      createdAt: apiResponse.createdAt,
      updatedAt: apiResponse.updatedAt
    };
  }

  // Obtener todos los diseños públicos
  async getPublicDesigns(): Promise<TeeDesign[]> {
    try {
      const response = await fetch(`${this.baseURL}/designs/public`);
      
      if (!response.ok) {
        throw new Error('Error al obtener diseños públicos');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.designs) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const designs = data.data.designs;
      return designs.map((design: any) => this.adaptApiResponse(design));
    } catch (error) {
      console.error('Error al obtener diseños públicos:', error);
      throw error;
    }
  }
  
  // Obtener un diseño por su ID
  async getDesignById(id: string): Promise<TeeDesign> {
    try {
      const response = await fetch(`${this.baseURL}/designs/${id}`);
      
      if (!response.ok) {
        throw new Error('Diseño no encontrado');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.design) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const design = data.data.design;
      return this.adaptApiResponse(design);
    } catch (error) {
      console.error(`Error al obtener el diseño con ID ${id}:`, error);
      throw error;
    }
  }
  
  // Obtener diseños del usuario actual
  async getUserDesigns(): Promise<TeeDesign[]> {
    try {
      const token = await authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      const response = await fetch(`${this.baseURL}/designs/user/mine`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener los diseños del usuario');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.designs) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const designs = data.data.designs;
      return designs.map((design: any) => this.adaptApiResponse(design));
    } catch (error) {
      console.error('Error al obtener los diseños del usuario:', error);
      throw error;
    }
  }
  
  // Crear un nuevo diseño
  async createDesign(design: Omit<TeeDesign, 'id'>): Promise<TeeDesign> {
    try {
      const token = await authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      // Convertir al formato que espera la API
      const apiDesign = this.adaptDesignForApi(design);
      
      const response = await fetch(`${this.baseURL}/designs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(apiDesign),
      });
      
      if (!response.ok) {
        throw new Error('Error al crear el diseño');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.design) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const createdDesign = data.data.design;
      return this.adaptApiResponse(createdDesign);
    } catch (error) {
      console.error('Error al crear el diseño:', error);
      throw error;
    }
  }
  
  // Actualizar un diseño existente
  async updateDesign(id: string, design: Partial<TeeDesign>): Promise<TeeDesign> {
    try {
      const token = await authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      // Preparar los datos para la API
      const updateData: any = {};
      
      if (design.name) updateData.name = design.name;
      if (design.isPublic !== undefined) updateData.isPublic = design.isPublic;
      
      if (design.colors) {
        if (design.colors.body) updateData.baseColor = design.colors.body;
        if (design.colors.leftSleeve) updateData.sleeveLeftColor = design.colors.leftSleeve;
        if (design.colors.rightSleeve) updateData.sleeveRightColor = design.colors.rightSleeve;
        if (design.colors.collar) updateData.collarColor = design.colors.collar;
      }
      
      const response = await fetch(`${this.baseURL}/designs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el diseño');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.design) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const updatedDesign = data.data.design;
      return this.adaptApiResponse(updatedDesign);
    } catch (error) {
      console.error(`Error al actualizar el diseño con ID ${id}:`, error);
      throw error;
    }
  }
  
  // Eliminar un diseño
  async deleteDesign(id: string): Promise<void> {
    try {
      const token = await authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      const response = await fetch(`${this.baseURL}/designs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar el diseño');
      }
    } catch (error) {
      console.error(`Error al eliminar el diseño con ID ${id}:`, error);
      throw error;
    }
  }
  
  // Dar like a un diseño
  async likeDesign(id: string): Promise<void> {
    try {
      const token = await authService.getToken();
      if (!token) {
        throw new Error('No autenticado');
      }

      const response = await fetch(`${this.baseURL}/designs/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al dar like al diseño');
      }
    } catch (error) {
      console.error(`Error al dar like al diseño con ID ${id}:`, error);
      throw error;
    }
  }
  
  // Buscar diseños
  async searchDesigns(query: string): Promise<TeeDesign[]> {
    try {
      const response = await fetch(`${this.baseURL}/designs/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error('Error al buscar diseños');
      }
      
      const data = await response.json();
      
      if (!data.data || !data.data.designs) {
        throw new Error('Formato de respuesta inválido');
      }
      
      const designs = data.data.designs;
      return designs.map((design: any) => this.adaptApiResponse(design));
    } catch (error) {
      console.error(`Error al buscar diseños con la consulta "${query}":`, error);
      throw error;
    }
  }
}

// Exportar una instancia única del servicio
const designService = new DesignService();
export default designService; 