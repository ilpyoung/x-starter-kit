import { RedisModuleAsyncOptions } from "../redis/redis.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
export function redisOption(): RedisModuleAsyncOptions {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            host: configService.get("REDIS_HOST") || "",
            port: configService.get("REDIS_PORT"),
        }),
    };
}
