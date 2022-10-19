import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/authContext";
import { useContext } from "react";
UserInfo.propTypes = {};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f2d52;
  padding: 10px;
`;
const Text = styled(Typography.Text)`
  color: white;
  margin-left: 5px;
`;
const ButtonStyle = styled(Button)`
  border-radius: 5px;
`;
function UserInfo(props) {
  const history = useNavigate();
  const user = useContext(AuthContext);
  return (
    <Wrapper>
      <div>
        <Avatar src={user.photoUrl} icon={<UserOutlined />} size={"large"} />
        <Text className="user_name">{user.displayName}</Text>
      </div>
      <ButtonStyle
        ghost
        onClick={() => {
          auth.signOut();
          history("/login");
          localStorage.removeItem("token");
        }}
      >
        Đăng xuất
      </ButtonStyle>
    </Wrapper>
  );
}
export default UserInfo;
