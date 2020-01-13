import { Controller, Post, Get, UsePipes, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DTOBodyValidadtionPipe } from '@post-service/posts';
import { CreateAccountDTO } from './dtos/create.account.dto';

@Controller()
export class AppController {

	public constructor(private readonly appService: AppService) {}
	
	/**
	 * Fetch main account information
	 */
	@Get()
	public getAccount() {
		return 'Account';
	}

	/**
	 * Request to create new account
	 * @param createAccountDTO 
	 */
	@Post()
	@UsePipes(new DTOBodyValidadtionPipe())
  public async createAccount(@Body() createAccountDTO: CreateAccountDTO) {
		return this.appService.createAccount(createAccountDTO);
	}
}
