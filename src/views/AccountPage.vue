<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { RecycleScroller } from "vue-virtual-scroller";

import {
  IonChip,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonToolbar,
  IonTitle,
  IonCheckbox,
  IonSegment,
  IonSegmentButton,
  IonCardContent,
  alertController,
} from "@ionic/vue";
import {
  arrowBackOutline as back_icon,
  trash as trash_icon,
} from "ionicons/icons";
import { getAllAccount, Server, goods } from "../data/accounts";
import { reactive, ref, computed } from "vue";

const fight_modal = ref(null);
const fight_text = ref(null);
const inherit_modal = ref(null);
const router = useRouter();
const route = useRoute();
const account_index = parseInt(route.params.index as string, 10);
const all_account = reactive(getAllAccount());
const account = computed(() => all_account[account_index]);

const is_default_inherit = computed((): boolean => {
  const index = parseInt(account.value.inherit_index, 10);
  if (index <= 0 || index > all_account.length) {
    return true;
  }
  return false;
});
const inherit_text = computed((): string => {
  const index = parseInt(account.value.inherit_index, 10);
  if (index <= 0 || index > all_account.length) {
    return "默认设置";
  }
  const inherit = all_account[index - 1];
  return `#${index} ${inherit.name}`;
});

const choose_fight_type = ref("mission");

function join_common_element(x: string) {
  let arr = x.trim().split(/\s+/);
  let arr_expand: [string, number][] = [];
  for (const x of arr) {
    // split 1-7x99 into [1-7, 99]
    const pos = x.search(/\*\d+/);
    let fight: string, times: number;
    if (pos < 0) {
      [fight, times] = [x, 1];
    } else {
      [fight, times] = [x.slice(0, pos), parseInt(x.slice(pos + 1), 10)];
    }
    // merge [1-7, 2],[1-7, 3] into [1-7, 5]
    if (
      arr_expand.length > 0 &&
      fight == arr_expand[arr_expand.length - 1][0]
    ) {
      arr_expand[arr_expand.length - 1][1] += times;
    } else {
      arr_expand.push([fight, times]);
    }
  }

  return arr_expand
    .map(([fight, times]) => {
      return times == 1 ? fight : fight + "*" + times;
    })
    .join(" ");
}

function add_fight(text: string) {
  const element = (fight_text.value as any).$el
    .firstElementChild as HTMLInputElement;

  // 删除选中文字
  //element.setRangeText("");

  // 从start向后找第一个空白字符
  let value = element.value;
  let start =
    element.selectionStart == null ? value.length - 1 : element.selectionStart;
  while (start > 0 && start <= value.length - 1 && value[start - 1] != " ") {
    start += 1;
  }

  // 插入合并标签
  let new_start = join_common_element(
    value.slice(0, start) + " " + text
  ).length;
  value = value.slice(0, start) + " " + text + " " + value.slice(start);
  value = join_common_element(value);

  // 赋值
  element.value = value;
  element.dispatchEvent(new Event("input"));
  element.focus();
  while (new_start <= value.length - 1 && value[new_start] != " ") {
    new_start += 1;
  }
  element.setSelectionRange(new_start, new_start);
}

function close_fight_modal() {
  (fight_modal.value as any).$el.dismiss(null, "cancel");
}

function close_inherit_modal() {
  (inherit_modal.value as any).$el.dismiss(null, "cancel");
}

async function removeAccount() {
  const index = account_index;
  const alert = await alertController.create({
    header: `即将删除账号`,

    message: `警告：删除会影响其余账号的序号与继承关系，可以通过清空账号或密码来跳过执行`,
    buttons: [
      {
        text: "取消",
        role: "cancel",
      },
      {
        text: "确认删除",
        role: "confirm",
      },
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
  if (role == "confirm") {
    // 基于本账号的改为基于默认
    all_account.forEach((account) => {
      if (account.inherit_index === (index + 1).toString()) {
        account.inherit_index = "0";
      }
    });

    // 基于本账号后续账号的所有账号，inherit_index - 1
    all_account.forEach((account) => {
      if (parseInt(account.inherit_index, 10) > index + 1) {
        account.inherit_index = (
          parseInt(account.inherit_index, 10) - 1
        ).toString();
      }
    });
    all_account.splice(index, 1);
    router.back();
  }
}
</script>
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button slot="start" default-href="/"></ion-back-button>

        <ion-button slot="end" fill="clear" color="medium" @click.stop="removeAccount()">
          <ion-icon :icon="trash_icon"></ion-icon>
        </ion-button>

        <ion-title>#{{ account_index + 1 }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" v-if="account">
      <ion-card>
        <ion-item lines="none">
          <ion-label>账号</ion-label>
          <ion-input v-model="account.username" :value="account.username"></ion-input>
          <ion-button @click.stop="account.server = Server.next(account.server)" fill="outline">{{
    Server.toString(account.server)
}}
          </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>密码</ion-label>
          <ion-input v-model="account.password" :value="account.password"></ion-input>
          <!-- <ion-spinner></ion-spinner> -->
          <ion-button :disabled="false"> 校验 </ion-button>
        </ion-item>

        <ion-item lines="none">
          <ion-label>备注</ion-label>
          <ion-input v-model="account.name" :value="account.name"></ion-input>
        </ion-item>

        <ion-item lines="none" id="open-inherit-modal" detail button>
          <ion-label slot="start">基于</ion-label>

          <!-- <ion-select placeholder="" okText="确认" cancelText="取消" v-model="account.inherit_index" -->
          <!--   :value="account.inherit_index"> -->

          <ion-label slot="end">{{ inherit_text }}</ion-label>
        </ion-item>

        <ion-modal trigger="open-inherit-modal" ref="inherit_modal">
          <ion-header>
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button @click.stop="close_inherit_modal()">
                  <ion-icon :icon="back_icon"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>基于</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-item @click.stop="account.inherit_index = '0'" lines="none">
              <ion-label>默认设置</ion-label>
              <ion-checkbox :checked="is_default_inherit" slot="start"></ion-checkbox>
            </ion-item>

            <RecycleScroller class="scroller" :items="all_account" :item-size="56">
              <template v-slot="{ item, index }">
                <ion-item :disabled="index == account_index"
                  @click.stop="account.inherit_index = (index + 1).toString()" lines="none">
                  <ion-label>#{{ index + 1 }} {{ item.name }} </ion-label>
                  <ion-checkbox :checked="(index + 1).toString() == account.inherit_index" slot="start"></ion-checkbox>
                </ion-item>
              </template>
            </RecycleScroller>
          </ion-content>
        </ion-modal>

        <!--             <ion-select-option value="0">默认设置</ion-select-option> -->
        <!---->
        <!--             <template v-for="(account, index) in all_account" :key="account.id"> -->
        <!--               <ion-select-option v-if="index != account_index" :value="(index + 1).toString()">#{{ index + 1 }} {{ -->
        <!--     account.name -->
        <!-- }}</ion-select-option> -->
        <!--             </template> -->
        <!---->
        <!--   </ion-select> -->
        <!-- </ion-item> -->

        <ion-item lines="none">
          <ion-label>修改</ion-label>
          <ion-select multiple placeholder="" okText="确认" cancelText="取消" v-model="account.inherit_diff"
            :value="account.inherit_diff">
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
          <ion-toggle :checked="account.datetime_control" v-model="account.datetime_control"></ion-toggle>
        </ion-item>

        <template v-if="account.datetime_control">
          <ion-item lines="none">
            <ion-label>允许星期</ion-label>

            <ion-select placeholder="" multiple okText="确认" cancelText="取消" v-model="account.allow_weekday"
              :value="account.allow_weekday">
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

            <ion-input v-model="account.begin_datetime" :value="account.begin_datetime"></ion-input>

            <!-- genymoiton 不支持 闪退  -->
            <!-- <ion-datetime></ion-datetime> -->
            <!-- <ion-datetime-button datetime="begin_datetime"></ion-datetime-button> -->
            <!-- <ion-modal :keep-contents-mounted="true"> -->
            <!--   <ion-datetime :show-default-buttons="true" done-text="确认" cancelText="取消" id="begin_datetime" -->
            <!--     v-model="account.begin_datetime" :value="account.begin_datetime" :min="today()"></ion-datetime> -->
            <!-- </ion-modal> -->
          </ion-item>
        </template>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_mail')">
        <ion-item lines="none">
          <ion-label>邮件</ion-label>
          <ion-toggle :checked="account.job_mail" v-model="account.job_mail"></ion-toggle>
        </ion-item>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_fight')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>作战</ion-label>
            <ion-toggle :checked="account.job_fight" v-model="account.job_fight"></ion-toggle>
          </ion-item>

          <template v-if="account.job_fight">
            <ion-item lines="none" detail button id="open-fight-modal">
              <ion-label slot="start">目标</ion-label>
              <ion-label slot="end">{{ account.fight }}</ion-label>
            </ion-item>

            <ion-modal trigger="open-fight-modal" ref="fight_modal">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click.stop="close_fight_modal()">
                      <ion-icon :icon="back_icon"></ion-icon>
                    </ion-button>
                  </ion-buttons>
                  <ion-input ref="fight_text" type="text" :value="account.fight" v-model="account.fight"></ion-input>
                </ion-toolbar>
              </ion-header>

              <ion-content>
                <ion-segment :value="choose_fight_type" v-model="choose_fight_type">
                  <ion-segment-button value="mission">
                    <ion-label>关卡</ion-label>
                  </ion-segment-button>

                  <ion-segment-button value="material">
                    <ion-label>材料</ion-label>
                  </ion-segment-button>

                  <ion-segment-button value="operator">
                    <ion-label>干员</ion-label>
                  </ion-segment-button>
                </ion-segment>

                <template v-if="choose_fight_type === 'mission'">
                  <template v-for="i in 3" :key="i">
                    <ion-card>
                      <ion-card-content>
                        <p>第11章{{ i }}</p>
                        <ion-chip size="small" @click="add_fight('1-7')">1-7</ion-chip>
                        <ion-chip size="small" @click="add_fight('ce')">ce</ion-chip>
                        <ion-chip size="small" @click="add_fight('jm')">剿灭</ion-chip>
                        <ion-chip size="small" @click="add_fight('dqwt')">当前委托</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt1')">长期委托1</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt2')">长期委托2</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt3')">长期委托3</ion-chip>

                        <ion-chip size="small" @click="add_fight('hd')">活动</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-10')">活动10</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-9')">活动9</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-8')">活动8</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-7')">活动7</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-6')">活动6</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-5')">活动5</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-4')">活动4</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-3')">活动3</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-2')">活动2</ion-chip>
                        <ion-chip size="small" @click="add_fight('hd-1')">活动1</ion-chip>
                        <ion-chip size="small" @click="add_fight('1-7')">1-7</ion-chip>
                        <ion-chip size="small" @click="add_fight('ce')">ce</ion-chip>
                        <ion-chip size="small" @click="add_fight('jm')">剿灭</ion-chip>
                        <ion-chip size="small" @click="add_fight('dqwt')">当前委托</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt1')">长期委托1</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt2')">长期委托2</ion-chip>
                        <ion-chip size="small" @click="add_fight('cqwt3')">长期委托3</ion-chip>
                      </ion-card-content>
                      <!-- </ion-item> -->
                    </ion-card>
                  </template>
                </template>

                <template v-else-if="choose_fight_type === 'material'">
                  <ion-card>
                    <ion-card-content>
                      <ion-item>
                        <ion-avatar class="ion-margin-end">
                          <img alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </ion-avatar>

                        <ion-label>碳 >=</ion-label>
                        <ion-input value="4"></ion-input>
                        <ion-button size="small">ok</ion-button>
                      </ion-item>
                    </ion-card-content>
                  </ion-card>
                </template>

                <template v-else>
                  <ion-card>
                    <ion-card-content>
                      <ion-item>
                        <ion-avatar class="ion-margin-end">
                          <img alt="Silhouette of a person's head"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg" />
                        </ion-avatar>

                        <ion-label>能天使</ion-label>
                        <ion-input value="精二90级"></ion-input>
                        <ion-input value="1技能专三"></ion-input>
                        <ion-button size="small">ok</ion-button>
                      </ion-item>
                    </ion-card-content>
                  </ion-card>
                </template>
              </ion-content>
            </ion-modal>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_dorm')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>基建</ion-label>
            <ion-toggle :checked="account.job_dorm" v-model="account.job_dorm"></ion-toggle>
          </ion-item>

          <template v-if="account.job_dorm">
            <ion-item lines="none">
              <ion-label>事项</ion-label>
              <ion-select placeholder="" multiple okText="确认" cancelText="取消" v-model="account.job_dorm_item"
                :value="account.job_dorm_item">
                <ion-select-option value="friend">访友</ion-select-option>
                <ion-select-option value="gain">收获</ion-select-option>
                <ion-select-option value="shift">排班</ion-select-option>
                <ion-select-option value="manu">加速</ion-select-option>
                <ion-select-option value="assist">副手</ion-select-option>
                <ion-select-option value="clue">线索</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none" :disabled="!account.job_dorm_item.includes('clue')">
              <ion-label>线索全送</ion-label>
              <ion-toggle :checked="account.give_away_clue" v-model="account.give_away_clue"></ion-toggle>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_shop')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>信交</ion-label>
            <ion-toggle :checked="account.job_shop" v-model="account.job_shop"></ion-toggle>
          </ion-item>

          <template v-if="account.job_shop">
            <ion-item lines="none">
              <ion-label>先买</ion-label>
              <ion-select placeholder="" multiple okText="确认" cancelText="取消" v-model="account.prefer_goods"
                :value="account.prefer_goods">
                <ion-select-option v-for="(x, index) in goods" :key="index" :value="x">{{ x }}</ion-select-option>
              </ion-select>
            </ion-item>

            <ion-item lines="none">
              <ion-label>不买</ion-label>
              <ion-select placeholder="" multiple okText="确认" cancelText="取消" v-model="account.forbid_goods"
                :value="account.forbid_goods">
                <ion-select-option v-for="(x, index) in goods" :key="index" :value="x">{{ x }}</ion-select-option>
              </ion-select>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_recruit')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>公招</ion-label>
            <ion-toggle :checked="account.job_recruit" v-model="account.job_recruit"></ion-toggle>
          </ion-item>

          <template v-if="account.job_recruit">
            <ion-item lines="none">
              <ion-label>自动招募</ion-label>
              <ion-select placeholder="选择标签" multiple okText="确认" cancelText="取消" v-model="account.recruit_tag"
                :value="account.recruit_tag">
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
            <ion-toggle :checked="account.job_task" v-model="account.job_task"></ion-toggle>
          </ion-item>
        </ion-item-group>
      </ion-card>

      <ion-card v-if="account.inherit_diff.includes('job_checkin')">
        <ion-item-group>
          <ion-item lines="none">
            <ion-label>抽签</ion-label>
            <ion-toggle :checked="account.job_checkin" v-model="account.job_checkin"></ion-toggle>
          </ion-item>

          <template v-if="account.job_checkin">
            <ion-item lines="none">
              <ion-label>赠送寻访</ion-label>
              <ion-checkbox :checked="account.job_activity_recruit"
                v-model="account.job_activity_recruit"></ion-checkbox>
            </ion-item>
          </template>
        </ion-item-group>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.scroller {
  height: 100%;
}

.inherit_item {
  height: 56%;
}
</style>
