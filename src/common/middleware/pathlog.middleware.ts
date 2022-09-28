import { LoggerService } from "../../logger/logger.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class PathMiddleWare implements NestMiddleware {
    constructor(private readonly loggerService: LoggerService) {}
    use(req: Request, res: Response, next: NextFunction) {
        const ip = req.headers["x-forwarded-for"];
        this.loggerService.http({ path: req.baseUrl, ip });
        next();
    }
}
