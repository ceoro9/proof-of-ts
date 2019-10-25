import { MongooseResourceId } from "./mongoose.data-types";
import { BaseModelDTO }       from '@post-service/base/base.dto';


export class MongooseModelDTO extends BaseModelDTO {

	protected createResourceIdInstance(resourceIdValue: string) {
		return new MongooseResourceId(resourceIdValue);
	}

}
