<template>
    <v-card :style="`background: ${getColor}; border-radius: 5px; overflow: hidden`" flat class="mt-1 pr-1 white--text info-card" height="150px">
        <v-img
            :src="require('@/assets/smallblocks/cubes-in-stack-with-shadow.svg')"
            width="100px"
            height="100px"
            style="position: absolute; right: -10px; bottom: -17px;"
            contain="true"
        />
        <v-layout wrap fill-height>
            <v-flex v-if="!isLoading" xs12>
                <v-layout align-end row pr-2>
                    <p v-if="!isDate" class="display-1 text-truncate font-weight-medium pb-0 pl-1 mb-0">{{ value }}</p>
                    <vue-time-ticker v-else :value="value" format="SECONDS" class="display-1 text-truncate font-weight-medium pb-0 pl-1 mb-0" />
                    <p v-if="metrics" class="headline pl-1 mb-0">{{ metrics }}</p>
                </v-layout>
            </v-flex>
            <v-flex v-else xs12>
                <v-layout align-end row pr-4 pl-2>
                    <v-progress-linear
                        :color="colorLoading"
                        background-color="white"
                        background-opacity="0.3"
                        value="40"
                        indeterminate
                        height="21"
                        class="ma-0"
                    />
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-card-text class="text-uppercase pt-0 pl-0">{{ title }}</v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import VueTimeTicker from 'vue-time-ticker'

@Component({
    components: {
        VueTimeTicker
    }
})
export default class AppInfoCard extends Vue {
    /*
    ===================================================================================
      Props
    ===================================================================================
    */

    @Prop(String) value!: string | Date
    @Prop(String) title!: string
    @Prop(String) colorType!: string
    @Prop(String) metrics!: string
    @Prop(String) backType!: string
    @Prop({ type: Boolean, default: false }) isDate!: boolean
    @Prop(Boolean) isLoading?: boolean

    /*
    ===================================================================================
      Computed
    ===================================================================================
    */

    get getColor(): string {
        return this.colorType === 'primary'
            ? 'linear-gradient(99.41deg, #171EC9 3.34%, #A4C3FF 100%)'
            : this.colorType === 'success'
            ? 'linear-gradient(99.41deg, #FFB906 3.34%, #FFF3D6 100%);'
            : this.colorType === 'warning'
            ? 'linear-gradient(99.41deg, #45DAA4 3.34%, #C6FFF1 100%);'
            : this.colorType === 'error'
            ? 'linear-gradient(99.41deg, #FA7777 3.34%, #FFD3D3 100%);'
            : ''
    }
    get colorLoading(): string {
        return `${this.colorType}Light`
    }

    get getBackground(): string {
        return this.backType
    }
}
</script>

<style scoped lang="css">
.info-card {
    padding-top: 42px;
    padding-left: 24px;
}

.last-block {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/cubes-in-stack-with-shadow.svg');
}

.time-since {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/hourglass.svg');
}

.hash-rate {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/hash.svg');
}

.difficulty {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/dashboard.svg');
}

.success-txs {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/target.svg');
}

.failed-txs {
    background-position: right -10px bottom -17px;
    background-image: url('~@/assets/smallblocks/danger-sing.svg');
}
</style>
