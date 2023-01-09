<script setup lang="ts">
import { RecycleScroller } from "vue-virtual-scroller";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { default_account } from "@/data/data";
import {
  settingsSharp as setting_icon,
  personAddSharp as add_icon,
  rocket as rocket_icon,
} from "ionicons/icons";

import {
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonFooter,
  IonInput,
} from "@ionic/vue";

import { useRouter } from "vue-router";
import { store } from "@/data/store";
const { account, setting } = store;
const router = useRouter();
function start() {
  return 1;
}
function addAccount() {
  account.push(default_account());
  router.push("/account/" + (account.length - 1));
}
function addTempAccountChoice(index: number) {
  setting.account_choice =
    setting.account_choice.split("#")[0].trim() + " #" + index;
}
</script>

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Mizuki</ion-title>
        <ion-button slot="primary" fill="clear" @click.stop="addAccount()">
          <ion-icon :icon="add_icon"></ion-icon>
        </ion-button>
        <ion-button slot="primary" fill="clear" routerLink="/setting">
          <ion-icon :icon="setting_icon"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <RecycleScroller class="scroller" :items="account" :item-size="56">
        <template v-slot="{ item, index }">
          <ion-card>
            <ion-item :routerLink="'/account/' + index" lines="none">
              <ion-label>{{ item.name }} {{ item.username }} </ion-label>
              <ion-button @click.stop="addTempAccountChoice(index + 1)">
                #{{ index + 1 }}
              </ion-button>
            </ion-item>
          </ion-card>
        </template>
      </RecycleScroller>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-label>启用账号</ion-label>
          <ion-input :value="setting.account_choice" v-model="setting.account_choice"></ion-input>
          <ion-button size="default" @click.stop="start()">
            <ion-icon :icon="rocket_icon"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<style scoped>
.scroller {
  height: 100%;
}
</style>
