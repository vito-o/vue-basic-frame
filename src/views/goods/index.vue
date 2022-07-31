<template>
  <Suspense>
    <div>
      <div class="search-box">
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item label="物品名称">
            <el-input v-model="query.title" placeholder="请输入标题" clearable />
          </el-form-item>
          <el-form-item label="物品描述">
            <el-input v-model="query.desc" placeholder="请输入物品描述" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="table-box">
        <el-table :data="goods" style="width: 100%">
          <el-table-column prop="id" label="ID" width="180"/>
          <el-table-column prop="title" label="物品名称" width="180" />
          <el-table-column prop="desc" label="物品描述"  />
        </el-table>

        <el-pagination
          small
          background
          layout="prev, pager, next"
          :total="query.total"
          :page-size="query.size"
          :current-page="query.current"
          @current-change="pageChange"
          class="mt-4"
        />
      </div>
    </div>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { GoodsInfo, GoodListIntf } from '/@/types/goods'
import { getGoodList } from '/@/api/goods'

const goodsInfo = reactive(new GoodsInfo());
let cacheGoods:Array<GoodListIntf> = [];

//查询接口
const getGoodInfo = () => {
  getGoodList({...query.value}).then(res => {
    cacheGoods = res.data;
    goodsInfo.goods = [...cacheGoods];
    goodsInfo.query.total = res.data.length;
  });
};
//切换页面
const pageChange = (current:number) => {
  goodsInfo.query.current = current;
}
//计算属性-根据当前页数自动更换列表数据
const goods = ref(computed(() => {
  return goodsInfo.goods.slice(
    (goodsInfo.query.current - 1) * goodsInfo.query.size,
    (goodsInfo.query.current) * goodsInfo.query.size,
  )
}))

//查询
const onQuery = () => {
  let filterArr: Array<GoodListIntf> = []
  if(goodsInfo.query.title || goodsInfo.query.desc) {
  
    if(goodsInfo.query.title) {
      filterArr = goodsInfo.goods.filter(o => o.title.indexOf(goodsInfo.query.title) >= 0);
    }
    if(goodsInfo.query.desc) {
      filterArr = goodsInfo.goods.filter(o => o.desc.indexOf(goodsInfo.query.desc) >= 0);
    }
    
  } else {
    filterArr = cacheGoods;
  }
  goodsInfo.goods = filterArr;
  goodsInfo.query.total = filterArr.length;
  goodsInfo.query.current = 1;
};

//搜索条件清空后-还原列表数据
watch([() => goodsInfo.query.title,() => goodsInfo.query.desc], () => {
  if(!goodsInfo.query.title && !goodsInfo.query.desc) {
    goodsInfo.goods = cacheGoods;
    goodsInfo.query.total = cacheGoods.length;
    goodsInfo.query.current = 1;
  }
});

const { query } = toRefs(goodsInfo);

onMounted(() => {
  getGoodInfo();
})
</script>

<style lang="less" scoped></style>