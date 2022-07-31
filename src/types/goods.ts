
export interface GoodsQueryIntf {
  title: string
  desc: string
  total: number
  current: number
  size: number
}

export interface GoodListIntf{
  id: number
  title: string
  desc: string
  userId: number
}

export class GoodsInfo {
  query:GoodsQueryIntf = {
    title: '',
    desc: '',
    total: 0,
    current: 1,
    size: 10
  };

  goods: GoodListIntf[] = []
} 