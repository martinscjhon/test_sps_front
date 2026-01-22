import React from "react";
import { validateUserData } from "../shared/validators";

interface CreateUserFormProps {
  formData: { name: string; email: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onCancel,
  loading,
}) => {
  const validation = validateUserData(formData.name, formData.email);
  const isFormValid = validation.isValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      await onSubmit();
    }
  };

  return (
    <div className="form-container">
      <h3>Criar Novo Usuário</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Nome"
            disabled={loading}
            className="form-input"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email"
            disabled={loading}
            className="form-input"
            required
          />
        </div>
        <div className="form-actions">
          <button
            type="submit"
            disabled={loading || !isFormValid}
            className="btn btn-success"
          >
            Criar
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
