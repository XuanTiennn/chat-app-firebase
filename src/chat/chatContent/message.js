import { UserOutlined } from "@ant-design/icons";
import { Avatar, Typography } from "antd";
import { formatRelative } from "date-fns/esm";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./../../context/appContext";
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
const fileStyle = {
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid",
  backgroundColor: "#f0f0f0",
};
function formatDate(seconds) {
  let formattedDate = "";

  if (seconds) {
    formattedDate = formatRelative(new Date(seconds * 1000), new Date());

    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return formattedDate;
}
function Message({ text, createAt, user, file }) {
  const userLogin = useContext(AuthContext);
  const app = useContext(AppContext);
  const [selectedRoom] = app.selectedRoom;
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
          {selectedRoom.type !== "private" && (
            <>
              <Avatar
                src={user?.photoURL}
                icon={<UserOutlined />}
                size={"small"}
              />
              <Typography.Text className="user_name">
                {user?.displayName}
              </Typography.Text>
            </>
          )}
          <Typography.Text style={{ marginLeft: "5px" }}>
            {formatDate(createAt)}
          </Typography.Text>
        </div>
        {file?.map((i) =>
          i.type.includes("image") ? (
            <>
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "0 5px",
                  borderRadius: "5px",
                }}
                src={i.downloadURL}
              />
            </>
          ) : (
            <>
              <span style={fileStyle}>
                <a href={i.downloadURL}>{i.fileName}</a>{" "}
              </span>
            </>
          )
        )}

        {text?.length > 0 && (
          <MessageStyle>
            <span
              style={{ color: user?.userId === userLogin?.userId && "#E5F6FF" }}
            >
              {text}
            </span>
          </MessageStyle>
        )}
      </div>
    </div>
  );
}

export default Message;
