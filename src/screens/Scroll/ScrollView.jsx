import React, { Component } from "react";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  border: 1px solid #aaa;
  width: 300px;
  margin: 30px auto;
  height: 300px;
  overflow: scroll;
`;
export class ScrollView extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [{ id: 1 }] };
  }
  state = { data: [] };
  node = null;
  static getDerivedStateFromProps(newProps, prevProps) {
    // props 更新
    console.log("getDerivedStateFromProps");
    console.log(newProps, prevProps);
    return { ...newProps, other: "其他参数" };
  }

  // componentWillMount() {
  //   // 使用 getDerivedStateFromProps
  //   console.log("componentWillMount");
  // }

  componentDidMount() {
    this.node.addEventListener("scroll", this.onScroll);
    console.log("componentDidMount");
  }

  componentWillUnmount() {
    this.node.removeEventListener("scroll", this.onScroll);
  }

  shouldComponentUpdate(newProps, newState) {
    console.log("shouldComponentUpdate");
    console.log(newProps, this.state);
    return newProps.data !== this.state.data;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    // 要和 componentDidUpdate一起使用
    console.log("getSnapshotBeforeUpdate");
    // commit 阶段
    // 更新前上一次的dom数据
    return this.node.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    console.log(prevProps, prevState, snapshot);
    // 更新后最新的dom数据
    console.log("scrollView容器高度变化:", this.node.scrollHeight - snapshot);
  }

  onScroll = (e) => {
    const { scrolltolower } = this.props;
    const { offsetHeight, scrollTop, scrollHeight, clientHeight } = this.node;
    console.log();
    // scrollHeight === scrollTop + offsetHeight
    console.log("scrollTop", e.target.scrollTop); // 滚动距离
    console.log("scrollHeight", e.target.scrollHeight); //滚动区域高度
    console.log("clientHeight", e.target.clientHeight); //可见高度
    console.log("clientTop", e.target.clientTop); //相对于父级上边的距离
    console.log("offsetHeight:", offsetHeight, "scrollTop:", scrollTop);
    if (scrollHeight === scrollTop + clientHeight) {
      console.log("到底了");
      // 继续请求数据，更新state
      scrolltolower && scrolltolower();
    }
  };

  render() {
    const { data, component } = this.props;
    return (
      <Wrapper onScroll={this.onScroll} ref={(node) => (this.node = node)}>
        {data && data.map((i) => component({ item: i }))}
      </Wrapper>
    );
  }
}

ScrollView.whyDidYouRender = true;

//  传入内容，滑动底部请求渲染列表
//  监听滚动到底部，请求列表，如果total变化则继续渲染下一页，更新list
//  如何监听滚动到底部：

// Class Test extends React.Component<any,any>{
//   static whyDidYourender = true
// }
