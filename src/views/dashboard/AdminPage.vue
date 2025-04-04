<script lang="ts">
type TableFields = {
  adminName: string
  emailAddress: string
  roles: string
  dateJoined: string
  status: string
}

interface NewAdminInviteFormData {
  fullName: string
  emailAddress: string
  assignedRole: string
}
</script>

<script setup lang="ts">
import { iconHoriz } from '@/assets/images/icons'
import FIcon from '@/components/system/common/FIcon.vue'
import FDashBoardTable from '@/components/dashboard/FDashBoardTable.vue'
import { ref } from 'vue'
import FInput from '@/components/system/form/FInput.vue'
import FBtn from '@/components/system/form/FBtn.vue'

const tableFields: TableFields[] = [
  {
    adminName: 'Alice Johnson',
    emailAddress: 'alice.johnson@example.com',
    roles: 'Super Admin',
    dateJoined: '2023-01-15',
    status: 'Active',
  },
  {
    adminName: 'Bob Smith',
    emailAddress: 'bob.smith@example.com',
    roles: 'Moderator',
    dateJoined: '2022-11-20',
    status: 'Inactive',
  },
  {
    adminName: 'Charlie Davis',
    emailAddress: 'charlie.davis@example.com',
    roles: 'Editor',
    dateJoined: '2023-05-10',
    status: 'Active',
  },
  {
    adminName: 'Diana Roberts',
    emailAddress: 'diana.roberts@example.com',
    roles: 'Admin',
    dateJoined: '2021-09-05',
    status: 'Suspended',
  },
  {
    adminName: 'Ethan Wilson',
    emailAddress: 'ethan.wilson@example.com',
    roles: 'Super Admin',
    dateJoined: '2020-06-30',
    status: 'Active',
  },
]

const fieldHeader = ['Admin name', 'Email address', 'Roles', 'Date joined', 'Status', 'actions']

const headerKeyMap: Record<string, string> = {
  'Admin name': 'adminName',
  'Email address': 'emailAddress',
  'Roles': 'roles',
  'Date joined': 'dateJoined',
  'Status': 'status',
  'actions': 'actions',
}

const newAdminInviteFormData = ref<NewAdminInviteFormData>({
  fullName: '',
  emailAddress: '',
  assignedRole: '',
})
</script>

<template>
  <div class="admin-page">
    <div class="admin-page-body">
      <div class="admin-user-table">
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
              v-model:model-value="newAdminInviteFormData.fullName"
              label="Full name"
              placeholder="Enter name"
            />
            <FInput
              type="email"
              v-model:model-value="newAdminInviteFormData.emailAddress"
              label="Email email"
              placeholder="1"
            />
            <FInput
              v-model:model-value="newAdminInviteFormData.assignedRole"
              label="Assigned role"
              placeholder="Select role"
            />

            <FBtn size="lg">Invite admin</FBtn>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-page {
  width: 100%;
  max-width: 1408px;
  padding: 1rem;
  margin: 0 auto;
  background-color: var(--color-brand-neutral-200);

  .admin-page-body {
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

    .admin-user-table {
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
