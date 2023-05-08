import { Container, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import SidebarDrawer from '../sidebar/SidebarDrawer';

type UserLayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <Grid gridTemplateColumns={{ base: '1fr 1fr', md: '300px 1fr' }}>
      <GridItem
        as='aside'
        height='100vh'
        bg='purple.300'
        display={{ base: 'none', md: 'block' }}
      >
        <Sidebar />
      </GridItem>

      <GridItem as='aside' display={{ base: 'block', md: 'none' }}>
        <SidebarDrawer />
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
