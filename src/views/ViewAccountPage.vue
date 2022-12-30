<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="item">
      <ion-card>
        <ion-item lines="none">
          <ion-label>名称</ion-label>
          <ion-input clear-input="false" placeholder="" v-model="item.name" :value="item.name"></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-label>账号</ion-label>
          <ion-input clear-input="false" placeholder="" v-model="item.username" :value="item.username"></ion-input>
          <ion-button shape="round" @click="item.server = Server.next(item.server)" fill="outline">{{
    Server.toString(item.server)
}}
          </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>密码</ion-label>
          <ion-input clear-input="false" placeholder="" v-model="item.password" :value="item.password"></ion-input>
          <!-- <ion-spinner></ion-spinner> -->
          <ion-button shape="round" :disabled="false"> 校验 </ion-button>
        </ion-item>
      </ion-card>

      <ion-card>
        <ion-item lines="none">
          <ion-label>时间</ion-label>
          <ion-toggle :checked="item.allow_control" v-model="item.allow_control"></ion-toggle>
        </ion-item>

        <div v-if="item.allow_control">
          <ion-item lines="none">
            <ion-label>开始</ion-label>
            <ion-datetime-button datetime="dtb1"></ion-datetime-button>

            <ion-modal keep-contents-mounted="true">
              <ion-datetime :show-default-buttons="true" done-text="确认" cancelText="取消" id="dtb1"></ion-datetime>
            </ion-modal>
          </ion-item>

          <ion-item lines="none">
            <ion-label>结束</ion-label>
            <ion-datetime-button datetime="dtb1"></ion-datetime-button>

            <ion-modal keep-contents-mounted="true">
              <ion-datetime id="dtb1"></ion-datetime>
            </ion-modal>
          </ion-item>

          <ion-item lines="none">
            <ion-label>允许</ion-label>

            <ion-select placeholder="选择" multiple="true" okText="确认" cancelText="取消">
              <ion-select-option value="dd">周日</ion-select-option>
              <ion-select-option value="nes">周六</ion-select-option>
              <ion-select-option value="n64">周五</ion-select-option>
              <ion-select-option value="ps">周四</ion-select-option>
              <ion-select-option value="genesis">周三</ion-select-option>
              <ion-select-option value="saturn">周二</ion-select-option>
              <ion-select-option value="saturn">周一</ion-select-option>
            </ion-select>
          </ion-item>
        </div>
      </ion-card>

      <ion-card>
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>作战</ion-label>
            <ion-toggle :checked="item.job_fight" v-model="item.job_fight"></ion-toggle>
          </ion-item>
          <div v-if="item.job_fight">
            <ion-item lines="none" detail="true" button>
              <ion-label>关卡</ion-label>
              <ion-chip>ddd</ion-chip>
              <ion-chip>ddd</ion-chip>
            </ion-item>
          </div>
        </ion-item-group>
      </ion-card>

      <ion-card>
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>基建</ion-label>
            <ion-toggle :checked="item.job_fight" v-model="item.job_fight"></ion-toggle>
          </ion-item>

          <div v-if="item.job_fight">
            <ion-item lines="none">
              <ion-label>事项</ion-label>
              <ion-select placeholder="选择" multiple="true" okText="确认" cancelText="取消">
                <ion-select-option value="dd">访友</ion-select-option>
                <ion-select-option value="nes">收获</ion-select-option>
                <ion-select-option value="n64">排班</ion-select-option>
                <ion-select-option value="ps">加速</ion-select-option>
                <ion-select-option value="genesis">副手</ion-select-option>
                <ion-select-option value="saturn">线索</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
        </ion-item-group>
      </ion-card>

      <ion-card>
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>信交</ion-label>
            <ion-toggle :checked="item.job_fight" v-model="item.job_fight"></ion-toggle>
          </ion-item>

          <div v-if="item.job_fight">
            <ion-item lines="none">
              <ion-label>先买</ion-label>
              <ion-select placeholder="选择" multiple="true" okText="确认" cancelText="取消">
                <ion-select-option value="dd">碳</ion-select-option>
                <ion-select-option value="nes">碳素</ion-select-option>
                <ion-select-option value="n64">11</ion-select-option>
                <ion-select-option value="ps">PlayStation</ion-select-option>
                <ion-select-option value="genesis">Sega Genesis</ion-select-option>
                <ion-select-option value="saturn">Sega Saturn</ion-select-option>
                <ion-select-option value="snes">SNES</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none">
              <ion-label>不买</ion-label>
              <ion-select placeholder="选择" multiple="true" okText="确认" cancelText="取消">
                <ion-select-option value="dd">碳</ion-select-option>
                <ion-select-option value="nes">碳素</ion-select-option>
                <ion-select-option value="n64">11</ion-select-option>
                <ion-select-option value="ps">PlayStation</ion-select-option>
                <ion-select-option value="genesis">Sega Genesis</ion-select-option>
                <ion-select-option value="saturn">Sega Saturn</ion-select-option>
                <ion-select-option value="snes">SNES</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
        </ion-item-group>
      </ion-card>

      <ion-card>
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>公招</ion-label>
            <ion-toggle :checked="item.job_fight" v-model="item.job_fight"></ion-toggle>
          </ion-item>

          <div v-if="item.job_fight">
            <ion-item lines="none">
              <ion-label>招募</ion-label>
              <ion-select placeholder="选择标签" multiple="true" okText="确认" cancelText="取消">
                <ion-select-option value="genesis">六星</ion-select-option>
                <ion-select-option value="ps">五星</ion-select-option>
                <ion-select-option value="n64">四星</ion-select-option>
                <ion-select-option value="dd">小车</ion-select-option>
                <ion-select-option value="nes">其他</ion-select-option>
              </ion-select>
            </ion-item>
          </div>
        </ion-item-group>
      </ion-card>

      <ion-card>
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>任务</ion-label>
            <ion-toggle :checked="item.job_activity_recruit" v-model="item.job_activity_recruit"></ion-toggle>
          </ion-item>

          <ion-item lines="none">
            <ion-label>邮件</ion-label>
            <ion-toggle :checked="item.job_mail" v-model="item.job_mail"></ion-toggle>
          </ion-item>

          <ion-item lines="none">
            <ion-label>抽签</ion-label>
            <ion-toggle :checked="item.job_activity_checkin" v-model="item.job_activity_checkin"></ion-toggle>
          </ion-item>

          <ion-item lines="none">
            <ion-label>单抽</ion-label>
            <ion-toggle :checked="item.job_activity_recruit" v-model="item.job_activity_recruit"></ion-toggle>
          </ion-item>
        </ion-item-group>
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
} from "@ionic/vue";
import { personCircle } from "ionicons/icons";
import { getMessage } from "../data/messages";
import { defineComponent } from "vue";
import { getAccount, AccountMode, Server } from "../data/accounts";

export default defineComponent({
  name: "ViewAccountPage",
  setup() {
    const route = useRoute();
    const account = getAccount(parseInt(route.params.id as string, 10));

    return { item: account, AccountMode, Server };
  },
  components: {
    IonToggle,
    IonDatetime,
    IonDatetimeButton,
    IonModal,

    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    //IonIcon,
    IonItem,
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
