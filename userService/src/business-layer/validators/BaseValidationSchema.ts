import { validate as validateSchema } from 'class-validator';
import { plainToClass }               from 'class-transformer';
import { ClassType }                  from 'class-transformer/ClassTransformer';

export default abstract class BaseValidationSchema {

	/**
	 * Transforms dato to instance of schema class
	 * and merge it with current constructing object.
	 * @param data object to validate
	 */	
	public constructor(data: object) {
		
		// Obtain class-constructor of current schema
		// (it can be only sub-classes of BaseValidationSchema)
		const SchemaClass = (
      <{ [Symbol.species]: ClassType<BaseValidationSchema> }><unknown>this.constructor
    )[Symbol.species];
		
		// Transform arbitary owbject to instance of this schema class 
		const schemaInstance = plainToClass(SchemaClass, data);
		
		// Merge current constructing instance of schema with transformed one
		Object.assign(this, schemaInstance);
	}

	protected static get [Symbol.species]() {
		return this;
	}

	public async validate() {
		const validationErrors = await validateSchema(this);
		if (validationErrors.length) {
			throw validationErrors;
		}
	}

}


