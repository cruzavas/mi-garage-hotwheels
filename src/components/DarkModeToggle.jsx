import React from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle({ activo, setActivo }) {
  return (
    <button
      onClick={() => setActivo(!activo)}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {activo ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      {activo ? "Claro" : "Oscuro"}
    </button>
  );
}
