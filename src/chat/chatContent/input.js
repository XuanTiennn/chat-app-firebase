import { Button, Input } from "antd";
import React from "react";
import styled from "styled-components";
const FormStyle = styled.div`
  display: flex;
`;
function InputText(props) {
  return (
    <FormStyle>
      <Input placeHolder="Nhập nội dung" />
      <Button type="primary">Gửi</Button>
    </FormStyle>
  );
}

export default InputText;
