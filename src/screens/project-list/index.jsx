import { SearchPanel } from "./search-panel";
import React from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import Form, { FormItem,Input } from "../../components/Form";
import { useDebounce } from "utils";

export const ProjectListScreen = () => {
  const { list: users, isLoading: userLoding } = useUser();
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // param 每次都是新对象
  console.log(param, 100);
  const debouncedParam = useDebounce(param);
  const { list, isLoading } = useProject(debouncedParam);

  const form = React.useRef(null);
  const submit = () => {
    form.current.submitForm((formVal) => {
      console.log(formVal);
    });
  };
  const reset = () => {
    form.current.resetForm();
  };

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        loading={userLoding}
        param={param}
        setParam={setParam}
      />
      {/* <List users={users || []} list={list || []} loading={isLoading} /> */}
      <Form ref={form}>
        <FormItem name="name" label="我是">
          <Input />
        </FormItem>
        <FormItem name="mes" label="我想对大家说">
          <Input />
        </FormItem>
        <input placeholder="不需要的input" />
        <Input />
      </Form>
      <div className="btns">
        <button className="searchbtn" onClick={submit}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
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
