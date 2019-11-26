import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './middlewares/logging.interceptor';
import { ErrorFilter } from './middlewares/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new ErrorFilter())

  const options = new DocumentBuilder()
    .setTitle('API"s')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);

  await app.listen(3001);
}
bootstrap();