import { Test, TestingModule } from '@nestjs/testing';
import { BaseController } from './base.controller';



describe('AppController', () => {
  let appController: BaseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BaseController],

    }).compile();

    appController = app.get<BaseController>(BaseController);
  });

  describe('root', () => {
    it('should return "API is Working!"', () => {
      expect(appController.getHealthCheck).toBe({msg: "API is Working!"});
    });
  });
});
