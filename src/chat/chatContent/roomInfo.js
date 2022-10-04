import React from "react";
import PropTypes from "prop-types";
import { Button, Typography, Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

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
  return (
    <RoomStyle>
      <Typography.Title>Teen phongf</Typography.Title>
      <Users>
        <Button style={{ marginRight: "5px" }}>Thêm thành viên</Button>
        <Avatar.Group maxCount={2}>
          {[1, 2, 3, 4, 5, 6, 6, 6, 66, 4, 64, 55, 3, 53, 5, 35, 35, 3, 3].map(
            (x) => (
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  src="https://joeschmoe.io/api/v1/random"
                  icon={<UserOutlined />}
                >
                  {" "}
                </Avatar>
              </Tooltip>
            )
          )}
        </Avatar.Group>
      </Users>
    </RoomStyle>
  );
}

export default RoomInfo;
