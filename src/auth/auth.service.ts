import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as crypto from "crypto";

export interface Password {
    encryptKey: string;
    password: string;
}

interface KeyPayload {
    id: string;
}

@Injectable()
export class AuthService {
    private passCount = 1;
    constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService) {
        this.passCount = Number(configService.get("PASSWORD_COUNT"));
    }

    signId(id: KeyPayload, time: number) {
        const token = this.jwtService.sign(id, {
            expiresIn: `${time}s`,
        });
        return token;
    }

    verifyId(token: string): KeyPayload {
        try {
            return this.jwtService.verify(token) as KeyPayload;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    encryptPassword = (userPass: string): Promise<Password> => {
        return new Promise(async (resolve, reject) => {
            try {
                const buf = crypto.randomBytes(64);
                crypto.pbkdf2(userPass, buf.toString("base64"), this.passCount, 64, "sha512", (err, password) => {
                    if (err) return reject(err);
                    resolve({
                        encryptKey: buf.toString("base64"),
                        password: password.toString("base64"),
                    });
                });
            } catch (e) {
                console.log("encrypt!", e);
                reject(e);
            }
        });
    };

    checkPassword = (userPass: string, buf: string, dbPass: string) => {
        return new Promise<void>(async (resolve, reject) => {
            try {
                crypto.pbkdf2(userPass, buf, this.passCount, 64, "sha512", (err, password) => {
                    if (err) return reject(err);
                    if (dbPass === password.toString("base64")) return resolve();
                    reject();
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}
