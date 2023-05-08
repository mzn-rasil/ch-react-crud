import { Box, Button, List } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import SidebarListItem from './SidebarListItem';

const sidebarItems = [
  { name: 'Users', path: '/users' },
  { name: 'Add new user', path: '/newUser' },
];

const Sidebar: React.FC = () => {
  const { handleLogout } = useAuth();

  return (
    <List
      color='gray.100'
      fontWeight='semibold'
      fontSize='1.4rem'
      fontFamily='mono'
      pos='sticky'
      top={8}
      left={0}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      height='full'
    >
      <Box
        as='section'
        height='full'
        py={8}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box>
          {sidebarItems.map((item) => (
            <SidebarListItem
              key={item.path}
              name={item.name}
              path={item.path}
            />
          ))}
        </Box>

        <Button
          bg='white'
          color='purple.400'
          _hover={{
            bg: 'purple.400',
            color: 'white',
            variant: 'outline',
            outline: '1px solid',
            outlineColor: 'white',
          }}
          mx={8}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </List>
  );
};
export default Sidebar;
