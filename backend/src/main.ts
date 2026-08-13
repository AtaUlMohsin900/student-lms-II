import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.use(helmet()); // Security middleware for setting various HTTP headers

 app.use(
  cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:3001/'], // Allow requests from the frontend URL or localhost
    credentials: true, // Allow cookies to be sent with requests
  })

 )

 app.use(morgan('combined')); // Logging middleware for HTTP requests

//  Create a global pipe for all routes in the application for request body parsing and validation.
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })
);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
