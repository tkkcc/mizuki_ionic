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
        <!-- <div > -->
        <ion-item v-for="item in accounts" :key="item.id" button :routerLink="'/account/' + item.id">
          <!-- <ion-item detail=true :routerLink="'/account/' + item.id"> -->
          <ion-label>{{ item.name }}</ion-label>
        </ion-item>
        <!-- </div> -->

        <!--     </DynamicScrollerItem> -->
        <!---->
        <!--   </template> -->
        <!-- </DynamicScroller> -->
      </ion-list>
    </ion-content>
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
import { getMessages } from "@/data/messages";
import { getAccounts, AccountMode, Server } from "@/data/accounts";
import {
  close,
  closeCircle,
  pin,
  settings,
  settingsSharp,
  settingsOutline,
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
      messages: getMessages(),
      accounts: getAccounts(),
      AccountMode,
      Server,
    };
  },
  methods: {},
  components: {
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
