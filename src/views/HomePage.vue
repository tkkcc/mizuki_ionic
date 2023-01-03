<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Mizuki</ion-title>

        <ion-button slot="primary" fill="clear" @click="addAccount()">
          <ion-icon :icon="add_icon"></ion-icon>
        </ion-button>

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
        <template v-for="(account, index) in all_account" :key="account.id">
          <!-- <ion-card button :routerLink="'/account/' + account.id"> -->

          <ion-card>
            <!-- <ion-card-header> -->
            <!--   <ion-card-title>{{ account.name }}</ion-card-title> -->
            <!--   <ion-card-subtitle>{{ account.username }}</ion-card-subtitle> -->
            <!-- </ion-card-header> -->
            <!-- <ion-card-content> -->
            <!-- {{ account.name }} -->
            <!-- <ion-item> -->

            <ion-item :routerLink="'/account/' + index" lines="none">
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

          <ion-button size="default" @click="start()">
            <ion-icon :icon="rocket_icon"></ion-icon>
            <!-- 启动 -->
          </ion-button>
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
import {
  getAllAccount,
  AccountMode,
  Server,
  getSetting,
  default_account,
} from "@/data/accounts";
import {
  settingsSharp as setting_icon,
  personAddSharp as add_icon,
  // addSharp as add_icon,
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

import { useRouter } from "vue-router";
export default defineComponent({
  name: "HomePage",
  data() {
    const router = useRouter();

    return {
      console: console,
      all_account: getAllAccount(),
      setting: getSetting(),
      start: function () {
        const state = {
          account: this.all_account,
          setting: this.setting,
        };
      },
      addAccount: function () {
        this.all_account.push(default_account());
        router.push("/account/" + (this.all_account.length - 1));
      },
      removeAccount: async function (index: number) {
        const alert = await alertController.create({
          header: `删除账号#${index + 1}`,
          message: `推荐清空账号或密码来跳过执行`,
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
          // 基于本账号的改为基于默认
          this.all_account.forEach((account) => {
            if (account.inherit_index === (index + 1).toString()) {
              account.inherit_index = "0";
            }
          });

          // 基于本账号后续账号的所有账号，inherit_index - 1
          this.all_account.forEach((account) => {
            if (parseInt(account.inherit_index, 10) > index + 1) {
              account.inherit_index = (
                parseInt(account.inherit_index, 10) - 1
              ).toString();
            }
          });

          this.all_account.splice(index, 1);
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
