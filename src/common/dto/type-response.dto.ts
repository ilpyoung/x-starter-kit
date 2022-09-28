import { Type } from "@nestjs/common";
import { Any } from "typeorm";

export function TypeResult<T>(ItemType: Type<T>): any {
    abstract class TypeClass {
        result: T[];
        count: number;
    }

    return TypeClass;
}
