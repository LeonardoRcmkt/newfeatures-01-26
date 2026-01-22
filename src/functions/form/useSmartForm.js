export function useSmartForm(useFormReturn) {
  const { register, trigger, formState } = useFormReturn;
  const { errors } = formState;

  const smartRegister = (name, rules = {}) =>
    register(name, {
      ...rules,
      onChange: () => {
        if (errors[name]) {
          trigger(name);
        }
      },
    });

  return {
    ...useFormReturn,
    smartRegister,
  };
}
