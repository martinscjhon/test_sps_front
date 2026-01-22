import api from "./_base/api";

export interface User {
  id: string;
  uuid?: string;
  email: string;
  name: string;
  createdAt?: string;
  enable?: boolean;
  [key: string]: any;
}

interface ApiUser {
  Id: number;
  Uuid: string;
  Email: string;
  Name: string;
  CreatedAt: string;
  Enable: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

class UserService {
  private mapApiUserToUser(apiUser: ApiUser): User {
    return {
      id: apiUser.Uuid,
      uuid: apiUser.Uuid,
      email: apiUser.Email,
      name: apiUser.Name,
      createdAt: apiUser.CreatedAt,
      enable: apiUser.Enable,
    };
  }

  async getUsers(): Promise<User[]> {
    const response = await api.get<{ data: ApiUser[] }>("/user");
    const apiUsers = response.data.data;
    if (!Array.isArray(apiUsers)) {
      throw new Error("Resposta da API inválida");
    }
    return apiUsers.map((apiUser) => this.mapApiUserToUser(apiUser));
  }

  async getUserById(userId: string): Promise<User> {
    const response = await api.get<ApiUser>(`/user/${userId}`);
    return this.mapApiUserToUser(response.data);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await api.put<ApiUser>(`/user/${userId}`, userData);
    return this.mapApiUserToUser(response.data);
  }

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/user/${userId}`);
  }

  async createUser(userData: Omit<User, "id" | "uuid">): Promise<User> {
    const response = await api.post<ApiUser>("/user", userData);
    return this.mapApiUserToUser(response.data);
  }
}

export default new UserService();
