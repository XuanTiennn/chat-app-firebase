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
const WrapperStyle = styled.div`
  margin-top: 15px;
  ant-collapse-header: {
    color: white;
    padding: 5px;
  }
`;

const ButtonStyle = styled(Button)`
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 5px;
`;
const InputStyle = styled(Select)`
  width: 95%;
  margin-left: 5px;
  background-color: black;
`;
const StyleTag = styled(Button)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const StyleRoom = styled.div`
  padding: 5px;
  color: ${(props) => (props.active ? "green" : "white")};
  cursor: pointer;
`;
const StyleElement = styled.span`
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
    addDocument("rooms", {
      name,
      description,
      members: [user.userId],
      type: "room",
    });
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
  const handleConnect = (_user) => {
    addDocument("rooms", {
      fromUserName: user.displayName,
      toUserName: _user.displayName,
      fromUser: user.userId,
      toUser: _user.uid,
      type: "private",
      members: [_user.uid, user.userId],
      photoURLToUser: _user.photoURL,
    });
  };

  return (
    <WrapperStyle>
      <InputStyle
        tagRender={tagRender}
        showSearch
        labelInValue
        placeholder={"Tìm người"}
        onSearch={findUser}
        notFoundContent={loading ? <Spin size="small" /> : null}
        optionLabelProp="title"
      >
        {userSearch?.map((opt) => (
          <Select.Option key={opt.value} value={opt.value} title={opt.label}>
            <StyleTag>
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
              <Button
                ghost
                style={{ color: "black" }}
                onClick={() => handleConnect(opt)}
              >
                Nhắn tin
              </Button>
            </StyleTag>
          </Select.Option>
        ))}
      </InputStyle>
      <ButtonStyle ghost onClick={() => setShow(true)}>
        Tạo phòng mới
      </ButtonStyle>

      {rooms?.map((room) => (
        <StyleRoom
          className="room_name"
          active={room.id === selectedRoom.id}
          onClick={() => setSelectedRoom(room)}
        >
          <Avatar
            src={
              room?.photoURLToUser ||
              room?.toUserName?.charAt(0)?.toUpperCase() ||
              room?.name?.charAt(0)?.toUpperCase()
            }
          />
          <StyleElement>{room?.name || room?.toUserName}</StyleElement>
        </StyleRoom>
      ))}

      <CreateRoom show={show} setShow={setShow} createRoom={createRoom} />
    </WrapperStyle>
  );
}

export default RoomList;
