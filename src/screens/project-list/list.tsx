import React from "react";
import { User } from "screens/project-list/search-panel";
import { Table } from "antd";
import { Link } from "react-router-dom";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
  loading: boolean;
}
export const List = ({ list, users, loading }: ListProps) => {
  return (
    <Table
      loading={loading}
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(v, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
          //string.localeCompare(param) 0 : 字符串匹配100%, 1 : 不匹配，参数值来自于语言环境的排序顺序字符串对象的值之前,-1 : 不匹配，参数值来自于语言环境的排序顺序字符串对象的值之后
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
};
