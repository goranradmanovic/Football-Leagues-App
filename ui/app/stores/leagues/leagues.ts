import { defineStore } from "pinia";
import { ref } from 'vue';

interface League {
    idLeague: string,
    strLeague: string,
    strSport: string,
    code: string
}

export const useLeaguesStore = defineStore('leagues', () => {
    // Access the runtime config
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase;

    // State
    const allLeagues = ref<League[]>([]);
    const loading = ref(false);
    const error = ref<any>(null);

    // Action
    async function fetchAllLeagues() {
        loading.value = true;
        try {
            const data = await $fetch<League[]>(`${baseUrl}/leagues`)
            allLeagues.value = data;
            error.value = null;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return { allLeagues, loading, error, fetchAllLeagues }
})