import "./styles.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const [inputfields, setInputFields] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: ""
  });
  const [formerrors, setErrors] = useState([]);
  const [isflag, setIsFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputFields({ ...inputfields, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(inputfields));
    setIsFlag(true);
  };

  useEffect(() => {
    if (Object.keys(formerrors).length === 0 && isflag) {
      console.log("InputFields");
    }
  }, [formerrors]);

  const validation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstname) {
      errors.firstname = "firstName Required";
    }
    if (!values.lastname) {
      errors.lastname = "LastName Required";
    }
    if (!values.email) {
      errors.email = "Email is Required";
    } else if (!regex.test(values.email)) {
      errors.email = "Email is Invalid";
    }

    if (!values.phone) {
      errors.phone = "Phone Number is Reuqired";
    } else if (values.phone.length < 9) {
      errors.phone = "Phone Number must contains 10 digits";
    }
    return errors;
  };
  return (
    <div className="App">
      <h1>Sign UP Form</h1>
      <form onSubmit={handleSubmit}>
        <label for="firstname">FirstName</label>
        <input
          type="text"
          name="firstname"
          value={inputfields.firstname}
          onChange={handleChange}
        />
        {formerrors.firstname}
        <br></br>
        <label for="lastname">LastName</label>
        <input
          type="text"
          name="lastname"
          value={inputfields.lastname}
          onChange={handleChange}
        />
        {formerrors.lastname}
        <br></br>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          value={inputfields.email}
          onChange={handleChange}
        />
        {formerrors.email}

        <br></br>
        <label for="number">Phone Number</label>
        <input
          type="number"
          name="phone"
          value={inputfields.phone}
          onChange={handleChange}
        />
        {formerrors.phone}
        <br></br>
        <br></br>
        <button type="submit"> Sign Up</button>
      </form>
      <br></br>
      <pre>{JSON.stringify(inputfields, undefined, 2)}</pre>
    </div>
  );
}
