import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useState, useMemo, useEffect, useContext } from "react";
import { db } from "../../firebase/config";
import { debounce } from "lodash";
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
async function fetchUserList(search, curMembers) {
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search?.toLowerCase()),
    orderBy("displayName"),
    limit(20)
  );
  const data = [];
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      data.push({
        ...doc.data(),
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      });
    });
    data.filter((opt) => !curMembers.includes(opt.value));
  });

  return data;
}
function InviteMember({ show, setShow, inviteMember, form, selectedRoom }) {
  const [value, setValue] = useState();
  const user = useContext(AuthContext);
  return (
    <div>
      <Modal
        title="Mời thêm thành viên"
        open={show}
        onOk={() => inviteMember(value)}
        onCancel={() => setShow(false)}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            name="search-user"
            label="Tên các thành viên"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={() => fetchUserList(value, user.userId)}
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
