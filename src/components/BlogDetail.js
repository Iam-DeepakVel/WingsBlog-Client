import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useParams,useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [blog, setBlog] = React.useState();

  const [inputs, setInputs] = React.useState({
    title: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchBlogdetails = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_URL}/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendRequest = async () => {
    const res = axios
      .patch(`${process.env.REACT_APP_URL}/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then((data) => console.log(data)).then(()=> navigate('/blogs'))
  };

  React.useEffect(() => {
    fetchBlogdetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        imageURL: data.blog.image,
      });
    });
  }, [id]);

  return (
    <div>
      {inputs && (
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
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              POST YOUR BLOG
            </Typography>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
            >
              Title
            </InputLabel>
            <TextField
              value={inputs.title}
              name="title"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
            >
              Description
            </InputLabel>
            <TextField
              value={inputs.description}
              name="description"
              onChange={handleChange}
              margin="normal"
              variant="outlined"
            />
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontweight: "bold" }}
            >
              ImageURL
            </InputLabel>
            <TextField
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
              UPDATE BLOG
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
