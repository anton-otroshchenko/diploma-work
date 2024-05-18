import React from 'react';
import {Text, Heading, HStack, VStack} from "@chakra-ui/react";

type Props = {
    title: string;
    cards: {
        title: string;
        description: string;
    }[];
}

const Service: React.FC<Props> = ({
    title,
    cards
                                  }) => {
    return (
        <VStack w='100%' maxW='1280px'  m='40px 0' textAlign="center">
            <Heading p='20px 40px 40px' as='h1'>{title}</Heading>
            <HStack justifyContent='center' p='20px 40px 40px'>
                {cards.map((card) => (
                    <VStack>
                        <Text>{card.title}</Text>
                        <Text>{card.description}</Text>
                    </VStack>
                    ))}
            </HStack>
        </VStack>
    );
};

export default Service;