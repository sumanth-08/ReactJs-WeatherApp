import { Link } from "react-router-dom";
import { useTheme } from "../context/theme-provider";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const dark = theme === "dark";

  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur py-2 supports-[backdrop-filter]:bg-background-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-8">
        <Link to="/">
          <img src="./vite.svg" alt="logo" />
        </Link>
        <div>
          <div
            onClick={() => setTheme(dark ? "light" : "dark")}
            className={`flex items-center cursor-pointer transition-transform duration-500
            ${dark ? "rotate-180" : "rotate-0"}`}
          >
            {dark ? <Sun className="h-5 w-5 text-yellow-500 rotate-0 transition-all" /> : <Moon className="h-5 w-5 text-blue-500 rotate-0 transition-all" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
