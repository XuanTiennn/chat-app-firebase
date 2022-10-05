import { Button, Collapse, Typography } from "antd";
import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";
import { addDocument } from "./../../firebase/service";
import CreateRoom from "./createRoom";
import { AuthContext } from "./../../context/authContext";
import useFireStore from "./../../hooks/useFireStore";
import { AppContext } from "./../../context/appContext";

RoomList.propTypes = {};
const { Panel } = Collapse;
const WrapperStyle = styled.div`
  margin-top: 15px;
  ant-collapse-header: {
    color: white;
    padding: 5px;
  }
`;

const StylePanel = styled(Panel)`
  .ant-collapse-content-box {
    padding: 0 20px;
    padding-top: 0;
    display: flex;
    flex-direction: column;
  }
`;
const Text = styled(Typography.Text)`
  color: white;
  cursor: pointer;
`;

function RoomList(props) {
  const [show, setShow] = useState(false);
  const user = useContext(AuthContext);
  const app = useContext(AppContext);
  const [selectedRoom, setSelectedRoom] = app.selectedRoom;
  const condition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: user.userId,
    };
  }, [user.userId]);
  const rooms = useFireStore("rooms", condition);
  const createRoom = (name, description) => {
    const { accessToken, providerUserInfo, ...remain } = user;
    addDocument("rooms", { name, description, members: [user.userId] });
    setShow(false);
  };
  return (
    <WrapperStyle>
      <Button ghost onClick={() => setShow(true)}>
        Tạo phòng mới
      </Button>
      <Collapse
        ghost
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            style={{ color: "white" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        className="site-collapse-custom-collapse"
      >
        <StylePanel
          header="Danh sách các phòng"
          className="site-collapse-custom-panel"
          style={{ color: "white" }}
          key={1}
        >
          {rooms?.map((room) => (
            <Text
              className="room_name"
              style={{ color: room.id === selectedRoom.id && "blue" }}
              onClick={() => setSelectedRoom(room)}
            >
              {room.name}
            </Text>
          ))}
        </StylePanel>
      </Collapse>
      <CreateRoom show={show} setShow={setShow} createRoom={createRoom} />
    </WrapperStyle>
  );
}

export default RoomList;
