import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/user.repository";
import type { IUser } from "../../domain/schemas/user.schema";

export interface AuthTokenPayload {
  id: string;
  email: string;
  role: string;
}

export class AuthService {
  private readonly userRepository: UserRepository;
  private readonly jwtSecret: string;
  private readonly jwtExpiration: string;

  constructor() {
    this.userRepository = new UserRepository();
    this.jwtSecret = process.env.JWT_SECRET || "super_secret_key_change_in_production";
    this.jwtExpiration = process.env.JWT_EXPIRATION || "7d";
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<{ user: IUser; token: string }> {
    console.log('[AuthService] Registrando usuario', userData.email);
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Crear el usuario
    const user = await this.userRepository.create(userData);
    // @ts-ignore
    console.log('[AuthService] Usuario creado con ID', (user as any)._id.toString());

    // Generar token
    const token = this.generateToken(user);

    // Eliminar password del objeto de retorno
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject as IUser, token };
  }

  async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    // Buscar usuario por email
    console.log('[AuthService] Intentando login', email);
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // Verificar contraseña
    const isPasswordValid = await user.comparePassword(password);
    console.log('[AuthService] Password válida?', isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas");
    }

    // Generar token
    const token = this.generateToken(user);

    // Eliminar password del objeto de retorno
    const userObject = user.toObject();
    delete userObject.password;

    return { user: userObject as IUser, token };
  }

  async validateToken(token: string): Promise<AuthTokenPayload> {
    try {
      return jwt.verify(token, this.jwtSecret) as AuthTokenPayload;
    } catch (error) {
      throw new Error("Token inválido");
    }
  }

  private generateToken(user: IUser): string {
    const payload: AuthTokenPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };
    
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiration
    });
  }
} 