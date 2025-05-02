// components/Navbar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useAuth } from "~/context/AuthProviders";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react"; // part of lucide-react used in ShadCN

const Navbar = () => {
  const { user, login, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 shadow-md">
      {/* Left: Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">DIU Board</Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex gap-6 font-medium">
        <Link to="/notices" className="hover:text-blue-500">
          Notices
        </Link>
        <Link to="/activities" className="hover:text-blue-500">
          Activities
        </Link>
        <Link to="/result" className="hover:text-blue-500">
          Result
        </Link>
      </div>

      {/* Right: Auth Section */}
      <div className="md:flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="mr-2"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage
                  src={user.photoURL || ""}
                  alt={user.displayName || "User"}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled>{user.displayName}</DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={login} variant="outline">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
