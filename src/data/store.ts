import { reactive } from "vue";
import { account, setting } from "./data";

export const store = reactive({
  account,
  setting,
});
