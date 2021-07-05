// import React from "react";
// import { FullPageErrorFallback } from "./lib";
// //  为什么是 React.ReactElement
// type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// export class ErrorBoundary extends React.Component<
//   React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
//   { error: Error | null }
// > {
//   state = { error: null };

//   render() {
//     const { error } = this.state;
//     const { children } = this.props;
//     if (error) {
//       return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
//     }
//     return children;
//   }
// }

import React from "react";
//  为什么是 React.ReactElement
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

   // 当子组件抛出异常，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
