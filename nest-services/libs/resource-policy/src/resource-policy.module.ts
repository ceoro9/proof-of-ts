import { Module }                                   from '@nestjs/common';
import { TypegooseModule, TypegooseModuleOptions  } from 'nestjs-typegoose';
import { ConfigModule, ConfigService }              from '@post-service/config';
import { ResourcePolicyService }                    from './resource-policy.service';
import { ResourceType, ResourceInstance }           from './models';


@Module({
	imports: [
		TypegooseModule.forRootAsync({
			imports: [
				ConfigModule.register(),
			],
			useFactory: async (configService: ConfigService): Promise<TypegooseModuleOptions> => ({
				uri: configService.getStrict('MONGODB_URI'),
			}),
			inject: [ConfigService],
		}),
		TypegooseModule.forFeature([
			ResourceType,
			ResourceInstance,
		])
	],
  providers: [ResourcePolicyService],
  exports:   [ResourcePolicyService],
})
export class ResourcePolicyModule {}
