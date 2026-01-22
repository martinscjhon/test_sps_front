export const TOAST_MESSAGES = {
  SUCCESS: {
    SIGNUP_SUCCESS: "Usuário criado com sucesso!",
    USER_UPDATED: "Usuário atualizado com sucesso!",
    USER_DELETED: "Usuário deletado com sucesso!",
    PASSWORD_RESET_SUCCESS: "Senha resetada com sucesso!",
  },
  ERROR: {
    USER_CREATE_ERROR:
      "Erro ao criar usuário. Verifique se já existe um usuário com este email.",
    USER_UPDATE_ERROR: "Erro ao atualizar usuário",
    USER_DELETE_ERROR: "Erro ao deletar usuário",
    USER_FETCH_ERROR: "Erro ao buscar usuários",
    LOGIN_FAILED: "Falha no login. Verifique suas credenciais.",
  },
  VALIDATION: {
    FILL_ALL_FIELDS: "Por favor, preencha todos os campos",
    INVALID_EMAIL: "Email inválido",
    PASSWORD_REQUIRED: "Senha é obrigatória",
    PASSWORDS_DO_NOT_MATCH: "As senhas não correspondem",
  },
};

export default TOAST_MESSAGES;
