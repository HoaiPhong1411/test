const configs = {
    APOLLO_HTTP: 'https://eth-api.thangovn.com/graphql',
    APOLLO_WS: '',
    OPENSEA: process.env.VUE_APP_OPENSEA_API || '',
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.VERSION,
    ROUTER_MODE: process.env.ROUTER_MODE || 'history',
    ETHEREUM_APP_URL: '',
    TRON_APP_URL: ''
}
export default configs
