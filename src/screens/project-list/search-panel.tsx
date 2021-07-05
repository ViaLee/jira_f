/** @jsxImportSource @emotion/react */

import React from "react";
import { Input, Select, Form } from "antd";
import { useDocumentTitle } from "utils";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  loading: boolean;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({
  users,
  param,
  setParam,
  loading,
}: SearchPanelProps) => {
  useDocumentTitle("列表", false);
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          loading={loading}
          allowClear
          style={{ minWidth: "100px" }}
          placeholder={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
