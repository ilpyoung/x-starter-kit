import { Inject, Injectable } from "@nestjs/common";
import { Logger as WinstonLogger } from "winston";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";

@Injectable()
export class LoggerService {
    constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

    error(data: any) {
        this.logger.error("Error: ", data);
    }
    info(data: any) {
        this.logger.info("Log", data);
    }
    http(data: any) {
        this.logger.http("Http: ", data);
    }
    verbose(data: any) {
        this.logger.verbose("Verbose: ", data);
    }
    debug(data: any) {
        this.logger.debug("Debug: ", data);
    }
}
