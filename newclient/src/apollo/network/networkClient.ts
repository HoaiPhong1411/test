import { network, Query, Mutation } from './schema.graphql'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { resolvers } from './resolvers'
import store from 'store'
import { TypeName, DataArray } from './models'
import { networks, networksData } from './network'
import { networkCache_network as NetworkType } from './apolloTypes/favAddressCache'
import configs from '@app/configs'

const netWorkTypeDef = `${network} ${Query} ${Mutation}`

const netWorkCache = new InMemoryCache()

const getLocalStorageCache = (_cache: InMemoryCache): void => {
    const network = store.get(DataArray.network) || networksData[0]
    const networkFromDomain = window.location.origin === configs.ETHEREUM_APP_URL ? networks.ETH : networks.TRON

    const newNetworkMap: NetworkType = {
        __typename: TypeName.network,
        name: networkFromDomain
    }
    _cache.writeData({
        data: {
            network: newNetworkMap
        }
    })
    store.set(DataArray.network, networkFromDomain)
}
getLocalStorageCache(netWorkCache)

/* Listen to updates on different browser Tabs */
window.addEventListener('storage', event => {
    if (event.key === DataArray.network) {
        getLocalStorageCache(netWorkCache)
    }
})

export const NetworkClient = new ApolloClient({
    cache: netWorkCache,
    typeDefs: netWorkTypeDef,
    resolvers: resolvers
})
