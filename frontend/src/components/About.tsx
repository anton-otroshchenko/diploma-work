import React from 'react';
import {Heading, HStack, Text, useMediaQuery} from "@chakra-ui/react";

type Props = {
    title: string;
    description: string;
}

const About: React.FC<Props> = ({
    title,
    description
                                }) => {

    const [isLargerThanHD] = useMediaQuery([
        '(min-width: 980px)',
    ])
    return (
        <HStack w='100%' borderTop='1px solid white' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
       <HStack flexDir={isLargerThanHD ? 'row' : 'column'} w='100%' maxW='1280px'  m='40px 0'>
           <Heading textAlign={isLargerThanHD ? 'start' : 'center'} m='40px' w={isLargerThanHD ? '50%' : '100%'} as='h2'>{title}</Heading>
           <Text p='40px' w={isLargerThanHD ? '50%' : '100%'}>{description}</Text>
       </HStack>
        </HStack>
    );
};

export { About };