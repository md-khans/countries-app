import { createContext, useState } from "react";

export const themecontext = createContext()

export function ThemeProvider ({children}) {
    const [isdark, setIsDark] = useState(JSON.parse(localStorage.getItem("isdarkmood")));
    return (
        <themecontext.Provider value={[isdark, setIsDark]}>
            {children}
        </themecontext.Provider>
    )
}