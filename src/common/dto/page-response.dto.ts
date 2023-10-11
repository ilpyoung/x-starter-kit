import { ApiProperty } from "@nestjs/swagger";

export class PaginateResult<T> {
    result: T[];
    @ApiProperty()
    count: number;
}
