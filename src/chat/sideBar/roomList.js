import { Button, Collapse, Input, Typography } from "antd";
import React, { useState, useContext, useMemo } from "react";
import styled from "styled-components";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import { addDocument } from "./../../firebase/service";
import CreateRoom from "./createRoom";
import { AuthContext } from "./../../context/authContext";
import useFireStore from "./../../hooks/useFireStore";
import { AppContext } from "./../../context/appContext";
import { collection, onSnapshot, query } from "firebase/firestore";
import { where } from "firebase/firestore";
import { db } from "../../firebase/config";

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
const ButtonStyle = styled(Button)`
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
`;
const InputStyle = styled(Input.Search)`
  width: 95%;
  margin-left: 5px;
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
  const [rooms] = useFireStore("rooms", condition);
  const createRoom = (name, description) => {
    const { accessToken, providerUserInfo, ...remain } = user;
    addDocument("rooms", { name, description, members: [user.userId] });
    setShow(false);
  };
  const findUser = (keyWord) => {
    const q = query(
      collection(db, "users"),
      where("keywords", "array-contains", keyWord?.toLowerCase())
    );
    const data = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data.filter(u=>u.userId !== user.userId));
    });
  };
  return (
    <WrapperStyle>
      <InputStyle
        placeholder={"Tìm người"}
        onChange={(e) => findUser(e.target.value)}
      />

      <ButtonStyle ghost onClick={() => setShow(true)}>
        Tạo phòng mới
      </ButtonStyle>
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
