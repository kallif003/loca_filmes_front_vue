<template>
  <div class="table-container">
    <Wrapper type="dataTable">
      <slot name="emptyTable"></slot>

      <table>
        <slot name="header"></slot>

        <tbody style="height: auto">
          <tr
            v-for="(items, index) in content"
            :key="items.id"
            class="font-medium"
          >
            <td :style="setTableBackground(index)">
              {{ items.id }}
            </td>

            <td :style="setTableBackground(index)">
              {{ items.name }}
            </td>

            <td :style="setTableBackground(index)">
              {{ items.email }}
            </td>

            <td :style="setTableBackground(index)">
              {{ items.docNum }}
            </td>

            <td :style="setTableBackground(index)">
              {{ items.status }}
            </td>

            <td :style="setTableBackground(index)">
              <v-menu transition="slide-y-transition">
                <template v-slot:activator="{ props }">
                  <button
                    v-bind="props"
                    :disabled="items.status == 'Inativo' ? true : false"
                  >
                    <v-icon icon="mdi-pencil-box-outline" class="" />
                  </button>
                </template>

                <v-list>
                  <v-list-item>
                    <button @click="openUserModal(Actions.UPDATE, items.id)">
                      Atualizar
                    </button>
                  </v-list-item>

                  <v-list-item>
                    <button @click="showDeleteModal(items.id)">Deletar</button>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable no-undef */
import { PropType } from "vue";
import { IUsers } from "@/utils/interfaces";
import { Actions } from "@/utils/enum";
import Wrapper from "../atoms/Wrapper.vue";
import useProps from "@/context/useProps";

const { setTableBackground } = useProps();

defineProps({
  itemsPerPage: { type: Number, required: true },

  actions: { type: Array as PropType<string[]>, required: true },

  content: { type: Array as PropType<IUsers[]>, required: true },

  showDeleteModal: {
    type: Function as PropType<(id: string) => void>,
    required: true,
  },

  openUserModal: {
    type: Function as PropType<(action: string, id: string) => void>,
    required: true,
  },
});
</script>

<style scoped>
@media (max-width: 767px) {
  .table-container {
    width: 40%;
    overflow-y: auto; /* Adiciona uma barra de rolagem horizontal quando necessário */
  }
}

table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  text-align: start;
  padding: 0 2em;
}

th {
  background-color: #77ab59;
  color: #fff;
  height: 3rem;
}

tbody td {
  line-height: 3;
}

.overflow {
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0.3rem;
}

.overflow:hover {
  position: absolute;
  background: #fff;
  height: 2rem;
  margin-top: -1rem;
  box-shadow: 0 0.3rem 0.62rem rgba(0, 0, 0, 0.4);
  border-radius: 0.25rem;
  color: #000;
  width: auto;
  z-index: 10;
}
</style>
