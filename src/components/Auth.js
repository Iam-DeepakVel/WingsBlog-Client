import { TextField, Typography, Box, Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    //First we get response for the request
    const res = await axios
      .post(`${process.env.REACT_APP_URL}/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    //Then we get data from successful response
    const data = await res.data;
    window.localStorage.setItem("userId", data.user._id);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      sendRequest("signUp")
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignUp ? "Sign Up" : "Login"}
          </Typography>
          {isSignUp && (
            <TextField
              name="name"
              value={inputs.name}
              onChange={handleChange}
              placeholder="Name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            value={inputs.password}
            onChange={handleChange}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignUp(!isSignUp)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignUp ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
