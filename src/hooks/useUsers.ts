import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import UserService from "../services/UserService";
import { User } from "../services/UserService";
import { TOAST_MESSAGES } from "../shared/messages";

interface UseUsersState {
  users: User[];
  loading: boolean;
}

interface UseUsersActions {
  fetchUsers: () => Promise<void>;
  updateUser: (userId: string, userData: Partial<User>) => Promise<User | null>;
  deleteUser: (userId: string) => Promise<boolean>;
  createUser: (userData: Omit<User, "id" | "uuid">) => Promise<User | null>;
}

type UseUsersReturn = UseUsersState & UseUsersActions;

const useUsers = (): UseUsersReturn => {
  const [state, setState] = useState<UseUsersState>({
    users: [],
    loading: false,
  });

  const fetchUsers = useCallback(async (): Promise<void> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const data = await UserService.getUsers();

      setState((prev) => ({ ...prev, users: data, loading: false }));
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : TOAST_MESSAGES.ERROR.USER_FETCH_ERROR;
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      toast.error(errorMessage);
    }
  }, []);

  const updateUser = useCallback(
    async (userId: string, userData: Partial<User>): Promise<User | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const updatedUser = await UserService.updateUser(userId, userData);
        toast.success(TOAST_MESSAGES.SUCCESS.USER_UPDATED);
        const data = await UserService.getUsers();
        setState((prev) => ({ ...prev, users: data, loading: false }));
        return updatedUser;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : TOAST_MESSAGES.ERROR.USER_UPDATE_ERROR;
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          loading: false,
        }));
        toast.error(errorMessage);
        return null;
      }
    },
    [],
  );

  const deleteUser = useCallback(async (userId: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await UserService.deleteUser(userId);
      toast.success(TOAST_MESSAGES.SUCCESS.USER_DELETED);
      // Recarrega a lista completa após deletar
      const data = await UserService.getUsers();
      setState((prev) => ({ ...prev, users: data, loading: false }));
      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : TOAST_MESSAGES.ERROR.USER_DELETE_ERROR;
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
      toast.error(errorMessage);
      return false;
    }
  }, []);

  const createUser = useCallback(
    async (userData: Omit<User, "id" | "uuid">): Promise<User | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const newUser = await UserService.createUser(userData);
        toast.success(TOAST_MESSAGES.SUCCESS.SIGNUP_SUCCESS);
        // Recarrega a lista completa após criar
        const data = await UserService.getUsers();
        setState((prev) => ({ ...prev, users: data, loading: false }));
        return newUser;
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          error: TOAST_MESSAGES.ERROR.USER_CREATE_ERROR || err.message,
          loading: false,
        }));
        toast.error(TOAST_MESSAGES.ERROR.USER_CREATE_ERROR || err.message);
        return null;
      }
    },
    [],
  );

  return {
    users: state.users,
    loading: state.loading,
    fetchUsers,
    updateUser,
    deleteUser,
    createUser,
  };
};

export default useUsers;
