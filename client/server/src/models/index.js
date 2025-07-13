import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url'; // ✅ import pathToFileURL
import sequelize from '../db.js';

const Sequelize = sequelize.constructor; // Get the constructor from the instance

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'));

for (const file of modelFiles) {
  const filePath = path.join(__dirname, file); // e.g. C:/...
  const fileUrl = pathToFileURL(filePath);     // ✅ convert to file:// URL
  const modelModule = await import(fileUrl.href); // ✅ safe for import()
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
