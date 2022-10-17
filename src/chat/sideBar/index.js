import React from "react";
import PropTypes from "prop-types";
import UserInfo from "./userInfo";
import RoomList from "./roomList";
import styled from "styled-components";
import { Col, Row } from "antd";

SideBar.propTypes = {};
const StyleSibar = styled.div`
  background: #3e3c61;
  color: white;
  height: 100vh;
  padding: 15px 7px;
`;
function SideBar(props) {
  return (
    <StyleSibar>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </StyleSibar>
  );
}

export default SideBar;
