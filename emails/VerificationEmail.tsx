import React from 'react'

const VerificationEmail = ({ username, otp }) => {
  return <div>{`Hii, ${username}. <br/>
  Your Verification code: ${otp}`}</div>;
};

export default VerificationEmail