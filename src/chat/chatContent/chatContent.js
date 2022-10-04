import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Message from "./message";
import InputText from "./input";
import RoomInfo from "./roomInfo";

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
  return (
    <ChatContentStyle>
      <RoomInfo />
      <div>
        {[1, 2, 3, 4, 5, 65, 6, 7, 78, 8, 8, 3].map((x) => 
          <Message />
        )}
        <InputText />
      </div>
    </ChatContentStyle>
  );
}

export default ChatContent;
