import { ConfigModule, ConfigModuleOptions, ConfigService } from "@nestjs/config";

export const configOption: ConfigModuleOptions = {
    envFilePath: [".env.dev", ".env.prd"],
    isGlobal: false,
};
