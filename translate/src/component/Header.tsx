import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DarkModeSwitch from "./DarkModeSwitch";
import Cookies from 'js-cookie';
import SideBox from "./SideBox";
import Login from "./Login";

// Define styles for the links
const styles = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
  fontWeight: "bolder",
  fontSize: "1rem"
};

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [open2, setOpen2] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  // Fetch user from cookies and handle potential parsing errors
  let data: { username: string } | null = null;
  try {
    const userCookie = Cookies.get('user');
    data = userCookie ? JSON.parse(userCookie) : null;
    // console.log(user)
  } catch (error) {
    console.error("Failed to parse user from cookies", error);
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" sx={{ mr: "auto", textTransform: "uppercase" }}>
            Learningo
          </Typography>
          <Link style={styles} to={"/"}>HOME</Link>
          <Login open={open} setOpen={setOpen} />
          {
            data? (
              <Button sx={{ color: "white", fontWeight: "bolder", fontSize: "1rem" }} onClick={handleClickOpen2}>
                {/* {data? data.user.username:null}
                 */}
                 <img style={{height:"2rem",width:"3rem",borderRadius:"10rem"}}src={data.user.profile}/>
              </Button>
            ) : (
              <Button sx={{ color: 'white', fontWeight: "bolder", fontSize: "1rem" }} onClick={handleClickOpen}>
                Log In
              </Button>
            )
          }
          {/* <DarkModeSwitch /> */}
        </Toolbar>
      </AppBar>
      <SideBox
        open={open2}
        onClose={handleClose2}
      />
      {/* Uncomment if needed */}
      {/* <LoadingBar color='red' ref={ref as React.RefObject<LoadingBar>} /> */}
    </div>
  );
};

export default Header;
