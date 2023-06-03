import { InMemoryCache } from 'apollo-cache-inmemory'
import { networkCache } from './rootQuery.graphql'
import { TypeName, DataArray } from './models'
import store from 'store'
import { networkCache_network as NetworkType } from './apolloTypes/favAddressCache'

export const resolvers = {
    Mutation: {
        /**
         * Change a network to the cache if .
         * @param name: string, new network name if any
         * @param cache: InMemoryCache, apollo cache object
         * @return - returns cachedNetworkType data type or null if !data.network
         */
        changeNetwork: (root, { name }, { cache }) => {
            const newNetwork: NetworkType = {
                __typename: TypeName.network,
                name: name || ''
            }
            return changeNetworkExplorer(cache, newNetwork)
        }
    }
}

/*
  ===================================================================================
   Functions:
  ===================================================================================
*/

/**
 * Function updates apollo cache, as we as,local storage in the application,
 * @param cache: InMemoryCache, apollo cache object
 * @param item: NetworkType;
 *    - change: will change item to the cache
 *
 * @return - returns NetworkType - item
 */

const changeNetworkExplorer = (cache: InMemoryCache, item: NetworkType): NetworkType => {
    const newData = { network: item }
    cache.writeQuery({ query: networkCache, data: newData })
    store.set(DataArray.network, item.name)
    return item
}
