import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export enum SortType {
    DESC = "DESC",
    ASC = "ASC",
}

export class Page {
    @ApiProperty({ description: "페이지" })
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiProperty({ description: "가져올 리스트의 limit 수" })
    @IsNumber()
    @IsOptional()
    limit?: number;
}

export class Pagination extends Page {
    @ApiProperty({ description: "Sort" })
    @IsEnum(SortType)
    @IsOptional()
    sort?: SortType;
}
