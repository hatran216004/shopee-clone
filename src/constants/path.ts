const path = {
    home: '/',
    user: '/user',
    profile: '/user/profile',
    changePassword: '/user/password',
    purchaseHistory: '/user/history',
    login: '/login',
    logout: '/logout',
    register: '/register',
    productDetail: ':nameId',
    cart: '/cart'
} as const

export default path
