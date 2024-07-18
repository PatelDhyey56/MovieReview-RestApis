import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

export function setupSwagger(app: INestApplication): void {
  const apiPath = 'api';
  // app.setGlobalPrefix(apiPath);
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: { admin: 'password' },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Movie Reviews')
    .setDescription('Movie Reviews Apis')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPath}/docs`, app, document);
}
