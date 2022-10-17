import { Button, Input } from "antd";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { addDocument } from "./../../firebase/service";
import { AuthContext } from "./../../context/authContext";
import { AppContext } from "./../../context/appContext";
const FormStyle = styled.div`
  display: flex;
`;
function InputText(props) {
  const [message, setMessage] = useState("");
  const user = useContext(AuthContext);
  const app = useContext(AppContext);
  const [selectedRoom] = app.selectedRoom;
  const addMessage = () => {
    addDocument("messages", {
      value: message,
      userId: user.userId,
      roomId: selectedRoom.id,
      displayName: user.displayName,
      photoURL: user.displayName,
    });
    setMessage("");
  };

  return (
    <FormStyle>
      <Input
        value={message}
        placeholder="Nhập nội dung"
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="primary" onClick={addMessage}>
        Gửi
      </Button>
    </FormStyle>
  );
}

export default InputText;
