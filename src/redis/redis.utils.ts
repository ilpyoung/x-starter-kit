import * as RedisNs from "ioredis";
export type RedisConnection = RedisNs.Redis;
import Redis, { RedisOptions } from "ioredis";
const REDIS_MODULE_CONNECTION = "default";
const REDIS_MODULE_CONNECTION_TOKEN = "IORedisModuleConnectionToken";

export function getRedisConnectionToken(connection: string): string {
    return `${connection || REDIS_MODULE_CONNECTION}_${REDIS_MODULE_CONNECTION_TOKEN}`;
}

export function createRedis(options: RedisOptions) {
    const config = {
        host: options.host,
        port: options.port,
    };
    return new Redis(config);
}
