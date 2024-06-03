import {SectionsRepository} from '../repositories/sections.repository';
import {SectionType, ValueOf} from "../../shared/src";
import {OpenAI} from "./open-ai";
import { File } from './file.service';
import {FileRepository} from "../repositories/file.repository";
import {FileModel} from "../models/file.model";

const openAI = new OpenAI();
const fileRepository = new FileRepository(FileModel);
const file = new File({fileRepository})

class SectionService {
    private sectionsRepository: SectionsRepository;

    constructor(sectionsRepository: SectionsRepository) {
        this.sectionsRepository = sectionsRepository;
    }

    async getBySiteId(siteId: string){
        return await this.sectionsRepository.getSectionsBySiteId(siteId);
    }
    async getSection() {
        return this.sectionsRepository.getSection();
    }

    async addSection(data:any){

        // console.log(data);

        const content = await this.createSectionContent(data.prompt, data.type);

        let section;

        try{
            section = this.sectionsRepository.addSection({
                siteId: data.siteId,
                type: data.type,
                content
            });
        }
        catch(err){
            console.log(err);
        }

        console.log(section);

        return section;
    }

    private async createSectionContent<T extends ValueOf<typeof SectionType>>(
        prompt: string,
        type: T,
    ): Promise<any> {
        switch (type) {
            case SectionType.HEADER: {
                return await this.createHeaderContent(prompt);
            }
            case SectionType.MAIN: {
                return await this.createMainContent(prompt);
            }
            case SectionType.ABOUT: {
                return await this.createAboutContent(prompt);
            }
            case SectionType.FOOTER: {
                return await this.createFooterContent(prompt);
            }
            case SectionType.FEEDBACK: {
                return await this.createFeedbackContent(prompt);
            }
            case SectionType.SERVICE: {
                return await this.createServiceContent(prompt);
            }
            default: {
                throw new Error('Should not reach here');
            }
        }
    }

    private async createHeaderContent(
        prompt: string,
    ): Promise<any> {

        const content = await openAI.createCompletion(prompt);

        return {
            logo: content['logo'],
            phone: '+380000000000',
        };
    }

    private async createMainContent(prompt: string): Promise<unknown> {
        const content = await openAI.createCompletion(prompt);

        const image = await openAI.createImage(content['imageDescription']);

        const picture = await file.upload({file: image});

        return {
            title: content['title'] ?? '',
            description: content['description'] ?? '',
            image: picture.url ?? ''
        };
    }

    private async createFooterContent(
        prompt: string,
    ): Promise<unknown> {
        const content = await openAI.createCompletion(prompt);

        return {
            logo: content['logo'] ?? '',
            description: content['description'] ?? '',
            email: content['email'] ?? '',
            address: content['address'] ?? '',
            phone: content['phone'] ?? '',
            socials: [],
        };
    }

    private async createAboutContent(prompt: string): Promise<unknown> {
        const content = await openAI.createCompletion(prompt);

        return {
            title: content['title'] ?? '',
            description: content['description'] ?? '',
        };
    }

    private async createServiceContent(
        prompt: string,
    ): Promise<any> {
        const cardsContent = await Promise.all(
            Array.from({ length: 3 }, () =>
                openAI.createCompletion(prompt),
            ),
        );
        const cards = cardsContent.map((cardContent: any) => ({
            title: cardContent['title'] ?? '',
            description: cardContent['description'] ?? '',
        }));

        return {
            title: 'Our Services',
            cards,
        };
    }

    private async createFeedbackContent(
        prompt: string,
    ): Promise<any> {
        const cardsContent = await Promise.all(
            Array.from(
                { length: 4 },
                (_) => {
                    return openAI.createCompletion(prompt);
                },
            ),
        );

        const cards = cardsContent.map((cardContent: any) => ({
            name: cardContent['name'] ?? 'Alex',
            profession: cardContent['profession'] ?? 'Manager',
            feedback:
                cardContent['feedback'] ??
                'The company provides excellent customer service and delivers high-quality products. Their attention to detail and prompt response to inquiries make them a pleasure to work with. Highly recommended!',
        }));

        return {
            title: 'What people say',
            cards,
        };
    }

    async removeSection(id:string){
        return this.sectionsRepository.removeSection(id);
    }
}

export { SectionService };
