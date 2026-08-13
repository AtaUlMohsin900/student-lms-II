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

//  Create a global pipe for request body validation.
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })
);

app.setGlobalPrefix('api'); // Set a global prefix for all routes
const port = process.env.PORT ?? 8000; // Use the PORT environment variable or default to 8000
 await app.listen(port);
 logger.log(`Server listening at http://localhost:${port}/api`); // Log the URL where the application is running

}
bootstrap();
