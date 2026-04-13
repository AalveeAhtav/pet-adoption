import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

/* custom hook so components can easily use auth */
export function useAuth() {
    return useContext(AuthContext);
}

/* provider that wraps the app and shares auth state everywhere */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    /* check localStorage when app first loads */
    useEffect(() => {
        const savedUser = localStorage.getItem("petUser");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    /* fake login for now */
    const login = (identifier, password) => {
        // fake admin validation
        if (
            (identifier === "admin" || identifier === "admin@petadoption.com") &&
            password === "admin123"
        ) {
            const mockAdmin = {
                customerId: 1,
                fullName: "Admin User",
                username: "admin",
                email: "admin@petadoption.com",
                role: "admin",
            };

            setUser(mockAdmin);
            localStorage.setItem("petUser", JSON.stringify(mockAdmin));
            return true;
        }

        // fake normal user validation
        if (
            (identifier === "user" || identifier === "test@example.com") &&
            password === "1234"
        ) {
            const mockUser = {
                customerId: 101,
                fullName: "Test User",
                username: "user",
                email: "test@example.com",
                role: "user",
            };

            setUser(mockUser);
            localStorage.setItem("petUser", JSON.stringify(mockUser));
            return true;
        } else {
            alert("Invalid username/email or password");
            return false;
        }
    };

    /* clear logged in user */
    const logout = () => {
        setUser(null);
        localStorage.removeItem("petUser");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}