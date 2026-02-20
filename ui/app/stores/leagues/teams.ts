import { defineStore } from "pinia";
import { ref } from 'vue';

export const useTeamsStore = defineStore('teams', () => {
    // Access the runtime config
    const config = useRuntimeConfig();
    const baseUrl = config.public.apiBase;

    // State
    const allTeams = ref<any[]>([]);
    const loading = ref(false);
    const error = ref<any>(null);

    // Action
    async function fetchAllTeams(id: number) {
        loading.value = true;
        try {
            const data = await $fetch<any[]>(`${baseUrl}/leagues_table/${id}`)
            allTeams.value = data;
            error.value = null;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    }

    return { allTeams, loading, error, fetchAllTeams }
})