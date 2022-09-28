import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { jwtModuleOption } from "../config/jwt.option";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [ConfigModule, JwtModule.registerAsync(jwtModuleOption())],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
