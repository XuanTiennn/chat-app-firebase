import { CaretRightOutlined } from "@ant-design/icons";
import { Avatar, Button, Collapse, Select, Spin, Tag, Typography } from "antd";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import _ from "lodash";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { db } from "../../firebase/config";
import { AppContext } from "./../../context/appContext";
import { AuthContext } from "./../../context/authContext";
import { addDocument } from "./../../firebase/service";
import useFireStore from "./../../hooks/useFireStore";
import CreateRoom from "./createRoom";

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
const InputStyle = styled(Select)`
  width: 95%;
  margin-left: 5px;
`;
function RoomList(props) {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSearch, setUserSearch] = useState([]);
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
    console.log(keyWord);
    setLoading(true);
    setUserSearch([]);
    const q = query(
      collection(db, "users"),
      where("keywords", "array-contains", keyWord?.toLowerCase())
    );
    const data = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push({
          ...doc.data(),
          id: doc.id,
          label: doc.data().displayName,
          value: doc.data().email,
        });
      });
      const _data = data.filter((u) => u.userId !== user.userId);
      setLoading(false);
      setUserSearch(_.unionBy(_data, (u) => u.email));
    });
  };
  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          color: "black",
        }}
      >
        <Avatar
          size="small"
          src={
            userSearch?.find((u) => u.email === value)?.photoURL ||
            label?.charAt(0)?.toUpperCase()
          }
        ></Avatar>
        {` ${label}`}
      </Tag>
    );
  };
  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <WrapperStyle>
      <InputStyle
        tagRender={tagRender}
        labelInValue
        placeholder={"Tìm người"}
        onSearch={findUser}
        notFoundContent={loading ? <Spin size="small" /> : null}
        optionLabelProp="title"
        onChange={handleChange}
      >
        {userSearch?.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <div className="demo-option-label-item">
              <Avatar
                size="small"
                src={
                  opt.photoURL
                    ? opt.photoURL
                    : opt.label?.charAt(0)?.toUpperCase()
                }
              />

              {` ${opt.label}`}
            </div>
          </Select.Option>
        ))}
      </InputStyle>
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
