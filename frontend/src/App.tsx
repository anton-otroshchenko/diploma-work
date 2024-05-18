import {
    Heading,
    HStack, VStack,
    Button, Box, Img, Text
} from '@chakra-ui/react';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/hooks.ts";
import {getSites} from "./actions/sites.ts";
import {CreateSiteModal} from "./components/CreateSiteModal.tsx";

import defaultImage from './assets/img/dark-background-b59iy2towqy5yrgb.jpg';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const sites = useAppSelector((state) => state.sites.sites);

    console.log(sites);

    useEffect(()=>{
        if(sites.length === 0) {
            void dispatch(getSites());
        }
    },[])

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOpen = () => {
        setIsOpen(true);
    }

  const sitesToDisplay = sites.length > 0 ? [...sites].reverse() : sites;

  return (
    <VStack>
      <HStack justifyContent='space-between' w='100%'>
          <Heading m={50} as='h1'>
            My sites
          </Heading>
          <Button mr={20} onClick={handleOpen}>Generate the website</Button>
      </HStack>
        <HStack gap='60px 30px' p={50} flexWrap='wrap' w='100%'>
            {
                sitesToDisplay.map((site) => (
                    <Box textAlign='center' background='#fff' borderRadius='20px' height='200px'>
                        <Img borderRadius='20px 20px 0 0' height='160px' width='100%' src={defaultImage}/>
                        <Text pt={2} color='#000'>{site.name}</Text>
                    </Box>
                ))
            }
        </HStack>
        <CreateSiteModal isOpen={isOpen} handleClose={handleClose}/>
    </VStack>
  )
}

export { App };
