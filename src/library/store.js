import { writable } from 'svelte/store';

export const notification = writable(null);
export const darkMode = writable(false);