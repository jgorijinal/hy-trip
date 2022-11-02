<template>
<router-view />
<tab-bar v-if="!route.meta.hideTabBar" />
</template>
<script setup>
import tabBar from '@/components/tabBar/tabBar.vue'
import { useRoute } from 'vue-router';
const route = useRoute()
</script>
<style scoped>
</style>
