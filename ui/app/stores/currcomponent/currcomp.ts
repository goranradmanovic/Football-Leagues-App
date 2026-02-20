import { defineStore } from "pinia";
import { ref } from 'vue';

export const useCurrComponent = defineStore('currcomp', () => {

    // State
    const currentComponent = ref('StandingsTable');

    // Actions

    // Dynamicly toggle components, c - component name
    const toggleComponent = (c: string = 'StandingsTable') => {
        currentComponent.value = c === 'StandingsTable' ? 'StandingsTable' : 'TeamProfile';
    };

    return { currentComponent, toggleComponent }
})