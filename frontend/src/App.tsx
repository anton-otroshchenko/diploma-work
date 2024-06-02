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
import {getCurrent} from "./actions/users.ts";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const user = useAppSelector(user=>user.user.currentUser);

    const token = localStorage.getItem('token');

    if(!token){
        window.location.href = '/sign-up'
    }

    useEffect(() => {
        if(!user?.id){
            void dispatch(getCurrent());
        }
    }, [user]);

    const sites = useAppSelector((state) => state.sites.sites);

    useEffect(()=>{
        if(user?.id && sites.length === 0) {
            void dispatch(getSites(user?.id));
        }
    },[user, sites])

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
          <Button mr={20} onClick={()=>{
              localStorage.removeItem('token')
              window.location.href = '/sign-in'
          }}>Logout</Button>
      </HStack>
        <Button alignSelf='start' ml={12} onClick={handleOpen}>Generate the website</Button>
        <HStack gap='60px 30px' p={50} flexWrap='wrap' w='100%'>
            {
                sitesToDisplay.map((site) => (
                    <Box onClick={()=>window.location.href = `/${site.id}`} cursor='pointer' key={site.id} textAlign='center' background='#fff' borderRadius='20px' height='200px'>
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
