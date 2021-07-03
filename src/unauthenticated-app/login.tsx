import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
//  ({ onError:()=>void }) => {
export const LoginScreen = ({ onError }: { onError: (err: Error) => void }) => {
  const { login } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login({ ...values }).catch((err) => {
      onError(err.message);
    });
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder="用户名" id="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="密码" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
      <div className="triangle"></div>
    </Form>
  );
};
