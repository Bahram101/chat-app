import { useForm } from "react-hook-form";

import type { Credentials } from "@/features/auth/auth.types";
import { useLogin } from "@/features/auth/hooks/useLogin";

const inputClassName =
  "w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

export function LoginPage() {
  const login = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={handleSubmit((values) => login.mutate(values))}
        className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Вход</h1>
        </div>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">IdInstance</span>
          <input
            {...register("idInstance", {
              setValueAs: (value: string) => value.trim(),
              required: "Введите idInstance",
            })}
            className={inputClassName}
          />
          {errors.idInstance && (
            <span className="text-xs text-red-600">
              {errors.idInstance.message}
            </span>
          )}
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">
            ApiTokenInstance
          </span>
          <input
            {...register("apiTokenInstance", {
              setValueAs: (value: string) => value.trim(),
              required: "Введите apiTokenInstance",
            })}
            type="password"
            className={inputClassName}
          />
          {errors.apiTokenInstance && (
            <span className="text-xs text-red-600">
              {errors.apiTokenInstance.message}
            </span>
          )}
        </label>

        {login.error && (
          <p className="text-sm text-red-600">{login.error.message}</p>
        )}

        <button
          type="submit"
          disabled={login.isPending}
          className="w-full rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
        >
          {login.isPending ? "Проверка..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
