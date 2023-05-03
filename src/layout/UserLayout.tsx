import { Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../components/sidebar/Sidebar';

type UserLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <Grid gridTemplateColumns='300px 1fr'>
      <GridItem as='aside' minHeight='100vh' bg='purple.300'>
        <Sidebar />
      </GridItem>

      <GridItem as='main'>
        <Container
          marginTop={32}
          maxW='container.xl'
          justifyContent='center'
          centerContent
        >
          {children}
        </Container>
      </GridItem>
    </Grid>
  );
};
export default UserLayout;
