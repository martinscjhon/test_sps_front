import { useState, useCallback } from "react";

interface UseFormReturn<T> {
  formData: T;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  setFormData: (data: T) => void;
  resetForm: () => void;
}

const useForm = <T extends Record<string, any>>(
  initialValues: T,
): UseFormReturn<T> => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      const { name, value, type } = e.target;

      setFormData((prevState) => ({
        ...prevState,
        [name]:
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      }));
    },
    [],
  );

  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  return {
    formData,
    handleChange,
    setFormData,
    resetForm,
  };
};

export default useForm;
