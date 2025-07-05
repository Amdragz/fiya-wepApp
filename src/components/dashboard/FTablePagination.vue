<script lang="ts">
interface JPaginationProps {
  currentActivePage: number
  totalPages: number
}
</script>

<script lang="ts" setup>
import { useSpmStore } from '@/stores/spm'
import FIcon from '../system/common/FIcon.vue'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
const spmStore = useSpmStore()
const { getUsersCageData } = spmStore
const { fetchedPages, currentPage } = storeToRefs(spmStore)

const props = defineProps<JPaginationProps>()
const emit = defineEmits(['page-changed'])
const isLoading = ref(false)

const changePage = async (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    const pagesToFetch = []

    for (let i = 1; i <= page; i++) {
      if (!fetchedPages.value.includes(i)) {
        pagesToFetch.push(i)
      }
    }

    if (pagesToFetch.length === 0) {
      currentPage.value = page
      emit('page-changed', page)
      return
    }

    try {
      isLoading.value = true

      for (const p of pagesToFetch) {
        await getUsersCageData({
          page: p,
          per_page: 10,
        })
        fetchedPages.value.push(p)
      }

      currentPage.value = page
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }

    emit('page-changed', page)
  }
}
</script>

<template>
  <div class="f-pagination">
    <button @click="changePage(currentActivePage - 1)" :disabled="currentActivePage === 1" class="page-button">
      <FIcon
        icon-path="M6.41433 6.616L0.966328 4.168V2.896L6.41433 0.448V1.456L1.63833 3.592V3.472L6.41433 5.608V6.616Z"
        :width="7" :height="7" class="icon" />
    </button>

    <button v-for="page in totalPages" :key="page" @click="changePage(page)"
      :class="['page-button', { active: currentActivePage === page }]">
      {{ page }}
    </button>

    <button @click="changePage(currentActivePage + 1)" :disabled="currentActivePage === totalPages" class="page-button">
      <FIcon
        icon-path="M0.0863281 6.616V5.608L4.86233 3.472V3.592L0.0863281 1.456V0.448L5.53433 2.896V4.168L0.0863281 6.616Z"
        :width="6" :height="7" class="icon" />
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
    background-color: #f7f9fc;

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
    background-color: var(--color-brand-primary);
    color: var(--color-white);
  }
}
</style>
