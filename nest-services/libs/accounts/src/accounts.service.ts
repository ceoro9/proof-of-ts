import { Injectable }                       from '@nestjs/common';
import { InjectModel }                      from 'nestjs-typegoose';
import { ReturnModelType }                  from '@typegoose/typegoose';
import { validate, ValidationError }        from 'class-validator';
import { plainToClass }                     from 'class-transformer';
import { LocalAccount, EntitledEntityType } from './models';
import { LocalAccountCreateDTO }            from './dtos/';

@Injectable()
export class LocalAccountsService {

	public constructor(
		@InjectModel(LocalAccount) private readonly localAccountModel: ReturnModelType<typeof LocalAccount>
	) {}

	public async create(data: object | LocalAccountCreateDTO) {

		let localAccountDto;

		if (!(data instanceof LocalAccountCreateDTO)) {
			localAccountDto = plainToClass(LocalAccountCreateDTO, data);
		} else {
			localAccountDto = data;
		}

		const errors = await validate(localAccountDto);
		
		if (errors.length) {
			// TODO: handle errors
			throw new Error(
				`Error occured: ${
					errors
						.map((err: ValidationError) => err.toString())
						.join(', ')
				}`
			);
		}

		return this.localAccountModel.create(localAccountDto);
	}

	public async findById(id: string) {
		return this.localAccountModel.findById(id).exec();
	}

	public async findByResourceId(id: string, name: string) {
		// TODO: separate repo for this functionality
		return this.localAccountModel.find({
			'entitledEntityType': EntitledEntityType.Resource,
			'entitledEntity.resourceId': id,
			'entitledEntity.resourceName': name
		}).exec();
	}

	public async findByAssetId(id: string) {
		return this.localAccountModel.find({
			'entitledEntityType': EntitledEntityType.Asset,
			'entitledEntity.assetId': id
		}).exec();
	}

	public async block() {
		// TODO
	}

	public async delete() {
		// TODO
	}
}
