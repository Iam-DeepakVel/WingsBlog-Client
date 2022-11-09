import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const AddBlog = () => {
  const classes = useStyles();
  const [inputs, setInputs] = React.useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    const res = await axios
      .post(`${process.env.REACT_APP_URL}/blog/add`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: window.localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ mt: 3 }}
          border={3}
          borderColor="radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,221,233,0.6279105392156863) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            POST YOUR BLOG
          </Typography>
          <InputLabel
            className={classes.font}
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            value={inputs.title}
            name="title"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            className={classes.font}
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            value={inputs.description}
            name="description"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <InputLabel
            className={classes.font}
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
          >
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            value={inputs.ImageURL}
            name="imageURL"
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            ADD BLOG
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
