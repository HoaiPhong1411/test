import { Component, Vue } from 'vue-property-decorator'
import { changeNetwork } from './actions.graphql'
import { CheckTokenRefetch } from '@app/modules/favorite-tokens/models/FavApolloRefetch'
import { error } from 'console'
import { networks } from '@app/apollo/network/network'
import configs from '@app/configs'

@Component
export class NetworkActions extends Vue {
    /*
    ===================================================================================
      Methods
    ===================================================================================
    */

    /**
     * Adds Network to the favorite list
     * @param name: string, new network name
     * @return Promise boolean: true if action was sucessfull, otherwise false
     */
    async mixinChangeNetwork(name: String): Promise<any> {
        const res = await this.$apollo
            .mutate({
                mutation: changeNetwork,
                client: 'NetworkClient',
                variables: {
                    name: name
                }
                // refetchQueries: _refetch
            })
            .then(data => {
                window.location.href = data.data.changeNetwork.name === networks.ETH ? configs.ETHEREUM_APP_URL : configs.TRON_APP_URL
                return data
            })
            .catch(error => {
                throw error
            })

        return res
    }
}
