import joi, { ObjectSchema } from 'joi';

type Signe = `${'' | '+' | '-'}`;
type Exact = `:${string}`;
type SchemaFunction = `${Signe}number${'' | Exact}` | `${Signe}integer` |
  'bool' |
  'string' | 'email' | `max:${number}` | `min:${number}` |
  RegExp;

interface ValidatorSchema {
  [x: string]: SchemaFunction[];
}

// const s = joi.object({Schema})

export const Schema = joi.object({
  // k: joi.
});

class ValidatorUtil {
  private _schema: ObjectSchema;
  // private _schema: ValidatorSchema;

  constructor(schema: ValidatorSchema | ObjectSchema) {
    this._schema = this.resolveSchema(schema);
  }

  set schema(schema: ValidatorSchema | ObjectSchema) {
    this._schema = this.resolveSchema(schema);
  }

  resolveSchema(schema: ValidatorSchema | ObjectSchema): ObjectSchema {
    if (joi.isSchema(schema)) return schema;

    
  }
}
