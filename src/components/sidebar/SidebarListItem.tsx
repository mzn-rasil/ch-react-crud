import { ListItem } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type SidebarListItemProps = {
  name: string;
  path: string;
};

const SidebarListItem: React.FC<SidebarListItemProps> = ({ name, path }) => {
  const { pathname } = useLocation();

  return (
    <NavLink to={path}>
      <ListItem
        _hover={{ cursor: 'pointer', color: 'gray.700' }}
        py={2}
        px={8}
        bg={pathname === path ? 'purple.50' : ''}
        color={pathname === path ? 'purple.400' : ''}
        borderRight={pathname === path ? '2px solid' : ''}
        borderColor={pathname === path ? 'purple.900' : ''}
      >
        {name}
      </ListItem>
    </NavLink>
  );
};
export default SidebarListItem;
