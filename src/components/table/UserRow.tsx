import React, { useEffect, useState, useContext } from 'react';
import { IUser } from './UsersTable';
import {
  Button,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { remove } from '../../services/UserServices';
import { UsersContext } from '../context/usersContext';
import { toast } from 'react-toastify';

type UserRowProps = IUser & {
  users: IUser[];
};

const UserRow: React.FC<UserRowProps> = ({
  id,
  username,
  email,
  address,
  phone,
  hobbies,
  users,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { setUsers, editHandler: onEdit } = useContext(UsersContext);

  const onDelete = async (id: number) => {
    try {
      remove(id);
      const filteredData = users.filter((user: IUser) => user.id !== id);
      setUsers(filteredData);
      toast.success(`Deleted user with id: $${id}`, { autoClose: 1000 });
    } catch (error: any) {
      console.error('delete user error', error.message);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      onDelete(id);
    }
  }, [confirmDelete]);

  return (
    <>
      <Tr>
        <Td textAlign='center'>{id}</Td>
        <Td textAlign='center'>{username}</Td>
        <Td textAlign='center'>{email}</Td>
        <Td textAlign='center'>{address}</Td>
        <Td textAlign='center'>{phone}</Td>
        <Td textAlign='center'>
          {hobbies[0].value
            ? hobbies.map((hobby) => hobby.value).join(', ')
            : '---'}
        </Td>
        <Td textAlign='center'>
          <Button size='sm' variant='ghost' onClick={onOpen}>
            <Icon as={DeleteIcon} color='red.600' />
          </Button>
          |
          <Button size='sm' variant='ghost' onClick={() => onEdit(id)}>
            <Icon as={EditIcon} />
          </Button>
        </Td>
      </Tr>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody mt={8}>
            <Text fontWeight='semibold'>Delete user {username}?</Text>
          </ModalBody>

          <ModalFooter>
            <HStack spacing='4'>
              <Button
                px={6}
                colorScheme='purple'
                onClick={() => setConfirmDelete(true)}
              >
                Yes
              </Button>
              <Button
                px={6}
                colorScheme='purple'
                variant='outline'
                _hover={{ bg: 'purple.500', color: 'white' }}
                onClick={onClose}
              >
                No
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default UserRow;
