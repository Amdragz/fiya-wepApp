<script lang="ts">
const FormSchema = z.object({
  cage_id: z.string().min(1, { message: 'Cage id is required' }),
  livestock_no: z.number().min(1, { message: 'You must have atleast one livestock' }),
  assigned_monitor: z.string().min(1, { message: ' Assigned monitor is required' }),
})
</script>

<script setup lang="ts">
import { iconHoriz, iconRefresh } from '@/assets/images/icons'
import FIcon from '@/components/system/common/FIcon.vue'
import FDashBoardTable from '@/components/dashboard/FDashBoardTable.vue'
import { computed, ref } from 'vue'
import FInput from '@/components/system/form/FInput.vue'
import FBtn from '@/components/system/form/FBtn.vue'
import { useSpmStore } from '@/stores/spm'
import { storeToRefs } from 'pinia'
import { formatToHMSdate } from '@/utils/helper'
import { z } from 'zod'
import { useZodForm } from '@/composables/useZodForm'

const spmStore = useSpmStore()
const { addNewCage } = spmStore
const { cageInfoList } = storeToRefs(spmStore)

const { formData, errors, validateForm, debouncedHandleChange } = useZodForm<typeof FormSchema.shape>(FormSchema)
const isLoading = ref(false)

const addNewUserCage = async () => {
  isLoading.value = true
  const isValid = validateForm()

  if (!isValid) return

  try {
    await addNewCage({
      cage_id: formData.value.cage_id,
      livestock_no: formData.value.livestock_no,
      assigned_monitor: formData.value.assigned_monitor,
    })
    console.log("Success")
  } catch (error) {
    console.log(error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}

const fieldHeader = [
  'Cage ID',
  'Livestock no',
  'Assigned monitor',
  'Date added',
  'Last updated',
  'actions',
]

const headerKeyMap: Record<string, string> = {
  'Cage ID': 'cageId',
  'Livestock no': 'livestockNo',
  'Assigned monitor': 'assignedMonitor',
  'Date added': 'dateAdded',
  'Last updated': 'lastUpdated',
  actions: 'actions',
}

const tableFields = computed(() => {
  const tableFields = cageInfoList.value.map((cageInfo) => {
    const dateAdded = formatToHMSdate(cageInfo.created_at)
    const lastUpdated = formatToHMSdate(cageInfo.updated_at)
    return {
      cageId: cageInfo.cage_id,
      livestockNo: cageInfo.livestock_no,
      assignedMonitor: cageInfo.assigned_monitor,
      dateAdded: dateAdded,
      lastUpdated: lastUpdated,
    }
  })

  return tableFields
})
</script>

<template>
  <div class="poultry-cage-page">
    <div class="status-bar">
      <div class="status">
        <p>Health score: 40%</p>
        <div class="divider"></div>
        <p>Unhealthy score: 60%</p>
        <div class="divider"></div>
        <p>Unavailable monitor score: 0%</p>
      </div>
      <button class="refresh">
        <FIcon :width="20" :height="20" :icon-path="iconRefresh" />
        <p>Refresh</p>
      </button>
    </div>

    <div class="cage-page-body">
      <div class="cage-table">
        <FDashBoardTable
          :headers="fieldHeader"
          :header-key-map="headerKeyMap"
          :page-size="10"
          :table-fields="tableFields"
        >
          <template #field="{ field, colIndex }">
            <span v-if="colIndex === 0">{{ field.slice(0, 6) }}</span>
            <span v-if="colIndex === 5" class="actions">
              <button>
                <FIcon :icon-path="iconHoriz" :width="21" :height="20" />
              </button>
            </span>
          </template>
        </FDashBoardTable>
      </div>

      <div class="form-container">
        <form action="" @submit.prevent="addNewUserCage">
          <div class="header">
            <p class="title">Add new cage</p>
            <p class="subtitle">Register a new cage to track health</p>
          </div>

          <div class="body">
            <FInput
              v-model:model-value="formData.cage_id"
              label="Cage ID"
              placeholder="Enter ID"
              @input="debouncedHandleChange($event, 'cage_id')"
              :has-error="!!errors.cage_id"
              :error-message="errors.cage_id"
            />
            <FInput
              v-model.number.trim="formData.livestock_no"
              label="No of live stock"
              placeholder="1"
              type="number"
              @input="debouncedHandleChange($event, 'livestock_no')"
              :has-error="!!errors.livestock_no"
              :error-message="errors.livestock_no"
            />
            <FInput
              v-model:model-value="formData.assigned_monitor"
              label="Assigned monitor ID"
              placeholder="Enter ID"
              @input="debouncedHandleChange($event, 'assigned_monitor')"
              :has-error="!!errors.assigned_monitor"
              :error-message="errors.assigned_monitor"
            />
            <FBtn size="lg" type="submit" :loading="isLoading">Add new cage</FBtn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.poultry-cage-page {
  width: 100%;
  max-width: 1408px;
  padding: 1rem;
  margin: 0 auto;
  background-color: var(--color-brand-neutral-200);

  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.825rem 1.5rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;
    margin-bottom: 0.5rem;

    .status {
      display: flex;
      align-items: center;
      gap: 1rem;

      .divider {
        border: 1px solid var(--color-text-primary);
        height: 1rem;
      }

      p {
        font-size: 0.825rem;
        font-weight: 400;
        color: var(--color-text-primary);
      }
    }

    .refresh {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--color-white);
      border: none;
      transition: background-color 0.15s ease-in-out;
      border-radius: 0.5rem;

      &:hover {
        background-color: var(--color-brand-neutral-200);
      }

      .f-icon {
        fill: none;
        stroke: #01832b;
        stroke-width: 1.5;
        stroke-linecap: 'round';
        stroke-linejoin: 'round';
        stroke-dasharray: '3 3';
      }

      p {
        font-size: 0.825rem;
        font-weight: 400;
        color: #01832b;
      }
    }
  }

  .cage-page-body {
    width: 100%;
    max-width: 1408px;
    display: flex;
    gap: 1.25rem;

    .form-container {
      width: 100%;
      max-width: 422px;
      padding: 52px 40px;
      background-color: var(--color-white);

      form {
        display: grid;
        gap: 2.5rem;

        .header {
          display: grid;
          gap: 0.75rem;

          .title {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-text-primary);
            text-align: center;
          }

          .subtitle {
            font-size: 0.75rem;
            font-weight: 400;
            color: var(--color-text-secondary);
            text-align: center;
          }
        }

        .body {
          display: grid;
          gap: 2rem;

          .f-btn {
            margin-top: 1rem;
            border-radius: 0.5rem;
          }
        }
      }
    }

    .cage-table {
      margin-top: 0.5rem;
      background-color: var(--color-white);
      padding: 1.25rem;
      width: 100%;

      .f-table {
        .actions {
          button {
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--color-white);

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
  }
}
</style>
