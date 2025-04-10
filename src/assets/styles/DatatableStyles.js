import { useTheme } from "@/components/providers/ThemeProviders";
import { useMemo } from "react";

export const useDataTableStyles = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const customStyles = useMemo(() => {
      return {
        table: {
          style: {
            backgroundColor: isDark && "#374151",
            color: isDark && "#f3f4f6",
          },
        },
        headRow: {
          style: {
            backgroundColor: isDark && "#374151",
            color:isDark && "#f3f4f6",
            borderBottom: isDark && "1px solid #4b5563",
            
          },
        },
        headCells: {
          style: {
            color: isDark && "#f3f4f6",
            fontWeight: "bold",
          },
        },
        rows: {
          style: {
            backgroundColor: isDark && "#374151",
            color: isDark && "#f3f4f6",
            '&:not(:last-of-type)': {
              borderBottom: isDark && '1px solid #4b5563',
            },
          },
          highlightOnHoverStyle: {
            backgroundColor: isDark && "#4b5563", 
            color: isDark && "#f3f4f6",
            outline: isDark && "none",
          },
        },
        pagination: {
          style: {
            backgroundColor: isDark && "#374151",
            color: isDark && "#f3f4f6",
          },
        },
      };
  }, [theme]);

  return { customStyles };
};
