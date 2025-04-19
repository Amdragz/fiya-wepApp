<script lang="ts">
interface JPaginationProps {
  currentPage: number
  totalPages: number
}
</script>

<script lang="ts" setup>
import FIcon from '../system/common/FIcon.vue'

const props = defineProps<JPaginationProps>()

const emit = defineEmits(['page-changed'])

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-changed', page)
  }
}
</script>

<template>
  <div class="f-pagination">
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="page-button">
      <FIcon
        icon-path="M6.41433 6.616L0.966328 4.168V2.896L6.41433 0.448V1.456L1.63833 3.592V3.472L6.41433 5.608V6.616Z"
        :width="7"
        :height="7"
        class="icon"
      />
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      :class="['page-button', { active: currentPage === page }]"
    >
      {{ page }}
    </button>

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="page-button"
    >
      <FIcon
        icon-path="M0.0863281 6.616V5.608L4.86233 3.472V3.592L0.0863281 1.456V0.448L5.53433 2.896V4.168L0.0863281 6.616Z"
        :width="6"
        :height="7"
        class="icon"
      />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.f-pagination {
  width: fit-content;
  margin-left: auto;
  display: flex;
  gap: 0.5rem;

  .page-button {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
    background-color: #F7F9FC;

    // .icon {
    //   fill: none;
    //   stroke:  var(--color-brand-neutral-900);
    //   stroke-width: 1.1;
    //   stroke-linecap: round;
    // }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .page-button.active {
    background-color:  var(--color-brand-primary);
    color: var(--color-white);
  }
}
</style>
