import { DynamicModule, Global, Module, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ModuleMetadata, Type } from "@nestjs/common";
import { createRedis, getRedisConnectionToken } from "./redis.utils";
import { RedisOptions } from "ioredis";
import { RedisModel } from "./redis.model";

export interface RedisOptionsFactory {
    createJwtOptions(): Promise<RedisOptions> | RedisOptions;
}
export interface RedisModuleAsyncOptions extends Pick<ModuleMetadata, "imports"> {
    useExisting?: Type<RedisOptionsFactory>;
    useClass?: Type<RedisOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<RedisOptions> | RedisOptions;
    inject?: any[];
}

@Global()
@Module({})
export class RedisModule {
    public static forRoot(options: RedisOptions, connection?: string): DynamicModule {
        const redisConnectionProvider: Provider = {
            provide: getRedisConnectionToken(connection),
            useValue: createRedis(options),
        };
        const providers = [redisConnectionProvider, ConfigService, RedisModel];
        return {
            module: RedisModule,
            providers,
            exports: providers,
        };
    }

    static forRootAsync(options: RedisModuleAsyncOptions, connection?: string): DynamicModule {
        if (!options.useFactory || !options.inject) return;
        const redisConnectionProvider: Provider = {
            provide: getRedisConnectionToken(connection),
            inject: options.inject,
            useFactory: async (configService: ConfigService) => {
                const option = await options.useFactory(configService);
                return createRedis(option);
            },
        };
        const providers = [redisConnectionProvider, ConfigService, RedisModel];
        return {
            // imports: options.imports,
            exports: providers,
            module: RedisModule,
            providers,
        };
    }
}
