import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envValidationSchema } from './config/validation';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { SwitchesModule } from './modules/switches/switches.module';
import { KeycapsModule } from './modules/keycaps/keycaps.module';
@Module({
  imports: [
    // Load biến môi trường toàn cục, validate bằng Joi
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    // Kết nối Mongoose async để đọc từ ConfigService
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URI'),
        dbName: cfg.get<string>('MONGO_DB_NAME'),
        autoIndex: cfg.get('NODE_ENV') !== 'production', // Prod thì tắt autoIndex
        serverSelectionTimeoutMS: 5000,
        maxPoolSize: 20,
      }),
    }),

    UsersModule,

    AuthModule,

    SwitchesModule,

    KeycapsModule,
  ],
})
export class AppModule {}
