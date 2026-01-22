import React from "react";
import { User } from "../services/UserService";

interface UserTableProps {
  users: User[];

  editingUserId: string | null;
  editFormData: { name: string; email: string };
  onEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEdit: (user: User) => void;
  onSaveEdit: (userId: string) => void;
  onCancel: () => void;
  onDelete: (userId: string) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  editingUserId,
  editFormData,
  onEditChange,
  onEdit,
  onSaveEdit,
  onCancel,
  onDelete,
  loading,
}) => {
  return (
    <div className="table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user: User) =>
              editingUserId === user.id ? (
                <tr key={user.id} className="editing">
                  <td>{user.id}</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={onEditChange}
                      placeholder="Nome"
                      disabled={loading}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={onEditChange}
                      placeholder="Email"
                      disabled={loading}
                      className="table-input"
                    />
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => onSaveEdit(user.id)}
                        disabled={loading}
                        className="btn btn-success"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={onCancel}
                        disabled={loading}
                        className="btn btn-secondary"
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => onEdit(user)}
                        disabled={loading}
                        className="btn btn-primary"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        disabled={loading}
                        className="btn btn-danger"
                      >
                        Deletar
                      </button>
                    </div>
                  </td>
                </tr>
              ),
            )
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
