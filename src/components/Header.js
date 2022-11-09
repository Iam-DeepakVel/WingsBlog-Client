import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useStyles } from "./utils";

const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = React.useState("");
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,221,233,0.6279105392156863) 100%)",
      }}
    >
      <Toolbar>
        <Typography
          className={classes.font}
          sx={{ color: "black",marginLeft: 12}}
        
          variant="h4"
        >
          WingsBlogs
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs value={value} onChange={(e, val) => setValue(val)}>
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blogs"
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                sx={{ color: "black", marginRight: 12, borderRadius: 10 }}
              >
                Login/SignUp
              </Button>
            </>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              sx={{ color: "black", margin: 1, marginRight: 12,borderRadius: 10 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
