"use strict";

const { EntitySchema } = require("@mikro-orm/core");
const { BaseEntity } = require("./BaseEntity");

class Post extends BaseEntity {
  constructor(title, author, content, tags, isPublished) {
    super();
    this.title = title;
    this.author = author;
    this.content = content;
    this.tags = tags;
    this.isPublished = isPublished;
  }
}

const schema = new EntitySchema({
  class: Post, // Required - points to class for instantiation
  extends: "BaseEntity",
  tableName: "posts", // Explicit PostgreSQL table name
  properties: {
    title: {
      type: "string",
      maxLength: 100, // PostgreSQL VARCHAR(100)
    },
    author: {
      type: "string",
      maxLength: 50,
    },
    content: {
      type: "text", // PostgreSQL TEXT type
    },
    isPublished: {
      type: "boolean",
      default: false, // Default value in DB
    },
    tags: {
      type: "string[]", // PostgreSQL TEXT[]
    },
  },
});

module.exports = {
  Post,
  entity: Post,
  schema,
  label: "postRepository",
};
