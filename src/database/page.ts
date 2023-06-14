import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export enum SortType {
    DESC = "DESC",
    ASC = "ASC",
}

export class Page {
    @ApiProperty({ description: "페이지" })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number;

    @ApiProperty({ description: "가져올 리스트의 limit 수" })
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    limit?: number;
}

export class Pagination extends Page {
    @ApiProperty({ description: "Sort" })
    @IsEnum(SortType)
    @IsOptional()
    sort?: SortType;
}
