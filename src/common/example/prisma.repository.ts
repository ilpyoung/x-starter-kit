import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class AppRepository {
    // constructor(private prisma: PrismaService) {
    //     this.user({});
    // }
    // async user(userWhereUniqueInput: Prisma.test1WhereUniqueInput): Promise<test1 | null> {
    //     return this.prisma.test1.findUnique({
    //         where: userWhereUniqueInput,
    //     });
    // }
    // async users(params: {
    //     skip?: number;
    //     take?: number;
    //     cursor?: Prisma.user_table_devWhereUniqueInput;
    //     orderBy?: Prisma.user_table_devOrderByWithRelationInput;
    // }): Promise<user_table_dev[]> {
    //     const { skip, take, cursor, orderBy } = params;
    //     return this.prisma.user_table_dev.findMany({
    //         skip,
    //         take,
    //         cursor,
    //         orderBy,
    //     });
    // }
}
