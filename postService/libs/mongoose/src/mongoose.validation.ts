import { DoesResourceExistTypeService, ResourceIdField } from '../base/base.validators';
import { MongooseResourceId } from './mongoose.data-types';


export function MongooseResourceIdField<T>(resourceType: DoesResourceExistTypeService<T>) {
	return ResourceIdField(resourceType, MongooseResourceId);
}
