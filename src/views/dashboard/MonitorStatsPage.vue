<script lang="ts">
interface MonitoredStatus {
  status: string
  normalValue: string
  abnormalValue: string
  imageSrc: string
}

type TableFields = {
  _id: string
  cage_id: string
  livestock_no: number
  assigned_mentor: string
  temperature: number
  humidity: number
  pressure: number
  ammonia: number
  co2: number
  coccidiosis: number
  newcastle: number
  salmonella: number
  health_score: number,
  timestamp: string
  created_at: string
  updated_at: string
}
</script>

<script setup lang="ts">
import { iconRefresh } from '@/assets/images/icons'
import FIcon from '@/components/system/common/FIcon.vue'
import { computed, onMounted, ref } from 'vue'
import thermometerIcon from '@/assets/images/illustrations/thermometer.svg'
import humidityIcon from '@/assets/images/illustrations/humidity.svg'
import pressureIcon from '@/assets/images/illustrations/low-blood-pressure.svg'
import coccidiosisIcon from '@/assets/images/illustrations/coccidiosis.svg'
import newcastleIcon from '@/assets/images/illustrations/newcastle.svg'
import salmonellaIcon from '@/assets/images/illustrations/salmonella.svg'
import FStatusCard from '@/components/dashboard/FStatusCard.vue'
import FDashBoardTable from '@/components/dashboard/FDashBoardTable.vue'
import { useSpmStore } from '@/stores/spm'
import type { CageInfo } from '@/api/spm'
import { storeToRefs } from 'pinia'
import { formatToHMS } from '@/utils/helper'

const spmStore = useSpmStore()
const isLoading = ref<boolean>(false)
const { cageInfoList } = storeToRefs(spmStore)
const { cageHealthInfo } = spmStore

onMounted(() => {
  fetchUsersCageInfo()
})

const fetchUsersCageInfo = async () => {
  try {
    isLoading.value = true
    console.log('its fetching')
    await spmStore.getUsersCageInfo()
  } catch (error) {
    console.log(error)
    isLoading.value = false
  } finally {
    isLoading.value = false
  }
}

function flattenObjectRecognition(obj: CageInfo): TableFields {
  return {
    _id: obj._id,
    cage_id: obj.cage_id,
    livestock_no: obj.livestock_no,
    assigned_mentor: obj.assigned_monitor,
    temperature: obj.temperature,
    humidity: obj.humidity,
    pressure: obj.pressure,
    ammonia: obj.ammonia,
    co2: obj.co2,
    coccidiosis: obj.object_recognition.coccidiosis,
    newcastle: obj.object_recognition.newcastle,
    salmonella: obj.object_recognition.salmonella,
    health_score: obj.object_recognition.healthy,
    timestamp: obj.timestamp,
    created_at: obj.created_at,
    updated_at: obj.updated_at,
  }
}

const tableFields = computed(() =>
  cageInfoList.value.map((cageInfo) => flattenObjectRecognition(cageInfo)),
)

const monitoredStatus = ref<MonitoredStatus[]>([
  {
    status: 'Temperature',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: thermometerIcon,
  },
  {
    status: 'Humidity',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: humidityIcon,
  },
  {
    status: 'Pressure',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: pressureIcon,
  },
  {
    status: 'Coccidiosis',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: coccidiosisIcon,
  },
  {
    status: 'Newcastle',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: newcastleIcon,
  },
  {
    status: 'Salmonella',
    normalValue: '400',
    abnormalValue: '15',
    imageSrc: salmonellaIcon,
  },
])

const fieldHeader = [
  'Cage ID',
  'Timestamp',
  'Livestock no',
  'Temperature',
  'Humidity',
  'Pressure',
  'Ammonia',
  'CO2',
  'Coccidiosis',
  'Newcastle',
  'Salmonella',
  'Health score'
]

const headerKeyMap: Record<string, string> = {
  'Cage ID': 'cage_id',
  'Timestamp': 'timestamp',
  'Livestock no': 'livestock_no',
  'Temperature': 'temperature',
  'Humidity': 'humidity',
  'Pressure': 'pressure',
  'Ammonia': 'ammonia',
  'CO2': 'co2',
  'Coccidiosis': 'coccidiosis',
  'Newcastle': 'newcastle',
  'Salmonella': 'salmonella',
  'Health score': 'health_score'
}
</script>

<template>
  <div class="monitor-stats-page">
    <div class="status-bar">
      <div class="status">
        <p>Health score: {{ cageHealthInfo.healthy }}%</p>
        <div class="divider"></div>
        <p>Unhealthy score: {{ cageHealthInfo.unHealthy }}%</p>
        <div class="divider"></div>
        <p>Unavailable monitor score: {{ cageHealthInfo.unAvailableMonitors }}%</p>
      </div>
      <button class="refresh">
        <FIcon :width="20" :height="20" :icon-path="iconRefresh" />
        <p>Refresh</p>
      </button>
    </div>

    <div class="status-cards">
      <div v-for="(status, index) in monitoredStatus" :key="index">
        <FStatusCard
          :title="status.status"
          :normal-status="status.normalValue"
          :abnormal-status="status.abnormalValue"
          :image-src="status.imageSrc"
        />
      </div>
    </div>

    <div v-if="!tableFields.length">
      <div>whatever</div>
    </div>

    <div v-else class="status-table">
      <FDashBoardTable
        :headers="fieldHeader"
        :header-key-map="headerKeyMap"
        :page-size="10"
        :table-fields="tableFields"
        show-time-filter
      >
        <template #field="{ field, colIndex }">
          <span v-if="colIndex === 0">
            {{ field.slice(0, 6) }}
          </span>
          <span v-if="colIndex === 1">
            {{ formatToHMS(field) }}
          </span>
        </template>
      </FDashBoardTable>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.monitor-stats-page {
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

  .status-cards {
    width: 100%;
    max-width: 1408px;
    overflow-x: hidden;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    margin: 0 auto;

    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::--webkit-scrollbar {
      display: none;
    }
  }

  .status-table {
    margin-top: 0.5rem;
    background-color: var(--color-white);
    padding: 1.25rem;
  }
}
</style>
