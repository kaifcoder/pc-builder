import Router from "next/router";
import React, { useEffect } from "react";

const Profile = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
