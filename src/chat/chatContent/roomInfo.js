import { UserOutlined } from "@ant-design/icons";
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
`;
const Users = styled.div`
  display: flex;
  align-items: center;
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
        <Typography.Title>{selectedRoom.name}</Typography.Title>
        <Typography.Text>{selectedRoom.description}</Typography.Text>
      </div>
      <Users>
        <Button onClick={() => setShow(true)} style={{ marginRight: "5px" }}>
          Thêm thành viên
        </Button>
        <Avatar.Group maxCount={2}>
          {members?.map((x, index) => (
            <Tooltip key={x.id} title="Ant User" placement="top">
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
    </RoomStyle>
  );
}

export default RoomInfo;
