import { List } from '@chakra-ui/react';
import React from 'react';
import SidebarListItem from './SidebarListItem';

const sidebarItems = [
  { name: 'Users', path: '/users' },
  { name: 'Add new user', path: '/newUser' },
];

const Sidebar: React.FC = () => {
  return (
    <List
      color='gray.100'
      fontWeight='semibold'
      fontSize='1.4rem'
      mt={8}
      fontFamily='mono'
    >
      {sidebarItems.map((item) => (
        <SidebarListItem key={item.path} name={item.name} path={item.path} />
      ))}
    </List>
  );
};
export default Sidebar;
