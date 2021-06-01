<template>
	<view class="jnpf-wrap jnpf-wrap-workflow">
		<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
			label-width="150" label-align="left">
			<u-form-item label="流程标题" prop="flowTitle" required v-if="judgeShow('flowTitle')">
				<u-input v-model="dataForm.flowTitle" placeholder="流程标题"></u-input>
			</u-form-item>
			<u-form-item label="流程编码" prop="billNo" v-if="judgeShow('billNo')" required>
				<u-input v-model="dataForm.billNo" placeholder="流程编码" disabled></u-input>
			</u-form-item>
			<u-form-item label="紧急程度" prop="flowUrgent" required v-if="judgeShow('flowUrgent')">
				<jnpf-select v-model="dataForm.flowUrgent" placeholder="请选择紧急程度" :options="flowUrgentOptions">
				</jnpf-select>
			</u-form-item>

			<view class="jnpf-card">
				<u-form-item label="客户名称" prop="customerName" v-if="judgeShow('customerName')" required>
					<u-input v-model="dataForm.customerName" placeholder="客户名称"></u-input>
				</u-form-item>
				<u-form-item label="联系人员" prop="contacts" v-if="judgeShow('contacts')">
					<u-input v-model="dataForm.contacts" placeholder="联系人员"></u-input>
				</u-form-item>
				<u-form-item label="联系电话" prop="contactPhone" v-if="judgeShow('contactPhone')" required>
					<u-input v-model="dataForm.contactPhone" placeholder="联系电话" type="number"></u-input>
				</u-form-item>
				<u-form-item label="客户地址" prop="customerAddres" v-if="judgeShow('customerAddres')">
					<u-input v-model="dataForm.customerAddres" placeholder="客户地址"></u-input>
				</u-form-item>
			</view>

			<u-form-item label="货品所属" prop="goodsBelonged" v-if="judgeShow('goodsBelonged')">
				<u-input v-model="dataForm.goodsBelonged" placeholder="货品所属"></u-input>
			</u-form-item>
			<u-form-item label="发货日期" prop="invoiceDate" v-if="judgeShow('invoiceDate')">
				<jnpf-date-time type="datetime" v-model="dataForm.invoiceDate" placeholder="请选择发货日期"></jnpf-date-time>
			</u-form-item>
			<u-form-item label="货运公司" prop="freightCompany" v-if="judgeShow('freightCompany')">
				<u-input v-model="dataForm.freightCompany" placeholder="货运公司"></u-input>
			</u-form-item>
			<u-form-item label="发货类型" prop="deliveryType" v-if="judgeShow('deliveryType')">
				<u-input v-model="dataForm.deliveryType" placeholder="发货类型"></u-input>
			</u-form-item>
			<u-form-item label="货运单号" prop="rransportNum" v-if="judgeShow('rransportNum')">
				<u-input v-model="dataForm.rransportNum" placeholder="货运单号"></u-input>
			</u-form-item>
			<u-form-item label="货运费用" prop="freightCharges" v-if="judgeShow('freightCharges')">
				<u-input v-model="dataForm.freightCharges" placeholder="货运费用" type="number"></u-input>
			</u-form-item>
			<u-form-item label="保险金额" prop="cargoInsurance" v-if="judgeShow('cargoInsurance')">
				<u-input v-model="dataForm.cargoInsurance" placeholder="保险金额" type="number"></u-input>
			</u-form-item>
			<u-form-item label="发货金额" prop="invoiceValue" v-if="judgeShow('invoiceValue')">
				<u-input v-model="dataForm.invoiceValue" placeholder="发货金额" type="number"></u-input>
			</u-form-item>
			<u-form-item label="备注" prop="description" v-if="judgeShow('description')">
				<u-input v-model="dataForm.description" placeholder="备注" type="textarea"></u-input>
			</u-form-item>

			<view class="jnpf-table" v-if="judgeShow('entryList')">
				<view class="jnpf-table-item" v-for="(item,i) in dataForm.entryList" :key="i">
					<view class="jnpf-table-item-title u-flex u-row-between">
						<text class="jnpf-table-item-title-num">商品添购({{i+1}})</text>
						<view class="jnpf-table-item-title-action" v-if="dataForm.entryList.length>1"
							@click="delItem(i)">删除
						</view>
					</view>
					<u-form-item label="商品名称" prop="dataForm.entryList[i].goodsName">
						<u-input v-model="dataForm.entryList[i].goodsName" placeholder="请输入商品名称"></u-input>
					</u-form-item>
					<u-form-item label="规格类型" prop="dataForm.entryList[i].specifications">
						<u-input v-model="dataForm.entryList[i].specifications" placeholder="规格类型"></u-input>
					</u-form-item>
					<u-form-item label="单位" prop="dataForm.entryList[i].unit">
						<u-input v-model="dataForm.entryList[i].unit" placeholder="单位"></u-input>
					</u-form-item>
					<u-form-item label="数量" prop="dataForm.entryList[i].qty">
						<u-input v-model="dataForm.entryList[i].qty" placeholder="数量" type="number"
							@input="count(dataForm.entryList[i])"></u-input>
					</u-form-item>
					<u-form-item label="单价" prop="dataForm.entryList[i].price">
						<u-input v-model="dataForm.entryList[i].price" placeholder="单价" type="number"
							@input="count(dataForm.entryList[i])"></u-input>
					</u-form-item>
					<u-form-item label="金额" prop="dataForm.entryList[i].amount">
						<u-input v-model="dataForm.entryList[i].amount" placeholder="金额"></u-input>
					</u-form-item>
				</view>
				<view class="jnpf-table-addBtn" @click="addItem">
					<u-icon name="plus" color="#2979ff"></u-icon>添加
				</view>
			</view>
		</u-form>
	</view>
</template>

<script>
	import comMixin from '../mixin'
	export default {
		name: 'ApplyDeliverGoods',
		mixins: [comMixin],
		data() {
			return {
				billEnCode: 'WF_ApplyDeliverGoodsNo',
				dataForm: {
					flowTitle: '',
					billNo: '',
					flowUrgent: 1,
					invoiceDate: '',
					customerAddres: '',
					freightCharges: '',
					rransportNum: '',
					invoiceValue: '',
					cargoInsurance: '',
					customerName: '',
					contactPhone: '',
					deliveryType: '',
					description: '',
					ransportNum: '',
					freightCompany: '',
					goodsBelonged: '',
					contacts: '',
					entryList: [{
						goodsName: '',
						specifications: '',
						unit: '',
						qty: '',
						price: '',
						amount: ''
					}]
				},
				rules: {
					flowTitle: [{
						required: true,
						message: '流程标题不能为空',
						trigger: 'blur'
					}],
					flowUrgent: [{
						required: true,
						message: '紧急程度不能为空',
						trigger: 'change',
						type: 'number'
					}],
					billNo: [{
						required: true,
						message: '流程编码不能为空',
						trigger: 'blur',
					}],
					customerName: [{
						required: true,
						message: '客户名称不能为空',
						trigger: 'blur',
					}],

					contactPhone: [{
						required: true,
						pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
						message: '手机号码不正确',
						type: 'string',
						trigger: ['change', 'blur'],
					}],
				},
			}
		},
		methods: {
			selfInit(data) {
				this.dataForm.applyDate = new Date().getTime()
				this.dataForm.flowTitle = this.userInfo.userName + "的发货申请"
				this.dataForm.applyUser = this.userInfo.userName + '/' + this.userInfo.userAccount
				if (this.userInfo.positionIds && this.userInfo.positionIds.length) {
					let list = this.userInfo.positionIds.map(o => o.name)
					this.dataForm.position = list.join(',')
				}
			},
			/* 添加子表 */
			addItem() {
				const item = {
					goodsName: '',
					specifications: '',
					unit: '',
					qty: '',
					price: '',
					amount: ''
				}
				this.dataForm.entryList.push(item)
			},
			/* 删除子表 */
			delItem(index) {
				this.dataForm.entryList.splice(index, 1)
			},

			/* 计算价格 */
			count(row) {
				//金额 = 数量*单价
				row.amount = this.jnpf.toDecimal(parseFloat(row.price) * parseFloat(row.qty))
				//折扣价 = (单价*折扣)
				var discountPrice = row.price * (row.discount / 100);
				//实际单价 = 折扣价 * (1 + (税率 / 100))
				row.actualPrice = this.jnpf.toDecimal(discountPrice * (1 + (row.cess / 100)));
				//实际金额
				row.actualAmount = this.jnpf.toDecimal(parseFloat(row.actualPrice) * parseFloat(row
					.qty))
				this.$forceUpdate()
			}
		}
	}
</script>
