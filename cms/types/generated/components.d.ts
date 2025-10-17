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

export interface RagFetch extends Struct.ComponentSchema {
  collectionName: 'components_rag_fetches';
  info: {
    displayName: 'fetch';
  };
  attributes: {
    aggregate: Schema.Attribute.Boolean;
    category_name: Schema.Attribute.String;
    content_key: Schema.Attribute.Component<'rag.text', true>;
    links: Schema.Attribute.Component<'rag.text', true>;
    route: Schema.Attribute.String;
    title_key: Schema.Attribute.Component<'rag.text', true>;
  };
}

export interface RagText extends Struct.ComponentSchema {
  collectionName: 'components_rag_texts';
  info: {
    displayName: 'text';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.tag': CardTag;
      'rag.fetch': RagFetch;
      'rag.text': RagText;
    }
  }
}
