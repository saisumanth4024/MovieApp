import * as React from 'react';
import Cookies from 'js-cookie';
import {Navigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { MicNone } from '@mui/icons-material';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  
  const logout = () => {
    Cookies.remove('jwt_token');
    <Navigate to="/login" />
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}> <img
              src="https://res.cloudinary.com/dc2b69ycq/image/upload/v1669785109/Movies%20App/Vector_Avatar1_hiwft7.png"
              alt="profile"
              className="avatar-image"
            /></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
      
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        
      >
      <>
        <MenuItem>
        <a href="/" className="home" style={{display:"flex",textDecoration:"none",color:'inherit', bgcolor:"red",justifyContent:"space-between"}}>
          <HomeOutlinedIcon style={{marginRight:"10px"}} /> Home
          </a>
        </MenuItem>
        <MenuItem >
        <a href="/popular" className="popular" style={{display:"flex",textDecoration:"none",color:'inherit', bgcolor:"red"}}>
          <WhatshotOutlinedIcon  style={{marginRight:"10px"}}/> Popular
          </a>
        </MenuItem>
        <MenuItem >
        <a href="/popular" className="mylist"  style={{display:"flex",textDecoration:"none",color:'inherit', bgcolor:"red"}}>
          <PlaylistPlayOutlinedIcon style={{marginRight:"10px"}}/> My List
          </a>
        </MenuItem>
        <MenuItem >
        <a href="/account" style={{display:"flex",textDecoration:"none",color:'inherit', bgcolor:"red"}}></a>
          <Avatar style={{marginRight:"10px"}}/> My Account
        </MenuItem>
        <MenuItem>
        <a href="/login"  onclick={logout} style={{display:"flex",textDecoration:"none",color:'inherit', backgroundColor:"transparent"}}>
         <button onClick={logout} style={{display:"flex",textDecoration:"none",color:'inherit',border:"none", backgroundColor:"transparent"}} >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
            Logout
          </button>
          </a>
        </MenuItem>  
        </>    
      </Menu>
    </React.Fragment>
  );
}