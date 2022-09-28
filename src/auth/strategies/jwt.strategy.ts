import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";
// import { jwtConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    return request?.cookies[this.configService.get("PASSPORT_USER_AUTH_COOKIE")];
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get("PASSPORT_AUTH_SECRET"),
        });
    }

    /**
     * @description 클라이언트가 전송한 Jwt 토큰 정보
     *
     * @param payload 토큰 전송 내용
     */
    async validate(payload: any) {
        return { key: payload.key, id: payload.id, type: payload.type };
    }
}
