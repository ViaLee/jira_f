import React from "react";
import styled from "@emotion/styled";
import Form, { FormItem,Input } from "../../components/Form";

export const FormList = () => {

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

FormList.whyDidYouRender = true;

// Class Test extends React.Component<any,any>{
//   static whyDidYourender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`;
