import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { join } from "path";

export function typeOrmOption(synchronize = false): TypeOrmModuleAsyncOptions {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            type: "mysql",
            host: configService.get("DB_HOST"),
            port: configService.get("DB_PORT"),
            username: configService.get("DB_USER"),
            password: configService.get("DB_PASS"),
            database: configService.get("DB_DB"),
            entities: [join(__dirname, "dist/**/*.entity.{js,ts}")],
            synchronize,
            legacySpatialSupport: false,
        }),
    };
}
