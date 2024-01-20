import { useContext } from 'react';
import { useRouter } from 'next/router';
import RecipeReviewCard from './custom'
import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  MenuItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
// import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
//All commented packages are deleted!!

// import BallotTwoToneIcon from '@mui/icons-material/BallotTwoTone';
// import BeachAccessTwoToneIcon from '@mui/icons-material/BeachAccessTwoTone';
// import EmojiEventsTwoToneIcon from '@mui/icons-material/EmojiEventsTwoTone';
// import FilterVintageTwoToneIcon from '@mui/icons-material/FilterVintageTwoTone';
// import HowToVoteTwoToneIcon from '@mui/icons-material/HowToVoteTwoTone';
// import LocalPharmacyTwoToneIcon from '@mui/icons-material/LocalPharmacyTwoTone';
// import RedeemTwoToneIcon from '@mui/icons-material/RedeemTwoTone';
// import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
// import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
// import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone';
// import ChromeReaderModeTwoToneIcon from '@mui/icons-material/ChromeReaderModeTwoTone';
// import WorkspacePremiumTwoToneIcon from '@mui/icons-material/WorkspacePremiumTwoTone';
// import CameraFrontTwoToneIcon from '@mui/icons-material/CameraFrontTwoTone';
import DisplaySettingsTwoToneIcon from '@mui/icons-material/DisplaySettingsTwoTone';
import GradeIcon from '@mui/icons-material/Grade';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
        
      }
    }
`
);

function SidebarMenu() {

  const active={
    // backgroundColor:"#44a574",
    border:"1px solid gray"
  }
  const theme = useTheme();
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <>
      <MenuWrapper>
     
      <RecipeReviewCard />
       <Divider
            sx={{
              
              background: theme.colors.alpha.trueWhite[10]
            }}
          />
      <ListItem  disablePadding>
        <Link href="/dashboards/tasks">
        <ListItemButton style={currentRoute=="/dashboards/tasks"? active:{}} >
              <ListItemIcon>
              <DashboardIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Dashboard" />
            </ListItemButton>
        </Link>
           
          </ListItem>
     
          <ListItem  disablePadding>
            <Link href="">
            <ListItemButton>
              <ListItemIcon>
              <GradeIcon /> 
              </ListItemIcon>
              <ListItemText  primary="Grade" />
            </ListItemButton>
            </Link>
         
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
              <InsertDriveFileIcon /> 
              </ListItemIcon>
              <ListItemText  primary="MarkList" />
            </ListItemButton>
          </ListItem>
      
      <Button></Button>

      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;


// //  <List component="div">
         
// <ListItem component="div">
// <Link
//   href="/"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button className={currentRoute === '/' ? 'active' : ''}>
//   Overview                  </Button>
// </Link>


// </ListItem>

// </List>
// <List
// component="div"
// >



//  <Link
//   href="/dashboards/tasks"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button className={currentRoute === '/dashboards/tasks' ? 'active' : ''}>
//   Dashboard                  </Button>
// </Link>


// </List>
// <List

// >
// <SubMenuWrapper>
// <List component="div">
// <ListItem component="div">
// {/* <NextLink href="/management/transactions" passHref>
//   <Button
//     className={
//       currentRoute === '/management/transactions'
//         ? 'active'
//         : ''
//     }
//     disableRipple
//     component="a"
//     onClick={closeSidebar}
//     startIcon={<TableChartTwoToneIcon />}
//   >
//      Users detail
//   </Button>
// </NextLink> */}
// </ListItem>
// <ListItem component="div">
// {/* <NextLink href="/management/schools" passHref>
//   <Button
    
//     disableRipple
//     component="a"
//     onClick={closeSidebar}
//     startIcon={<TableChartTwoToneIcon />}
//   >
//      schools detail
//   </Button>
// </NextLink> */}
//   <Link
//   href="/management/schools"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button
//     className={
//       currentRoute === '/management/schools' ? 'active' : ''
//     }
//   >
//    Schools
//   </Button>
// </Link>



// </ListItem>
// <ListItem component="div">
// <Link
//   href="/management/grades"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button
//     className={
//       currentRoute === '/management/grades' ? 'active' : ''
//     }
//   >
//     Class
//   </Button>
// </Link>

// {/* <MenuItem sx={{ px: 3 }} >
// <a  href="/management/grades"  style={{textDecoration:"none", color:"white"}}>Classes</a>
// </MenuItem> */}
// </ListItem>
// </List>
// </SubMenuWrapper>
// </List>
// <List
// component="div"
// subheader={
// <ListSubheader component="div" disableSticky>
// Accounts
// </ListSubheader>
// }
// >
// <SubMenuWrapper>
// <List component="div">
// <ListItem component="div">
// {/* <NextLink href="/management/profile" passHref>
//   <Button
//     className={
//       currentRoute === '/management/profile' ? 'active' : ''
//     }
//     disableRipple
//     component="a"
//     onClick={closeSidebar}
//     startIcon={<AccountCircleTwoToneIcon />}
//   >
//     User Profile
//   </Button>
// </NextLink> */}

//   <Link
//   href="/management/profile"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button
//     className={
//       currentRoute === '/management/profile' ? 'active' : ''
//     }
//   >
//    User Profile
//   </Button>
// </Link>
// </ListItem>
// <ListItem component="div">
// {/* <NextLink href="/management/profile/settings" passHref>
//   <Button
//     className={
//       currentRoute === '/management/profile/settings'
//         ? 'active'
//         : ''
//     }
//     disableRipple
//     component="a"
//     onClick={closeSidebar}
//     startIcon={<DisplaySettingsTwoToneIcon />}
//   >
//     Account Settings
//   </Button>

// </NextLink> */}

// <Link
//   href="/management/profile/settings"
//   style={{
//     textDecoration: 'none',
//     color: 'white',
//     width: '100%'
//   }}
// >
//   <Button
//     className={
//       currentRoute === '/management/profile/settings' ? 'active' : ''
//     }
//   >
//    Account Settings
//   </Button>
// </Link>
// </ListItem>
// </List>
// </SubMenuWrapper>
// </List>