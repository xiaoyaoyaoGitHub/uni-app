<template>
	<view class="flowLaunch-v">
     <!-- <view>
        <u-select v-model="selectShow" mode="single-column" :list="selectList" @confirm="confirm"></u-select>
        <view class="flowBefore-actions">
          <u-button class="buttom-btn" @click="selectClick">报表类型</u-button>
          <u-button class="buttom-btn" @click="popupClick">筛选条件</u-button>
        </view>
      </view> -->
    <!--  <u-popup v-model="popupShow" mode="bottom" height = "60%">
        <view style="margin: 10px 20px 10px 20px">
          <u-form ref="uForm">

            <u-form-item label="资金规模" label-position = "top"	>
              <u-number-box :min="1" v-model="listQuery.startMoney"></u-number-box>
              <text class="separator">-</text>
              <u-number-box :min="1" v-model="listQuery.endMoney"></u-number-box>
            </u-form-item>

            <u-form-item label="项目分类" label-position = "top"	>
              <cudt-checkbox v-model="listQuery.projectCategory" :options="queryConditionData.categoryList">
              </cudt-checkbox>
            </u-form-item>

            <u-form-item label="行业" label-position = "left"	label-width = "130rpx">
              <cudt-select v-model="listQuery.business" placeholder="请选择" :options="queryConditionData.businessList">
              </cudt-select>
            </u-form-item>

            <u-form-item>
              <u-button type="primary" size="medium" @click="search">搜索</u-button>
            </u-form-item>
          </u-form>
        </view>
      </u-popup> -->
    <scroll-view scroll-x="true" style="width: 100%;overflow: hidden;white-space: nowrap;">
      <view v-if="reportType === 0">
        <uni-table border stripe emptyText="暂无更多数据" v-if="listQuery.way ===1">
          <uni-tr >
            <uni-th>项目名称</uni-th>
            <uni-th  >
              <uni-th >在建项目合计</uni-th>
              <uni-tr>
                <uni-th>个数（个）</uni-th>
                <uni-th>总投资（万元）</uni-th>
                <uni-th>累计完成（万元）</uni-th>
                <uni-th>今年计划总投资（万元）</uni-th>
                <uni-th>今年完成（万元）</uni-th>
              </uni-tr>
            </uni-th>
          </uni-tr>

          <uni-tr>
            <uni-td>1</uni-td>
            <uni-td>1</uni-td>
            <uni-td>1</uni-td>
            <uni-td>1</uni-td>
            <uni-td>1</uni-td>
            <uni-td>1</uni-td>
          </uni-tr>
        </uni-table>
      </view>
      <view v-if="reportType === 1 && detailList.length  > 0">
<!--        <uni-table >-->
<!--          <uni-tr class="uni-tr" >-->
<!--            <uni-td width="30%" class="uni-td" v-for="(item, index) in detailTableHead" :prop = item.prop :key = index >{{item.label}}</uni-td>-->
<!--          </uni-tr>-->
<!--          <uni-tr class="uni-tr" v-for="(item, index) in detailList" :key = index>-->
<!--            <uni-td width="30%" class="uni-td" v-for="(value,index) in detailTableHead" :key = index >{{item[value.prop]}}</uni-td>-->
<!--          </uni-tr>-->
<!--        </uni-table>-->

        <uni-table border stripe emptyText="暂无更多数据">
          <uni-tr  >
            <uni-th v-for="(item, index) in detailTableHead" :prop = item.prop :key = index >{{item.label}}</uni-th>
          </uni-tr>
          <uni-tr class="uni-tr" v-for="(item, index) in detailList" :key = index>
            <uni-td  v-for="value in detailTableHead" :key = value.prop >{{item[value.prop]}}</uni-td>
          </uni-tr>
        </uni-table>
      </view>
      <view>
        <uni-table border stripe emptyText="暂无更多数据" >
          <!-- 表头行 -->
          <uni-tr>
            <uni-th align="center">日期</uni-th>
            <uni-th align="center">姓名</uni-th>
            <uni-th align="left">地址</uni-th>
          </uni-tr>
          <!-- 表格数据行 -->
          <uni-tr>
            <uni-td>2020-10-20</uni-td>
            <uni-td>Jeson</uni-td>
            <uni-td>北京市海淀区</uni-td>
          </uni-tr>
          <uni-tr>
            <uni-td>2020-10-21</uni-td>
            <uni-td>HanMeiMei</uni-td>
            <uni-td>北京市海淀区</uni-td>
          </uni-tr>
          <uni-tr>
            <uni-td>2020-10-22</uni-td>
            <uni-td>LiLei</uni-td>
            <uni-td>北京市海淀区</uni-td>
          </uni-tr>
          <uni-tr>
            <uni-td>2020-10-23</uni-td>
            <uni-td>Danner</uni-td>
            <uni-td>北京市海淀区</uni-td>
          </uni-tr>
        </uni-table>
      </view>
    </scroll-view>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
  import {
    getQueryConditionData,
    getReportList,
    getDetailReportList
  } from '@/api/projectReport'

  import CitySelect from "../../../components/cudt/cudt-city-select/city-select";
  import CudtNumRange from "../../../components/cudt/cudt-num-range";
  import CudtSelect from "../../../components/cudt/cudt-select";
	export default {
    components: { CudtSelect, CudtNumRange, CitySelect},
    mixins: [MescrollMixin],
    data() {
      return {
        customStyle: {
          marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
          borderColor: 'black'
        },
        tabIndex: 0,
        selectList: [
          {
            value: 0,
            label: '汇总表'
          },
          {
            value: 1,
            label: '详情表'
          }
        ],
        reportType: 0,
        tableHead:[],
        list: [],
        detailTableHead:[],
        detailList: [],
        popupShow: false,
        selectShow: false,
        businessSelectShow: false,
        waySelectShow: false,
        businessValue: '',
        wayValue: '',
        listQuery: {
          auditStatus: [],
          buildProgress: [],
          projectCategory: [],
          area: [],
          startMoney: undefined,
          endMoney: undefined,
          subBusiness: '',
          business: '',
          way: 1,
          category: 'build',
        },
        projectPhase: '6bfa51249e2e4d31a8128b50c3b33877', //在建项目id
        modelId: 'b094ad34716143b5a13e291572ab1af3',
        queryConditionData: {},
      }
    },
    onLoad() {
      // uni.$on('refresh', () => {
      // 	this.list = [];
      // 	this.mescroll.resetUpScroll();
      // })
      getQueryConditionData().then(res => {
        this.queryConditionData = res.data
      })

    },
    onUnload() {
      uni.$off('refresh')
    },
    computed: {
      columns() {
        return this.tableHead.map(item => {
          return{
            key:item.id,
            title: item.name
          }
        })
      }
    },
    methods: {
      // 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
      confirm(e) {
        console.log(e);
        this.reportType = e[0].value
      },
      popupClick() {
        this.popupShow = true;
      },
      selectClick() {
        this.selectShow = true;
      },
      reset() {
        this.listQuery.auditStatus = []
        this.listQuery.projectCategory = []
        this.listQuery.area = []
        this.listQuery.startMoney = undefined
        this.listQuery.endMoney = undefined
        this.listQuery.business = ''
        this.listQuery.subBusiness = ''
        this.search()
      },
      search() {
        this.listQuery = {
          ...this.listQuery,
          currentPage: 1,
          pageSize: 20,
          sort: 'desc'
        }
        this.initData()
      },
      initData() {
        this.listLoading = true
        this.showTable = true
        if (this.reportType === 0) {
          getReportList({...this.listQuery, modelId: this.modelId, projectPhase: this.projectPhase}).then(res => {
            this.list = res.data.list
            this.tableHead = res.data.head
            this.listLoading = false
          })
        }
        if (this.reportType === 1) {
          getDetailReportList({...this.listQuery, modelId: this.modelId, projectPhase: this.projectPhase}).then(res => {
            this.detailList = res.data.realList
            this.detailTableHead = res.data.modelList
            this.listLoading = false
          })
        }

      },

    }
  }
</script>

<style lang="scss">
  .separator {
    margin: 0 20rpx;
    flex-shrink: 0;
  }
  .scroll-view_H{
    width: 200%;
    display: flex;
    flex-wrap: nowrap;
  }
  .table_box{
    .box_bt{
      border-bottom: unset !important;
    }
    .box_pd{
      padding: unset !important;
    }
    .box_br{
      border-right: unset !important;
    }
    .box_cus{
      padding: 10px 3px !important;
    }
    /deep/ .uni-td[data-v-35ace0c0]{
      height: auto;
    }
  }

</style>
