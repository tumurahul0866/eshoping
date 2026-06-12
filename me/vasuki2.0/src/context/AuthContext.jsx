import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('admin123');

  useEffect(() => {
    const storedUser = localStorage.getItem('vasuki_user');
    const storedAdmin = localStorage.getItem('vasuki_admin');
    const storedAdminPassword = localStorage.getItem('vasuki_admin_password');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAdmin === 'true') {
      setIsAdmin(true);
    }
    if (storedAdminPassword) {
      setAdminPassword(storedAdminPassword);
    }
  }, []);

  const loginUser = (email, password) => {
    const mockUser = { id: '1', name: 'Customer', email };
    setUser(mockUser);
    localStorage.setItem('vasuki_user', JSON.stringify(mockUser));
    return true;
  };

  const registerUser = (data) => {
    const mockUser = { id: Date.now().toString(), name: data.name, email: data.email, phone: data.phone };
    setUser(mockUser);
    localStorage.setItem('vasuki_user', JSON.stringify(mockUser));
    return true;
  };

  const loginAdmin = (email, password) => {
    if (email === 'admin@vasukipickles.com' && password === adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('vasuki_admin', 'true');
      return true;
    }
    return false;
  };

  const changeAdminPassword = (currentPassword, newPassword) => {
    if (currentPassword === adminPassword && newPassword.length >= 6) {
      setAdminPassword(newPassword);
      localStorage.setItem('vasuki_admin_password', newPassword);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('vasuki_user');
    localStorage.removeItem('vasuki_admin');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loginUser, registerUser, loginAdmin, changeAdminPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
