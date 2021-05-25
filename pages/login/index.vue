<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="box">
			<u-form :model="formData" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
				label-width="150" label-align="left">
				<u-form-item prop="account" left-icon="account">
					<u-input v-model="formData.account" placeholder="请输入帐号"></u-input>
				</u-form-item>
				<u-form-item prop="password" left-icon="lock">
					<u-input v-model="formData.password" type="password" placeholder="请输入密码"></u-input>
				</u-form-item>
			</u-form>
			<u-button @click="login" type="primary" :loading="loading">{{ loading ? "登录中...":"登录"}}</u-button>
		</view>
		<view class="copyright">
			<text class="txt">Copyright © 2021 引迈信息技术有限公司出品</text>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		login
	} from '@/api/common.js'
	import md5Libs from "uview-ui/libs/function/md5";
	import resources from '@/libs/resources'

	export default {
		data() {
			return {
				loading: false,
				formData: {
					account: "101002",
					password: "0000"
				},
				loginbanner: resources.banner.loginbanner,
				loginlogo: resources.banner.loginlogo,
				rules: {
					account: [{
						required: true,
						message: '请输入账号',
						trigger: 'blur',
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
					}],
				}
			}
		},
		onReady() {
			this.$refs.dataForm.setRules(this.rules);
			// this.$u.toast('测试');
		},
		onLoad() {},
		methods: {
			login() {
				this.$refs.dataForm.validate(valid => {
					if (valid) {
						this.loading = true
						let query = {
							account: this.formData.account,
							password: md5Libs.md5(this.formData.password)
						}
						// #ifdef  APP-PLUS
						const clientId = plus.push.getClientInfo().clientid;
						query.clientId = clientId
						// #endif
						login(query).then(res => {
							this.loading = false
							let token = res.data.token
							this.$store.commit('user/SET_TOKEN', token)
							uni.setStorageSync('token', token)
							uni.switchTab({
								url: '/pages/index/index'
							});
						}).catch(() => {
							this.loading = false
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifndef APP-PLUS */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #3281ff;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #3281ff;
		top: 0;
		z-index: 999;
	}

	/* #endif */



	.copyright {
		color: #AEAFB5;
		width: 100%;
		position: absolute;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-bottom: 20rpx;
	}
</style>
