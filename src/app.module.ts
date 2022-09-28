import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { HttpExceptionFilter } from "./common/filter/exception.filter";
import { configOption } from "./config/config.option";
import { redisOption } from "./config/redis.option";
import { typeOrmOption } from "./config/typeorm.option";
import { LoggerModule } from "./logger/logger.module";
import { RedisModule } from "./redis/redis.module";
import { APP_FILTER } from "@nestjs/core";
import { PathMiddleWare } from "./common/middleware/pathlog.middleware";

@Module({
    imports: [
        AuthModule,
        LoggerModule,
        ConfigModule.forRoot(configOption),
        TypeOrmModule.forRootAsync(typeOrmOption()),
        RedisModule.forRootAsync(redisOption()),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        /** Exception Filter, Custom변경 가능 */
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {
    /** ## Path Enter Log */
    configure(consumer: MiddlewareConsumer): any {
        //.exclude([{ path: '/health', method: Reqe.GET }])
        consumer.apply(PathMiddleWare).forRoutes("/");
    }
}
