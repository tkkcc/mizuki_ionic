<script lang="ts" setup>
import { IonApp, IonRouterOutlet } from "@ionic/vue";

import { useBackButton } from "@ionic/vue";

let last_time_back = 0;
useBackButton(10, () => {
  const event = new KeyboardEvent("keydown", {
    key: "Escape",
  });
  document.dispatchEvent(event);
});
</script>

<template>
  <ion-app>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <!-- <ion-router-outlet /> -->
  </ion-app>
</template>
