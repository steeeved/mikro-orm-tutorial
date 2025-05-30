const { mikroORMConfig } = require("../mikro-orm.config");
const allEntities = require("./entities");

module.exports.initializeORM = async (MikroORM) => {
  const DI = {}; // DI - Dependency Injection 

  DI.orm = await MikroORM.init(mikroORMConfig);
  DI.em = DI.orm.em; // Entity manager

  for (const entityInstance of allEntities) {
    if (entityInstance.label === "BaseEntity") {
      continue;
    }
    DI[entityInstance.label] = await DI.orm.em.getRepository(
      entityInstance.entity
    );
  }
  
  return DI;
};
