<script lang="ts">
type TableFields = {
  cageId: string
  livestockNo: string
  assignedMonitor: string
  dateAdded: string
  lastUpdated: string
}

interface NewCageFormData {
  cageId: string
  noOfLivestock: string
  assignedMonitorId: string
}
</script>

<script setup lang="ts">
import { iconHoriz, iconRefresh } from '@/assets/images/icons'
import FIcon from '@/components/system/common/FIcon.vue'
import FDashBoardTable from '@/components/dashboard/FDashBoardTable.vue'
import { ref } from 'vue'
import FInput from '@/components/system/form/FInput.vue'
import FBtn from '@/components/system/form/FBtn.vue'

const tableFields: TableFields[] = [
  {
    cageId: 'CG-70',
    livestockNo: '16',
    assignedMonitor: 'MON-32132929',
    dateAdded: '18-03-26',
    lastUpdated: '24-06-22',
  },
  {
    cageId: 'CG-20',
    livestockNo: '10',
    assignedMonitor: 'MON-14635753',
    dateAdded: '21-04-29',
    lastUpdated: '23-06-13',
  },
  {
    cageId: 'CG-47',
    livestockNo: '42',
    assignedMonitor: 'MON-72398103',
    dateAdded: '22-08-28',
    lastUpdated: '18-02-03',
  },
  {
    cageId: 'CG-77',
    livestockNo: '14',
    assignedMonitor: 'MON-73798510',
    dateAdded: '24-03-12',
    lastUpdated: '24-10-07',
  },
  {
    cageId: 'CG-61',
    livestockNo: '13',
    assignedMonitor: 'MON-23232756',
    dateAdded: '18-05-07',
    lastUpdated: '23-03-07',
  },
  {
    cageId: 'CG-25',
    livestockNo: '44',
    assignedMonitor: 'MON-47028133',
    dateAdded: '18-05-20',
    lastUpdated: '22-10-22',
  },
  {
    cageId: 'CG-67',
    livestockNo: '2',
    assignedMonitor: 'MON-92598445',
    dateAdded: '20-07-28',
    lastUpdated: '23-05-04',
  },
  {
    cageId: 'CG-72',
    livestockNo: '17',
    assignedMonitor: 'MON-50790363',
    dateAdded: '25-02-20',
    lastUpdated: '20-11-03',
  },
  {
    cageId: 'CG-74',
    livestockNo: '47',
    assignedMonitor: 'MON-47317449',
    dateAdded: '22-06-29',
    lastUpdated: '25-03-05',
  },
  {
    cageId: 'CG-50',
    livestockNo: '39',
    assignedMonitor: 'MON-62808198',
    dateAdded: '22-07-22',
    lastUpdated: '18-07-18',
  },
  {
    cageId: 'CG-93',
    livestockNo: '22',
    assignedMonitor: 'MON-44891087',
    dateAdded: '20-09-29',
    lastUpdated: '19-04-04',
  },
  {
    cageId: 'CG-59',
    livestockNo: '33',
    assignedMonitor: 'MON-20628882',
    dateAdded: '24-06-04',
    lastUpdated: '21-11-13',
  },
  {
    cageId: 'CG-31',
    livestockNo: '44',
    assignedMonitor: 'MON-23263423',
    dateAdded: '18-02-13',
    lastUpdated: '24-05-04',
  },
  {
    cageId: 'CG-77',
    livestockNo: '16',
    assignedMonitor: 'MON-92903659',
    dateAdded: '20-05-21',
    lastUpdated: '18-04-29',
  },
  {
    cageId: 'CG-89',
    livestockNo: '21',
    assignedMonitor: 'MON-50916435',
    dateAdded: '20-01-10',
    lastUpdated: '24-07-08',
  },
  {
    cageId: 'CG-49',
    livestockNo: '41',
    assignedMonitor: 'MON-89260892',
    dateAdded: '18-07-27',
    lastUpdated: '18-10-06',
  },
  {
    cageId: 'CG-85',
    livestockNo: '24',
    assignedMonitor: 'MON-17138438',
    dateAdded: '19-06-16',
    lastUpdated: '22-04-17',
  },
  {
    cageId: 'CG-01',
    livestockNo: '12',
    assignedMonitor: 'MON-50533772',
    dateAdded: '18-02-03',
    lastUpdated: '24-12-07',
  },
  {
    cageId: 'CG-17',
    livestockNo: '29',
    assignedMonitor: 'MON-18749371',
    dateAdded: '20-12-18',
    lastUpdated: '22-01-15',
  },
  {
    cageId: 'CG-06',
    livestockNo: '38',
    assignedMonitor: 'MON-97352971',
    dateAdded: '21-09-06',
    lastUpdated: '24-02-24',
  },
]

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

const cageFormData = ref<NewCageFormData>({
  cageId: '',
  noOfLivestock: '',
  assignedMonitorId: '',
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
          <template #field="field">
            <span v-if="field.colIndex === 5" class="actions">
              <button>
                <FIcon :icon-path="iconHoriz" :width="21" :height="20" />
              </button>
            </span>
          </template>
        </FDashBoardTable>
      </div>

      <div class="form-container">
        <form>
          <div class="header">
            <p class="title">Add new cage</p>
            <p class="subtitle">Register a new cage to track health</p>
          </div>

          <div class="body">
            <FInput
              v-model:model-value="cageFormData.cageId"
              label="Cage ID"
              placeholder="Enter ID"
            />
            <FInput
              v-model:model-value="cageFormData.noOfLivestock"
              label="No of live stock"
              placeholder="1"
            />
            <FInput
              v-model:model-value="cageFormData.cageId"
              label="Assigned monitor ID"
              placeholder="Enter ID"
            />

            <FBtn size="lg">Add new cage</FBtn>
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
