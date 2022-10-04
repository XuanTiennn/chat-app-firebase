import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import ChatContent from "./chatContent/chatContent";
import SideBar from "./sideBar/index";
import styled from "styled-components";
import authContext from "../context/authContext";

Chat.propTypes = {};
const WrapperStyle = styled.div``;
function Chat(props) {
  const auth = useContext(authContext);
  console.log(auth);
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
