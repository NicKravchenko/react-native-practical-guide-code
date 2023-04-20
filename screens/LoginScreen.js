import React, { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";

import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function logingHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      setIsAuthenticating(false);
      console.log(error);
      Alert.alert("Error on login", "Please check your credentials");
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Loging in..." />;
  }
  return <AuthContent isLogin onAuthenticate={logingHandler} />;
}

export default LoginScreen;
