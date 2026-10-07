import { ChatPage } from "@/pages/ChatPage";
import { LoginPage } from "@/pages/LoginPage";
import { useAuth } from "@/providers/AuthProvider";

function App() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <ChatPage /> : <LoginPage />;
}

export default App;
