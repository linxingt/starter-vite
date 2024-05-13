import React from "react";
import { AuthPage } from "@refinedev/mui";

export const LoginMui = () => {
  return (
    <AuthPage
      type="login"
      formProps={{
        defaultValues: {
          email: "demo@demo.com",
          password: "demodemo",
        },
      }}
    />
  );
};