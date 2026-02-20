<template>
		<div v-if="loading" class="text-center">
			<p>Loading...</p>
		</div>
		<div v-if="error" class="text-red-400">
			<p>Failed to load leagues. Please try again later.</p>
		</div>
		<Card v-else style="overflow: hidden">
			<template #header>
				<div class="relative">
					<NuxtImg :src="profile?.strFanart4" alt="Main page image" class="w-full" />
					<Button @click="currComponent.toggleComponent('StandingsTable')" icon="pi pi-arrow-left" severity="secondary" rounded aria-label="Back" class="absolute back__btn" />
				</div>
			</template>
			<template #content>
				<div class="flex gap-4 profile__cards">
					<NuxtImg :src="profile?.strBadge" alt="Team logo" class="profile__cards--img" />

					<Card style="width: 75%; overflow: hidden">
						<template #header>
							<div class="flex p-4 profile__team border-bottom-1 border-200 surface-ground">
								<div class="w-full text-center">
									<h2 class="text-6xl font-medium">{{ profile?.strTeam }}</h2>
									<p class="text-xl">Founded: {{ profile?.intFormedYear }} - {{ profile?.strCountry }}</p>
								</div>
							</div>
							<div class="flex gap-4 p-4 mt-3 profile__team border-bottom-1 border-200">
								<div class="w-6 text-xl">
									<p>
										<i class="pi pi-home"></i>
										<strong class="ml-2">{{ profile?.strStadium }}</strong>
									</p>
									<p class="mb-2">
										<i class="pi pi-map-marker"></i>
										{{ profile?.strLocation }}
									</p>
									<p class="mb-2">
										<i class="pi pi-users"></i>
										Capacity: <span class="text-900">{{ profile?.intStadiumCapacity }}</span>
									</p>
									<p class="mb-2">
										Team Alt: <span class="text-900">{{ profile?.strTeamAlternate }}</span>
									</p>
									<p class="mb-2">
										Team Short: <span class="text-900">{{ profile?.strTeamShort }}</span>
									</p>
									<p class="mb-2">
										<Tag :value="`${loved} Fans`" icon="pi pi-heart" :style="{ backgroundColor: profile?.strColour1 ?? '#ff0000', color: '#FFF'}" />
									</p>
								</div>

								<div class="w-6">
									<Carousel :value="images" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions" :showNavigators="false" :pt="{ indicatorButton: ({ context }) => ({ class: [ context.highlighted ? 'bg-gray-700' : '']}) }">
										<template #item="slotProps">
											<NuxtImg :src="slotProps.data.url" :alt="slotProps.data.name" class="border-round-sm" />
										</template>
									</Carousel>
								</div>
							</div>
						</template>
						<template #content>
							<div>
							<Tabs value="0">
								<TabList>
										<Tab value="0">Overview</Tab>
										<Tab value="1">Competitions</Tab>
								</TabList>
								<TabPanels>
										<TabPanel value="0">
												<p class="m-0">
													{{ profile?.strDescriptionEN }}
												</p>
										</TabPanel>
										<TabPanel value="1">
											<div class="flex flex-wrap gap-3">
												<Chip v-for="league in leagues" :key="league" :label="league" icon="pi pi-trophy" />
											</div>
										</TabPanel>
								</TabPanels>
							</Tabs>
							</div>
						</template>
						<template #footer>
							<div class="flex gap-4 mt-1">

							</div>
						</template>
					</Card>

					<!-- Aside Card -->
					<Card style="width: 25%; overflow: hidden" class="surface-ground">
						<template #title>
							<div class="flex gap-4 justify-content-between">
								<h3 class="font-medium">Statistics</h3>
								<NuxtImg :src="profile?.strBadge" alt="Main page image" width="48px" />
							</div>
						</template>
						<template #subtitle>Official Jersey</template>
						<template #content>
							<div>
								<NuxtImg :src="profile?.strEquipment" alt="Main page image" />
							</div>
							<div class="flex flex-column gap-3">
								<p>Founded: <strong>{{ profile?.intFormedYear }}</strong></p>
								<p>Nicknames: {{ profile?.strKeywords }}</p>
								<p>
									Team colors:
									<Tag v-for="(tag, index) in tagsConfig" :key="index" :style="`border: 1px solid #bbb; margin-right: ${tag.margin}; background-color: ${tag.color}`" />
								</p>
								<p>
									<i class="pi pi-map-marker"></i>
									<strong class="ml-2">{{ profile?.strStadium }}</strong>
								</p>
								<p>
									<i class="pi pi-users"></i>
									<strong class="ml-2">{{ profile?.intStadiumCapacity }}</strong> seats
								</p>

								<!-- Social section -->
								<SocialsBtns :btnsConfig="socialsBtnsConfig" />
							</div>
						</template>
						<template #footer>
							<div class="flex gap-1 mt-3 text-xs text-gray-500 border-top-1 border-200 pt-3">
								Deisgne & Developed by <a href="https://goranradmanovic.github.io/" class="text-blue-500 hover:underline no-underline" target="_blank">Goran Radmanovic</a>
							</div>
						</template>
					</Card>
				</div>
			</template>
		</Card>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { storeToRefs } from 'pinia';
	import { useProfileStore } from '~/stores/leagues/profile';
	import { useCurrComponent } from '~/stores/currcomponent/currcomp';

	const currComponent = useCurrComponent();
	const profileStore = useProfileStore();
	const { profile, loading, error } = storeToRefs(profileStore);

	const images = ref();
	const responsiveOptions = ref([
		{
			breakpoint: '1400px',
			numVisible: 2,
			numScroll: 1
		},
		{
			breakpoint: '1199px',
			numVisible: 3,
			numScroll: 1
		},
		{
			breakpoint: '767px',
			numVisible: 2,
			numScroll: 1
		},
		{
			breakpoint: '575px',
			numVisible: 1,
			numScroll: 1
		}
	]);

	let socialsBtnsConfig: Array<{ url: string; iconName: string }> = [];
	let tagsConfig = ref<Array<{ margin: string, color: string }>>([]);
	
	const loved = computed(() => Number(((profile.value?.intLoved ?? 0) * 10) || 0) + '%');

	const leagues = computed(() => {
		if (!profile.value) return [];
		return Object.keys(profile.value)
			.filter(key => key.startsWith('strLeague'))
			.map(key => (profile.value as Record<string, any>)[key])
			.filter(value => value && value.trim() !== '')
	})
	
	const setCuraselImages = () => {
		if (!profile.value) return [];
		images.value = [
			{
				url: profile.value?.strFanart1,
				name: 'Fan art 1'
			},
			{
				url: profile.value?.strFanart2,
				name: 'Fan art 2'
			},
			{
				url: profile.value?.strFanart3,
				name: 'Fan art 3'
			}
		]
	}

	const setTags = () => {
		if (!profile.value) return [];
		tagsConfig.value = [
			{
				margin: '.15rem',
				color: profile.value?.strColour2 ?? '#FFF'
			},
			{
				margin: '.5rem',
				color: profile.value?.strColour1 ?? '#FFF'
			},
			{
				margin: '.15rem',
				color: profile.value?.strColour2 ?? '#FFF'
			},
			{
				margin: '.15rem',
				color: profile.value?.strColour3 ?? '#FFF'
			}
		]
	} 

	const setSocialsBtns = () => {
		if (!profile.value) return [];
		socialsBtnsConfig = [
			{
				url: profile.value?.strYoutube ?? '#',
				iconName: 'pi pi-youtube'
			},
			{
				url: profile.value?.strFacebook ?? '#',
				iconName: 'pi pi-facebook'
			},
			{
				url: profile.value?.strInstagram ?? '#',
				iconName: 'pi pi-instagram'
			},
			{
				url: profile.value?.strTwitter ?? '#',
				iconName: 'pi pi-twitter'
			},
			{
				url: profile.value?.strWebsite ?? '#',
				iconName: 'pi pi-link'
			}
		]
	}

	onMounted(() => {
		setCuraselImages();
		setTags();
		setSocialsBtns();
	})
</script>