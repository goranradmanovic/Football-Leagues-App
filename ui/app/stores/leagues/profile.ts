import { defineStore } from "pinia";
import { ref } from 'vue';

export interface TeamProfile {
  strFanart4: string;
  strBadge: string;
  strTeam: string;
  intFormedYear: string;
  strCountry: string;
  strEquipment: string;
  strKeywords: string;
  strColour1: string;
  strColour2: string;
  strColour3: string;
  strStadium: string;
  strLocation: string,
  intStadiumCapacity: string;
  strYoutube: string;
  strTwitter: string;
  strFacebook: string;
  strInstagram: string;
  strWebsite: string;
  strFanart1: string;
  strFanart2: string;
  strFanart3: string;
  strDescriptionEN: string;
  strLeague: string;
  strLeague2: string;
  strLeague3: string;
  strLeague4: string;
  strLeague5: string;
  strLeague6: string;
  strLeague7: string;
  intLoved: number;
  strTeamAlternate: string;
  strTeamShort: string;
}

export const useProfileStore = defineStore('profile', () => {
    // Access the runtime config
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase;

    // State
    const profile = ref<TeamProfile | null>(null);
    const loading = ref(false);
    const error = ref<any>(null);

    // Action
    async function fetchTeamProfile(id: number) {
        loading.value = true;
        try {
            const data = await $fetch<TeamProfile[]>(`${baseUrl}/leagues_team/${id}`)
            profile.value =  data[0] ?? null; // Assuming the API returns an array of teams, we take the first one
            error.value = null;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return { profile, loading, error, fetchTeamProfile}
})