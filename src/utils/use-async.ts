// 处理异步请求的状态, idle ,loading ,error, success
import { useState } from "react";

interface State<D> {
  stat: "idle" | "loading" | "error" | "success";
  data: D | null;
  error: Error | null;
}

const defaultState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: { throwError?: boolean }
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

  const config = { ...defaultConfig, ...initialConfig };

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({
      data: null,
      stat: "error",
      error: error,
    });

  const run = (promisefn: Promise<D>) => {
    //   (param:D) 为啥这个参数不要声明
    if (!promisefn || !promisefn.then) {
      //   如果不是promise,不继续执行
      throw new Error("请传入promise");
    }
    setState({
      stat: "loading",
      data: null,
      error: null,
    });
    return promisefn
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
        // throw new Error(err); 手动抛错
        if (config.throwError) {
          return Promise.reject(err); // 将promise 状态从pending变为失败
        }
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    ...state,
    setData,
    setError,
  };
};
