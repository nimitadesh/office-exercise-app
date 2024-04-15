'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import LoginCard from '../log-in/LoginCard';

export default function SignupCard({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <Flex
          align={'center'}
          justify={'center'}
        >
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <ModalHeader fontFamily={'Inria Sans'} fontSize={'4xl'} textAlign={'center'} color={'#8C9E6C'}>
                  Sign up
                </ModalHeader>
                <Text fontFamily={'Inria Sans'} fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
                  to enjoy all of our cool exercises ✌️
                </Text>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={5} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'#8C9E6C'}
                    color={'white'}
                    _hover={{
                      bg: '#E9EC4D',
                    }}>
                    Sign up
                  </Button>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'grey'}
                    color={'white'}
                    _hover={{
                      bg: '#C7C8CC',
                      color: 'black'
                    }}
                    onClick={onClose}>
                    Close
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link color={'#8C9E6C'} onClick={onLoginOpen}>Login</Link>
                  </Text>
                  <LoginCard isOpen={isLoginOpen} onClose={onLoginClose} />
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </ModalContent>

    </Modal>

  )
}