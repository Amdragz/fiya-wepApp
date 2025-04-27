<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface FMobileTableProps<T = any> {
  tableFields: T[]
  fieldMapping: string[],
  displayExportButton: boolean,
}
</script>

<script setup lang="ts">
import { iconHoriz2 } from '@/assets/images/icons'
import FIcon from '../system/common/FIcon.vue'
import FBtn from '../system/form/FBtn.vue'
import { ref } from 'vue'
import { useSpmStore } from '@/stores/spm'
const { downloadCageInfoInCsvFormat } = useSpmStore()

const props = defineProps<FMobileTableProps>()

const isExportingCageInfo = ref(false)
const userDownloadCageInfoInCsv = async () => {
  isExportingCageInfo.value = true
  try {
    await downloadCageInfoInCsvFormat()
    console.log('downloaded')
  } catch (error) {
    console.log(error)
    isExportingCageInfo.value = false
  } finally {
    isExportingCageInfo.value = false
  }
}
</script>

<template>
  <div class="f-mobile-table">
    <FBtn v-if="displayExportButton" @click="userDownloadCageInfoInCsv" color="secondary" class="export-button">
      <span v-if="isExportingCageInfo"> Downloading...</span>
      <span v-else> Export data</span>
    </FBtn>
    <div v-for="(field, index) in props.tableFields" :key="index" class="table-container">
      <div class="table-content">
        <slot name="row1" :field="field">
          <div class="row1">
            <p>{{ field[fieldMapping[0]].slice(0, 6) }}</p>
            <p>{{ field[fieldMapping[1]] }}</p>
          </div>
        </slot>
        <slot name="row2" :field="field">
          <div class="row2">
            <p>{{ field[fieldMapping[2]] }}</p>
            <div class="actions">
              <button>
                <FIcon :icon-path="iconHoriz2" :width="24" :height="24">
                  <path
                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </FIcon>
              </button>
              <p>{{ field[fieldMapping[3]] }}</p>
            </div>
          </div>
        </slot>
      </div>
      <hr />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/mixins';

.f-mobile-table {
  .export-button {
    margin-right: auto;
    margin-bottom: 2rem;
  }

  .table-container {
    display: grid;
    color: #212121;

    p {
      margin: 0;
    }

    .table-content {
      display: grid;
      gap: 0.5rem;

      * {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .row1 {
        p {
          font-size: 0.875rem;
          font-weight: 400;
        }
      }

      .row2 {
        p {
          font-size: 0.875rem;
          font-weight: 400;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          button {
            border: none;
            border-radius: 100%;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-white);

            &:active {
              background-color: var(--color-brand-neutral-400);
            }

            .icon {
              fill: none;
              stroke: #667185;
              stroke-width: 1.5;
              stroke-linecap: round;
              stroke-linejoin: round;
            }
          }
        }
      }
    }

    hr {
      width: 100%;
      color: #d9d9d9;
      margin: 1rem 0;
    }
  }

  @include mixins.media-breakpoint('min-width', md) {
      display: none;
    }
}
</style>
