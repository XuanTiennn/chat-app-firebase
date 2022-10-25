import { CloseCircleOutlined, FileImageOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { storage } from "../../firebase/config";
import { AppContext } from "./../../context/appContext";
import { AuthContext } from "./../../context/authContext";
import { addDocument } from "./../../firebase/service";
const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonStyle = styled(Button)`
  background-color: #6a7cc5;
`;
const InputStyle = styled(Input)`
  padding: 5px;
  display: flex;
`;
const IconXStyle = styled(CloseCircleOutlined)`
  position: absolute;
  top:${(props) => (props.file ? props.fileTop : props.imgTop)}; 
  right: -4px;
  color: white;
  background-color: black;
  border-radius: 100%;
`;
const fileStyle = {
  padding: "5px",
  borderRadius: "5px",
  border: "1px solid",
  backgroundColor:'#d9d9d9'
};
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
      imgs:imgs
    });
    setMessage("");
    setImgs([])
  };

  const handleSubmit = (_file) => {
    const file = _file;
    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgs((prev) => [
            ...prev,
            { downloadURL, fileName: file.name, type: file.type },
          ]);
          console.log(downloadURL);
        });
      }
    );
  };
  const saveFile = (e) => {
    Promise.all(
      Object.values(e.target.files).map((file) => handleSubmit(file))
    ).then((res) => console.log(res));
  };
  const deleteImg = (file, idex) => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, `files/${file.fileName}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        // File deleted successfully
        setImgs(imgs.filter((i, index) => index !== idex));
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
  return (
    <>
      <FormStyle>
        {imgs?.length > 0 && (
          <div
            style={{
              border: "1px solid",
              padding: "15px 5px",
              borderRadius: "5px",
              backgroundColor: "gray",
            }}
          >
            {imgs.map((img, index) => (
              <span style={{ position: "relative" }}>
                {img.type.includes("image") ? (
                  <>
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        margin: "0 5px",
                        borderRadius: "5px",
                      }}
                      src={img.downloadURL}
                    />
                    <IconXStyle imgTop={'-30px'} onClick={() => deleteImg(img, index)} />
                  </>
                ) : (
                  <>
                    <span style={fileStyle}> {img.fileName} </span>
                    <IconXStyle file={true} fileTop={'-12px'} onClick={() => deleteImg(img, index)} />
                  </>
                )}
              </span>
            ))}
          </div>
        )}

        <div>
          <InputStyle
            suffix={
              <>
                <input
                  style={{ display: "none" }}
                  id="file"
                  type={"file"}
                  multiple
                  onChange={(e) => saveFile(e)}
                />
                <label htmlFor="file">
                  <UploadOutlined style={{ cursor: "pointer" }} />
                </label>
                <ButtonStyle type="primary" onClick={addMessage}>
                  Gửi
                </ButtonStyle>
              </>
            }
            value={message}
            placeholder="Nhập nội dung"
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </FormStyle>
    </>
  );
}

export default InputText;
