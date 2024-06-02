import {Model, type RelationMappings} from 'objection';
import {Sections} from "./sections.model";
class Sites extends Model {
    id!: string;
    name!: string;
    createdAt!: string;
    updatedAt!: string;
    sections!: Sections[];
    userId!: string;

    static get tableName() {
        return 'sites';
    }

    public static override relationMappings = (): RelationMappings => ({
        sections: {
            relation: Model.ManyToManyRelation,
            modelClass: Sections,
            join: {
                from: 'sites.id',
                through: {
                    from: 'sites_to_sections.site_id',
                    to: 'sites_to_sections.section_id',
                },
                to: 'sections.id',
            },
        },
    });
}
export { Sites };