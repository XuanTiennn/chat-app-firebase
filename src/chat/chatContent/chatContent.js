import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import styled from "styled-components";
import { AppContext } from "./../../context/appContext";
import InputText from "./input";
import Message from "./message";
import RoomInfo from "./roomInfo";
import useFireStore from "./../../hooks/useFireStore";
import { Typography } from "antd";
import { formatDate } from "./../../util/formatDate";

ChatContent.propTypes = {};
const ChatContentStyle = styled.div`
  height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
function ChatContent(props) {
  const app = useContext(AppContext);
  const [selectedRoom] = app.selectedRoom;
  const [messx, setMessx] = useState([]);
  const messagesCondition = useMemo(() => {
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    };
  }, [selectedRoom.id]);
  let messages = useFireStore("messages", messagesCondition);

  useEffect(() => {
    if (messages?.length > 0) {
      messages = messages.map((mes) => {
        console.log(mes);
        mes.createBy = formatDate(mes.createAt?.seconds);
      });
      messages = messages.sort((mes, mes1) => mes1.createBy - mes.createBy);
    }
  }, [messages]);
  console.log(messages);
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
