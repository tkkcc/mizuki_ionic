export enum Server {
  Official,
  Bilibili,
}
export namespace Server {
  export function toString(x: Server): string {
    switch (x) {
      case Server.Bilibili:
        return "B服";
      default:
        return "官服";
    }
  }
  export function next(x: Server): Server {
    switch (x) {
      case Server.Bilibili:
        return Server.Official;
      default:
        return Server.Bilibili;
    }
  }
}

export enum AccountMode {
  Daily,
  ZL,
  SSS,
}
export namespace AccountMode {
  export function toString(x: AccountMode): string {
    switch (x) {
      case AccountMode.ZL:
        return "集成战略";
      case AccountMode.SSS:
        return "保全派驻";
      case AccountMode.Daily:
        return "日常";
    }
  }
}

export interface Account {
  name: string;
  zl_max_coin: number;
  zl_max_level: number;
  zl_coin: boolean;
  zl_level: boolean;
  zl_no_waste: boolean;
  mode: AccountMode;
  inherit_diff: string[];
  inherit_index: string;
  username: string;
  password: string;
  server: Server;
  fight: string;
  max_drug: number;
  max_drug_day: number[];
  max_stone: number;
  prefer_goods: string[];
  forbid_goods: string[];

  recruit0: boolean;
  recruit1: boolean;
  recruit4: boolean;
  recruit5: boolean;
  recruit6: boolean;
  recruit_tag: string[];

  job_mail: boolean;
  job_fight: boolean;
  job_dorm: boolean;
  job_dorm_item: string[];
  job_friend: boolean;
  job_gain: boolean;
  job_shift: boolean;
  job_manu: boolean;
  job_clue: boolean;
  job_assist: boolean;
  job_shop: boolean;
  job_recruit: boolean;
  job_task: boolean;
  job_activity_checkin: boolean;
  job_activity_recruit: boolean;

  datetime_control: boolean;
  begin_datetime: string;
  // end_datetime: string;
  allow_weekday: string[];
  allow_monday: boolean;
  allow_tuesday: boolean;
  allow_wednesday: boolean;
  allow_thursday: boolean;
  allow_friday: boolean;
  allow_saturday: boolean;
  allow_sunday: boolean;

  job_checkin: boolean;
  give_away_clue: boolean;

  id: symbol;
}

export const today = () => {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(now.getTime() - offsetMs);
  return dateLocal.toISOString().slice(0, 10) + "T00:00:00Z";
};

export const default_account = (): Account => {
  return {
    begin_datetime: today(),
    // end_datetime: today(),
    id: Symbol(),
    name: "",
    zl_max_coin: 0,
    zl_max_level: 0,
    zl_coin: true,
    zl_level: true,
    zl_no_waste: true,
    mode: AccountMode.Daily,
    inherit_diff: [],
    inherit_index: "0",
    username: "",
    password: "",
    server: Server.Official,
    fight: "jm hd ce ls",
    max_drug: 0,
    max_drug_day: [0, 1, 1, 1, 9, 9, 99],
    max_stone: 0,
    prefer_goods: [],
    forbid_goods: [],

    recruit0: true,
    recruit1: true,
    recruit4: true,
    recruit5: true,
    recruit6: true,
    recruit_tag: ["五星", "四星", "小车", "其他"],

    job_checkin: true,

    job_mail: true,
    job_fight: true,

    job_dorm: true,
    job_dorm_item: ["friend", "gain", "shift", "manu", "clue", "assist"],
    job_friend: true,
    job_gain: true,
    job_shift: true,
    job_manu: true,
    job_clue: true,
    job_assist: true,
    job_shop: true,
    job_recruit: true,
    job_task: true,
    job_activity_checkin: true,
    job_activity_recruit: true,
    datetime_control: false,

    allow_monday: true,
    allow_tuesday: true,
    allow_wednesday: true,
    allow_thursday: true,
    allow_friday: true,
    allow_saturday: true,
    allow_sunday: true,
    allow_weekday: [...Array(7).keys()].reverse().map((x) => x.toString()),

    give_away_clue: false,
  };
};

export namespace Account {
  export function flat(x: Account) {
    return x
    // x.allow_monday = x.allow_weekday.some((x) => x === 0);
    // x.allow_tuesday = x.allow_weekday.some((x) => x === 1);
    // x.allow_wednesday = x.allow_weekday.some((x) => x === 2);
    // x.allow_thursday = x.allow_weekday.some((x) => x === 3);
    // x.allow_friday = x.allow_weekday.some((x) => x === "4");
    // x.allow_saturday = x.allow_weekday.some((x) => x === "5");
    // x.allow_sunday = x.allow_weekday.some((x) => x === "6");
  }
}

const accounts: Account[] = [
  {
    ...default_account(),
    job_mail: false,
    inherit_diff: ["job_fight"],
  },
  {
    ...default_account(),
    name: "22222222222222222222222222222222222222222222222222222222222222222222222",
    job_mail: true,
    inherit_index: "1",
  },
  { ...default_account(), username: "333" },
  { ...default_account(), username: "444" },
];

export const getAllAccount = () => accounts;

export const getAccount = (id: symbol) => accounts.find((x) => x.id === id);

export const getAccountIndex = (id: symbol) =>
  accounts.findIndex((x) => x.id === id);

export interface Setting {
  cloud_username: string;
  cloud_password: string;
  cloud: boolean;
  account_choice: string;
  captcha_username: string;
  captcha_password: string;
  max_login_times_15min: number;
  max_fight_failed_times: number;
  qq_notify: string;
  qq_notify_server: string;
  qq_notify_mail: boolean;
  qq_notify_dorm_enter: boolean;
  qq_notify_dorm_leave: boolean;
  account_allow_empty: boolean;
  qq_notify_scene: string[];
  crontab: string;
}

export const default_setting = (): Setting => {
  return {
    cloud_username: "",
    cloud_password: "",
    cloud: false,
    account_choice: "1-99",
    captcha_username: "",
    captcha_password: "",
    max_login_times_15min: 3,
    max_fight_failed_times: 2,
    qq_notify: "",
    qq_notify_server: "",
    qq_notify_mail: true,
    qq_notify_scene: ["mail", "dorm_enter", "dorm_leave", "task"],
    qq_notify_dorm_enter: true,
    qq_notify_dorm_leave: true,
    account_allow_empty: false,
    crontab: "4:00 8:00 12:00",
  };
};

const setting = default_setting();
export const getSetting = () => setting;

export const goods = [
  "代糖",
  "初级作战记录",
  "加急许可",
  "双酮",
  "固源岩",
  "基础作战记录",
  "家具零件",
  "异铁",
  "异铁碎片",
  "技巧概要·卷1",
  "技巧概要·卷2",
  "招聘许可",
  "源岩",
  "破损装置",
  "碳",
  "碳素",
  "糖",
  "聚酸酯",
  "装置",
  "赤金",
  "酮凝集",
  "酯原料",
  "龙门币",
  //
  "坚雷",
  "讯使",
  "嘉维尔",
];

export const fight = {

};

