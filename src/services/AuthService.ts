import { openApi } from "./_base/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

class AuthService {
  static async login(credentials: LoginPayload): Promise<any> {
    try {
      const response = await openApi.post("/login", credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  }

  static async logout(): Promise<void> {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static async resetPassword(email: string, newPassword: string): Promise<any> {
    try {
      const response = await openApi.put("/login/password", {
        email,
        password: newPassword,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Erro ao redefinir senha",
      );
    }
  }

  static setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  static getToken(): string | null {
    return localStorage.getItem("token");
  }

  static removeToken(): void {
    localStorage.removeItem("token");
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default AuthService;
