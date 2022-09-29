import { SelectQueryBuilder } from "typeorm";

export async function processPaging<T = any>(
    sql: SelectQueryBuilder<T>,
    page = 1,
    PAGE_LIMIT = 10,
    raw = false,
): Promise<{ count: number; result: T[] }> {
    if (page > 0) {
        sql.offset((page - 1) * PAGE_LIMIT).limit(PAGE_LIMIT);
    }
    let array = null;
    if (raw) array = await sql.getRawMany();
    else array = await sql.getMany();
    const count = await sql.getCount();
    return { count, result: array };
}
