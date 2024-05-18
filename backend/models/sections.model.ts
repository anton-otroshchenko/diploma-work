import { Model, type RelationMappings } from 'objection';

import { Sites } from './sites.model';
import { type SectionType, type ValueOf } from '../../shared/src';

class Sections extends Model {
    type!: ValueOf<typeof SectionType>;
    content!: unknown;
    createdAt!: string;
    updatedAt!: string;
    site!: Sites;

    static get tableName() {
        return 'sections';
    }

    public static override relationMappings = (): RelationMappings => ({
        site: {
            relation: Model.HasOneThroughRelation,
            modelClass: Sites,
            join: {
                from: 'sections.id',
                through: {
                    from: 'sites_to_sections.section_id',
                    to: 'sites_to_sections.site_id',
                },
                to: 'sites.id',
            },
        },
    });
}

export { Sections };