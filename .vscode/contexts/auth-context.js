import { createContext, useContext, useEffect, useState } from 'react';

// 1. 建立 Context 物件
const AuthContext = createContext();

/*
功能:
  A. 保有登入的狀態
  B. 登入的功能
  C. 登出的功能
  D. 取得包含 JWT token 的物件函式 getAuthHeader()
*/

// 沒有登入的狀態資料
const emptyAuth = {
  id: 0,
  account: '',
  nickname: '',
  token: '',
};

// 存到 localStorage 的 key
const storageKey = 'admins-auth';

// 2. 建立 ContextProvider 元件
export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState({ ...emptyAuth });

  const login = async (account, password) => {
    try {
      const r = await fetch(
        'http://localhost:3005/api/product_list/jwt-login',
        {
          method: 'POST',
          body: JSON.stringify({ account, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await r.json();
      if (result.success) {
        localStorage.setItem(storageKey, JSON.stringify(result.data));
        setAuth(result.data);

        return true;
      }
    } catch (ex) {
      console.log({ ex });
      console.log('storageKey', storageKey);
    }
    return false; // 走到這裡就是沒有登入成功
  };

  const logout = () => {
    localStorage.removeItem(storageKey); // 移除暫存的登入資料
    setAuth({ ...emptyAuth }); // 回復到沒有登入的狀態
  };

  const getAuthHeader = () => {
    return {
      Authorization: `Bearer ${auth.token}`,
    };
  };

  useEffect(() => {
    // 如果 localStorage 裡已經有狀態的資料, 就直接使用
    const str = localStorage.getItem(storageKey);
    if (str) {
      try {
        const obj = JSON.parse(str);
        setAuth(obj);
      } catch (ex) {}
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, logout, login, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. 匯出 Context
export const useAuth = () => useContext(AuthContext); // 設定自訂的勾子
export default AuthContext;
