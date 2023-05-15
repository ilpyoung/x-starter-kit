import { Module } from "@nestjs/common";
import { HttpRequestService } from "./http-request.service";
import { HttpRequestController } from "./http-request.controller";
import { HttpModule, HttpService } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [HttpRequestController],
    providers: [HttpRequestService],
    exports: [HttpRequestService],
})
export class HttpRequestModule {}
