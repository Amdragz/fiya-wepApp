<script lang="ts">
interface FStatusCardProps {
  title: string,
  normalStatus: string,
  abnormalStatus: string
  imageSrc: string,
  alt?: string
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<FStatusCardProps>(), {
  title: 'Temperature',
  normalStatus: "400",
  abnormalStatus: "15",
  alt: 'status monitored svg image'
})
</script>

<template>
  <div class="f-status-card">
    <div class="header">
      <div class="icon-container">
        <img :src="props.imageSrc" :alt="props.alt"/>
      </div>
      <p>{{ props.title }}</p>
    </div>
    <div class="divider"></div>
    <div class="status">
      <div class="status-value">
        <p>Normal</p>
        <p>{{ props.normalStatus }}</p>
      </div>
      <div class="status-value">
        <p>Abnormal</p>
        <p>{{ props.abnormalStatus }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.f-status-card {
  width: 228px;
  padding: 1rem;
  border-radius: .5rem;
  background-color: var(--color-white);

  display: grid;
  gap: 1rem;

  .header {
    display: flex;
    align-items: center;
    gap: 1rem;

    .icon-container {
      width: 3.5rem;
      height: 3.4rem;
      border-radius: 50%;
      background-color: rgba($color: #FD8087, $alpha: 0.09);

      display: flex;
      align-items: center;
      justify-content: center;
    }

    p {
      font-size: .875rem;
      font-weight: 500;
      color: var(--color-text-primary)
    }
  }

  .divider {
    width: 100%;
    border-top: 1px solid #F0F2F5;
    height: 1px;
  }

  .status {
    display: grid;
    gap: .825rem;

    .status-value {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: .825rem;
        font-weight: 400;
        color: #667185;
      }
    }
  }
}
</style>
