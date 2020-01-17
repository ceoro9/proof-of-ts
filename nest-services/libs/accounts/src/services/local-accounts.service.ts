import { Injectable, BadRequestException }  from '@nestjs/common';
import { InjectModel }                      from 'nestjs-typegoose';
import { ReturnModelType }                  from '@typegoose/typegoose';
import { validate, ValidationError }        from 'class-validator';
import { plainToClass }                     from 'class-transformer';
import { LocalAccount, EntitledEntityType } from '../models';
import { CreateLocalAccountDTO }            from '../dtos';

@Injectable()
export class LocalAccountsService {

	public constructor(
		@InjectModel(LocalAccount) private readonly localAccountModel: ReturnModelType<typeof LocalAccount>
	) {}

	public async createAccount(createLocalAccountDto: typeof CreateLocalAccountDTO) {

		const errors = await validate(createLocalAccountDto);

		if (errors.length) {
			// TODO: handle errors
			throw new BadRequestException(
				`Error occured: ${
					errors
						.map((err: ValidationError) => err.toString())
						.join(', ')
				}`
			);
		}

		return this.localAccountModel.create(createLocalAccountDto); // TODO: wrap
	}

	public async findAccountById(id: string) {
		return this.localAccountModel.findById(id).exec();
	}

	public async findAccountByResourceId(id: string, name: string) {
		// TODO: separate repo for this functionality
		return this.localAccountModel.find({
			'entitledEntityType': EntitledEntityType.Resource,
			'entitledEntity.resourceId': id,
			'entitledEntity.resourceName': name
		}).exec();
	}

	public async findAccountByAssetId(id: string) {
		return this.localAccountModel.find({
			'entitledEntityType': EntitledEntityType.Asset,
			'entitledEntity.assetId': id
		}).exec();
	}

	public async blockAccountById() {
		// TODO
	}

	public async deleteAccountById() {
		// TODO
	}
}
