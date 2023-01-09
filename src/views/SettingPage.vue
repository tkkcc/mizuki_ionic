<script lang="ts" setup>
import { Account, default_account } from "@/data/data";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonToolbar,
  IonTitle,
alertController,
toastController,
} from "@ionic/vue";

import { store } from "@/data/store";
const { setting,account } = store;

function download(content: string, fileName: string, contentType: string) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function selectFile(contentType = "application/json") {
  return new Promise((resolve) => {
    let input = document.createElement("input");
    input.type = "file";
    input.accept = contentType;

    input.onchange = (e) => {
      let files = (e.target as HTMLInputElement).files;
      if (files === null) return;
      let file = files[0];
      var reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (readerEvent) => {
        let target = readerEvent.target;
        if (target === null) {
          resolve("{}");
        } else {
          resolve(target.result);
        }
      };
    };
    input.click();
  });
}

function open_url(url: string) {
  return url;
}
function export_setting() {
  let jsonData = JSON.stringify(
    {
      account,
      setting,
    },
    null,
    2
  );

  download(
    jsonData,
    `mizuki_${new Date().toLocaleString()}.json`,
    "text/plain"
  );
}

async function import_setting(append = false) {
  // alert user
  const alert = await alertController.create({
    header: append ? "即将清空本页设置" : `即将清空全部设置`,
    buttons: [
      {
        text: "取消",
        role: "cancel",
      },
      {
        text: "继续",
        role: "confirm",
      },
    ],
  });
  await alert.present();
  const { role } = await alert.onDidDismiss();
  if (role != "confirm") {
    return;
  }

  // try to import
  let success = true;
  try {
    const content = await selectFile();
    const state_patch = JSON.parse(content as string);
    const new_account: Account[] = [];
    for (const account_patch of state_patch["account"]) {
      const account = default_account();
      Object.assign(account, account_patch);
      new_account.push(account);
    }
    if (append) {
      account.push(...new_account);
    } else {
      account.splice(0);
      account.push(...new_account);
    }
    Object.assign(setting, state_patch["setting"]);
    success = true;
  } catch {
    success = false;
  }

  // notify user
  const toast = await toastController.create({
    message: success ? "导入成功" : "导入失败",
    duration: 1500,
  });
  await toast.present();
}
</script>
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
          <ion-label>云控模式</ion-label>
          <ion-toggle
            :checked="setting.cloud"
            v-model="setting.cloud"
          ></ion-toggle>
        </ion-item>

        <ion-item lines="none" :disabled="!setting.cloud">
          <ion-label>云控账号</ion-label>
          <ion-input
            v-model="setting.cloud_username"
            :value="setting.cloud_username"
          ></ion-input>
        </ion-item>

        <ion-item lines="none" :disabled="!setting.cloud">
          <ion-label>云控密码</ion-label>
          <ion-input
            v-model="setting.cloud_password"
            :value="setting.cloud_password"
          ></ion-input>
          <ion-button>校验</ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>图鉴账号</ion-label>
          <ion-input
            v-model="setting.captcha_username"
            :value="setting.captcha_username"
          ></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-label>图鉴密码</ion-label>
          <ion-input
            v-model="setting.captcha_password"
            :value="setting.captcha_password"
          ></ion-input>
          <ion-button>校验</ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>关卡连续导航或代理失败</ion-label>
          <ion-input
            class="ion-text-center"
            v-model="setting.max_fight_failed_times"
            :value="setting.max_fight_failed_times"
            type="number"
            max="99"
            min="0"
          ></ion-input>
          <ion-label>次后跳过</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>账号登录界面15分钟内出现</ion-label>
          <ion-input
            class="ion-text-center"
            v-model="setting.max_login_times_15min"
            :value="setting.max_login_times_15min"
            type="number"
            max="99"
            min="0"
          ></ion-input>
          <ion-label>次后跳过</ion-label>
        </ion-item>

        <ion-item lines="none">
          <ion-label>通知服务</ion-label>
          <ion-input
            v-model="setting.qq_notify_server"
            :value="setting.qq_notify_server"
          ></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-label>通知账号</ion-label>
          <ion-input
            v-model="setting.qq_notify"
            :value="setting.qq_notify"
          ></ion-input>
          <ion-button>校验</ion-button>
        </ion-item>
        <ion-item lines="none">
          <ion-label>通知场景</ion-label>

          <ion-select
            placeholder=""
            multiple
            okText="确认"
            cancelText="取消"
            v-model="setting.qq_notify_scene"
            :value="setting.qq_notify_scene"
          >
            <ion-select-option value="mail">邮件前</ion-select-option>
            <ion-select-option value="dorm_enter">进基建</ion-select-option>
            <ion-select-option value="dorm_leave">出基建</ion-select-option>
            <ion-select-option value="task">任务前</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item lines="none">
          <ion-label>不跳过空白账密</ion-label>
          <ion-toggle
            :checked="setting.account_allow_empty"
            v-model="setting.account_allow_empty"
          ></ion-toggle>
        </ion-item>

        <ion-item lines="none">
          <ion-label>定时重启</ion-label>
          <ion-input
            v-model="setting.crontab"
            :value="setting.crontab"
          ></ion-input>
        </ion-item>
      </ion-card>
      <ion-card>
        <ion-item lines="none">
          <ion-label>导入导出</ion-label>
          <ion-button @click.stop="import_setting(true)">追加导入</ion-button>
          <ion-button @click.stop="import_setting()">导入</ion-button>
          <ion-button @click.stop="export_setting()">导出</ion-button>
        </ion-item>
        <!-- </ion-card> -->
        <!-- <ion-card> -->
        <ion-item lines="none">
          <ion-label>交流反馈</ion-label>
          <a @click="open_url('https://github.com/tkkcc/mizuki/discussions')"
            >github.com/tkkcc/mizuki</a
          >
        </ion-item>
      </ion-card>
    </ion-content>
  </ion-page>
</template>
