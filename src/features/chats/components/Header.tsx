import type { Credentials } from "@/features/auth/auth.types";
import { LogOut } from "lucide-react";

type Props = {
  credentials: Credentials | null;
  handleLogout: () => void;
};

const Header = ({ credentials, handleLogout }: Props) => {
  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Чаты</h1>
        <p className="text-xs text-slate-400">
          Инстанс {credentials?.idInstance}
        </p>
      </div>
      <button
        onClick={handleLogout}
        title="Выйти"
        className="text-slate-400 hover:text-slate-900"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
};

export default Header;
