import _ from 'lodash';
import { validate } from 'class-validator';

export default class BaseValidationSchema {
  
  public async validate() {
    const validationResults = await validate(this); 
    return validationResults.map((item) => _.pick(item, 'constraints', 'property'))
  }

}
