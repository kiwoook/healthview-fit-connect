
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  exerciseLevel: 'beginner' | 'intermediate' | 'advanced';
  location: string;
  createdAt: string;
  fitnessAssessment?: {
    completed: boolean;
    results?: Record<string, string>;
    personalityType?: string;
    completedAt?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateFitnessAssessment: (results: Record<string, string>, personalityType: string) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  exerciseLevel: 'beginner' | 'intermediate' | 'advanced';
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 확인
    const savedUser = localStorage.getItem('healthview_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 실제 구현에서는 API 호출
      const savedUsers = JSON.parse(localStorage.getItem('healthview_users') || '[]');
      const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('healthview_user', JSON.stringify(userWithoutPassword));
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // 실제 구현에서는 API 호출
      const savedUsers = JSON.parse(localStorage.getItem('healthview_users') || '[]');
      
      // 이메일 중복 확인
      if (savedUsers.find((u: any) => u.email === userData.email)) {
        setIsLoading(false);
        return false;
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      savedUsers.push(newUser);
      localStorage.setItem('healthview_users', JSON.stringify(savedUsers));

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('healthview_user', JSON.stringify(userWithoutPassword));
      
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('healthview_user');
  };

  const updateFitnessAssessment = (results: Record<string, string>, personalityType: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      fitnessAssessment: {
        completed: true,
        results,
        personalityType,
        completedAt: new Date().toISOString(),
      }
    };

    setUser(updatedUser);
    localStorage.setItem('healthview_user', JSON.stringify(updatedUser));

    // 사용자 목록도 업데이트
    const savedUsers = JSON.parse(localStorage.getItem('healthview_users') || '[]');
    const updatedUsers = savedUsers.map((u: any) => 
      u.id === user.id ? { ...u, fitnessAssessment: updatedUser.fitnessAssessment } : u
    );
    localStorage.setItem('healthview_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, updateFitnessAssessment }}>
      {children}
    </AuthContext.Provider>
  );
};
