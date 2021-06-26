import { SearchPanel } from "./search-panel";
import React, { useEffect, useState } from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { cleanObject, useMount, useDebounce } from "../../utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  const [list, setList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
