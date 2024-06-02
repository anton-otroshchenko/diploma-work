import React from 'react';
import {Text, HStack} from "@chakra-ui/react";

type Props = {
    logo: string;
    phone: string;
    email: string;
    address: string;
    description: string;
}

const Footer: React.FC<Props> = ({
                                     logo,
                                     phone,
    email,
    description,
    address
                                 }) => {
    return (
        <HStack w='100%' borderTop='1px solid white' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <HStack w='100%' maxW='1280px' >
                <HStack w='50%' flexDirection='column' justifyContent='space-between'>
                    <Text p='20px'>
                        {logo}
                    </Text>
                    <Text p='40px'>
                        {description}
                    </Text>
                </HStack>
                <HStack w='50%' flexDirection='column'>
                    <Text p='10px'>
                        {email}
                    </Text>
                    <Text p='10px'>
                        {phone}
                    </Text>
                    <Text p='10px'>
                        {address}
                    </Text>
                </HStack>
            </HStack>
        </HStack>
    );
};

export { Footer };