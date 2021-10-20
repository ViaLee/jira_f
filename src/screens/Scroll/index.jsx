import React, { useEffect } from "react";
import styled from "@emotion/styled";
import "./index.less";
import { ScrollView } from "./ScrollView";
import { useProject } from "utils/project";
import { useDebounce } from "utils";

function Item({ item }) {
  return (
    <div className="goods_item" key={item?.id}>
      <img src={item?.giftImage} className="item_image" />
      <div className="item_content">
        <div className="goods_name">{item?.name}</div>
        <div className="hold_price" />
        <div className="new_price">
          <div className="new_price">
            <div className="one view">¥ {item?.organization}</div>
          </div>
        </div>
        <img className="go_share  go_text" />
      </div>
    </div>
  );
}

export const Scroll = () => {
  // const debouncedParam = useDebounce();
  const { list, isLoading } = useProject();

  useEffect(() => {
    console.log(list);
  }, [list]);

  return <ScrollView data={list} component={Item} scrolltolower={()=>{console.log('继续获取下一页数据')}}/>;
};

Scroll.whyDidYouRender = true;

// Class Test extends React.Component<any,any>{
//   static whyDidYourender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`;
