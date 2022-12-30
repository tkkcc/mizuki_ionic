<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Mizuki</ion-title>

        <ion-button slot="primary" fill="clear" shape="circle">
          <ion-icon slot="icon-only" :icon="settings"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <!-- <DynamicScroller :items="accounts" class="scroller" :min-item-size="54"> -->
        <!--   <template #default="{ item, index, active }"> -->
        <!---->
        <!--     <DynamicScrollerItem :item="item" :active="active" :data-index="index"> -->
        <template v-for="(account, index) in accounts" :key="account.id">
          <ion-item button :routerLink="'/account/' + account.id">
            <!-- <ion-item detail=true :routerLink="'/account/' + item.id"> -->
            <ion-label>#{{ index + 1 }} {{ account.name }}</ion-label>
          </ion-item>
        </template>
        <!--     </DynamicScrollerItem> -->
        <!---->
        <!--   </template> -->
        <!-- </DynamicScroller> -->
      </ion-list>

      <ion-item lines="none">
        <ion-button fill="solid" shape="round" >
          <ion-icon :icon="add"></ion-icon>

          添加账号
        </ion-button>
      </ion-item>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-label>启用账号</ion-label>

          <ion-input value="1-99"></ion-input>
          <ion-button>启动</ion-button>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, Transition } from "vue";
import { getAccounts, AccountMode, Server } from "@/data/accounts";
import {
  close,
  closeCircle,
  pin,
  settings,
  settingsSharp,
  settingsOutline,
  add,
} from "ionicons/icons";

import {
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonCheckbox,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonToggle,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonCard,
  IonFooter,
  IonInput,
} from "@ionic/vue";

// import VueVirtualScroller from 'vue-virtual-scroller';
import {
  RecycleScroller,
  DynamicScroller,
  DynamicScrollerItem,
} from "vue-virtual-scroller";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      console: console,
      settings: settingsSharp,
      accounts: getAccounts(),
      AccountMode,
      Server,
      add,
    };
  },
  methods: {},

  components: {
    IonInput,
    IonFooter,
    //IonCard,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    //IonToggle,
    //RecycleScroller,
    // DynamicScroller,
    //DynamicScrollerItem,
    //IonGrid,
    //IonRow,
    //IonCol,
    IonIcon,
    //IonCheckbox,
    //IonDatetime,
    //IonDatetimeButton,
    //IonModal,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,

    IonToolbar,
  },
});
</script>

<style scoped>
ion-button[shape="circle"] {
  --border-radius: 50%;
  width: 56px;
  height: 56px;
}

ion-label.shrink {
  flex: initial;
}
</style>
