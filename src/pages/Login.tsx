import React from "react";
import { Link } from "react-router-dom";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import "../styles/login.css";
import "../styles/global.css";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { formData, handleChange } = useForm<LoginForm>({
    email: "",
    password: "",
  });
  const { login, loading } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return;
    }

    await login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite seu email"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            <Link to="/reset-password">Esqueceu a senha?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
