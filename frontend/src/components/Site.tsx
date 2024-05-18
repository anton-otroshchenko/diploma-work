import {VStack} from "@chakra-ui/react";
import Header from "./Header.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/hooks.ts";
import {useEffect} from "react";
import {getSectionsBySiteId} from "../actions/sections.ts";
import {Main} from "./Main.tsx";
import {About} from "./About.tsx";
import Service from "./Service.tsx";

const Site = () => {
    const { siteId } = useParams() as { siteId: string };
    const dispatch = useAppDispatch();
    const sections = useAppSelector((state) => state.sections.sections);

    console.log(sections);

    useEffect(()=>{
        void dispatch(getSectionsBySiteId(siteId));
    },[]);

    const renderSections = ():(JSX.Element | undefined)[]  => {
        return sections.map((section) => {
            switch (section.type){
                case 'header': {
                    return <Header logo={section.content.logo} phone={section.content.phone} />
                }
                case 'main': {
                    return <Main title={section.content.title} description={section.content.description} />
                }
                case 'about': {
                    return <About title={section.content.title} description={section.content.description} />
                }
                case 'service': {
                    return <Service title={section.content.title} cards={section.content.cards} />
                }
            }
        })
    }

    return (
        <VStack>
            {renderSections()}
        </VStack>
    );
};

export { Site };