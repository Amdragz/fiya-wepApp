<script lang="ts">
interface MonitoredStatus {
  status: string
  normalValue: string
  abnormalValue: string
  imageSrc: string
}

type TableFields = {
  cageId: string
  timestamp: string
  livestockNo: string
  temperature: string
  humidity: string
  pressure: string
  ammonia: string
  c02: string
  coccidiosis: string
  newcastle: string
  salmonella: string
  healthScore: string
}
</script>

<script setup lang="ts">
import { iconRefresh } from '@/assets/images/icons'
import FIcon from '@/components/system/common/FIcon.vue'
import { ref } from 'vue'
import thermometerIcon from '@/assets/images/illustrations/thermometer.svg'
import humidityIcon from '@/assets/images/illustrations/humidity.svg'
import pressureIcon from '@/assets/images/illustrations/low-blood-pressure.svg'
import coccidiosisIcon from '@/assets/images/illustrations/coccidiosis.svg'
import newcastleIcon from '@/assets/images/illustrations/newcastle.svg'
import salmonellaIcon from '@/assets/images/illustrations/salmonella.svg'
import FStatusCard from '@/components/dashboard/FStatusCard.vue'
import FDashBoardTable from '@/components/dashboard/FDashBoardTable.vue'

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

const tableFields: TableFields[] = [
  {
    cageId: 'CG-01',
    timestamp: '00:15:10',
    livestockNo: '12',
    temperature: '30.5',
    humidity: '85.0',
    pressure: '1010.2',
    ammonia: '0.8',
    c02: '600',
    coccidiosis: '30%',
    newcastle: '20%',
    salmonella: '10%',
    healthScore: '66%',
  },
  {
    cageId: 'CG-02',
    timestamp: '00:20:25',
    livestockNo: '15',
    temperature: '29.8',
    humidity: '80.5',
    pressure: '1009.8',
    ammonia: '0.6',
    c02: '580',
    coccidiosis: '25%',
    newcastle: '18%',
    salmonella: '8%',
    healthScore: '72%',
  },
  {
    cageId: 'CG-03',
    timestamp: '00:30:45',
    livestockNo: '10',
    temperature: '31.2',
    humidity: '87.3',
    pressure: '1012.5',
    ammonia: '0.9',
    c02: '620',
    coccidiosis: '35%',
    newcastle: '22%',
    salmonella: '12%',
    healthScore: '60%',
  },
  {
    cageId: 'CG-04',
    timestamp: '00:40:15',
    livestockNo: '20',
    temperature: '28.6',
    humidity: '82.0',
    pressure: '1011.0',
    ammonia: '0.7',
    c02: '590',
    coccidiosis: '28%',
    newcastle: '19%',
    salmonella: '9%',
    healthScore: '68%',
  },
  {
    cageId: 'CG-05',
    timestamp: '00:50:30',
    livestockNo: '18',
    temperature: '30.0',
    humidity: '83.5',
    pressure: '1008.5',
    ammonia: '0.5',
    c02: '570',
    coccidiosis: '22%',
    newcastle: '16%',
    salmonella: '7%',
    healthScore: '75%',
  },
  {
    cageId: 'CG-06',
    timestamp: '00:55:20',
    livestockNo: '14',
    temperature: '29.2',
    humidity: '81.0',
    pressure: '1013.2',
    ammonia: '0.6',
    c02: '600',
    coccidiosis: '27%',
    newcastle: '21%',
    salmonella: '10%',
    healthScore: '70%',
  },
  {
    cageId: 'CG-07',
    timestamp: '01:05:10',
    livestockNo: '22',
    temperature: '32.1',
    humidity: '86.0',
    pressure: '1014.8',
    ammonia: '0.9',
    c02: '630',
    coccidiosis: '40%',
    newcastle: '25%',
    salmonella: '15%',
    healthScore: '55%',
  },
  {
    cageId: 'CG-08',
    timestamp: '01:10:45',
    livestockNo: '16',
    temperature: '30.8',
    humidity: '84.2',
    pressure: '1010.5',
    ammonia: '0.8',
    c02: '610',
    coccidiosis: '32%',
    newcastle: '22%',
    salmonella: '11%',
    healthScore: '63%',
  },
  {
    cageId: 'CG-09',
    timestamp: '01:15:30',
    livestockNo: '19',
    temperature: '28.4',
    humidity: '79.5',
    pressure: '1007.3',
    ammonia: '0.4',
    c02: '560',
    coccidiosis: '20%',
    newcastle: '15%',
    salmonella: '6%',
    healthScore: '78%',
  },
  {
    cageId: 'CG-10',
    timestamp: '01:20:50',
    livestockNo: '25',
    temperature: '31.5',
    humidity: '88.0',
    pressure: '1015.5',
    ammonia: '1.0',
    c02: '650',
    coccidiosis: '45%',
    newcastle: '30%',
    salmonella: '18%',
    healthScore: '50%',
  },
  {
    cageId: 'CG-11',
    timestamp: '01:25:15',
    livestockNo: '13',
    temperature: '30.3',
    humidity: '85.8',
    pressure: '1011.3',
    ammonia: '0.7',
    c02: '605',
    coccidiosis: '29%',
    newcastle: '20%',
    salmonella: '9%',
    healthScore: '67%',
  },
  {
    cageId: 'CG-12',
    timestamp: '01:30:40',
    livestockNo: '21',
    temperature: '28.9',
    humidity: '83.0',
    pressure: '1009.2',
    ammonia: '0.5',
    c02: '590',
    coccidiosis: '26%',
    newcastle: '18%',
    salmonella: '8%',
    healthScore: '71%',
  },
  {
    cageId: 'CG-13',
    timestamp: '01:35:25',
    livestockNo: '17',
    temperature: '29.7',
    humidity: '82.5',
    pressure: '1012.0',
    ammonia: '0.6',
    c02: '580',
    coccidiosis: '24%',
    newcastle: '17%',
    salmonella: '7%',
    healthScore: '73%',
  },
  {
    cageId: 'CG-14',
    timestamp: '01:40:55',
    livestockNo: '23',
    temperature: '31.0',
    humidity: '86.5',
    pressure: '1014.0',
    ammonia: '0.9',
    c02: '620',
    coccidiosis: '38%',
    newcastle: '24%',
    salmonella: '14%',
    healthScore: '58%',
  },
  {
    cageId: 'CG-15',
    timestamp: '01:45:10',
    livestockNo: '11',
    temperature: '30.1',
    humidity: '84.0',
    pressure: '1010.8',
    ammonia: '0.7',
    c02: '600',
    coccidiosis: '31%',
    newcastle: '19%',
    salmonella: '10%',
    healthScore: '65%',
  },
]

const fieldHeader = [
  'Cage ID',
  'Timestamp',
  'Temperature',
  'Humidity',
  'Pressure',
  'Ammonia',
  'CO2',
  'Coccidiosis',
  'Newcastle',
  'Salmonella',
  'Health score',
]

const headerKeyMap: Record<string, string> = {
  'Cage ID': 'cageId',
  Timestamp: 'timestamp',
  Temperature: 'temperature',
  Humidity: 'humidity',
  Pressure: 'pressure',
  Ammonia: 'ammonia',
  CO2: 'c02',
  Coccidiosis: 'coccidiosis',
  Newcastle: 'newcastle',
  Salmonella: 'salmonella',
  'Health score': 'healthScore',
}
</script>

<template>
  <div class="monitor-stats-page">
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

    <div class="status-table">
      <FDashBoardTable
        :headers="fieldHeader"
        :header-key-map="headerKeyMap"
        :page-size="10"
        :table-fields="tableFields"
      />
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
