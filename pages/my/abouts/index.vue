<template>
	<view class="abouts-v">
		<view class="abouts-hd u-flex-col">
			<image :src="logoSrc" mode="widthFix"></image>
			<text>{{version}}</text>
		</view>
		<view class="content u-p-l-32 u-p-r-32 u-p-t-30 u-font-28">
			<text>引迈信息技术有限公司是一家做快速开发平台的企业，针对软件传统开发遇到招人难、留人难、用人成本高、技术更新换代快等一系列问题，只需要一套cudt平台、您遇到的一系列问题就依然而解。
				cudt采用主流的两大技术Java/.Net开发，是一套低代码开发平台，可视化开发环境，有拖拽式的代码生成器，灵活的权限配置、SaaS服务，强大的接口对接，随心可变的工作流引擎，一站式开发多端使用Web、Android、IOS、微信小程序，并且有以构建业务流程、逻辑和数据模型等所需的功能；为企业项目节省80%的重回工作，让开发者将重心放在业务逻辑，不必烦恼底层架构设计，可短时间开发出如ERP、OA、CRM、HR、MIS以及电信、银行、政府、企业等各行业的企业应用系统。
				引迈信息技术有限公司以诚信为根本、服务为基础理念，通过持续不断地研发技术创新、强化平台质量和颜值，为企业保驾护航！</text>
		</view>
		<view class="copyright">Copyright © 2021 引迈信息技术有限公司出品</view>
	</view>
</template>

<script>
	import resources from '@/libs/resources.js'
	export default {
		data() {
			return {
				logoSrc: resources.banner.loginlogo
			}
		},
		computed: {
			version() {
				return this.define.version
			}
		},
	}
</script>

<style lang="scss">
	.abouts-v {
		.abouts-hd {
			width: 100%;
			align-items: center;
			background-color: #3281ff;
			height: 280rpx;
			color: #FFFFFF;
			padding-top: 20rpx;

			image {
				width: 160rpx;
				height: 160rpx;
			}
		}

		.content {
			line-height: 48rpx;
		}
	}
</style>
