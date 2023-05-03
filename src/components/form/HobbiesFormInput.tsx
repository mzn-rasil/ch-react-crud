import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react';
import React from 'react';

interface IHobby {
  id: number;
  value: string;
}

type HobbiesFormInputProps = {
  hobby: IHobby;
  onAddHobby: (hobby: IHobby) => void;
  onRemoveHobby: (index: number) => void;
  index: number;
};

const HobbiesFormInput = React.forwardRef<
  HTMLInputElement,
  HobbiesFormInputProps
>(({ hobby, onAddHobby, onRemoveHobby, index, ...rest }, ref) => {
  return (
    <FormControl key={hobby.id}>
      <FormLabel>Hobby</FormLabel>
      <HStack>
        <Input
          type='text'
          placeholder='Enter hobby'
          _hover={{ borderColor: 'purple.500' }}
          ref={ref}
          {...rest}
        />
        <Button
          colorScheme='purple'
          variant='outline'
          _hover={{ bg: 'purple.500', color: 'white' }}
          onClick={() =>
            onAddHobby({
              id: index + 1 + 1,
              value: '',
            })
          }
        >
          +
        </Button>
        {index !== 0 && (
          <Button colorScheme='purple' onClick={() => onRemoveHobby(index)}>
            -
          </Button>
        )}
      </HStack>
    </FormControl>
  );
});
export default HobbiesFormInput;
