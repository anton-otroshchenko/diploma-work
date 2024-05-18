import React from 'react';
import {Text, HStack} from "@chakra-ui/react";

type Props = {
    logo: string;
    phone: string;
}

const Header: React.FC<Props> = ({
    logo,
    phone
                                 }) => {
    return (
        <HStack w='100%' maxW='1280px' alignItems='center' justifyContent='space-between'>
            <Text p='40px'>
                {logo}
            </Text>
            <Text p='40px'>
                {phone}
            </Text>
        </HStack>
    );
};

export default Header;