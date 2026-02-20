<template>
  <main class="flex">
    <div class="col max-w-24rem px-4 py-6 bg-gray-800 text-white">
      <header class="flex align-items-center">
        <NuxtImg src="/images/football-league-logo.svg" alt="Logo image" width="48px" height="48px" />
        <h1 class="ml-2 text-2xl font-semibold">Football Leagues</h1>
      </header>
      <Divider />
      <LeagueSidebar />
    </div>
    <div class="col px-4 py-6 bg-gray-100">
      <component :is="dynamicComponent" />
    </div>
  </main>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import StandingsTable from './components/StandingsTable.vue';
  import TeamProfile from './components/TeamProfile.vue';
  import { useCurrComponent } from '~/stores/currcomponent/currcomp';
  import { storeToRefs  } from "pinia";

  const currComponentStore = useCurrComponent();
  const { currentComponent } = storeToRefs(currComponentStore);

  const dynamicComponent = computed(() => currentComponent.value === 'StandingsTable' ? StandingsTable : TeamProfile)
</script>