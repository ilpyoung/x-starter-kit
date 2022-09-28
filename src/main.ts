import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: [process.env.WEB_DOMAIN, process.env.DEV_LOCAL_WEB],
        methods: ["GET", "POST", "PUT", "OPTIONS"],
        credentials: true,
    });
    setupSwagger(app);
    await app.listen(Number(process.env.SERVICE_PORT));
}

function setupSwagger(app: INestApplication): void {
    const options = new DocumentBuilder()
        .setTitle(process.env.SERVICE_NAME + " Docs")
        .setDescription(process.env.SERVICE_NAME + " Document")
        .setVersion(process.env.SERVICE_VER)
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs/api", app, document);
}

bootstrap();
