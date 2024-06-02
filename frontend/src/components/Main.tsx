import React from 'react';
import {Heading, VStack, Text, Img, Box} from "@chakra-ui/react";

type Props = {
    title: string;
    description: string;
    image: string;
}

const Main: React.FC<Props> = ({
    title,
    description,
    image
                               }) => {
    return (
        <VStack w='100%' maxW='1280px'  m='40px 0' textAlign='center' display='flex' flexDirection='row'>
            <Box w='50%'>
                <Heading p='20px 40px 0 40px' as='h1' >{title}</Heading>
                <Text p='20px 40px 0 40px'>{description}</Text>
            </Box>
            <Img w='50%' src={image}/>
        </VStack>
    );
};

export { Main };