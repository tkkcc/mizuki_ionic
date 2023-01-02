<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>

        <ion-title>#{{ account_index + 1 }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="account">
      <ion-card>
        <ion-item lines="none">
          <ion-label>账号</ion-label>
          <ion-input
            v-model="account.username"
            :value="account.username"
          ></ion-input>
          <ion-button
            shape="round"
            @click="account.server = Server.next(account.server)"
            fill="outline"
            >{{ Server.toString(account.server) }}
          </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>密码</ion-label>
          <ion-input
            v-model="account.password"
            :value="account.password"
          ></ion-input>
          <!-- <ion-spinner></ion-spinner> -->
          <ion-button shape="round" :disabled="false"> 校验 </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>备注</ion-label>
          <ion-input v-model="account.name" :value="account.name"></ion-input>
        </ion-item>

        <ion-item lines="none">
          <ion-label>基于</ion-label>

          <ion-select
            placeholder=""
            okText="确认"
            cancelText="取消"
            v-model="account.inherit_index"
            :value="account.inherit_index"
          >
            <ion-select-option value="0">默认设置</ion-select-option>

            <template v-for="(account, index) in accounts" :key="index">
              <ion-select-option
                v-if="index != account_index"
                :value="(index + 1).toString()"
                >#{{ index + 1 }} {{ account.name }}</ion-select-option
              >
            </template>
          </ion-select>
        </ion-item>

        <ion-item lines="none">
          <ion-label>修改</ion-label>
          <ion-select
            multiple
            placeholder=""
            okText="确认"
            cancelText="取消"
            v-model="account.inherit_diff"
            :value="account.inherit_diff"
          >
            <ion-select-option value="datetime_control">时控</ion-select-option>
            <ion-select-option value="job_mail">邮件</ion-select-option>
            <ion-select-option value="job_fight">作战</ion-select-option>
            <ion-select-option value="job_dorm">基建</ion-select-option>
            <ion-select-option value="job_shop">信交</ion-select-option>
            <ion-select-option value="job_recruit">公招</ion-select-option>
            <ion-select-option value="job_task">任务</ion-select-option>
            <ion-select-option value="job_checkin">抽签</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('datetime_control')">
        <ion-item lines="none">
          <ion-label>时控</ion-label>
          <ion-toggle
            :checked="account.datetime_control"
            v-model="account.datetime_control"
          ></ion-toggle>
        </ion-item>

        <template v-if="account.datetime_control">
          <ion-item lines="none">
            <ion-label>允许星期</ion-label>

            <ion-select
              placeholder=""
              multiple
              okText="确认"
              cancelText="取消"
              v-model="account.allow_weekday"
              :value="account.allow_weekday"
            >
              <ion-select-option value="6">周日</ion-select-option>
              <ion-select-option value="5">周六</ion-select-option>
              <ion-select-option value="4">周五</ion-select-option>
              <ion-select-option value="3">周四</ion-select-option>
              <ion-select-option value="2">周三</ion-select-option>
              <ion-select-option value="1">周二</ion-select-option>
              <ion-select-option value="0">周一</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-label>开始时间</ion-label>
            <ion-datetime-button
              datetime="begin_datetime"
            ></ion-datetime-button>

            <ion-modal :keep-contents-mounted="true">
              <ion-datetime
                :show-default-buttons="true"
                done-text="确认"
                cancelText="取消"
                id="begin_datetime"
                v-model="account.begin_datetime"
                :value="account.begin_datetime"
                :min="today()"
              ></ion-datetime>
            </ion-modal>
          </ion-item>

          <!-- <ion-item lines="none"> -->
          <!--   <ion-label>结束</ion-label> -->
          <!--   <ion-datetime-button datetime="end_datetime"></ion-datetime-button> -->
          <!--   <ion-modal keep-contents-mounted="true"> -->
          <!--     <ion-datetime :show-default-buttons="true" done-text="确认" cancelText="取消" id="end_datetime" -->
          <!--       v-model="account.end_datetime" :value="account.end_datetime"></ion-datetime> -->
          <!--   </ion-modal> -->
          <!-- </ion-item> -->
        </template>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_mail')">
        <ion-item lines="none">
          <ion-label>邮件</ion-label>
          <ion-toggle
            :checked="account.job_mail"
            v-model="account.job_mail"
          ></ion-toggle>
        </ion-item>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_fight')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>作战</ion-label>
            <ion-toggle
              :checked="account.job_fight"
              v-model="account.job_fight"
            ></ion-toggle>
          </ion-item>
          <template v-if="account.job_fight">
            <ion-item lines="none" detail button>
              <ion-label>关卡</ion-label>
              <ion-chip>ddd</ion-chip>
              <ion-chip>ddd</ion-chip>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_dorm')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>基建</ion-label>
            <ion-toggle
              :checked="account.job_dorm"
              v-model="account.job_dorm"
            ></ion-toggle>
          </ion-item>

          <template v-if="account.job_dorm">
            <ion-item lines="none">
              <ion-label>事项</ion-label>
              <ion-select
                placeholder=""
                multiple
                okText="确认"
                cancelText="取消"
                v-model="account.job_dorm_item"
                :value="account.job_dorm_item"
              >
                <ion-select-option value="friend">访友</ion-select-option>
                <ion-select-option value="gain">收获</ion-select-option>
                <ion-select-option value="shift">排班</ion-select-option>
                <ion-select-option value="manu">加速</ion-select-option>
                <ion-select-option value="assist">副手</ion-select-option>
                <ion-select-option value="clue">线索</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item
              lines="none"
              :disabled="!account.job_dorm_item.includes('clue')"
            >
              <ion-label>线索全送</ion-label>
              <ion-toggle
                :checked="account.give_away_clue"
                v-model="account.give_away_clue"
              ></ion-toggle>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_shop')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>信交</ion-label>
            <ion-toggle
              :checked="account.job_shop"
              v-model="account.job_shop"
            ></ion-toggle>
          </ion-item>

          <template v-if="account.job_shop">
            <ion-item lines="none">
              <ion-label>先买</ion-label>
              <ion-select
                placeholder=""
                multiple
                okText="确认"
                cancelText="取消"
                v-model="account.prefer_goods"
                :value="account.prefer_goods"
              >
                <ion-select-option
                  v-for="(goods, index) in goods"
                  :key="index"
                  :value="goods"
                  >{{ goods }}</ion-select-option
                >
              </ion-select>
            </ion-item>

            <ion-item lines="none">
              <ion-label>不买</ion-label>
              <ion-select
                placeholder=""
                multiple
                okText="确认"
                cancelText="取消"
                v-model="account.forbid_goods"
                :value="account.forbid_goods"
              >
                <ion-select-option
                  v-for="(goods, index) in goods"
                  :key="index"
                  :value="goods"
                  >{{ goods }}</ion-select-option
                >
              </ion-select>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_recruit')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>公招</ion-label>
            <ion-toggle
              :checked="account.job_recruit"
              v-model="account.job_recruit"
            ></ion-toggle>
          </ion-item>

          <template v-if="account.job_recruit">
            <ion-item lines="none">
              <ion-label>自动招募</ion-label>
              <ion-select
                placeholder="选择标签"
                multiple
                okText="确认"
                cancelText="取消"
                v-model="account.recruit_tag"
                :value="account.recruit_tag"
              >
                <ion-select-option value="六星">六星</ion-select-option>
                <ion-select-option value="五星">五星</ion-select-option>
                <ion-select-option value="四星">四星</ion-select-option>
                <ion-select-option value="小车">小车</ion-select-option>
                <ion-select-option value="其他">其他</ion-select-option>
              </ion-select>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_task')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>任务</ion-label>
            <ion-toggle
              :checked="account.job_task"
              v-model="account.job_task"
            ></ion-toggle>
          </ion-item>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_checkin')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>抽签</ion-label>
            <ion-toggle
              :checked="account.job_checkin"
              v-model="account.job_checkin"
            ></ion-toggle>
          </ion-item>

          <template v-if="account.job_checkin">
            <ion-item lines="none">
              <ion-label>赠送寻访</ion-label>
              <ion-checkbox
                :checked="account.job_activity_recruit"
                v-model="account.job_activity_recruit"
              ></ion-checkbox>
            </ion-item>
          </template>
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
} from "../data/accounts";

export default defineComponent({
  name: "AccountPage",
  data() {
    const route = useRoute();
    const account_index = parseInt(route.params.index as string, 10);
    const accounts = getAccounts();
    const account = accounts[account_index];
    return {
      account_index,
      accounts,
      add,
      today,
      account,
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
