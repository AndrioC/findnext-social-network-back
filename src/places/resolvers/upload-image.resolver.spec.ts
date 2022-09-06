import { Test, TestingModule } from '@nestjs/testing';
import { UploadImageResolver } from './upload-image.resolver';

describe('UploadImageResolver', () => {
  let resolver: UploadImageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadImageResolver],
    }).compile();

    resolver = module.get<UploadImageResolver>(UploadImageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
