import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useForm from "../hooks/useForm";
import useUsers from "../hooks/useUsers";
import Header from "../components/Header";
import UserTable from "../components/UserTable";
import CreateUserForm from "../components/CreateUserForm";
import { User } from "../services/UserService";
import { TOAST_MESSAGES } from "../shared/messages";
import "../styles/users.css";

interface UserFormData {
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const { users, loading, fetchUsers, deleteUser, updateUser, createUser } =
    useUsers();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const { formData, handleChange, setFormData, resetForm } =
    useForm<UserFormData>({
      name: "",
      email: "",
    });

  const {
    formData: createFormData,
    handleChange: handleCreateChange,
    resetForm: resetCreateForm,
  } = useForm<UserFormData>({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      await deleteUser(userId);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
    });
  };

  const handleSaveEdit = async (userId: string) => {
    if (!formData.name || !formData.email) {
      toast.warning(TOAST_MESSAGES.VALIDATION.FILL_ALL_FIELDS);
      return;
    }

    const success = await updateUser(userId, {
      name: formData.name,
      email: formData.email,
    });

    if (success) {
      setEditingUserId(null);
      resetForm();
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    resetForm();
  };

  const handleCreateUser = async () => {
    if (!createFormData.name || !createFormData.email) {
      toast.warning(TOAST_MESSAGES.VALIDATION.FILL_ALL_FIELDS);
      return;
    }

    const success = await createUser({
      name: createFormData.name,
      email: createFormData.email,
    });

    if (success) {
      setShowCreateForm(false);
      resetCreateForm();
    }
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
    resetCreateForm();
  };

  return (
    <>
      <Header title="Gerenciamento de Usuários" />
      <div className="users-container">
        <div className="users-header">
          <h2>Lista de Usuários</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            disabled={loading}
            className="btn-create"
          >
            + Criar Usuário
          </button>
        </div>

        {showCreateForm && (
          <CreateUserForm
            formData={createFormData}
            onChange={handleCreateChange}
            onSubmit={handleCreateUser}
            onCancel={handleCancelCreate}
            loading={loading}
          />
        )}

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Carregando usuários...</p>
          </div>
        ) : users?.length === 0 && !showCreateForm ? (
          <div className="empty-state">
            <p>Nenhum usuário encontrado.</p>
          </div>
        ) : (
          <UserTable
            users={users}
            editingUserId={editingUserId}
            editFormData={formData}
            onEditChange={handleChange}
            onEdit={handleEditUser}
            onSaveEdit={handleSaveEdit}
            onCancel={handleCancel}
            onDelete={handleDeleteUser}
            loading={loading}
          />
        )}
      </div>
    </>
  );
};

export default Users;
