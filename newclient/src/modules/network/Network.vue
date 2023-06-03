<template>
    <v-layout align-center fill-height justify-end row height="48px" class="module-search pl-1">
        <!-- <v-flex xs12 md12> -->
        <v-card flat class="search-input-container">
            <v-layout fill-height align-center justify-end>
                <v-select
                    v-model="selectVal"
                    :flat="true"
                    :solo="true"
                    :items="selectItems"
                    class="search-select"
                    height="48"
                    append-icon="fa fa-chevron-down secondary--text"
                    @change="changeNetwork"
                />
            </v-layout>
        </v-card>
        <!-- </v-flex> -->
    </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop, Mixins } from 'vue-property-decorator'
import { NetworkActions } from './mixins/NetworkActions.mixin'
import { DataArray } from '@app/apollo/network/models'
import configs from '@app/configs'
import { networks } from '@app/apollo/network/network'

@Component
export default class Search extends Mixins(NetworkActions) {
    /*
  ===================================================================================
    Props
  ===================================================================================
  */
    @Prop({ type: Array }) selectItems!: any[]
    // @Prop({ type: Array }) items!: any[]
    @Prop({ type: Boolean }) isLoading!: string
    @Prop({ type: Boolean }) hasError!: boolean

    /*
  ===================================================================================
    Initial Data
  ===================================================================================
  */

    selectVal = window.location.origin === configs.ETHEREUM_APP_URL ? networks.ETH : networks.TRON
    snackbar = false

    /*

  
  ===================================================================================
    Methods
  ===================================================================================
  */

    /**
     * change network
     * @param param {Any}
     */

    changeNetwork(param): void {
        this.mixinChangeNetwork(param)
    }

    /**
     * Resets search and selected values
     */
    resetValues() {
        this.selectVal = this.selectItems[0]
    }

    /*
  ===================================================================================
    Computed Values
  ===================================================================================
  */
}
</script>
<style lang="scss">
.module-search {
    .search-input-container {
        height: 48px;
        .search-select {
            height: 100%;
            max-width: 117px;
            padding-top: 0;

            .v-input__control {
                .v-input__slot {
                    border: 1px solid #b5c0d3 !important;
                    border-radius: 2px 0 0 2px;
                    min-height: 48px;
                    padding-left: 20px;

                    .v-icon {
                        font-size: 12px;
                        padding-right: 15px;
                    }
                }
                .v-input__slot:before {
                    border: none;
                }

                .v-select__slot {
                    .v-label {
                        font-size: 14px;
                    }
                }
            }
        }

        .v-text-field {
            .v-input__slot {
                border-bottom: 1px solid #b5c0d3 !important;
                border-top: 1px solid #b5c0d3 !important;
                border-right: 1px solid #b5c0d3 !important;
                border-radius: 0;
                font-size: 14px;

                .v-icon {
                    font-size: 16px;
                }
            }
        }
    }

    .search-button-container {
        max-width: 115px !important;

        .search-button {
            border-radius: 0 2px 2px 0;
        }
    }
}
</style>
