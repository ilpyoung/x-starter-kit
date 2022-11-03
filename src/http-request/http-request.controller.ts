import { Controller } from '@nestjs/common';
import { HttpRequestService } from './http-request.service';

@Controller()
export class HttpRequestController {
  constructor(private readonly httpRequestService: HttpRequestService) {}
}
