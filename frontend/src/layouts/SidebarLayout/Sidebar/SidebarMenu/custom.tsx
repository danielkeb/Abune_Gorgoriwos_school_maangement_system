import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const active={
    // backgroundColor:"#44a574",
    border:"1px solid gray"
  }
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const currentRoute = router.pathname;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div  style={{backgroundColor:"transparent",  width:"100%" }}>
    
    {/* <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <InboxIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Home" />
            </ListItemButton>
          </ListItem> */}

      <CardActions disableSpacing>
    
      <ListItem  disablePadding>
            <ListItemButton>
          
            <ListItemText  primary="Register" />
              <ListItemIcon>
              <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
              </ListItemIcon>
              
            </ListItemButton>
          </ListItem>
     
    
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        
         
   
      <ListItem  disablePadding>
        <Link href="/components/students">
        <ListItemButton  style={currentRoute=="/components/students"? active:{}}>
              <ListItemIcon>
              <SchoolIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Student" />
            </ListItemButton>
        </Link>
            
          </ListItem>
          <Link href="/components/teachers">
          <ListItemButton style={currentRoute=="/components/teachers"? active:{}}>
              <ListItemIcon>
              <PersonIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Teacher" />
            </ListItemButton>
          </Link>
          
            <Link href="/management/schools">
            <ListItemButton  style={currentRoute=="/management/schools"? active:{}}>
              <ListItemIcon>
              <AccountBalanceIcon /> 
              </ListItemIcon>
              <ListItemText  primary="School" />
            </ListItemButton>
            </Link>
            <Link href="/management/schools">
            <ListItemButton  style={currentRoute=="/management/schools"? active:{}}>
              <ListItemIcon>
              <AccountBalanceIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Class" />
            </ListItemButton>
            </Link>
            <Link href="/management/schools">
            <ListItemButton  style={currentRoute=="/management/schools"? active:{}}>
              <ListItemIcon>
              <PersonAddIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Admin" />
            </ListItemButton>
            </Link>
            
            
       
            
     
      </Collapse>
    </div>
  );
}