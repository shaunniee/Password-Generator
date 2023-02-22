import React, { useState, useEffect } from "react";
import styles from "./password.module.scss";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import back from "../../assets/password.41b50a01b4d0a0f2c9ba.gif"
import PasswordStrength from "./PasswordStrength";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "../../helpers/helper";
function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [conditions, setConditions] = useState({
    isUpper: false,
    isLower: false,
    isSpecial: false,
    isNumber: false,
    len: 6,
  });
  const handleChange = (e) => {
    setConditions((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };
  const handleLenChange = (e) => {
    setConditions((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  const generatePassword = () => {
    if (
      !conditions.isSpecial &
      !conditions.isNumber &
      !conditions.isUpper &
      !conditions.isLower
    ) {
      toast.error("Select atleats one attribute");
    }
    let character = "";
    if (conditions.isUpper) {
      character += upperCaseLetters;
    }
    if (conditions.isLower) {
      character += lowerCaseLetters;
    }
    if (conditions.isNumber) {
      character += numbers;
    }
    if (conditions.isSpecial) {
      character += specialCharacters;
    }
  
    let password = "";
    const charLen = character.length;
    for (let i = 0; i < conditions.len; i++) {
      const characterIndex = Math.round(Math.random() * charLen);
      password = password + character.charAt(characterIndex);
    }
    setPassword(password);
  };
  return (
    <div className={styles.container}>
        <div className={styles.container__head}>
            <img src={back} alt="logo" />
            <h3>Password Generator</h3>
        </div>
      <div className={styles.password}>
        <span>{password}</span>
        <span style={{ cursor: "pointer" }} onClick={copyToClipboard}>
          <MdOutlineContentCopy />
        </span>{" "}
      </div>
    {password && <PasswordStrength password={password}/>}
      <div className={styles.checkbox}>
        <div className={styles.input}>
          <input
            onChange={handleChange}
            type="checkbox"
            id="isUpper"
            name="isUpper"
            defaultChecked={conditions.isUpper}
          />

          <label for="vehicle1"> Include Upper Case</label>
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="isLower"
            name="isLower"
            defaultChecked={conditions.isLower}
            onChange={handleChange}
          />
          <label for="vehicle1"> Include Lower Case</label>
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="isNumber"
            name="isNumber"
            defaultChecked={conditions.isNumber}
            onChange={handleChange}
          />
          <label for="vehicle3"> Include Numbers</label>
        </div>
        <div className={styles.input}>
          <input
            type="checkbox"
            id="isSpecial"
            name="isSpecial"
            defaultChecked={conditions.isSpecial}
            onChange={handleChange}
          />
          <label for="vehicle3"> Include Special Characters</label>
        </div>
      </div>
      <p className={styles.len}>
        Select the length of password: {conditions.len}
      </p>
      <input
        onChange={handleLenChange}
        type="range"
        min="6"
        max="30"
        value={conditions.len}
        name="len"
        id="len"
      ></input>
      <button className={styles.generate} onClick={generatePassword}>
        Generate password
      </button>
    </div>
  );
}

export default PasswordGenerator;
