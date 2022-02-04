import {
	Info
} from '@/api/workFlow/workFlowForm'
import {
	getBillNumber
} from '@/api/common'

export default {
	data() {
		return {
			flowUrgentOptions: [{
				id: 1,
				fullName: '普通'
			}, {
				id: 2,
				fullName: '重要'
			}, {
				id: 3,
				fullName: '紧急'
			}],
			payProps: {
				label: 'fullName',
				value: 'enCode'
			},
			fileList: [],
			setting: {},
			userInfo: {},
			eventType: '',
			paymentMethodOptions: []
		}
	},
	mounted() {
		this.$refs.dataForm.setRules(this.rules)
		this.userInfo = uni.getStorageSync('userInfo') || {}
	},
	methods: {
		/* 初始化处理 */
		init(data) {
			this.dataForm.id = data.id || ''
			this.setting = data
			this.$nextTick(() => {
				this.$refs.dataForm.resetFields()
				if (this.beforeInit) this.beforeInit()
				if (data.id) {
					if (this.selfGetInfo && typeof this.selfGetInfo === "function") return this.selfGetInfo()
					Info(this.setting.enCode, data.id).then(res => {
						this.dataForm = res.data
						if (res.data.fileJson) {
							this.fileList = JSON.parse(res.data.fileJson)
						}
					})
				} else {
					this.dataForm.flowId = data.flowId
					if (this.selfInit) this.selfInit(data)
					if (!this.billEnCode) return
					getBillNumber(this.billEnCode).then(res => {
						if (data.enCode === 'crmOrder') {
							this.dataForm.orderCode = res.data
						} else {
							this.dataForm.billNo = res.data
						}
					})
				}
			})
		},
		getPaymentMethodOptions() {
			this.$store.dispatch('base/getDictionaryData', {
				sort: 'WFSettlementMethod'
			}).then(res => {
				this.paymentMethodOptions = res
			})
		},
		/* 提交 */
		submit(eventType) {
			this.$refs.dataForm.validate((valid) => {
				if (valid) {
					if (this.exist && !this.exist()) return
					if ('fileJson' in this.dataForm) {
						this.dataForm.fileJson = JSON.stringify(this.fileList)
					}
					this.eventType = eventType
					if (eventType === 'save' || eventType === 'submit') {
						if (this.selfSubmit && typeof this.selfSubmit === "function") {
							this.selfSubmit(this.dataForm)
							return
						}
					}
					this.$emit('eventReciver', this.dataForm, eventType)
				}
			})
		},
		/* 可见 */
		judgeShow(id) {
			if (this.setting.opType == 4) return true
			if (!this.setting.formOperates || !this.setting.formOperates.length) return true
			let arr = this.setting.formOperates.filter(o => o.id === id) || []
			if (!arr.length) return true
			let item = arr[0]
			return item.read
		},
		/* 可写 */
		judgeWrite(id) {
			if (this.setting.readonly) return true
			if (!this.setting.formOperates || !this.setting.formOperates.length) return false
			let arr = this.setting.formOperates.filter(o => o.id === id) || []
			if (!arr.length) return true
			let item = arr[0]
			return !item.write
		}
	}
}
