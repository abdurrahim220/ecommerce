import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import GroupIcon from "@mui/icons-material/Group";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, Link, useLocation } from "react-router-dom";
import Summary from "../admin/Summary/Summary";
import { AuthContext } from "../../provider/AuthProvider";


import { useContext, useEffect, useState } from "react";
const drawerWidth = 240;

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  
  useEffect(() => {
    fetch("https://rahimstore.onrender.com/api/allUsers")
      .then((res) => res.json())
      .then((data) => setAllUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
  const loggedInUser = allUsers?.find((person) => person.email === user.email);


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const AdminItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" },
    { text: " Summary", icon: <DashboardIcon />, link: "/dashboard/summary" },
    {
      text: "Products",
      icon: <ProductionQuantityLimitsIcon />,
      link: "/dashboard/products",
    },
    { text: "Orders", icon: <ContentPasteIcon />, link: "/dashboard/orders" },
    { text: "Users", icon: <GroupIcon />, link: "/dashboard/users" },
  ];
const userItems=[
 { text: "Home", icon: <HomeIcon />, link: "/" },
 { text: "Orders", icon: <HomeIcon />, link: "/dashboard/usersOrderDetails" },
 { text: "Setting", icon: <HomeIcon />, link: "/setting" },
]
const drawer = (
  <div>
    <Toolbar />
    <Divider />
    <List>
      {(loggedInUser && loggedInUser.role === 'admin' ? AdminItems : userItems).map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            component={Link}
            to={item.link}
            style={{
              color: location.pathname === item.link ? 'blue' : 'inherit',
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </div>
);

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
