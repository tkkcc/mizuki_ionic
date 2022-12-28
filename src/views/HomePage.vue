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
      <ion-item lines="none">
        <ion-label class="shrink">账号</ion-label>

        <ion-grid>
          <ion-row class="ion-align-items-center">
            <!-- <ion-col size="1"> <ion-label>认为</ion-label></ion-col> -->
            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>
            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>

            <ion-col size="auto">
              <ion-item lines="none">
                <ion-checkbox lines="none"></ion-checkbox>
                <ion-label>作战</ion-label>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <ion-item-group>
        <ion-item lines="none">
          <ion-label>账号</ion-label>
          <ion-input :clear-input="true"></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>密码</ion-label>
          <ion-input :clear-input="true"></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>吃药</ion-label>
          <ion-input inputmode="decimal" type="number" min="0" max="99"></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>多买</ion-label>
          <ion-checkbox lines="none">dd</ion-checkbox>
        </ion-item>
      </ion-item-group>

      <ion-datetime-button datetime="dtb1"></ion-datetime-button>

      <ion-modal :keep-contents-mounted="true">
        <ion-datetime id="dtb1"></ion-datetime>
      </ion-modal>
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
import { defineComponent } from "vue";
import { getMessages } from "@/data/messages";
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
} from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      settings: settingsSharp,
      messages: getMessages(),
    };
  },
  methods: {
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    },
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    IonCheckbox,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
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
