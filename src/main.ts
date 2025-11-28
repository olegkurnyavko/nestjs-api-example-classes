import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('APP_PORT', 80);
  const host = configService.get<string>('APP_HOST', 'localhost');

  await app.listen(port, host, () => {
    console.log(`Сервер начал прослушивать хост ${host} на порту ${port}...`);
  });

}
bootstrap();
