<template>
<router-view />
<tab-bar v-if="!route.meta.hideTabBar" />
<loading />
</template>
<script setup>
import tabBar from '@/components/tabBar/tabBar.vue'
import { useRoute } from 'vue-router';
import loading from './components/loading/loading.vue';

const route = useRoute()
</script>
<style scoped>
</style>
