import {
	mapGetters
} from "vuex"
import {
	getMenuList
} from '@/api/apply/apply.js'
export default {
	data() {
		return {
			menuList:[]
		};
	},
	computed: {
		...mapGetters(['badgeNum']),
	},
	onShow() {
		this.setTabBarBadge()
	},
	onLoad() {
		getMenuList().then(res => {
			this.menuList = res.data.menuList
		})
	},
	methods: {
		setTabBarBadge() {
			const badgeNum = this.badgeNum
			if (badgeNum) {
				uni.setTabBarBadge({
					index: 0,
					text: badgeNum > 99 ? '99+' : badgeNum.toString()
				});
			} else {
				uni.removeTabBarBadge({
					index: 0
				});
			}
		}
	}
}
