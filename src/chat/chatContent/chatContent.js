import { Typography } from "antd";
import React, { useContext, useEffect, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "./../../context/appContext";
import useFireStore from "./../../hooks/useFireStore";
import { formatSecondsToDate } from "./../../util/formatDate";
import InputText from "./input";
import Message from "./message";
import RoomInfo from "./roomInfo";

ChatContent.propTypes = {};
const ChatContentStyle = styled.div`
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #dddcf7;
`;
const MessageStyle = styled.div`
  padding: 10px;
`;
function ChatContent(props) {
  const app = useContext(AppContext);
  const [selectedRoom] = app.selectedRoom;
  const messagesCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);
  let [messages] = useFireStore("messages", messagesCondition);

  return (
    <ChatContentStyle>
      {Object.keys(selectedRoom)?.length > 0 ? (
        <>
          {" "}
          <RoomInfo />
          <MessageStyle>
            {messages?.map((x, index) => (
              <Message
                key={index}
                text={x?.value}
                user={x}
                createAt={x?.createAt?.seconds}
              />
            ))}
          </MessageStyle>
          <InputText />{" "}
        </>
      ) : (
        <Typography.Paragraph type="center">
          Vui lòng chọn phong chat
        </Typography.Paragraph>
      )}
    </ChatContentStyle>
  );
}

export default ChatContent;
