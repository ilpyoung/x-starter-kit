import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleAsyncOptions } from "@nestjs/jwt";

export function jwtModuleOption(): JwtModuleAsyncOptions {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get("PASSPORT_AUTH_SECRET"),
            signOptions: {
                expiresIn: `${configService.get("PASSPORT_AUTH_EXPIRE_TIME")}s`,
            },
        }),
    };
}
