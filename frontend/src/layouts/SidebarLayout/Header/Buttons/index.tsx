import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import Light from './Mode/light';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 2 }}>
      <HeaderSearch />
   
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
       <Light/>
      </Box>
      
      
   
    
    </Box>
  );
}

export default HeaderButtons;
