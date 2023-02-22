import React, { useState, useEffect } from "react";
import styles from "./password.module.scss"

function PasswordStrength({ password }) {
  const [strength, setStrength] = useState("");
  const [color, setColor] = useState("");
  const check = () => {
    const strengthChecks = {
      length: 0,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthChecks.length = password.length >= 8 ? true : false;
    strengthChecks.hasUpperCase = /[A-Z]+/.test(password);
    strengthChecks.hasLowerCase = /[a-z]+/.test(password);
    strengthChecks.hasDigit = /[0-9]+/.test(password);
    strengthChecks.hasSpecialChar = /[^A-Za-z0-9]+/.test(password);

    let list = Object.values(strengthChecks).filter((value) => value);
    setStrength(
      list.length === 5 ? "Strong" : list.length >= 2 ? "Medium" : "Weak"
    );
  };
  useEffect(() => {
    if (password) {
      check();
    }
    console.log(password);
  }, [password]);
  useEffect(() => {
    getActivecolor();
  }, [strength]);
  const getActivecolor = () => {
    setColor(
      strength === "Weak" ? "red" : strength === "Strong" ? "green" : "blue"
    );
  };

  return <div className={styles.check} >Password strength:<span className={styles.check_in} style={{ color: color }}>  {strength}</span> </div>;
}

export default PasswordStrength;
