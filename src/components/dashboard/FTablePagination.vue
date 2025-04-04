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
        icon-path="M9.3 13L5.66938 8.76428C5.28419 8.31489 5.28419 7.65177 5.66938 7.20238L9.3 2.96667"
        :width="16"
        :height="16"
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
        icon-path="M6.7 3L10.3306 7.23572C10.7158 7.6851 10.7158 8.34823 10.3306 8.79762L6.7 13.0333"
        :width="16"
        :height="16"
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
    width: 2rem;
    height: 2rem;
    border-radius: 0.25rem;
    border: none;
    background-color: transparent;
    cursor: pointer;

    .icon {
      fill: none;
      stroke:  var(--color-brand-neutral-900);
      stroke-width: 1.1;
      stroke-linecap: round;
    }

    &:disabled {
      background-color:  var(--color-blue-200);
      cursor: not-allowed;
    }
  }

  .page-button.active {
    background-color:  var(--color-brand-primary-400);
    color: var(--color-white);
  }
}
</style>
