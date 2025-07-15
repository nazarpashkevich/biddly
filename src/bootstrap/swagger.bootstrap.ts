import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function bootstrapSwagger(app: NestExpressApplication) {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('<Biddly> API')
    .setDescription('The API documentation for the <Biddly> Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // sorting tags by first path`s tag alphabetically
  document.paths = Object.entries(document.paths)
    .sort(([pathA, opsA], [pathB, opsB]) =>
      getFirstTag(opsA).localeCompare(getFirstTag(opsB))
    )
    .reduce(
      (acc, [path, ops]) => {
        acc[path] = ops;
        return acc;
      },
      {} as typeof document.paths
    );

  function getFirstTag(ops: Record<string, any>): string {
    for (const method of Object.keys(ops)) {
      const op = ops[method];
      if (op?.tags?.[0]) return op.tags[0];
    }
    return '';
  }

  app.use(
    '/api/reference',
    apiReference({
      content: document,
    })
  );
}
