<template>
	<view class="reportLog-v jnpf-wrap jnpf-wrap-workflow">
		<view>
			<u-form :model="dataForm" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
				label-width="150" label-align="left">
				<u-form-item label="日志标题" prop="title" required>
					<u-input v-model="dataForm.title" placeholder="请输入日志标题" :disabled="disabled"></u-input>
				</u-form-item>
				<u-form-item label="今日内容" prop="todayContent" required>
					<u-input v-model="dataForm.todayContent" type="textarea" placeholder="请输入今日内容" :disabled="disabled" />
				</u-form-item>
				<u-form-item label="明日内容" prop="tomorrowContent" required>
					<u-input v-model="dataForm.tomorrowContent" type="textarea" placeholder="请输入明日内容"  :disabled="disabled"/>
				</u-form-item>
				<u-form-item label="遇到问题" prop="question" required>
					<u-input v-model="dataForm.question" type="textarea" placeholder="请输入遇到问题"  :disabled="disabled"/>
				</u-form-item>
				<u-form-item label="发送给谁" prop="userIds" required>
					<jnpf-org-select v-model="dataForm.userIds" :disabled="disabled"></jnpf-org-select>
				</u-form-item>
			</u-form>
		</view>


		<view class="reportLog-saveBox" v-if="type === '0'">
			<u-button type="primary" size="default" @click="save">保存</u-button>
		</view>
	</view>
</template>

<script>
	import {
		infoReportLog,
		saveReportLog,
		modifyReportLog
	} from '@/api/apply/reportLog.js'
	export default {
		data() {
			return {
				dataForm: {
					title: '',
					todayContent: '',
					tomorrowContent: '',
					question: '',
					userIds: ''
				},
				rules: {
					title: [{
						required: true,
						message: '日志标题不能为空',
						trigger: 'blur'
					}],
					todayContent: [{
						required: true,
						message: '今日内容不能为空',
						trigger: 'blur'
					}],
					tomorrowContent: [{
						required: true,
						message: '明日内容不能为空',
						trigger: 'blur'
					}],
					question: [{
						required: true,
						message: '问题不能为空',
						trigger: 'blur'
					}],
					userIds: [{
						required: true,
						message: '用户不能为空',
						trigger: 'blur'
					}],
				},
				type: '0',
				disabled:false
			}
		},

		onReady() {
			this.$refs.dataForm.setRules(this.rules);
		},
		onLoad(option) {
			this.type = option.type
			if(this.type == '1') this.disabled = true
			if (!option.id) return
			infoReportLog(option.id).then(res => {
				this.dataForm = res.data;
				if(this.type == '1'){
					uni.setNavigationBarTitle({
						title: this.dataForm.title
					});
				}
			})
		},
		methods: {
			save() {
				this.$refs.dataForm.validate((valid) => {
					this.dataForm.toUserId = this.dataForm.userIds
					if (valid) {
						if (this.dataForm.id) {
							modifyReportLog(this.dataForm, this.dataForm.id).then(res => {
								uni.navigateBack();
							})
						} else {
							saveReportLog(this.dataForm, this.dataForm.id).then(res => {
								uni.navigateBack();
							})
						}
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
