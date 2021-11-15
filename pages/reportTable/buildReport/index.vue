<template>
	<view class="flowLaunch-v">
      <view>
        <u-select v-model="selectShow" mode="single-column" :list="selectList" @confirm="confirm"></u-select>
        <view class="flowBefore-actions">
          <u-button class="buttom-btn" @click="selectClick">报表类型</u-button>
          <u-button class="buttom-btn" @click="popupClick">筛选条件</u-button>
        </view>
      </view>
      <u-popup v-model="popupShow" mode="bottom" height = "60%">
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

<!--            <u-form-item label="区域" label-position = "left"	label-width = "130rpx">-->
<!--              <cudt-city-select></cudt-city-select>-->
<!--            </u-form-item>-->

            <u-form-item label="行业" label-position = "left"	label-width = "130rpx">
              <cudt-select v-model="listQuery.business" placeholder="请选择" :options="queryConditionData.businessList">
              </cudt-select>
            </u-form-item>

            <u-form-item>
              <u-button type="primary" size="medium" @click="search">搜索</u-button>
            </u-form-item>
          </u-form>
        </view>
      </u-popup>
    <scroll-view scroll-x="true" style="width: 100%;overflow: hidden;white-space: nowrap;">
      <view v-if="reportType === 0">
        <u-table v-if = "listQuery.way ===1">
          <u-tr class="u-tr" >
            <u-th  class="u-td" width="100px">项目名称</u-th>
            <u-th  >
              <u-th  class="u-td" >在建项目合计</u-th>
              <u-tr width="670px">
                <u-th  class="u-td" width="110px">个数（个）</u-th>
                <u-th  class="u-td" width="130px">总投资（万元）</u-th>
                <u-th  class="u-td" width="140px">累计完成（万元）</u-th>
                <u-th  class="u-td" width="160px">今年计划总投资（万元）</u-th>
                <u-th  class="u-td" width="140px">今年完成（万元）</u-th>
              </u-tr>
            </u-th>
          </u-tr>

          <u-tr>
            <u-td>1</u-td>
            <u-td>1</u-td>
            <u-td>1</u-td>
            <u-td>1</u-td>
            <u-td>1</u-td>
            <u-td>1</u-td>
          </u-tr>
        </u-table>
      </view>
      <view v-if="reportType === 1 && detailList.length  > 0">
        <u-table >
          <u-tr class="u-tr" >
            <u-td width="30%" class="u-td" v-for="(item, index) in detailTableHead" :prop = item.prop :key = index >{{item.label}}</u-td>
          </u-tr>
          <u-tr class="u-tr" v-for="(item, index) in detailList" :key = index>
            <u-td width="30%" class="u-td" v-for="(value,index) in detailTableHead" :key = index >{{item[value.prop]}}</u-td>
          </u-tr>
        </u-table>
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
  import UTr from "../../../uview-ui/components/u-tr/u-tr";
	export default {
    components: {UTr, CudtSelect, CudtNumRange, CitySelect},
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
    /deep/ .u-td[data-v-35ace0c0]{
      height: auto;
    }
  }

</style>
