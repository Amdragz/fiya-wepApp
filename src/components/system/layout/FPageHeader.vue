<script lang="ts">
interface FPageHeaderProps {
  logoSrc?: string,
}

</script>

<script setup lang="ts">
import FContainer from './FContainer.vue';
import fiyaLogo from '@/assets/images/logos/fiya-logo.svg';

const props = withDefaults(defineProps<FPageHeaderProps>(), {
  logoSrc: fiyaLogo
})
</script>

<template>
  <header class="f-page-header">
    <FContainer>
      <div class="nav-logo-container">
        <div class="nav-logo">
          <img :src="props.logoSrc" alt="Logo" />
        </div>
      </div>

      <div class="nav-content">
        <slot />
      </div>
    </FContainer>
  </header>
</template>

<style lang="scss" scoped>
.f-page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1440px;
  height: 4rem;

    .f-container {
      display: flex;
      align-items: center;

      .nav-logo-container {
        margin-right: 5.5rem;
      }

      .nav-content {
        width: 100%;
      }
    }
}
</style>
