<template>
	<view class="reportLog-v jnpf-wrap jnpf-wrap-workflow">
		<view>
			<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
				label-width="150" label-align="left">
				<view class="jnpf-card">
					<u-form-item label="开始时间" prop="startTime" required>
						<jnpf-date-time type="date" v-model="dataForm.startTime" placeholder="开始时间">
						</jnpf-date-time>
					</u-form-item>
					<u-form-item label="结束时间" prop="endTime" required>
						<jnpf-date-time type="date" v-model="dataForm.endTime" placeholder="结束时间"></jnpf-date-time>
					</u-form-item>
					<u-form-item label="记录内容" prop="content" required>
						<u-input v-model="dataForm.content" type="textarea" placeholder="请输入记录内容" />
					</u-form-item>
				</view>
				<u-form-item label="提醒设置" prop="early">
					<u-input v-model="dataForm.early" type="number" placeholder="默认一小时提醒我" />
				</u-form-item>
				<u-form-item label="APP提醒" prop="appAlert">
					<jnpf-switch v-model="dataForm.appAlert"></jnpf-switch>
				</u-form-item>
				<u-form-item label="微信提醒" prop="weChatAlert">
					<jnpf-switch v-model="dataForm.weChatAlert"></jnpf-switch>
				</u-form-item>
				<u-form-item label="邮件提醒" prop="mailAlert">
					<jnpf-switch v-model="dataForm.mailAlert"></jnpf-switch>
				</u-form-item>
				<u-form-item label="短信提醒" prop="mobileAlert">
					<jnpf-switch v-model="dataForm.mobileAlert"></jnpf-switch>
				</u-form-item>
			</u-form>
		</view>


		<view class="reportLog-saveBox">
			<u-button type="primary" size="default" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		infoSchedule,
		saveSchedule,
		modifySchedule
	} from '@/api/apply/schedule.js'
	export default {
		data() {
			return {
				dataForm: {
					appAlert: '',
					colour: "",
					content: "",
					early: '',
					endTime: '',
					mailAlert: '',
					mobileAlert: '',
					startTime: '',
					weChatAlert: '',
				},
				rules: {
					startTime: [{
						required: true,
						message: '开始时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					endTime: [{
						required: true,
						message: '结束时间不能为空',
						trigger: 'change',
						type: 'number'
					}],
					content: [{
						required: true,
						message: '记录不能为空',
						trigger: 'change',
					}],
				},
				type: '0',
				disabled: false,
				id: ''
			}
		},

		onReady() {
			this.$refs.dataForm.setRules(this.rules);
		},
		onLoad(option) {
			this.id = option.id;
			if (option.id) {
				uni.setNavigationBarTitle({
					title:'日程编辑'
				});
				infoSchedule(option.id).then(res => {
					this.dataForm = res.data
				})
			}
		},
		methods: {
			save() {
				this.$refs.dataForm.validate((valid) => {
					if (valid) {
						const formMethod = this.id ? modifySchedule : saveSchedule;
						formMethod(this.dataForm, this.id).then(res => {
							uni.redirectTo({
								url: 'index',
							});
						})
					}
				})
			}
		}
	}
</script>
<style lang="scss">
	.reportLog-v {
		.reportLog-saveBox {
			width: 100%;
			position: fixed;
			bottom: 30rpx;
			padding: 0 16rpx;
		}
	}
</style>
