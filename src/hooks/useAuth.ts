import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthService, { LoginPayload } from "../services/AuthService";
import TOAST_MESSAGES from "../shared/messages";

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (credentials: LoginPayload) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(
    async (credentials: LoginPayload) => {
      setLoading(true);
      setError(null);

      try {
        const response = await AuthService.login(credentials);
        const { token } = response.data || response;

        if (token) {
          AuthService.setToken(token);
          navigate("/users");
        }
      } catch (err: any) {
        setError(err.message);
        toast.error(TOAST_MESSAGES.ERROR.LOGIN_FAILED);
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const resetPassword = useCallback(
    async (email: string, newPassword: string) => {
      setLoading(true);
      setError(null);

      try {
        await AuthService.resetPassword(email, newPassword);
        toast.success(TOAST_MESSAGES.SUCCESS.PASSWORD_RESET_SUCCESS);
        navigate("/login");
      } catch (err: any) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      navigate("/login");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  }, [navigate]);

  return {
    loading,
    error,
    login,
    resetPassword,
    logout,
    isAuthenticated: AuthService.isAuthenticated(),
    clearError,
  };
};

export default useAuth;
