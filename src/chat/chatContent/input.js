import { Button, Input } from "antd";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import { addDocument } from "./../../firebase/service";
import { AuthContext } from "./../../context/authContext";
import { AppContext } from "./../../context/appContext";
const FormStyle = styled.div`
  display: flex;
`;
const ButtonStyle = styled(Button)`
  background-color: #6a7cc5;
`;
const InputStyle = styled(Input)`
  padding: 5px;
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
      photoURL: user.photoUrl,
    });
    setMessage("");
  };

  return (
    <FormStyle>
      <InputStyle
        value={message}
        placeholder="Nhập nội dung"
        onChange={(e) => setMessage(e.target.value)}
      />
      <ButtonStyle type="primary" onClick={addMessage}>
        Gửi
      </ButtonStyle>
    </FormStyle>
  );
}

export default InputText;
