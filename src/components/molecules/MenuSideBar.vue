<template>
  <Container type="menuContainer">
    <Wrapper type="menuIcon">
      <div v-for="menu in menuIcons" :key="menu.id" class="mt-2">
        <button
          :id="menu.id"
          @click="setIdBtn(menu.path)"
          :class="menu.path == idBtn ? 'text-v_gold' : 'text-white'"
          v-if="hasPermission(menu.permissions)"
        >
          <RouterLink :to="menu.path">
            <v-icon :icon="menu.icon" />

            <v-tooltip activator="parent" location="start">{{
              menu.label
            }}</v-tooltip>
          </RouterLink>
        </button>
      </div>
    </Wrapper>

    <Wrapper type="menuIcon">
      <button @click="logout" class="btnColor text-white">
        <v-icon icon="mdi-logout-variant" />
        <v-tooltip activator="parent" location="start">Sair</v-tooltip>
      </button>
    </Wrapper>
  </Container>
</template>

<script lang="ts" setup>
/* eslint-disable no-undef */
import { PropType } from "vue";
import Wrapper from "../atoms/Wrapper.vue";
import Container from "../atoms/Container.vue";
import { hasPermission } from "@/utils/permissions";

defineProps({
  setIdBtn: {
    type: Function as PropType<(password: string) => void>,
    required: true,
  },
  idBtn: { type: String, required: true },

  logout: {
    type: Function as unknown as () => (event: MouseEvent) => void,
    required: true,
  },

  menuIcons: {
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>

<style scoped>
.btnColor:active {
  color: #234d20;
  transform: scale(0.9);
}
</style>
