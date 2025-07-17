import { Module } from '@nestjs/common';
import { adminBootstrapper } from './bootstrap/admin.bootstrapper';

@Module({
  imports: [adminBootstrapper()],
  controllers: [],
  providers: [],
})
export class AdminModule {}
