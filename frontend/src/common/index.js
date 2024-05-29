const backendDomin = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    allUser: {
        url: `${backendDomin}/api/all-user`,
        method: 'get'
    },
    allOrders: {
        url: `${backendDomin}/api/all-orders`,
        method: 'get'
    },
    getMyOrders: {
        url: `${backendDomin}/api/my-orders`,
        method: 'get'
    },
    getDeliveryFee: {
        url: `${backendDomin}/api/delivery-charge`,
        method: 'get'
    },
    updateDeliveryFee: {
        url: `${backendDomin}/api/delivery-charge`,
        method: 'put'
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: 'post'
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: 'get'
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: 'post'
    },
    categoryProduct: {
        url: `${backendDomin}/api/get-categoryProduct`,
        method: 'get'
    },
    categoryWiseProduct: {
        url: `${backendDomin}/api/category-product`,
        method: 'post'
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post'
    },
    addToCartProduct: {
        url: `${backendDomin}/api/addtocart`,
        method: 'post'
    },
    addToCartProductCount: {
        url: `${backendDomin}/api/countAddToCartProduct`,
        method: 'get'
    },
    addToCartProductView: {
        url: `${backendDomin}/api/view-card-product`,
        method: 'get'
    },
    updateCartProduct: {
        url: `${backendDomin}/api/update-cart-product`,
        method: 'post'
    },
    deleteCartProduct: {
        url: `${backendDomin}/api/delete-cart-product`,
        method: 'post'
    },
    searchProduct: {
        url: `${backendDomin}/api/search`,
        method: 'get'
    },
    filterProduct: {
        url: `${backendDomin}/api/filter-product`,
        method: 'post'
    },
    deleteProduct: {
        url: `${backendDomin}/api/delete-product`,
        method: 'delete'
    },
    updateOrder: {
        url: `${backendDomin}/api/update-order`,
        method: "put"
    },
    deleteOrder: {
        url: `${backendDomin}/api/delete-order`,
        method: 'delete'
    },
    topProducts: {
        url: `${backendDomin}/api/top-products-last-month`,
        method: 'get'
    },
    getYarlyProfit: {
        url: `${backendDomin}/api/yearly-profit`,
        method: 'get'
    },
    getSalesProfit: {
        url: `${backendDomin}/api/sales-profit`,
        method: 'post'
    },
    getRecentOrders: {
        url: `${backendDomin}/api/recent-orders`,
        method: 'get'
    }
}


export default SummaryApi