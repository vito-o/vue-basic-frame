<template>
  <div>
    <div class="search-box">
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="query.nickName" placeholder="请输入用户名称" clearable />
        </el-form-item>
        <el-form-item label="用户角色">
          <el-select v-model="query.role" placeholder="请选择角色描述" clearable>
            <el-option
              v-for="role in rules"
              :key="role.role"
              :label="role.roleName"
              :value="role.role"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-box">
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180"/>
        <el-table-column prop="nickName" label="用户名" width="180" />
        <el-table-column prop="ruleName" label="角色组">
           <template #default="scope">
            <el-button type="primary" size="small" v-for="(item, i) in scope.row.role">{{item.roleName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="editUser(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
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


    <el-dialog v-model="editDialog.show" title="Shipping address">
      <el-form>
        <el-form-item label="用户名" label-width="50">
          <el-input v-model="editDialog.nickName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色组" label-width="50">
          <el-select v-model="editDialog.selectedRoles" multiple placeholder="请选择角色">
            <el-option
              v-for="role in rules"
              :key="role.role"
              :label="role.roleName"
              :value="role.role"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialog.show = false">取消</el-button>
          <el-button type="primary" @click="userSave" >保存</el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { UserInfo, UserIntf } from '/@/types/user'
import { getUserList } from '/@/api/user'
import { rules } from '/@/mock/user'

const userInfo = reactive(new UserInfo());
let cacheUsers:Array<UserIntf> = [];

//查询接口
const getGoodInfo = () => {
  getUserList({...query.value}).then(res => {
    cacheUsers = res.data
    userInfo.users = [...cacheUsers];
    userInfo.query.total = res.data.length;
  });
};
//切换页面
const pageChange = (current:number) => {
  userInfo.query.current = current;
}
//计算属性-根据当前页数自动更换列表数据
const users = ref(computed(() => {
  return userInfo.users.slice(
    (userInfo.query.current - 1) * userInfo.query.size,
    (userInfo.query.current) * userInfo.query.size,
  )
}))

//查询
const onQuery = () => {
  let filterArr: Array<UserIntf> = cacheUsers
  if(userInfo.query.nickName || userInfo.query.role) {
  
    if(userInfo.query.nickName) {
      filterArr = filterArr.filter(o => o.nickName.indexOf(userInfo.query.nickName) >= 0);
    }
    if(userInfo.query.role) {
      filterArr = filterArr.filter(o => o.role.some(r => r.role == userInfo.query.role));
    }
  }
  userInfo.users = filterArr;
  userInfo.query.total = filterArr.length;
  userInfo.query.current = 1;
};

//搜索条件清空后-还原列表数据
watch([() => userInfo.query.nickName,() => userInfo.query.role], () => {
  if(!userInfo.query.nickName && !userInfo.query.role) {
    userInfo.users = cacheUsers;
    userInfo.query.total = cacheUsers.length;
    userInfo.query.current = 1;
  }
});

const { query, editDialog } = toRefs(userInfo);

onMounted(() => {
  getGoodInfo();
});


const editUser = (row: UserIntf) => {
  userInfo.editDialog.id = row.id;
  userInfo.editDialog.nickName = row.nickName;
  userInfo.editDialog.selectedRoles = row.role.map(r => r.role);
  userInfo.editDialog.show = true;
}

const userSave = () => {
  let user = userInfo.users.find(u => u.id == userInfo.editDialog.id);
  if(!user) return;
  user.nickName = userInfo.editDialog.nickName

  let matchRoles = rules.filter(r => userInfo.editDialog.selectedRoles.includes(r.role ))
  user.role = matchRoles;

  userInfo.editDialog.show = false;
}
</script>

<style lang="less" scoped></style>