import React from "react";
import PropTypes from "prop-types";
import { Avatar, Input, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useFireStore from "./../../hooks/useFireStore";
import { formatRelative } from "date-fns/esm";
Message.propTypes = {};
const MessageStyle = styled.div`
  padding: 5px;
  background-color: #eee;
  width: 200px;
  margin-top: 5px;
`;
function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}
function Message({ text, createAt, user }) {
  return (
    <div>
      <div>
        <Avatar icon={<UserOutlined />} size={"small"} />
        <Typography.Text className="user_name">
          {user.displayName}
        </Typography.Text>
        <Typography.Text>{formatDate(createAt)}</Typography.Text>
      </div>
      <MessageStyle>
        <span>{text}</span>
      </MessageStyle>
    </div>
  );
}

export default Message;
