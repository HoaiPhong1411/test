import { Component, Mixins, Vue } from 'vue-property-decorator'
import { DataArray } from '@app/apollo/network/models'
import { networks } from '@app/apollo/network/network'
import { EnumChain } from '../props'
import { NetworkActions } from '@app/modules/network/mixins/NetworkActions.mixin'
import configs from '@app/configs'

@Component
export class NetworkMixin extends Mixins(NetworkActions) {
    /*
    ===================================================================================
      Computed Values
    ===================================================================================
    */

    /* Get network from domain */
    get network(): EnumChain {
        return window.location.origin === configs.ETHEREUM_APP_URL ? networks.ETH : networks.TRON
    }

    /* network is Tron */
    get isTrx(): boolean {
        return this.network === networks.TRON
    }
    /*
    ===================================================================================
      Methods
    ===================================================================================
    */

    /**
     * Change Network
     * @param param: string, new network param
     */
    changeNetwork(param): void {
        this.mixinChangeNetwork(param)
    }
}
