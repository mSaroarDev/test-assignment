'use client';
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "./providers/ThemeProviders";
import { RiMoonFill } from "react-icons/ri";

export function ToggleTheme() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button 
      onClick={toggleTheme}
      className="rounded-full cursor-pointer p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === 'light' ? (
        <RiMoonFill size={18} />
      ) : (
        <MdOutlineWbSunny size={18} />
      )}
    </button>
  );
}