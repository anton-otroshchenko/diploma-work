import { VStack } from "@chakra-ui/react";
import Header from "./Header.tsx";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import { useEffect } from "react";
import { getSectionsBySiteId } from "../actions/sections.ts";
import { Main } from "./Main.tsx";
import { About } from "./About.tsx";
import Service from "./Service.tsx";
import {Footer} from "./Footer.tsx";
import { ArrowLeftIcon } from '@chakra-ui/icons'

const Site = () => {
    const { siteId } = useParams() as { siteId: string };
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.sections.sections);

    useEffect(() => {
        void dispatch(getSectionsBySiteId(siteId));
    }, [siteId, dispatch]);

    const sectionOrder = ['header', 'main', 'about', 'service', 'footer'];

    const renderSections = () => {
        // Sort sections based on the desired order
        const orderedSections = sections.slice().sort((a, b) => {
            return sectionOrder.indexOf(a.type) - sectionOrder.indexOf(b.type);
        });

        return orderedSections.map((section) => {
            switch (section.type) {
                case 'header':
                    return <Header key={section.content.title} logo={section.content.logo} phone={section.content.phone} />;
                case 'main':
                    return <Main key={section.content.title} title={section.content.title} description={section.content.description} image={section.content.image} />;
                case 'about':
                    return <About key={section.content.title} title={section.content.title} description={section.content.description} />;
                case 'service':
                    return <Service key={section.content.title} title={section.content.title} cards={section.content.cards} />;
                case 'footer':
                    return <Footer key={section.content.title} logo={section.content.logo} phone={section.content.phone}
                                   email={section.content.email} address={section.content.address} description={section.content.description}  />;
                default:
                    return null;
            }
        });
    };

    return (
        <VStack key={siteId}>
            <ArrowLeftIcon cursor='pointer' position='fixed' top={30} left={20} onClick={()=>{window.location.href='/'}}/>
            {renderSections()}
        </VStack>
    );
};

export { Site };
