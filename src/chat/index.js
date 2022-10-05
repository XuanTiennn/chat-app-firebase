import { Col, Row } from "antd";
import React from "react";
import styled from "styled-components";
import ChatContent from "./chatContent/chatContent";
import SideBar from "./sideBar/index";

Chat.propTypes = {};
const WrapperStyle = styled.div``;
function Chat(props) {
  
  return (
    <WrapperStyle>
      <Row>
        <Col span={6}>
          <SideBar />
        </Col>
        <Col span={18}>
          <ChatContent />
        </Col>
      </Row>
    </WrapperStyle>
  );
}

export default Chat;
