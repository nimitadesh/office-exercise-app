'use client'

import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import SignupCard from '../../sign-up/SignupCard';

const src_bg = 'https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

export default function HeroSection() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <div>
            <Stack w={'full'} h={'1117px'} backgroundImage={src_bg} backgroundSize={'cover'} backgroundPosition={'center center'} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex>
                    <Stack spacing={6} >
                        <Box maxW="full" h="310px" />
                        <div style={{ paddingLeft: '90px' }}>
                            <Heading style={{ color: 'white' }} fontFamily={'Inria Sans'} fontStyle={'Italic'} fontSize={'50px'}>
                                <h1 >
                                    Stand Upright</h1>
                                <h1 >Live Pain-Free</h1>
                                <h1 >Your Journey Begins Here</h1>
                                {' '}
                            </Heading>
                            <Box maxW="full" h="25px" />
                            <Text fontFamily={'Inria Sans'} fontStyle={'Italic'} fontWeight={'Bold'} fontSize={'28px'} color={'white'}>
                                Discover daily exercises designed <br />
                                to correct your posture, relieve pain, <br />
                                and elevate your wellbeing.<br />
                            </Text>
                            <Box maxW="full" h="25px" />
                            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                                <div>
                                    <Button
                                        w={'250px'}
                                        h={'50px'}
                                        rounded={'10'}
                                        bg={'#E9EC4D'}
                                        color={'#57663D'}
                                        _hover={{
                                            bg: 'white',
                                        }}
                                        fontFamily={'Inria Sans'} 
                                        fontSize={'28px'} 
                                        onClick={onOpen}>
                                        Sign-up Free
                                    </Button>
                                    <SignupCard isOpen={isOpen} onClose={onClose} />
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </Flex>
                <div style={{ position: 'relative', height: '500px', width: '500px' }}>
                    <Image
                        alt={'First Image'}
                        src={'https://via.placeholder.com/150'}
                        borderRadius={'full'}
                        position="relative"
                        style={{
                            position: 'absolute',
                            top: '450px',
                            left: '300px',
                            borderRadius: '50%',
                            width: '300px',
                            height: '300px',
                        }}
                    />
                    <Image
                        alt={'Second Image'}
                        src={'https://via.placeholder.com/150'}
                        borderRadius={'full'}
                        position="relative"
                        style={{
                            position: 'absolute',
                            top: '290px',
                            left: '450px',
                            width: '300px',
                            height: '450px',
                        }}
                        zIndex='1'
                    />
                </div>
            </Stack>
        </div>
    )
}