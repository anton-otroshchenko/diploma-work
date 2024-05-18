import {SitesRepository} from '../repositories/sites.repository';
import { SectionType, ValueOf } from "../../shared/src";
import {SectionTypeToPrompt} from "../maps/section-type-to-prompt";
import {PROMPT_HEADING} from "../constants/prompt-heading";
import { SectionService } from "./sections.service";

class SitesService {
    private sitesRepository: SitesRepository;
    private sectionService: SectionService;

    constructor(sitesRepository: SitesRepository, sectionService: SectionService) {
        this.sitesRepository = sitesRepository;
        this.sectionService = sectionService;
    }

    async getById(id: string){
        return this.sitesRepository.getById(id);
    }
    async getSites() {
        return this.sitesRepository.getSites();
    }

    async addSite(data:any){
        const site = await this.sitesRepository.addSite({
            name: data.name,
        });
        console.log(site);

        await Promise.all(
            Object.values(SectionType).map((type) =>
                this.sectionService.addSection({
                    siteId: site.id,
                    prompt: this.createPrompt(type, {
                        ...data,
                    }),
                    type,
                }),
            ),
        );

        return site;

    }

    private createPrompt(
        type: ValueOf<typeof SectionType>,
        siteInfo: any,
    ): string {
        const exampleSiteDescription = this.createSiteDescription({
            name: 'Studio',
            industry: 'interior design',
            tone: 'official',
            targetAudience: 'Young adult',
        });

        const siteDescription = this.createSiteDescription({
            ...siteInfo,
        });

        const { EXAMPLE, REQUEST } = SectionTypeToPrompt[type];

        const prompt = [
            PROMPT_HEADING,
            'Example:',
            exampleSiteDescription,
            REQUEST,
            EXAMPLE,
            siteDescription,
            REQUEST,
        ];

        return prompt.join('\n');
    }

    private createSiteDescription ({
                                         name,
                                         industry,
                                         toneOfVoice,
                                         targetAudience,
                                     }: any): string {
        return `Generate content for a website with name ${name}. It is a site for a ${industry} company. The target audience is ${targetAudience}. The tone and style should be ${toneOfVoice}.`;
    };

    async removeSite(id:string){
        return this.sitesRepository.removeSite(id);
    }
}

export { SitesService };
