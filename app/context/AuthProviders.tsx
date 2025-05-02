import { auth, provider } from "../lib/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";


interface AuthContextType {
  user: User | null;
  // setUser: React.Dispatch<React.SetStateAction<User | null>>;
  role: 'admin' | 'student' | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'student' | null>(null);
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const loggedUser = result.user;
        setUser(loggedUser);

        fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loggedUser.email,
            name: loggedUser.displayName,
            photoURL: loggedUser.photoURL,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log(data.role);
            // setRole(data.role);
            // setUser(loggedUser);
            // console.log(role, user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    await signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
        console.log("Logged Out");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  // Persist login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      console.log("auth state change", currentUser);
      if (currentUser) {
        setUser(currentUser);
        try {
          const res = await fetch(`http://localhost:5000/api/users/${currentUser.email}`);
          const data = await res.json();
          setRole(data.role); // ✅ get role on page refresh/login
          console.log(data.role);
        } catch (err) {
          console.error("Failed to fetch user role", err);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
