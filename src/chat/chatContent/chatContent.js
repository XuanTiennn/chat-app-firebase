import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { AppContext } from "./../../context/appContext";
import InputText from "./input";
import Message from "./message";
import RoomInfo from "./roomInfo";
import useFireStore from "./../../hooks/useFireStore";
import { Typography } from "antd";

ChatContent.propTypes = {};
const ChatContentStyle = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const messages = useFireStore("messages", messagesCondition);
  console.log(selectedRoom);
  return (
    <ChatContentStyle>
      {Object.keys(selectedRoom)?.length > 0 ? (
        <>
          {" "}
          <RoomInfo />
          <div>
            {messages?.map((x, index) => (
              <Message
                key={index}
                text={x.value}
                user={x}
                createAt={x.createAt?.seconds}
              />
            ))}
            <InputText />{" "}
          </div>
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
