import { Injectable } from "@nestjs/common";
import { InjectRedis } from "./decorator/redis.decorator";
import { RedisConnection } from "./redis.utils";

@Injectable()
export class RedisModel {
    connection: RedisConnection;
    constructor(@InjectRedis() private readonly redisConnection: RedisConnection) {
        this.connection = redisConnection;
    }
}
