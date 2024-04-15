'use client'

import {
    Image,
} from '@chakra-ui/react';

export default function BannerPic(){
    return(
        <div style={{position: 'relative', height: '1500px', width: '1500px' }}>
        <Image
            alt={'First Image'}
            src={'https://via.placeholder.com/150'}
            borderRadius={'full'}
            position="relative"
            style={{
                position: 'absolute',
                left: '-200px',
                borderRadius: '50%',
                width: '800px',
                height: '800px',
            }}
        />
    </div>
    );
}