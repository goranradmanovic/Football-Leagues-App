<template>
  <aside class="h-screen">
    <div v-if="error" class="text-red-400">
      <p>Failed to load leagues. Please try again later.</p>
    </div>
    <Listbox v-else v-model="selectedLeague" :options="allLeagues" optionLabel="strLeague" class="w-full md:w-56 border-none shadow-none bg-transparent" listStyle="max-height:auto">
      <template #option="slotProps">
        <div v-if="loading" class="flex items-center">
          <Skeleton width="2.5rem" height="2rem" class="mr-3"></Skeleton>
          <Skeleton width="16rem" height="2rem"></Skeleton>
        </div>
        <div v-else @click="getAllTeams(+slotProps.option.idLeague)" class="flex items-center text-white">
          <img :alt="slotProps.option.strLeague" :src="`https://purecatamphetamine.github.io/country-flag-icons/3x2/${slotProps.option.code}.svg`" class="mr-3 border-round" style="width: 32px" />
          <div>{{ slotProps.option.strLeague }}</div>
        </div>
      </template>
    </Listbox>
  </aside>
</template>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useLeaguesStore } from '~/stores/leagues/leagues';
  import { useTeamsStore } from '~/stores/leagues/teams';
  import { storeToRefs  } from "pinia";

  const teamsStore = useTeamsStore();
  const leaguesStore = useLeaguesStore();
  const { allLeagues, loading, error } = storeToRefs(leaguesStore);

  const selectedLeague = ref();

  const getAllLeagues = async () => await leaguesStore.fetchAllLeagues()

  const getAllTeams = async (id: number) => await teamsStore.fetchAllTeams(id)

  const setDefaultsValues = async () => {
    if (allLeagues.value && allLeagues.value.length > 0) {
      const firstLeague = allLeagues.value[0];
      if (firstLeague) {
        selectedLeague.value = firstLeague; // Select the first item/league by default
        await getAllTeams(+firstLeague.idLeague); // Get table teams data for the first item/league by default
      }
    }
  }

  onMounted(async () => {
    await getAllLeagues(); // Get all leagues
    setDefaultsValues();
  })
</script>