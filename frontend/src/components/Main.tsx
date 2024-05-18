import React from 'react';
import {Heading, VStack, Text} from "@chakra-ui/react";

type Props = {
    title: string;
    description: string;
}

const Main: React.FC<Props> = ({
    title,
    description
                               }) => {
    console.log('hehehe')
    return (
        <VStack w='100%' maxW='1280px'  m='40px 0' textAlign='center'>
            <Heading p='20px 40px 0 40px' as='h1' >{title}</Heading>
            <Text p='20px 40px 0 40px'>{description}</Text>
        </VStack>
    );
};

export { Main };