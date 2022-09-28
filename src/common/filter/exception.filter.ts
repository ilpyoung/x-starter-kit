import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Inject,
    InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { LoggerService } from "src/logger/logger.service";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        const originException = exception;
        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
        }
        this.logger.debug(originException);
        const response = (exception as HttpException).getResponse();

        const log = {
            timestamp: new Date(),
            url: req.url,
            response,
            error: response["message"],
            code: originException["code"],
        };
        this.logger.error(log);

        const errorCode = response["statusCode"];
        if (errorCode == 401) return res.status((exception as HttpException).getStatus()).json(response);
        else if (errorCode >= 500) {
            const message = originException["code"] == "ER_DUP_ENTRY" ? "ER_DUP_ENTRY" : response["message"];
            return res.status((exception as HttpException).getStatus()).json({
                message,
            });
        }
        res.status((exception as HttpException).getStatus()).json({
            message: response["message"],
        });
    }
}
