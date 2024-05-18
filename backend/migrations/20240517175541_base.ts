import { type Knex } from 'knex';

const SITES_TABLE_NAME = 'sites';
const SECTION_TABLE_NAME = 'sections';
const SITES_TO_SECTIONS_TABLE_NAME = 'sites_to_sections';

const SitesColumnName = {
    ID: 'id',
    NAME: 'name',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};

const SectionColumnName = {
    ID: 'id',
    TYPE: 'type',
    CONTENT: 'content',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};

const SitesToSectionsColumnName = {
    ID: 'id',
    SITE_ID: 'siteId',
    SECTION_ID: 'sectionId',
    CREATED_AT: 'createdAt',
    UPDATED_AT: 'updatedAt',
};

const ENUM_NAME = 'enum_sections_type';

const SECTION_TYPES = ['header', 'footer', 'main', 'about', 'feedback', 'service'];

function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable(SITES_TABLE_NAME, (table) => {
        table.increments(SitesColumnName.ID).primary();
        table.string(SitesColumnName.NAME).notNullable();
        table
            .dateTime(SitesColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(SitesColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now())})
        .createTable(SECTION_TABLE_NAME, (table) => {
                    table.increments(SectionColumnName.ID).primary();
                    table.enum(SectionColumnName.TYPE, SECTION_TYPES, {
                        useNative: true,
                        enumName: ENUM_NAME,
                    });
                    table.jsonb(SectionColumnName.CONTENT).notNullable();
                    table
                        .dateTime(SectionColumnName.CREATED_AT)
                        .notNullable()
                        .defaultTo(knex.fn.now());
                    table
                        .dateTime(SectionColumnName.UPDATED_AT)
                        .notNullable()
                        .defaultTo(knex.fn.now());
        })
        .createTable(SITES_TO_SECTIONS_TABLE_NAME, (table) => {
        table.increments(SitesToSectionsColumnName.ID).primary();
        table
            .integer(SitesToSectionsColumnName.SECTION_ID)
            .references(SitesToSectionsColumnName.ID)
            .inTable(SECTION_TABLE_NAME);
        table
            .integer(SitesToSectionsColumnName.SITE_ID)
            .references(SitesToSectionsColumnName.ID)
            .inTable(SITES_TABLE_NAME);
        table
            .dateTime(SitesToSectionsColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(SitesToSectionsColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(SITES_TABLE_NAME)
        .dropTableIfExists(SECTION_TABLE_NAME)
        .dropTableIfExists(SITES_TO_SECTIONS_TABLE_NAME)
}

export { down, up };