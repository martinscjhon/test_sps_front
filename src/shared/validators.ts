export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateUserData = (
  name: string,
  email: string,
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!name.trim()) {
    errors.push("Nome é obrigatório");
  } else if (!validateName(name)) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!email.trim()) {
    errors.push("Email é obrigatório");
  } else if (!validateEmail(email)) {
    errors.push("Email inválido");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
