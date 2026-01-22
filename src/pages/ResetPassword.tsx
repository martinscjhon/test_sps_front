import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import useAuth from "../hooks/useAuth";
import { TOAST_MESSAGES } from "../shared/messages";
import "../styles/login.css";
import "../styles/global.css";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
  email: string;
}

const ResetPassword: React.FC = () => {
  const { formData, handleChange } = useForm<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const { resetPassword, loading } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword || !formData.email) {
      toast.warning(TOAST_MESSAGES.VALIDATION.FILL_ALL_FIELDS);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.warning(TOAST_MESSAGES.VALIDATION.PASSWORDS_DO_NOT_MATCH);
      return;
    }

    await resetPassword(formData.email, formData.password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Redefinir Senha</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite seu e-mail"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Nova Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Digite sua nova senha"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirme sua nova senha"
              disabled={loading}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Lembrou a senha? <Link to="/login">Voltar ao login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
