import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Form, Tooltip, Typography } from "antd";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/config";
import { AppContext } from "./../../context/appContext";
import InviteMember from "./inviteMember";

RoomInfo.propTypes = {};
const RoomStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #5f5b8f;
  padding: 5px;
  position: relative;
  width: 100%;
  z-index: 1000;
`;
const Users = styled.div`
  display: flex;
  align-items: center;
`;
const TitleStyle = styled(Typography.Title)`
  color: white !important;
`;
const TextStyle = styled(Typography.Text)`
  color: white !important;
`;
function RoomInfo(props) {
  const app = useContext(AppContext);
  const { selectedRoom, members } = app;
  const [show, setShow] = useState(false);
  const [form] = Form.useForm();
  const inviteMember = (value, setValue) => {
    // reset form value
    form.resetFields();
    setValue([]);
    // update members in current room
    const roomRef = db.collection("rooms").doc(selectedRoom.id);

    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });
  };
  return (
    <RoomStyle>
      <div>
        <TitleStyle>
          {selectedRoom[0].name || selectedRoom[0].toUserName}
        </TitleStyle>
        <TextStyle>{selectedRoom[0].description}</TextStyle>
      </div>
      {selectedRoom[0]?.type === "room" && (
        <div>
          <Users>
            <Button
              ghost
              onClick={() => setShow(true)}
              style={{ marginRight: "5px" }}
            >
              <UserAddOutlined />
            </Button>
            <Avatar.Group maxCount={2}>
              {members?.map((x, index) => (
                <Tooltip key={x.id} title={x.displayName} placement="top">
                  <Avatar
                    style={{
                      backgroundColor: "#87d068",
                    }}
                    src={x.photoURL}
                    icon={<UserOutlined />}
                  >
                    {" "}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </Users>
          <InviteMember
            form={form}
            show={show}
            setShow={setShow}
            inviteMember={inviteMember}
            selectedRoom={selectedRoom}
          />
        </div>
      )}
    </RoomStyle>
  );
}

export default RoomInfo;
