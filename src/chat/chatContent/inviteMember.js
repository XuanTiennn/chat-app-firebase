import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useState, useMemo, useEffect, useContext } from "react";
import { db } from "../../firebase/config";
import _, { debounce } from "lodash";
import {
  where,
  limit,
  query,
  collection,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { AuthContext } from "./../../context/authContext";
InviteMember.propTypes = {};
function DebounceSelect({
  fetchOptions,
  debounceTimeout = 300,
  curMembers,
  ...props
}) {
  // Search: abcddassdfasdf

  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, curMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, curMembers]);

  useEffect(() => {
    return () => {
      // clear when unmount
      setOptions([]);
    };
  }, []);

  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}
async function fetchUserList(search, curMembers = []) {
  console.log(search);
  // const q = query(
  //   collection(db, "users"),
  //   where("keywords", "array-contains", search?.toLowerCase()),
  //   orderBy("displayName"),
  //   limit(20)
  // );
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase())
  );
  const data = [];
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      data.push({
        ...doc.data(),
        id: doc.id,
        label: doc.data().displayName,
        value: doc.data().email,
      });
    });
  });
  // const _data = data.filter((u) => u.userId !== user.userId);

  console.log(data);
  return _.unionBy(data, (u) => u.email);
}
function InviteMember({ show, setShow, inviteMember, form, selectedRoom }) {
  const [value, setValue] = useState();
  const user = useContext(AuthContext);

  return (
    <div>
      <Modal
        title="M???i th??m th??nh vi??n"
        open={show}
        onOk={() => inviteMember(value)}
        onCancel={() => setShow(false)}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="T??n c??c th??nh vi??n"
            value={value}
            placeholder="Nh???p t??n th??nh vi??n"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
}

export default InviteMember;
