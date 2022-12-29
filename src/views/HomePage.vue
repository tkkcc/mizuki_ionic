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
        <DynamicScroller :items="accounts" class="scroller" :min-item-size="54">
          <template #default="{ item, index, active }">
            <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.AccountMode]"
              :data-index="index">
              <ion-item-group>
                <ion-item lines="none">
                  <ion-label>账号</ion-label>
                  <ion-input clear-input="false" placeholder=""></ion-input>
                  <ion-button shape="round" @click="item.server = Server.next(item.server)" fill="outline">{{
    Server.toString(item.server)
}}
                  </ion-button>
                </ion-item>
                <ion-item lines="none">
                  <ion-label>密码</ion-label>
                  <ion-input clear-input="false" placeholder=""></ion-input>
                  <!-- <ion-spinner></ion-spinner> -->
                  <ion-button shape="round" :disabled="false">
                    校验
                  </ion-button>
                </ion-item>

                <!-- <ion-item lines="none"> -->

                  <!-- <ion-label>模式</ion-label> -->
                  <!--                   <ion-button shape="round" @click="item.mode = AccountMode.next(item.mode)" fill="outline">{{ -->
                  <!--     AccountMode.toString(item.mode) -->
                  <!-- }} -->
                  <!-- </ion-button> -->
                  <!--                   <ion-button shape="round" @click="item.mode = AccountMode.next(item.mode)" fill="outline">{{ -->
                  <!--     AccountMode.toString(item.mode) -->
                  <!-- }} -->
                  <!-- </ion-button> -->

                  <!-- <ion-item lines="none"> -->
                  <!--   <ion-label>吃药</ion-label> -->
                  <!--   <ion-input inputmode="decimal" type="number" min="0" max="99"></ion-input> -->
                  <!-- </ion-item> -->

                <ion-item lines="none">
                  <ion-label class="shrink">日常</ion-label>

                  <ion-grid class=ion-no-padding>
                    <ion-row class="ion-align-items-center">
                      <!-- <ion-col size="1"> <ion-label>认为</ion-label></ion-col> -->
                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>邮件</ion-label>
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
                          <ion-label>好友</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>收菜</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>换班</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>加速</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>线索</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>副手</ion-label>
                        </ion-item>
                      </ion-col>
                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>信交</ion-label>
                        </ion-item>
                      </ion-col>

                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>公招</ion-label>
                        </ion-item>
                      </ion-col>


                      <ion-col size="auto">
                        <ion-item lines="none">
                          <ion-checkbox lines="none"></ion-checkbox>
                          <ion-label>任务</ion-label>
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

                <ion-item lines="none">
                  <ion-label>多买</ion-label>
                  <ion-checkbox lines="none">dd</ion-checkbox>
                </ion-item>

                <ion-datetime-button datetime="dtb1"></ion-datetime-button>

                <ion-modal keep-contents-mounted="true">
                  <ion-datetime id="dtb1"></ion-datetime>
                </ion-modal>
                <ion-item>
                  <ion-label>{{ item.job_mail }}</ion-label>
                  <ion-checkbox v-model="item.job_mail" :checked="item.job_mail">
                  </ion-checkbox>
                </ion-item>

                <ion-item v-if="item.job_mail">
                  <ion-label>the</ion-label>
                </ion-item>
              </ion-item-group>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
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
import { defineComponent } from "vue";
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
  methods: {
    refresh: (ev: CustomEvent) => {
      setTimeout(() => {
        ev.detail.complete();
      }, 3000);
    },
  },
  components: {
    //RecycleScroller,
    DynamicScroller,
    DynamicScrollerItem,
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
