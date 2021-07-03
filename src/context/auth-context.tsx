import React, { ReactNode, useEffect, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { Spin } from "antd";

interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { run, isLoading, data } = useAsync<User | null>();

  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    // bootstrapUser().then(setUser);
    const token = auth.getToken();
    if (token) {
      // const data = await http("me", { token });
      run(http("me", { token }));
      // setUser(data)
    }
  });

  useEffect(() => {
    console.log(data) // 此处data 有问题 应该是user, 却是{user:{}}
    setUser(data);
  }, [data]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {isLoading ? <Spin></Spin> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中");
  }
  return context;
};
