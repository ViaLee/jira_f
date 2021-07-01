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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initialState,
  });

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
