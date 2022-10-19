import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
import React, { useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "./../../context/authContext";
Message.propTypes = {};
const MessageStyle = styled.div`
  padding: 5px;
  background-color: #879fff;
  width: 200px;
  margin-top: 5px;
  border-radius: 5px;
  color: #bebdd5;
  margin-bottom: 10px;
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
          flexDirection: "column",
          margin: "0 5px",
          alignItems:
            user?.userId === userLogin?.userId ? "flex-end" : "flex-start",
        }}
      >
        <div>
          <Avatar src={user?.photoURL} icon={<UserOutlined />} size={"small"} />
          <Typography.Text className="user_name">
            {user?.displayName}
          </Typography.Text>
          <Typography.Text style={{ marginLeft: "5px" }}>
            {formatDate(createAt)}
          </Typography.Text>
        </div>
        <MessageStyle>
          <span
            style={{ color: user?.userId === userLogin?.userId && "#E5F6FF" }}
          >
            {text}
          </span>
        </MessageStyle>
      </div>
    </div>
  );
}

export default Message;
