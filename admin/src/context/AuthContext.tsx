import React, { createContext, useContext, useState } from 'react';


interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem('adminToken');
        const storedUser = localStorage.getItem('adminUser');
        if (token && storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Failed to parse stored user', error);
                localStorage.removeItem('adminUser');
                localStorage.removeItem('adminToken');
                return null;
            }
        }
        return null;
    });
    const [loading] = useState(false);

    const login = (token: string, userData: User) => {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
