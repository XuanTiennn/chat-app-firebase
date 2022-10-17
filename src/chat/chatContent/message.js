import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./../../context/authContext";
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
  const userLogin = useContext(AuthContext);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            user.userId === userLogin.userId ? "flex-end" : "flex-start",
        }}
      >
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
    </div>
  );
}

export default Message;
