import React, { ReactNode, useState } from "react";
import { AuthProvider } from "context/auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
