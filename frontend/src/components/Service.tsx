import React from 'react';
import {Text, Heading, HStack, VStack } from "@chakra-ui/react";

import { InfoIcon, SettingsIcon } from '@chakra-ui/icons'

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
    const filteredCards = cards.filter(card => card.title !== '');
    return (
        <HStack w='100%' borderTop='1px solid white' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
        <VStack w='100%' maxW='1280px'  m='40px 0' textAlign="center">
            <Heading p='20px 40px 40px' as='h1'>{title}</Heading>
            <HStack justifyContent='center' p='20px 40px 40px'>
                {filteredCards.map((card, index) => (
                    <VStack key={card.description}>
                        {index == 0 ?
                            <InfoIcon h={20} w={20} />
                            :
                            <SettingsIcon h={20} w={20}/>
                        }
                        <Text>{card.title}</Text>
                        <Text>{card.description}</Text>
                    </VStack>
                    ))}
            </HStack>
        </VStack>
        </HStack>
    );
};

export default Service;