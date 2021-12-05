import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AnalyzesModule } from './analyzes';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(String(process.env.FOXDOX_MONGO_URL)),
    AnalyzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
