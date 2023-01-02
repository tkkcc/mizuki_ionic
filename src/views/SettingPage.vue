<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>设置</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card>
        <ion-item lines="none">
          <ion-label>图鉴账号</ion-label>
          <ion-input v-model="setting.captcha_username" :value="setting.captcha_username"></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-label>图鉴密码</ion-label>
          <ion-input v-model="setting.captcha_password" :value="setting.captcha_password"></ion-input>
          <ion-button>校验</ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>关卡连续导航或代理失败</ion-label>
          <ion-input  class="ion-text-center" v-model="setting.max_fight_failed_times" :value="setting.max_fight_failed_times" type="number"
            max="99" min="0"></ion-input>
          <ion-label>次后跳过</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>账号登录界面15分钟内出现</ion-label>
          <ion-input class="ion-text-center" v-model="setting.max_login_times_15min" :value="setting.max_login_times_15min" type="number"
            max="99" min="0"></ion-input>
          <ion-label>次后跳过</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>通知服务</ion-label>
          <ion-input v-model="setting.qq_notify_server" :value="setting.qq_notify_server"></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>通知账号</ion-label>
          <ion-input v-model="setting.qq_notify" :value="setting.qq_notify"></ion-input>
          <ion-button>校验</ion-button>
        </ion-item>
        <ion-item lines="none">
          <ion-label>通知场景</ion-label>

            <ion-select placeholder="" multiple okText="确认" cancelText="取消" v-model="setting.qq_notify_scene"
              :value="setting.qq_notify_scene">
              <ion-select-option value="mail">邮件前</ion-select-option>
              <ion-select-option value="dorm_enter">进基建</ion-select-option>
              <ion-select-option value="dorm_leave">出基建</ion-select-option>
              <ion-select-option value="task">任务前</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item lines="none">
          <ion-label>不跳过空白账密</ion-label>
          <ion-toggle :checked="setting.account_allow_empty" v-model="setting.account_allow_empty"></ion-toggle>
        </ion-item>
        <ion-item lines="none">
          <ion-label>定时重启</ion-label>
          <ion-input v-model="setting.crontab" :value="setting.crontab"></ion-input>
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonChip,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonToolbar,
  IonTitle,
  IonCheckbox,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { defineComponent } from "vue";
import {
  getAccount,
  getAccounts,
  getAccountIndex,
  AccountMode,
  Server,
  goods,
  today,
  default_setting,
  Setting,
} from "../data/accounts";

export default defineComponent({
  name: "SettingPage",
  data() {
    const route = useRoute();
    return {
      setting: default_setting(),
      today,
      AccountMode,
      Server,
      console,
      goods,
    };
  },
  components: {
    IonCheckbox,
    IonTitle,
    IonToggle,
    IonDatetime,
    IonDatetimeButton,
    IonModal,

    IonBackButton,
    IonChip,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonButton,
    IonInput,
    IonButtons,
    IonContent,
    IonHeader,
    //IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    //IonNote,
    IonPage,
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
</style>
