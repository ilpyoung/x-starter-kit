import { ApiProperty } from "@nestjs/swagger";
import { Any } from "typeorm";

export class PaginateResult<T> {
    result: T[];
    @ApiProperty()
    count: number;
}
