'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

export default function LoginCard({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex
          align={'center'}
          justify={'center'}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontFamily={'Inria Sans'} fontSize={'4xl'} textAlign={'center'} color={'#8C9E6C'}>Sign in to your account</Heading>
              <Text fontFamily={'Inria Sans'} fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
              to enjoy all of our cool exercises ✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" focusBorderColor='#8C9E6C'/>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input type="password" focusBorderColor='#8C9E6C'/>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox colorScheme='green'>Remember me</Checkbox>
                    <Text color={'#8C9E6C'}>Forgot password?</Text>
                  </Stack>
                  <Button
                    bg={'#8C9E6C'}
                    color={'white'}
                    _hover={{
                      bg: '#E9EC4D',
                    }}>
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </ModalContent>
    </Modal>
  )
}