import { Test, TestingModule } from '@nestjs/testing';
import { ResourcePolicyService } from './resource-policy.service';

describe('ResourcePolicyService', () => {
  let service: ResourcePolicyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourcePolicyService],
    }).compile();

    service = module.get<ResourcePolicyService>(ResourcePolicyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
