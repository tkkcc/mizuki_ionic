<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Mizuki</ion-title>

        <ion-button slot="primary" fill="clear" routerLink="/setting">
          <ion-icon :icon="setting_icon"></ion-icon>
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
          <!-- <ion-card button :routerLink="'/account/' + account.id"> -->

          <ion-card>
            <!-- <ion-card-header> -->
            <!--   <ion-card-title>{{ account.name }}</ion-card-title> -->
            <!--   <ion-card-subtitle>{{ account.username }}</ion-card-subtitle> -->
            <!-- </ion-card-header> -->
            <!-- <ion-card-content> -->
            <!-- {{ account.name }} -->
            <!-- <ion-item> -->

            <ion-item :routerLink="'/account/' + account.id" lines="none">
              <ion-label class="ion-text-wrap">{{ account.username }} {{ account.name }}</ion-label>
              <ion-button @click.stop="addTempAccountChoice(index + 1)">
                #{{ index + 1 }}
              </ion-button>

              <ion-button color="medium" @click.stop="removeAccount(index)">
                <ion-icon :icon="trash_icon"></ion-icon>
              </ion-button>
            </ion-item>
            <!---->
            <!-- </ion-card-content> -->
          </ion-card>
        </template>
        <!--     </DynamicScrollerItem> -->
        <!---->
        <!--   </template> -->
        <!-- </DynamicScroller> -->
      </ion-list>

      <!-- <ion-item lines="none"> -->
      <!--   <ion-button fill="solid" shape="round"> -->
      <!--     <ion-icon :icon="add"></ion-icon> -->
      <!---->
      <!--     添加账号 -->
      <!--   </ion-button> -->
      <!-- </ion-item> -->
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-item lines="none">
          <ion-label>启用账号</ion-label>

          <ion-input :value="setting.account_choice" v-model="setting.account_choice"></ion-input>

          <ion-button shape="round">
            <!-- <ion-icon :icon="rocket"></ion-icon> -->
            启动</ion-button>
        </ion-item>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import {
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, Transition } from "vue";
import { getAccounts, AccountMode, Server, getSetting } from "@/data/accounts";
import {
  settingsSharp as setting_icon,
  add as add_icon,
  rocket as rocket_icon,
  trash as trash_icon,
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
  IonCardHeader,
  IonCardContent,
  IonCardSubtitle,
  IonFooter,
  IonInput,
  alertController,
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
      accounts: getAccounts(),
      setting: getSetting(),
      removeAccount: async function (index: number) {
        const alert = await alertController.create({
          header: `删除账号#${index+1}`,
          message: "推荐清空账号或密码来跳过执行",
          buttons: [
            {
              text: "取消",
              role: "cancel",
            },
            {
              text: "确认",
              role: "confirm",
            },
          ],
        });

        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role == "confirm") {
          //console.log(role);
          this.accounts.splice(index, 1);
        }
      },
      addTempAccountChoice: function (index: number) {
        this.setting.account_choice =
          this.setting.account_choice.split("#")[0].trim() + " #" + index;
      },
      AccountMode,
      Server,
      add_icon,
      rocket_icon,
      setting_icon,
      trash_icon,
    };
  },
  methods: {},

  components: {
    IonCardSubtitle,
    IonInput,
    IonFooter,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
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
