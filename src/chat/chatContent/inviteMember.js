import { Avatar, Form, Modal, Select, Spin } from "antd";
import React, { useState, useMemo, useEffect } from "react";
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
  return onSnapshot(q, (querySnapshot) => {
    return querySnapshot.docs
      .map((doc) => ({
        label: doc.data().displayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      }))
      .filter((opt) => !curMembers.includes(opt.value));
  });
  //   db
  //     .collection("users")
  //     .where("keywords", "array-contains", search?.toLowerCase())
  //     .orderBy("displayName")
  //     .limit(20)
  //     .get()
  //     .then((snapshot) => {
  //       return snapshot.docs
  //         .map((doc) => ({
  //           label: doc.data().displayName,
  //           value: doc.data().uid,
  //           photoURL: doc.data().photoURL,
  //         }))
  //         .filter((opt) => !curMembers.includes(opt.value));
  //     });
}
function InviteMember({ show, setShow, inviteMember, form, selectedRoom }) {
  const [value, setValue] = useState();
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
