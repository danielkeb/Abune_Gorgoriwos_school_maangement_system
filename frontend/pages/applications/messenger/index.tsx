// import { useState } from 'react';

// import Head from 'next/head';
// import SidebarLayout from '@/layouts/SidebarLayout';

// import TopBarContent from '@/content/Applications/Messenger/TopBarContent';
// import BottomBarContent from '@/content/Applications/Messenger/BottomBarContent';
// import SidebarContent from '@/content/Applications/Messenger/SidebarContent';
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';

// import Scrollbar from '@/components/Scrollbar';

// import {
//   Box,
//   styled,
//   Divider,
//   Drawer,
//   IconButton,
//   useTheme
// } from '@mui/material';

// const RootWrapper = styled(Box)(
//   ({ theme }) => `
//        height: calc(100vh - ${theme.header.height});
//        display: flex;
// `
// );

// const Sidebar = styled(Box)(
//   ({ theme }) => `
//         width: 300px;
//         background: ${theme.colors.alpha.white[100]};
//         border-right: ${theme.colors.alpha.black[10]} solid 1px;
// `
// );

// const ChatWindow = styled(Box)(
//   () => `
//         width: 100%;
//         height: 100%;
//         display: flex;
//         flex-direction: column;
//         flex: 1;
// `
// );

// const ChatTopBar = styled(Box)(
//   ({ theme }) => `
//         background: ${theme.colors.alpha.white[100]};
//         border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
//         padding: ${theme.spacing(2)};
//         align-items: center;
// `
// );

// const IconButtonToggle = styled(IconButton)(
//   ({ theme }) => `
//   width: ${theme.spacing(4)};
//   height: ${theme.spacing(4)};
//   background: ${theme.colors.alpha.white[100]};
// `
// );

// const DrawerWrapperMobile = styled(Drawer)(
//   () => `
//     width: 340px;
//     flex-shrink: 0;

//   & > .MuiPaper-root {
//         width: 340px;
//         z-index: 3;
//   }
// `
// );

// function ApplicationsMessenger() {
//   const theme = useTheme();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <>
//       <Head>
//         <title>Messenger - Applications</title>
//       </Head>
//       <RootWrapper className="Mui-FixedWrapper">
//         <DrawerWrapperMobile
//           sx={{
//             display: { lg: 'none', xs: 'inline-block' }
//           }}
//           variant="temporary"
//           anchor={theme.direction === 'rtl' ? 'right' : 'left'}
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//         >
//           <Scrollbar>
//             <SidebarContent />
//           </Scrollbar>
//         </DrawerWrapperMobile>
//         <Sidebar
//           sx={{
//             display: { xs: 'none', lg: 'inline-block' }
//           }}
//         >
//           <Scrollbar>
//             <SidebarContent />
//           </Scrollbar>
//         </Sidebar>
//         <ChatWindow>
//           <ChatTopBar
//             sx={{
//               display: { xs: 'flex', lg: 'inline-block' }
//             }}
//           >
//             <IconButtonToggle
//               sx={{
//                 display: { lg: 'none', xs: 'flex' },
//                 mr: 2
//               }}
//               color="primary"
//               onClick={handleDrawerToggle}
//               size="small"
//             >
//               <MenuTwoToneIcon />
//             </IconButtonToggle>
//             <TopBarContent />
//           </ChatTopBar>
//           <Box flex={1}>
//             <Scrollbar>
             
//             </Scrollbar>
//           </Box>
//           <Divider />
//           <BottomBarContent />
//         </ChatWindow>
//       </RootWrapper>
//     </>
//   );
// }

// ApplicationsMessenger.getLayout = (page) => (
//   <SidebarLayout>Hello world</SidebarLayout>
// );

// export default ApplicationsMessenger;

import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  styled
} from '@mui/material';
import Head from 'next/head';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
`
);

const TopWrapper = styled(Box)(
  ({ theme }) => `
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing(6)};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  return (
    <>
      <Head>
        <title>Status - 404</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            <Box textAlign="center">
              <img alt="404" height={180} src="/static/images/status/404.svg" />
              <Typography variant="h2" sx={{ my: 2 }}>
                The page you were looking for doesn't exist.
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                It's on us, we moved the content to a different page. The search
                below should help!
              </Typography>
            </Box>
            <Container maxWidth="sm">
              <Card sx={{ textAlign: 'center', mt: 3, p: 4 }}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInputWrapper
                    type="text"
                    placeholder="Search terms here..."
                    endAdornment={
                      <InputAdornment position="end">
                        <ButtonSearch variant="contained" size="small">
                          Search
                        </ButtonSearch>
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchTwoToneIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Divider sx={{ my: 4 }}>OR</Divider>
                <Button href="/" variant="outlined">
                  Go to homepage
                </Button>
              </Card>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default Status404;

Status404.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
