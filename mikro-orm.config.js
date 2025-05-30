const allEntities = require("./server/entities");
const { defineConfig } = require("@mikro-orm/postgresql");

module.exports = defineConfig({
  entities: allEntities,
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "mypassword",
  dbName: "mydatabase",
});
