<template>
	<view class="logo-v">
		<view class="login-bg">
			<image src="/static/login-bg.png" mode="widthFix"></image>
		</view>
		<view class="logo-hd u-flex-col" style="">
			<view class="logoImg">
				<image src="/static/logo.png" mode="widthFix"></image>
			</view>
			<view class="u-flex-col introduce u-m-t-30">
				<text class="u-font-36 text-one" style="">JNPF快速开发平台</text>
				<text class="u-font-24 text-two">低代码，企业数字化好帮手</text>
			</view>
			<view class="loginSwitch u-flex-col">
				<view class="loginInputBox u-flex-col">
					<u-form :model="formData" :rules="rules" ref="dataForm" :errorType="['toast']" label-position="left"
						label-width="150" label-align="left">
						<u-form-item prop="account">
							<u-input v-model="formData.account" placeholder="请输入帐号"></u-input>
						</u-form-item>
						<u-form-item prop="password">
							<u-input v-model="formData.password" type="password" placeholder="请输入密码"></u-input>
						</u-form-item>
					</u-form>
					<view class="loginBtnBox u-m-t-64">
						<u-button @click="login" type="primary" :loading="loading">{{ loading ? "登录中...":"登录"}}
						</u-button>
					</view>
				</view>
			</view>
		</view>
		<view class="copyright">Copyright © 2021 引迈信息技术有限公司出品</view>
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
					account: "",
					password: "",
				},
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
		},
		onLoad() {
			this.formData.password = ''
		},
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
								url: '/pages/index/apply'
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

<style lang="scss">
	page {}

	.logo-v {
		.login-bg {
			image {
				width: 100%;
				height: 100%;
			}
		}

		.logo-hd {
			width: 100%;
			position: absolute;
			top: 200rpx;

			.logoImg {
				width: 160rpx;
				height: 160rpx;
				margin: 0 auto;

				image {
					width: 100%;
					height: 100%;
					border-radius: 20%;
				}
			}

			.introduce {
				justify-content: center;
				align-items: center;

				.text-one {
					height: 70rpx;
					font-weight: 700;
				}

				.text-two {
					color: #999999;
				}
			}
		}

		.loginSwitch {
			margin-top: 40rpx;
			justify-content: center;
			align-items: center;

			.tabs {
				color: #999999;
				position: relative;

				&::after {
					content: "";
					width: 64rpx;
					height: 4rpx;
					background-color: #356efe;
					margin-top: 15rpx;
					position: absolute;
					left: 0;
					bottom: -15rpx;
					display: block;
					border-radius: 50rpx;
				}

				// &.active1 {
				// 	&::after {
				// 		left: 0;
				// 	}
				// }

				&.active2 {
					&::after {
						left: 70%;
					}
				}

				.tab {
					width: 50%;
					height: 80upx;
					text-align: center;
					color: #AEAFB5;
					font-size: 32upx;

					&.active {
						color: #3281ff;
					}
				}

			}

			.loginInputBox {
				width: 100%;
				margin-top: 80rpx;
				padding: 0 64rpx;

				.loginBtnBox {}
			}
		}
	}
</style>
