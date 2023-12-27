import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Classes/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from '@/components/Footer';

import AddClasses from '@/content/Management/Classes/AddClass';

function GradeRegistrationApplications() {
  return (
    <>
      <Head>
        <title>Class Register - Applications</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <AddClasses />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

GradeRegistrationApplications.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default GradeRegistrationApplications;
