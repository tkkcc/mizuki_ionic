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
  zl_max_coin: number;
  zl_max_level: number;
  zl_coin: boolean;
  zl_level: boolean;
  zl_no_waste: boolean;
  mode: AccountMode;
  inherit: boolean;
  inherit_index: number;
  username: string;
  password: string;
  server: Server;
  fight: string;
  max_drug: number;
  max_drug_day: number[];
  max_stone: number;
  prefer_goods: string;
  dislike_goods: string;

  recruit0: boolean;
  recruit1: boolean;
  recruit4: boolean;
  recruit5: boolean;
  recruit6: boolean;

  job_mail: boolean;
  job_fight: boolean;
  job_friend: boolean;
  job_gain: boolean;
  job_shift: boolean;
  job_manu: boolean;
  job_clue: boolean;
  job_assist: boolean;
  job_shop: boolean;
  job_recruit: boolean;
  job_task: boolean;
  job_activity: boolean;
  allow_monday: boolean;
  allow_tuesday: boolean;
  allow_wednesday: boolean;
  allow_thursday: boolean;
  allow_friday: boolean;
  allow_saturday: boolean;
  allow_sunday: boolean;
  allow_after: string;
  id: number;
}

const default_account = (id: number): Account => {
  return {
    id,
    zl_max_coin: 0,
    zl_max_level: 0,
    zl_coin: true,
    zl_level: true,
    zl_no_waste: true,
    mode: AccountMode.Daily,
    inherit: false,
    inherit_index: 0,
    username: "",
    password: "",
    server: Server.Official,
    fight: "jm hd ce ls",
    max_drug: 0,
    max_drug_day: [0, 0, 0, 1, 1, 1, 1],
    max_stone: 0,
    prefer_goods: "",
    dislike_goods: "",

    recruit0: true,
    recruit1: true,
    recruit4: true,
    recruit5: true,
    recruit6: true,

    job_mail: true,
    job_fight: true,
    job_friend: true,
    job_gain: true,
    job_shift: true,
    job_manu: true,
    job_clue: true,
    job_assist: true,
    job_shop: true,
    job_recruit: true,
    job_task: true,
    job_activity: true,
    allow_monday: true,
    allow_tuesday: true,
    allow_wednesday: true,
    allow_thursday: true,
    allow_friday: true,
    allow_saturday: true,
    allow_sunday: true,
    allow_after: "2022-10-22",
  };
};
const accounts: Account[] = [
  {
    ...default_account(1),
    job_mail: false,
    job_fight: false,
  },
  {
    ...default_account(2),
    job_mail: true,
    job_fight: false,
    id: 2,
  },
  default_account(3),
  default_account(4),
];

export const getAccounts = () => accounts;

export const getAccount = (id: number) => accounts.find((x) => x.id === id);
