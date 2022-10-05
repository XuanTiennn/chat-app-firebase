import { Button, Col, Row } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { addDocument, generateKeywords } from "./../firebase/service";
Login.propTypes = {};
const ggProvider = new GoogleAuthProvider();
function Login(props) {
  const history = useNavigate();
  const handleLogin = async (provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        addDocument("users", {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          keywords: generateKeywords(user.displayName?.toLowerCase()),
        });

        history("/chat");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
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
