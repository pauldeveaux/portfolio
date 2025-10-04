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

export interface TagTag extends Struct.ComponentSchema {
  collectionName: 'components_tag_tags';
  info: {
    displayName: 'tag';
    icon: 'hashtag';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.tag': CardTag;
      'tag.tag': TagTag;
    }
  }
}
