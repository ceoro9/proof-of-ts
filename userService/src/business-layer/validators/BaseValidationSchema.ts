import { validate as validateSchema } from 'class-validator';

export default class BaseValidationSchema {

	public async validate() {
		const validationErrors = await validateSchema(this);
		if (validationErrors.length) {
			throw validationErrors;
		}
	}

}
