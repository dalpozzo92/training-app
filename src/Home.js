// src/Home.js
/*
import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; // Importa l'autenticazione da firebase.js
import { signOut } from 'firebase/auth'; // Importa la funzione per il logout
import { useNavigate } from 'react-router-dom'; // Per il redirect

const Home = () => {
  const [user, setUser] = useState(null); // Stato per l'utente
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per il menu laterale
  const navigate = useNavigate(); // Hook per il redirect

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle del menu laterale
  };

  // Verifica se l'utente è autenticato
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Se l'utente è autenticato, salva i dettagli
      } else {
        navigate('/login'); // Se l'utente non è autenticato, redirigi alla pagina di login
      }
    });
    return unsubscribe; // Pulisce il listener quando il componente viene smontato
  }, [navigate]);

  // Funzione di logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Esegui il logout tramite Firebase
      console.log('Logout successful!');
      navigate('/login'); // Dopo il logout, redirigi alla pagina di login
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="home-container">
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleMenu}>
          &times;
        </button>
        <ul>
          <li>
            <p>"Home"</p>
          </li>
          <li>
          <p>"Programmi"</p>
          </li>
          <li>
          <p>"Diete"</p>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button> {}
          </li>
        </ul>
      </div>

      <div className="main-content">
        <button className="menu-btn" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <h1>Benvenuto nella Home</h1>
        {}
      </div>
    </div>
  );
};

export default Home;



import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const Home = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
        <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={{
        marginLeft: 0,  // Assicurati che non ci siano margini aggiuntivi
      }}
    >
      <MenuIcon />
    </IconButton>
          <Typography variant="h6" noWrap component="div">
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    ...(open ? { mr: 3 } : { mr: 'auto' }),
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  ...(open ? { justifyContent: 'initial' } : { justifyContent: 'center' }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    ...(open ? { mr: 3 } : { mr: 'auto' }),
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    ...(open ? { opacity: 1 } : { opacity: 0 }),
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography sx={{ marginBottom: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </Typography>
        <Typography sx={{ marginBottom: 2 }}>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam dignissim diam...
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
*/
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true); // Menu retratto di default
  const location = useLocation();
  const navigate = useNavigate();
  const siderRef = useRef(null);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    console.log('Logout effettuato');
    navigate('/');
  };

  const handleClickOutside = (event) => {
    if (siderRef.current && !siderRef.current.contains(event.target)) {
      setCollapsed(true);
    }
  };

  useEffect(() => {
    if (location.pathname === '/home') {
      setCollapsed(true); // Retrarre automaticamente sulla Home
    }
  }, [location]);

  useEffect(() => {
    if (!collapsed) {
      window.addEventListener('click', handleClickOutside);
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [collapsed]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider
            ref={siderRef}
            collapsed={collapsed}
            theme="dark"
            width={200}
          >        
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            margin: '16px 0',
            width: '100%',
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Workout
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Piano alimentare
          </Menu.Item>
          <Menu.Item key="4" icon={<ContainerOutlined />}>
            Dati personali
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<PoweroffOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <div style={{ padding: 24, minHeight: 360 }}>
          <h1>Benvenuto in BST Crew</h1>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
