import type { Schema, Struct } from '@strapi/strapi';

export interface CardTag extends Struct.ComponentSchema {
  collectionName: 'components_card_tags';
  info: {
    displayName: 'Tag';
    icon: 'hashtag';
  };
  attributes: {
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.tag': CardTag;
    }
  }
}
