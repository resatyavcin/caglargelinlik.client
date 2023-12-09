import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [is2FAVerified, set2FAVerified] = useState(false);

  const setVerifiedStatus = (status) => {
    set2FAVerified(status);
  };

  return (
    <AuthContext.Provider value={{ is2FAVerified, setVerifiedStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useVerify = () => {
  return useContext(AuthContext);
};
