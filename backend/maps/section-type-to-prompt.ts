import {SectionType, ValueOf} from "../../shared/src";


const SectionTypeToPrompt: Record<
    ValueOf<typeof SectionType>,
    { EXAMPLE: string; REQUEST: string }
> = {
    [SectionType.HEADER]: {
        EXAMPLE: 'logo: Studio\nphone: (303)555-0105',
        REQUEST:
            'Generate text logo for header section, phone number for header section.',
    },
    [SectionType.MAIN]: {
        EXAMPLE:
            'title: We create your space better\ndescription: Our team creates comfortable spaces for our clients. We’ve been designing your everyday life and work through great ideas since 1999.\nimageDescription: Picture showcases a sleek and sophisticated black sofa in a modern interior room designed by an interior design company. The room exudes a sense of elegance and simplicity, with clean lines and minimalistic decor. The black sofa is the focal point of the room, inviting viewers to imagine themselves lounging on its plush cushions.',
        REQUEST:
            'Generate title for main section, description for main section, imageDescription for main section.',
    },
    [SectionType.ABOUT]: {
        EXAMPLE:
            'title: About Studio\ndescription: Interiart is an award-winning architecture and interior design practice based in NYC. We work internationally on projects of residential & commercial interior design that require a creative approach. Our talented and experienced designers leverage their knowledge and expertise to create unique and comfortable interiors for you. Our team knows that interior design can be stressful for the client and we do our best to make it as easy as possible. We listen to your needs, ideas, and inputs. And most importantly, we make it exciting and enjoyable for our clients.',
        REQUEST:
            'Generate title for about section, description with 5 sentences for about section.',
    },
    [SectionType.FOOTER]: {
        EXAMPLE:
            'logo: Studio\ndescription: We are one of the leading interior design and remodeling studios available for all of your residential and commercial interior design needs.\nemail: michelle.rivere@idstudio.com\nphone: (808) 555-0111\naddress: 3517 W. Gray St. Utica, Pennsylvania 57867',
        REQUEST:
            'Generate logo text for footer section, description for footer section, email for footer section, phone for footer section, address for footer section',
    },
    [SectionType.FEEDBACK]: {
        EXAMPLE:
            'name: Alex\nprofession: Merchandising Associate\nfeedback: This interior design company offers impressive designs that are both practical and imaginative. They have a reliable team and a strong portfolio that demonstrates their skill in creating beautiful spaces. Highly recommended.',
        REQUEST:
            'Generate name for feedback section, profession for feedback section, feedback for feedback section',
    },
    [SectionType.SERVICE]: {
        EXAMPLE:
            'title: Space Planning\ndescription: We create better interior experiences through our space planning services.',
        REQUEST:
            'Generate for service section, description with 15 words maximum for service section',
    },
} as const;

export { SectionTypeToPrompt };