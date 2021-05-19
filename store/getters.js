const getters = {
	token: state => state.user.token,
	userInfo: state => state.user.userInfo,
	dictionaryList: state => state.base.dictionaryList,
}
export default getters
