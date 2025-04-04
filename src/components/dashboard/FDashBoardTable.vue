<script lang="ts">
interface FTableProps {
  headers: string[]
  headerKeyMap?: Record<string, string>
  tableFields: Record<string, unknown>[]
  pageSize: number
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import FTablePagination from './FTablePagination.vue'
import FBtn from '../system/form/FBtn.vue'
import FIcon from '../system/common/FIcon.vue'
import { iconCalender } from '@/assets/images/icons'

const props = defineProps<FTableProps>()

const newSearchFilter = ref<string | null>()
const newTimeSelectFilter = ref<string | null>()

const filteredFields = computed(() => {
  let currentFields = props.tableFields

  if (newSearchFilter.value) {
    currentFields = currentFields.filter((field) => {
      const cageId = field.cageId ?? '';
      const livestockNo = field.livestockNo ?? '';

      return (
        (typeof cageId === 'string' && cageId.includes(newSearchFilter.value ?? '')) ||
        (typeof livestockNo === 'string' && livestockNo.includes(newSearchFilter.value ?? ''))
      )
    })
  }

  if (newTimeSelectFilter.value) {
    currentFields = currentFields.filter((field) => {
      const timestamp = field.timestamp ?? '';
      return typeof timestamp === 'string' && timestamp.includes(newTimeSelectFilter.value ?? '')
    })
  }

  return currentFields
})



const totalItems = computed(() => filteredFields.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize))

const currentPage = ref(1)
const pageSize = props.pageSize

const paginatedFields = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredFields.value.slice(start, end)
})

const handlePageChange = (page: number) => {
  currentPage.value = page
}
</script>

<template>
  <div class="f-table">
    <div class="header">
      <input type="text" placeholder="Search" />
      <div class="buttons">
        <button class="time">
          <FIcon :width="20" :height="20" :icon-path="iconCalender" />
          <p>Today</p>
        </button>
        <FBtn color="secondary"> Export data </FBtn>
      </div>
    </div>
    <table class="table">
      <thead class="header-container">
        <tr>
          <th v-for="(header, index) in props.headers" :key="index" class="headers">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="field-container">
        <transition-group name="field-transition">
          <tr v-for="(fields, rowIndex) in paginatedFields" :key="rowIndex">
            <td v-for="(header, colIndex) in props.headers" :key="colIndex" class="field">
              <slot
                name="field"
                :field="fields[props.headerKeyMap?.[header] ?? header]"
                :rowIndex="rowIndex"
                :colIndex="colIndex"
              >
                {{ fields[props.headerKeyMap?.[header] ?? header] }}
              </slot>
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
    <FTablePagination
      :currentPage="1"
      :totalPages="totalPages"
      @page-changed="handlePageChange"
      class="f-pagination"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.f-table {
  padding: 1rem 0;
  margin: 0 auto;

  .header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    input {
      width: 100%;
      max-width: 437px;
      border: 1px solid #e4e7ec;
      border-radius: 0.25rem;
      background-color: #f0f2f5;

      padding: 0.825rem 3.75rem;
      font-size: 0.875rem;
      font-weight: 400;
      color: var(--color-text-scondary);
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNSAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjUgMTlDMTUuOTE4MyAxOSAxOS41IDE1LjQxODMgMTkuNSAxMUMxOS41IDYuNTgxNzIgMTUuOTE4MyAzIDExLjUgM0M3LjA4MTcyIDMgMy41IDYuNTgxNzIgMy41IDExQzMuNSAxNS40MTgzIDcuMDgxNzIgMTkgMTEuNSAxOVoiIHN0cm9rZT0iIzg5OTM5RSIgc3Ryb2tlLXdpZHRoPSIxLjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cGF0aCBkPSJNMjEuNTAwNCAyMS4wMDA0TDE3LjE1MDQgMTYuNjUwNCIgc3Ryb2tlPSIjODk5MzlFIiBzdHJva2Utd2lkdGg9IjEuNCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=');
      background-repeat: no-repeat;
      background-position: left 1rem center;
    }

    .buttons {
      display: flex;
      gap: 1rem;
      // width: 100%;
      // max-width: 240px;

      .time {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        gap: 0.5rem;
        background-color: #f0f2f5;
        border: 1px solid #e4e7ec;
        border-radius: 0.25rem;

        .f-icon {
          fill: none;
          stroke-width: 1.5;
          stroke-miterlimit: 10;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke: #292d32;
        }

        p {
          font-size: 0.825rem;
          font-weight: 500;
          color: #475367;
        }
      }

      .f-btn {
        padding: 10px 1.5rem;
      }
    }
  }

  .table {
    width: 100%;
    font-size: .75rem;
    text-align: left;
    color: var(--color-brand-neutral-900);
    margin-bottom: 3rem;

    .header-container {
      width: 100%;
      // background: var(--color-brand-neutral-400);

      .headers {
        padding: 0.75rem 1rem;
        font-weight: 400;
        text-transform: capitalize;
      }
    }

    .field-container {
      max-width: 1362px;

      .field-transition-move,
      .field-transition-enter-active,
      .field-transition-leave-active {
        transition: all 1s ease;
      }

      .field-transition-enter,
      .field-transition-leave-to {
        opacity: 0;
        transform: translateY(-10px);
      }

      .field-transition-leave-active {
        position: absolute;
      }

      tr {

        .field {
          font-weight: 400;
          padding: 0.75rem 1rem;
          text-transform: capitalize;
          color: var(--color-brand-neutral-700);
        }
      }
    }

    .f-pagination {
      margin: 0 auto;
    }
  }
}
</style>
