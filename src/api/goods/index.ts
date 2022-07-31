import { get } from '/@/plugins/request'
import { GoodsQuery } from '/@/types/goods'

export async function getGoodList(query: GoodsQuery) {
  return await get('/api/goodList', query);
}

