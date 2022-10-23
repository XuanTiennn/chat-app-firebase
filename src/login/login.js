import { Button, Col, Row } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { addDocument, generateKeywords } from "./../firebase/service";
Login.propTypes = {};
const ggProvider = new GoogleAuthProvider();
function Login(props) {
  const history = useNavigate();
  const handleLogin = async (provider) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const isExist = [];
        const q = query(
          collection(db, "users"),
          where("uid", "==", result.user.uid)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          isExist.push(doc.data());
        });
        const user = result.user;
        if (isExist?.length === 0) {
          addDocument("users", {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
            keywords: generateKeywords(user.displayName?.toLowerCase()),
          });
        }

        history("/chat");
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <Row
        justify="center"
        style={{ height: "500px", border: "1px solid #eee" }}
      >
        <Col span={13}>
          <Button
            type="danger"
            style={{ width: "100%" }}
            onClick={() => handleLogin(ggProvider)}
          >
            Google
          </Button>
        </Col>
        <Col span={13}>
          <Button type="primary" style={{ width: "100%" }}>
            Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
