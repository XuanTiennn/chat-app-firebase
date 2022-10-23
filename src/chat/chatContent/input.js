import { FileImageOutlined } from "@ant-design/icons";
import { Button, Input, Upload } from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { storage } from "../../firebase/config";
import { AppContext } from "./../../context/appContext";
import { AuthContext } from "./../../context/authContext";
import { addDocument } from "./../../firebase/service";
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
  const [imgs, setImgs] = useState([]);
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
  const uploadFile = (e) => {
    console.log(e);
    const storageRef = ref(storage, `files/${e.file.name}`);
    const metadata = {
      contentType: e.file.type,
    };
    const uploadTask = uploadBytesResumable(storageRef, e.file, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          setImgs([...imgs, downloadURL]);
        });
      }
    );
  };
  return (
    <FormStyle>
      <img src={[imgs[0]]} />
      <InputStyle
        suffix={
          <Upload onChange={(e) => uploadFile(e)}>
            <FileImageOutlined style={{ cursor: "pointer" }} />
          </Upload>
        }
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
