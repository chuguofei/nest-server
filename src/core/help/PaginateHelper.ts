import { IPaginationMeta, paginate } from 'nestjs-typeorm-paginate';
import { SelectQueryBuilder } from 'typeorm';

class CustomPaginationResponse<Entity> {
  data: Entity[];
  meta: Partial<IPaginationMeta>;
}

/**
 * Paginate Helper
 */
export class PaginateHelper {
  static async paginate<Entity>(
    queryBuilder: SelectQueryBuilder<Entity>,
    page?: number,
    limit?: number,
  ): Promise<CustomPaginationResponse<Entity>> {
    const options = {
      page: page ?? 1,
      limit: limit ?? 10,
      metaTransformer: (meta: IPaginationMeta) =>
        ({
          currentPage: meta.currentPage,
          pageSize: meta.totalPages,
          total: meta.totalItems,
        } as any),
    };

    const pagination = await paginate(queryBuilder, options);
    const { items, ...rest } = pagination;
    const data = items;
    const customResponse: CustomPaginationResponse<Entity> = {
      data,
      meta: rest.meta,
    };

    return customResponse;
  }
}
