import React from "react";
import PropTypes from "prop-types";
import { Avatar, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

Message.propTypes = {};
const MessageStyle = styled.div`
  padding: 5px;
  background-color: #eee;
  width: 200px;
  margin-top: 5px;
`;
function Message({ text, createAt, user }) {
  return (
    <div>
      <div>
        <Avatar icon={<UserOutlined />} size={"small"} />
        <Typography.Text className="user_name">Taj Xuaan Tien</Typography.Text>
      </div>
      <MessageStyle>
        <span>123</span>
      </MessageStyle>
    </div>
  );
}

export default Message;
