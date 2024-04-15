'use client'
import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Text,
    Stack,
} from '@chakra-ui/react'

export default function BannerText() {
    return (
        <Box>
            <Box h={'240px'} paddingLeft={'700px'} paddingTop={'30px'} backgroundColor={'#D9D9D9'}>
                <Stack spacing={2} as={Container} maxW={'3xl'} textAlign={'left'}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" fill="#E9EC4D" />
                        </svg>
                        <Heading fontSize={'3xl'} color={'#E9EC4D'}>New!</Heading></div>
                    <Text color={'#8C9E6C'} fontFamily={'Inria Sans'} fontStyle={'Italic'} fontWeight={'bold'} fontSize={'24px'}>
                        Follow Our Personalized Videos, Experience the joy of <br />
                        movement with our holistic approach <br />
                        to exercise and posture correction.<br />
                    </Text>
                </Stack>
            </Box>

            <Container h={'300px'} maxW={'full'} paddingTop={'30px'} paddingLeft={'700px'} backgroundColor={'#8C9E6C'}>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    {stats.map((stat) => (
                        <Box key={stat.title}>
                
                            <Text fontFamily={'Inria Sans'} fontSize={'24'} fontWeight={'bold'}color={'#D9D9D9'} mb={3}>
                                {stat.title}
                            </Text>
                            <Text fontFamily={'Inria Sans'} fontSize={'18'} color={'#D9D9D9'} mb={3}>
                                {stat.content}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    )
}

const stats = [
    {
        title: 'Pain Reduction',
        content: (
            <>
                Many people suffer from chronic pain due to poor posture, which can be significantly alleviated through targeted exercises designed to strengthen the muscles that support proper alignment.
            </>
        ),
    },
    {
        title: 'Enhanced Mobility and Flexibility',
        content: (
            <>
                Correcting posture can lead to improved mobility and flexibility, allowing individuals to move more freely and with less discomfort.
            </>
        ),
    }
]