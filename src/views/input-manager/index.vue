<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="请输入姓名" style="width: 200px;" class="filter-item" 
       @input="query()"/>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="query()" >
        搜索
      </el-button>
    </div>

    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      fixed
      prop="name"
      label="姓名"
      width="100"
      column-key="name"
      >
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="出生日期"
      width="120"
      sortable>
      <template slot-scope="scope">
        <span>{{ scope.row.birthday }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="80">
      <template slot-scope="scope">
        <span>{{ scope.row.sex | getSex}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="education"
      label="教育程度"
      width="100"
      >
      <template slot-scope="scope">
        <span>{{ scope.row.education}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="address1" 
      label="居住地址" 
      width="200">
    </el-table-column>
    <el-table-column
      prop="mobile_phone"
      label="手机号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="status"
      label="申请状态"
      width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status |getStatusStyle">{{ scope.row.status |getStatus}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="250">
      <template slot-scope="{row}">
        <el-button
          size="mini" type="primary" @click="handleUpdate(row)"  :disabled="row.status!=0&&row.status!=3&&row.status!=6"
          >编辑</el-button>
        <el-button
          size="mini"
          type="danger" @click="handleDel(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6"
          >删除</el-button>
          <el-button
          size="mini" type="success"  @click="handleSubmit(row)" :disabled="row.status!=0&&row.status!=3&&row.status!=6"
          >提交审核</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 编辑弹层功能 -->
     <el-dialog title="申请管理-编辑" :visible.sync="dialogFormVisible">
      <el-form ref="updateForm"  :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="ID" prop="id" v-show="false">
              <el-input v-model="temp.id" />
            </el-form-item>
          <el-form-item label="姓名" prop="name">
              <el-input v-model="temp.name" />
            </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker type="datetime" v-model="temp.birthday" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="temp.sex" class="filter-item" placeholder="Please select">
              <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="教育程度" prop="education">
            <el-select v-model="temp.education" class="filter-item" placeholder="Please select">
              <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="居住地址" prop="address1">
              <el-input v-model="temp.address1" />
            </el-form-item>
          <el-form-item label="手机号" prop="mobile_phone">
            <el-input v-model.number="temp.mobile_phone" />
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          编辑
        </el-button>
      </div>
    </el-dialog> 

    <!-- 删除弹层功能 -->
    <el-dialog title="申请管理-删除" :visible.sync="dialogDelVisible">
      <p>确定删除？</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDelVisible = false">
          取消
        </el-button>
        <el-button type="danger" @click="delData()">
          删除
        </el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listQuery.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="rows">
    </el-pagination>

  </div>
</template>

<script>
import {loanList,submitToApprove,loanDelete,loanUpdate} from '@/api/article'
import {sexOptions,educationOptions} from '@/utils/selectData'

export default {
  name: 'ComplexTable',
  data() {
    return {
      tableData: [], //表格展示的数据
      pages:1, //总页数
      rows:1, //总条数
      listQuery:{
        pageNo:1, //当前页面
        pageSize:10, //条数
        name:''  //查询条件
      },
      dialogDelVisible:false, //删除弹层显示与隐藏
      dialogFormVisible:false, //编辑弹层显示与隐藏
      sexOptions,
      educationOptions,
      temp:{
        id:'',
        name:'',
        birthday:'',
      }
    }
  },
  filters:{
    getStatusStyle(data){
      switch (data) {
        case 0:
          return 'success';
        case 1:
          return 'info';
        case 2:
          return 'success';
        case 3:
          return 'warning';
        case 4:
          return 'info';
        case 5:
          return 'success';
        case 6:
          return 'warning';
        case 7:
          return 'danger';
        default:
          return data;
      }
    },
    getStatus(data){
    //   status 
    // - 0-默认值进件状态
    //  - 1-提交初审状态
    //  - 2-初审通过状态
    //  - 3-初审拒绝状态
    //  - 4-提交终审状态
    //  - 5-终审通过状态
    // - 6-终审拒绝状态
    // - 7-生成合同状态
      switch (data) {
        case 0:
          return '进件';
        case 1:
          return '提交初审';
        case 2:
          return '初审通过';
        case 3:
          return '初审拒绝';
        case 4:
          return '提交终审';
        case 5:
          return '终审通过';
        case 6:
          return '终审拒绝';
        case 7:
          return '生成合同';
        default:
          return data;
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){  //获取数据
      loanList(this.listQuery).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          let {data,rows,pages} = res.data.data.data;
          this.tableData = data;  //列表展示
          this.rows = rows;  //总条数
          this.pages = pages;  //总页数
        }
      })
    },
    query(){ //按名称查询
      this.getList();
    },
    //提交审核
    handleSubmit(row){
      submitToApprove({id:row.id}).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          this.getList();
          this.$notify({  //通知框
            title: '提交审核',
            message: '提交成功',
            type:'success',
            duration: 2000
          });
        }
      })
    },
    //当前条数变化
    handleSizeChange(val=this.listQuery.pageSize ){
      this.listQuery.pageSize = val;
      this.getList();
    },
    //当前页变化
    handleCurrentChange(val=this.listQuery.pageNo){
      this.listQuery.pageNo = val;
      this.getList();
    },
    //删除弹层
    handleDel(row){
      this.temp = {...row};
      this.dialogDelVisible = true; //弹层显示
    },
    //删除提交
    delData(){
      loanDelete({id:this.temp.id}).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          this.getList();
           this.dialogDelVisible = false; //弹层隐藏
          this.$notify({  //通知框
            title: '删除',
            message: '删除成功',
            type:'success',
            duration: 2000
          });
        }
      })
    },
     //编辑弹层
    handleUpdate(row){
      this.temp = {...row};
      this.dialogFormVisible = true; //弹层显示
    },
    //编辑提交
    updateData(){
      loanUpdate(this.temp).then(res=>{
        let {code} = res.data;
        if(code=='20000'){
          this.getList();
           this.dialogFormVisible = false; //弹层隐藏
          this.$notify({  //通知框
            title: '编辑',
            message: '编辑成功',
            type:'success',
            duration: 2000
          });
        }
      })
    }
  }
}
</script>
