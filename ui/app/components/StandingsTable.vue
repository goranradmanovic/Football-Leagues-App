<template>
	<div class="mb-4">
		<template v-if="allTeams[0]">
			<h2 class="text-4xl text-800">{{ allTeams[0]?.strLeague }}</h2>
			<p class="text-xl text-600 font-medium">{{ allTeams[0]?.strSeason }} Season</p>
			<hr class="my-4 border-gray-50" />
			<h3 class="font-medium text-800">{{ allTeams[0]?.strDescription }}</h3>
		</template>
	</div>

	<Panel>
		<DataTable :value="allTeams" :loading stripedRows paginator :rows="10" :rowsPerPageOptions="[5, 10, 20]" tableStyle="min-width: 100%">
			<template #empty>
					<div v-if="allTeams.length === 0">
						<p>No Data</p>
					</div>
			</template>
			<Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
				<template #body="slotProps">
					<div v-if="col.field === 'strTeam'" @click="getTeamProfileInfo(+slotProps.data.idTeam)" class="flex gap-2 cursor-pointer">
						<NuxtImg :src="slotProps.data.strBadge" alt="Team logo image" width="24px" height="24px" />
						<span>{{ slotProps.data.strTeam }}</span>
					</div>
					<div v-else>
						<span>{{ slotProps.data[col.field] }}</span>
					</div>
				</template>
			</Column>
			<template #footer>
				<p class="m-0 text-right font-medium">Updated: {{ updatedDate }}</p>
			</template>
		</DataTable>
	</Panel>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { storeToRefs } from 'pinia';
	import { useTeamsStore } from '~/stores/leagues/teams';
	import { useProfileStore } from '~/stores/leagues/profile';
	import { useCurrComponent } from '~/stores/currcomponent/currcomp';

	const teamsStore = useTeamsStore();
	const { allTeams, loading, error } = storeToRefs(teamsStore);

	const profileStore = useProfileStore();
	const currComponent = useCurrComponent();

	const dateFormat = <object>{
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	}

	const columns = [
		{ field: 'intRank', header: '#' },
		{ field: 'strTeam', header: 'Team' },
		{ field: 'intPlayed', header: 'P' },
		{ field: 'intWin', header: 'W' },
		{ field: 'intDraw', header: 'D' },
		{ field: 'intLoss', header: 'L' },
		{ field: 'intGoalsFor', header: 'GF' },
		{ field: 'intGoalsAgainst', header: 'GA' },
		{ field: 'intGoalDifference', header: 'GD' },
		{ field: 'intPoints', header: 'Pts' }	
	];

	const updatedDate = computed(() => allTeams.value ? new Date(allTeams.value[0]?.dateUpdated).toLocaleDateString('en-US', dateFormat) : '')

	const getTeamProfileInfo = async (id: number) => {
		await profileStore.fetchTeamProfile(id);
		currComponent.toggleComponent('TeamProfile')
	}
</script>