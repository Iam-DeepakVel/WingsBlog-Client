import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";

const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteBlog = async () => {
    const res = await axios.delete(
      `${process.env.REACT_APP_URL}/blog/delete/${id}`
    );
    const data = await res.data;
    return data;
  };

  const handleDelete = (e) => {
    deleteBlog()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          paddding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "5px 5px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName[0]}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia component="img" height="194" image={imageURL} alt={title} />
        <CardContent>
          <hr />
          <br />
          <Typography  className={classes.font} variant="body2" color="text.secondary">
            <b>{userName} </b>
            {": "}
            {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
