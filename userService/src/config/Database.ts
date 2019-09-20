import mongoose from 'mongoose';

const DATABASE_URL = getEnvVar('DATABASE_URL');
const DATABASE_NAME = getEnvVar('DATABASE_NAME');

// TODO: move to utils folder
function getSafeProperty<T>(obj: { [index: string]: T | undefined }, propName: string) {
  if (!(propName in obj) || obj[propName] === undefined) {
    throw new Error(`'${propName}' property is not set`);
  }
  return obj[propName] as T;
}

// TODO: move to utils folder
function getEnvVar(varName: string) {
  return getSafeProperty<string>(process.env, varName);
}

export function connectDb(config: {
    dbURL?:  string,
    dbName?: string
  } = {}) {
  const {
    dbURL  = DATABASE_URL,
    dbName = DATABASE_NAME
  } = config;
  console.log(`Connecting to ${dbName} database`)
  return mongoose.connect(dbURL + dbName, { useNewUrlParser: true });
}
