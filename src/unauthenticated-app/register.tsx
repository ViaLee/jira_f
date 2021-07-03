import React from "react";
import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/use-async";

// Error类型
export const RegisterScreen = ({
  onError,
}: {
  onError: (err: Error) => void;
}) => {
  const { register } = useAuth();
  //                             为什么undefined不报错？
  const { run, isLoading } = useAsync(undefined, { throwError: true });

  const handleSubmit = (values: { username: string; password: string }) => {
    run(register(values)).catch((err) => {
      onError(err.message);
    });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
