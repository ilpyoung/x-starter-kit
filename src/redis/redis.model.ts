import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRedis } from "./decorator/redis.decorator";
import { RedisConnection } from "./redis.utils";

@Injectable()
export class RedisModel {
    connection: RedisConnection;
    config: ConfigService;
    constructor(
        @InjectRedis() private readonly redisConnection: RedisConnection,
        private readonly configService: ConfigService,
    ) {
        this.connection = redisConnection;
        this.config = configService;
    }
}
