import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Modal } from "antd";

CreateRoom.propTypes = {};

function CreateRoom({ show, setShow,createRoom }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <Modal
        title="Basic Modal"
        open={show}
        onOk={() => createRoom(name, description)}
        onCancel={() => setShow(false)}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
}

export default CreateRoom;
