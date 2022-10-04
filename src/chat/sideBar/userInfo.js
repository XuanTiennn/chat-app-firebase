import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
UserInfo.propTypes = {};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled(Typography.Text)`
  color: white;
  margin-left: 5px;
`;
function UserInfo(props) {
  const history = useNavigate();
  return (
    <Wrapper>
      <div>
        <Avatar icon={<UserOutlined />} size={"large"} />
        <Text className="user_name">Taj Xuaan Tien</Text>
      </div>
      <Button
        ghost
        onClick={() => {
          auth.signOut();
          history("/login");
        }}
      >
        Đăng xuất
      </Button>
    </Wrapper>
  );
}
export default UserInfo;
