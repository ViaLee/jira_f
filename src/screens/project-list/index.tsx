import { SearchPanel } from "./search-panel";
import React from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useDebounce } from "utils";

export const ProjectListScreen = () => {
  const { list: users, isLoading: userLoding } = useUser();
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // param 每次都是新对象
  console.log(param, 100);
  const debouncedParam = useDebounce(param);
  const { list, isLoading } = useProject(debouncedParam);
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

ProjectListScreen.whyDidYouRender = true;

// Class Test extends React.Component<any,any>{
//   static whyDidYourender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`;
