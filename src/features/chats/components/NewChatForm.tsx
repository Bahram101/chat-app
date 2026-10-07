import { LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { isValidPhone } from "@/lib/utils/phone";

import { useCreateChat } from "../hooks/useCreateChat";

type Props = {
  onCreate: (chatId: string, phone: string) => void;
};

export function NewChatForm({ onCreate }: Props) {
  const createChat = useCreateChat();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ phone: string }>();

  const error = errors.phone?.message ?? createChat.error?.message;

  return (
    <form
      onSubmit={handleSubmit(({ phone }) =>
        createChat.mutate(phone, {
          onSuccess: (chatId) => {
            onCreate(chatId, phone);
            reset();
          },
        }),
      )}
      className="border-b border-slate-200 p-3"
    >
      <div className="flex gap-2">
        <input
          {...register("phone", {
            validate: (value) =>
              isValidPhone(value) || "Введите номер",
          })}
          type="tel"
          placeholder="Номер телефона, например 77071302100"
          className="min-w-0 flex-1 rounded-lg bg-slate-100 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          title="Создать чат"
          disabled={createChat.isPending}
          className="rounded-lg bg-blue-600 px-3 text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
        >
          {createChat.isPending ? (
            <LoaderCircle size={18} className="animate-spin" />
          ) : (
            <Plus size={18} />
          )}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </form>
  );
}
