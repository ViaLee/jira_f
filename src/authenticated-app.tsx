import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import React from "react";
import { ProjectListScreen } from "screens/project-list";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <PageHeader>
      <button onClick={logout}>登出</button>
      <Main>
        <ProjectListScreen />
      </Main>
    </PageHeader>
  );
};

const PageHeader = styled.header`
  height: 6rem;
`;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
