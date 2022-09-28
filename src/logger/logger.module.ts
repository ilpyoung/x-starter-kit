import { Module } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import * as winston from "winston";
import { utilities as nestWinstonModuleUtilities, WinstonModule } from "nest-winston";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transports: [
                    new winston.transports.Console({
                        level: configService.get("NODE_ENV") === "production" ? "info" : "silly",
                        format: winston.format.combine(
                            winston.format.timestamp(),
                            nestWinstonModuleUtilities.format.nestLike(configService.get("SERVICE_NAME"), {
                                prettyPrint: true,
                                colors: true,
                            }),
                        ),
                    }),
                ],
            }),
        }),
    ],
    exports: [LoggerService, WinstonModule],
    providers: [LoggerService],
})
export class LoggerModule {}
