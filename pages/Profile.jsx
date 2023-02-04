import ProfileComponent from "@/components/Profile";
import Router from "next/router";
import React, { useEffect } from "react";

const Profile = ({ user }) => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <div className="m-12">
      <ProfileComponent user={user} />
    </div>
  );
};

export default Profile;
