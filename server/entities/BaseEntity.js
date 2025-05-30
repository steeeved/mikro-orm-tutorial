const { EntitySchema } = require("@mikro-orm/core");

class BaseEntity {
  // this is useful because it will make some properties re-usable across all entities
  constructor() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

const schema = new EntitySchema({
  name: "BaseEntity", // this is an abstract base entity
  abstract: true, // Critical for base entities
  properties: {
    id: {
      primary: true,
      type: "number",
      autoincrement: true, // PostgreSQL SERIAL/BIGSERIAL
    },
    createdAt: {
      type: "Date",
      defaultRaw: "now()", // PostgreSQL function
      nullable: true,
    },
    updatedAt: {
      type: "Date",
      onUpdate: () => new Date(), // Auto-update hook
      defaultRaw: "now()",
      nullable: true,
    },
  },
});

module.exports = {
  BaseEntity,
  entity: BaseEntity,
  schema,
  label: "BaseEntity",
};
