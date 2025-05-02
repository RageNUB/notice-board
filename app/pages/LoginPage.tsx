import { useAuth } from "../context/AuthProviders";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user]);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={login}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Sign in with Google
      </button>
      <button
        onClick={logout}
        className="bg-blue-600 text-white px-6 py-2 rounded"
      >
        Sign out from Google
      </button>
    </div>
  );
};

export default LoginPage;
