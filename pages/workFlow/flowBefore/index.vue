<template>
	<view class="flowBefore-v">
		<view class="flowBefore-box" v-if="config.opType ==='-1'">
			<scroll-view class="scroll-v" scroll-y>
				<childForm ref="child" :config="config" @eventReciver="eventReciver" />
			</scroll-view>
		</view>
		<view class="flowBefore-box" v-else>
			<view class="u-border-bottom">
				<u-tabs :list="tabBars" :is-scroll="false" :current="tabIndex" @change="tabChange" height="100">
				</u-tabs>
			</view>
			<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="ontabchange">
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-v" scroll-y>
						<view>
							<view class="flowStatus" v-if="config.opType==0 || config.opType==4">
								<image :src="flowStatus" mode="widthFix"></image>
							</view>
							<childForm ref="child" :config="config" @eventReciver="eventReciver" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-v" scroll-y>
						<view class="nodeList-v">
							<steps :options="flowTaskNodeList" />
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view class="scroll-v" scroll-y>
						<view class="record-v">
							<records :options="recordList" :endTime="endTime" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view class="flowBefore-actions">
			<template v-if="config.opType=='-1'">
				<u-button class="buttom-btn" @click="eventLancher('save')" :loading="btnLoading">保存
				</u-button>
				<u-button class="buttom-btn" type="primary" @click="eventLancher('submit')">提交</u-button>
			</template>
			<template v-if="config.opType == 0">
				<template v-if="config.status == 1">
					<u-button class="buttom-btn" type="error" @click="operate('revoke','撤回')">撤回</u-button>
					<u-button class="buttom-btn" type="primary" @click="handlePress()">催办</u-button>
				</template>
				<u-button class="buttom-btn" @click="jnpf.goBack()" v-else>返回</u-button>
			</template>
			<template v-if="config.opType == 1">
				<u-button class="buttom-btn" type="error" v-if="properties.hasRejectBtn"
					@click="eventLancher('reject')">
					{{properties.rejectBtnText||'拒绝'}}
				</u-button>
				<u-button class="buttom-btn" type="primary" v-if="properties.hasAuditBtn"
					@click="eventLancher('audit')">
					{{properties.auditBtnText||'通过'}}
				</u-button>
				<u-button class="buttom-btn" type="warning" @click="openUserBox('transfer')"
					v-if="properties.hasTransferBtn">
					{{properties.transferBtnText||'转办'}}
				</u-button>
			</template>
			<u-button class="buttom-btn" type="error" v-if="config.opType == 2 && properties.hasRevokeBtn"
				@click="operate('recall',properties.revokeBtnText)">
				{{properties.revokeBtnText||'撤回'}}
			</u-button>
			<u-button class="buttom-btn" @click="jnpf.goBack()" v-if="config.opType == 3">返回</u-button>
		</view>
		<tree-select v-model="userSelectShow" @confirm="selectConfirm" :options="userOptions" lastLevel
			lastLevelKey="type" lastLevelValue="user" title="请选择审批人" />
	</view>
</template>

<script>
	import {
		FlowEngineInfo
	} from '@/api/workFlow/flowEngine'
	import {
		Create,
		Update,
		DynamicCreate,
		DynamicUpdate
	} from '@/api/workFlow/workFlowForm'
	import {
		FlowBeforeInfo,
		Audit,
		Reject,
		Transfer,
		Recall,
		Cancel
	} from '@/api/workFlow/flowBefore'
	import {
		Revoke,
		Press
	} from '@/api/workFlow/flowLaunch'
	import resources from '@/libs/resources.js'
	import treeSelect from '@/components/jnpf/jnpf-tree-select/tree-select';
	import childForm from './form.vue'
	import steps from '../components/steps.vue'
	import records from '../components/records.vue'
	export default {
		components: {
			treeSelect,
			childForm,
			steps,
			records
		},
		data() {
			return {
				config: {},
				currentView: '',
				formData: {},
				flowTaskInfo: {},
				flowTaskNodeList: [],
				recordList: [],
				properties: {},
				endTime: 0,
				tabIndex: 0,
				tabBars: [{
					name: '表单信息'
				}, {
					name: '流程信息'
				}, {
					name: '流转记录'
				}],
				flowStatus: '',
				stepIndex: 0,
				userSelectShow: false,
				userOptions: [],
				btnLoading: false,
				eventType: ''
			};
		},
		onLoad(option) {
			const config = JSON.parse(decodeURIComponent(option.config))
			if (!config) return this.jnpf.goBack()
			this.config = config
			this.init()
			this.eventHub.$on('operate', data => {
				this[data.eventType + 'Handle'](data)
			})
		},
		onUnload() {
			this.eventHub.$off('operate')
		},
		methods: {
			tabChange(index) {
				this.tabIndex = index;
			},
			ontabchange(e) {
				let index = e.target.current || e.detail.current;
				this.tabIndex = index;
			},
			init() {
				this.tabIndex = 0
				uni.setNavigationBarTitle({
					title: this.config.fullName
				})
				/**
				 * opType
				 * -1 - 我发起的新建/编辑 
				 * 0 - 我发起的详情
				 * 1 - 待办事宜
				 * 2 - 已办事宜
				 * 3 - 抄送事宜
				 */
				if (this.config.opType == '-1') {
					this.getEngineInfo(this.config)
				} else {
					this.getBeforeInfo(this.config)
				}
			},
			getEngineInfo(data) {
				FlowEngineInfo(data.flowId).then(res => {
					data.formConf = res.data.formData
					const flowTemplateJson = res.data.flowTemplateJson ? JSON.parse(res.data.flowTemplateJson) :
						null
					data.formOperates = []
					if (flowTemplateJson && flowTemplateJson.properties && flowTemplateJson.properties
						.formOperates) {
						data.formOperates = flowTemplateJson.properties.formOperates || []
					}
					setTimeout(() => {
						this.$nextTick(() => {
							if (!this.$refs.child || !this.$refs.child.$refs.form || !this.$refs
								.child.$refs.form.init) {
								uni.showToast({
									title: '暂无此流程表单',
									icon: 'none',
									complete: () => {
										setTimeout(() => {
											uni.navigateBack()
										}, 1500)
									}
								})
								return
							}
							this.$refs.child.$refs.form.init(data)
						})
					}, 100)
				})
			},
			getBeforeInfo(data) {
				FlowBeforeInfo(data.id, {
					taskNodeId: data.taskNodeId
				}).then(res => {
					this.flowTaskInfo = res.data.flowTaskInfo
					this.flowTaskNodeList = res.data.flowTaskNodeList
					this.recordList = res.data.flowTaskOperatorRecordList
					this.properties = res.data.approversProperties || {}
					this.endTime = this.flowTaskInfo.completion == 100 ? this.flowTaskInfo.endTime : 0
					const flowTemplateJson = this.flowTaskInfo.flowTemplateJson ? JSON.parse(this.flowTaskInfo
						.flowTemplateJson) : null
					this.endTime = this.flowTaskInfo.completion == 100 ? this.flowTaskInfo.endTime : 0
					data.formConf = res.data.flowFormInfo
					if (data.opType != 1) data.readonly = true
					data.formOperates = []
					if (data.opType == 0) {
						if (flowTemplateJson && flowTemplateJson.properties && flowTemplateJson.properties
							.formOperates) {
							data.formOperates = flowTemplateJson.properties.formOperates || []
						}
					} else {
						data.formOperates = res.data.formOperates || []
					}
					if (this.config.opType === 1) {
						this.$store.dispatch('base/getUserTree').then(res => {
							this.userOptions = res
						})
					}
					switch (this.config.status) {
						case 1: //等待审核
							this.flowStatus = resources.status.review
							break;
						case 2: //审核通过
							this.flowStatus = resources.status.reviewAdopt
							break;
						case 3: //审核驳回
							this.flowStatus = resources.status.reviewRefuse
							break;
						case 4: //审核撤回
							this.flowStatus = resources.status.reviewUndo
							break;
						case 5: //审核终止
							this.flowStatus = resources.status.reviewStop
							break;
						default: //等待审核
							this.flowStatus = resources.status.review
							break;
					}
					setTimeout(() => {
						this.$nextTick(() => {
							if (!this.$refs.child || !this.$refs.child.$refs.form || !this.$refs
								.child.$refs.form.init) {
								uni.showToast({
									title: '暂无此流程表单',
									icon: 'none',
									complete: () => {
										setTimeout(() => {
											uni.navigateBack()
										}, 1500)
									}
								})
								return
							}
							this.$refs.child.$refs.form.init(data)
						})
					}, 100)
				})
			},
			eventLancher(eventType) {
				this.$refs.child && this.$refs.child.$refs.form && this.$refs.child
					.$refs.form.submit(eventType)
			},
			eventReciver(formData, eventType) {
				this.formData = formData
				this.eventType = eventType
				if (eventType === 'save' || eventType === 'submit') {
					return this.submitOrSave(eventType)
				}
				if (eventType === 'audit') {
					return this.operate('audit', this.properties.auditBtnText)
				}
				if (eventType === 'reject') {
					return this.operate('reject', this.properties.rejectBtnText)
				}
			},
			submitOrSave(eventType) {
				this.formData.status = eventType === 'submit' ? 0 : 1
				if (eventType === 'save') return this.handleRequest()
				uni.showModal({
					title: '提示',
					content: '您确定要提交当前流程吗？',
					success: res => {
						if (res.confirm) {
							this.handleRequest()
						}
					}
				})
			},
			selectConfirm(e) {
				const ids = e.map(o => o.id)
				const id = ids.join()
				if (this.eventType === 'transfer') return this.handleTransfer(id)
			},
			handleRequest() {
				if (this.eventType === 'save') this.btnLoading = true
				let formMethod = null
				if (this.config.formType == 1) {
					formMethod = this.formData.id ? Update : Create
				} else {
					formMethod = this.formData.id ? DynamicUpdate : DynamicCreate
				}
				formMethod(this.config.enCode, this.formData).then(res => {
					uni.showToast({
						title: res.msg,
						complete: () => {
							setTimeout(() => {
								if (this.formData.id) this.eventHub.$emit('refresh')
								this.btnLoading = false
								uni.navigateBack()
							}, 1500)
						}
					})
				}).catch(() => {
					this.btnLoading = false
				})
			},
			handlePress() {
				uni.showModal({
					title: '提示',
					content: '此操作将提示该节点尽快处理',
					success: res => {
						if (res.confirm) {
							Press(this.config.id).then(res => {
								this.$u.toast(res.msg)
							})
						}
					}
				})
			},
			openUserBox(eventType) {
				this.userSelectShow = true
				this.eventType = eventType
			},
			operate(eventType, title) {
				let config = {
					eventType,
					title: '确认' + title.replace(/\s+/g, "")
				}
				if (eventType === 'audit' || eventType === 'reject') {
					config = {
						...config,
						hasSign: this.properties.hasSign,
						hasFreeApprover: this.properties.hasFreeApprover,
						isCustomCopy: this.properties.isCustomCopy
					}
				}
				uni.navigateTo({
					url: '/pages/workFlow/operate/index?config=' + encodeURIComponent(JSON.stringify(config))
				})
			},
			handleTransfer(freeApproverUserId) {
				Transfer(this.config.taskId, {
					freeApproverUserId
				}).then(res => {
					this.toastAndBack(res.msg, true)
				})
			},
			revokeHandle(data) {
				Revoke(this.config.id, {
					handleOpinion: data.handleOpinion
				}).then(res => {
					this.toastAndBack(res.msg, true)
				})
			},
			recallHandle(data) {
				Recall(this.config.taskId, {
					handleOpinion: data.handleOpinion
				}).then(res => {
					this.toastAndBack(res.msg, true)
				})
			},
			auditHandle(data) {
				this.handleApproval(data)
			},
			rejectHandle(data) {
				this.handleApproval(data)
			},
			handleApproval(data) {
				const query = {
					...data,
					formData: this.formData,
					enCode: this.config.enCode
				}
				const approvalMethod = data.eventType === 'audit' ? Audit : Reject
				approvalMethod(this.config.taskId, query).then(res => {
					this.toastAndBack(res.msg, true)
				})
			},
			toastAndBack(title, refresh) {
				uni.showToast({
					title: title,
					complete: () => {
						setTimeout(() => {
							if (refresh) this.eventHub.$emit('refresh')
							uni.navigateBack()
						}, 1500)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f0f2f6;
		height: 100%;
	}

	.flowBefore-v {
		height: 100%;
		display: flex;
		flex-direction: column;

		.flowBefore-box {
			height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		.swiper-box {
			flex: 1;
		}

		.swiper-item {
			flex: 1;
			flex-direction: row;
		}

		.scroll-v {
			flex: 1;
			/* #ifndef MP-ALIPAY */
			flex-direction: column;
			/* #endif */
			width: 100%;
			height: 100%;
		}

		.flowStatus {
			position: absolute;
			top: 0;
			right: 0;
			border: 0;
			margin: 20rpx;
			opacity: 0.7;
			z-index: 9;

			image {
				width: 200rpx;
			}
		}
	}

	.nodeList-v,
	.record-v {
		padding: 32rpx 32rpx 10rpx;
		background-color: #fff;
	}
</style>
