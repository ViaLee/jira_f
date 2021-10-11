import React, { useState } from "react";
import styled from "@emotion/styled";
import Form, { FormItem, Input } from "../../components/Form";
import { ScrollView } from "./ScrollView";
import { useProject } from "utils/project";
import { useDebounce } from "utils";

function Item({ item }) {
  return (
    <div className="goods_item">
      <img src={item.giftImage} className="item_image" />
      <div className="item_content">
        <div className="goods_name">{item.giftName}</div>
        <div className="hold_price" />
        <div className="new_price">
          <div className="new_price">
            <div className="one view">¥ {item.price}</div>
          </div>
        </div>
        <img className="go_share  go_text" />
      </div>
    </div>
  );
}

export const Scroll = () => {
  const debouncedParam = useDebounce();
  const { list, isLoading } = useProject(debouncedParam);

  const getData = () => {

  };

  return <ScrollView data={list} component={Item}></ScrollView>;
};

Scroll.whyDidYouRender = true;

// Class Test extends React.Component<any,any>{
//   static whyDidYourender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`;
