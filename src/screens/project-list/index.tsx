import { SearchPanel } from "./search-panel";
import React, { useState } from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";

export const ProjectListScreen = () => {
  const { list: users, isLoading: userLoding } = useUser();
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const { list, isLoading } = useProject(param);
  const [para] = useUrlQueryParam(["name"]);
  console.log(para);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        loading={userLoding}
        param={param}
        setParam={setParam}
      />
      <List users={users || []} list={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
