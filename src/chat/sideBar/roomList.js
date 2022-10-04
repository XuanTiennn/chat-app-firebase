import { Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { CaretRightOutlined } from "@ant-design/icons";

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
`;

function RoomList(props) {
  return (
    <WrapperStyle>
      <Typography.Text style={{ color: "white" }}>
        Danh sách các phòng
      </Typography.Text>
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
        <StylePanel className="site-collapse-custom-panel" key={1}>
          <Text className="room_name"> Phong 1</Text>
          <Text className="room_name"> Phong 2</Text>
          <Text className="room_name"> Phong 3</Text>
        </StylePanel>
      </Collapse>
    </WrapperStyle>
  );
}

export default RoomList;
