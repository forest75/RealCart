/* eslint-disable */
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthPlayer = (Component) => {
  return (props) => {
    const user = useSelector((state) => state.login.user);
    const queue = useSelector((state) => state.queue);
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.nickname !== queue.player1 && user.nickname !== queue.player2) {
      alert("게임에 참여하지 않은 유저입니다.");
      return <Navigate to="/spect" />;
    }
    return <Component {...props} />;
  };
};

export default AuthPlayer;
