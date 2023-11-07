<script setup lang="ts">
const columns = [
  { key: 'encrypted_text', label: 'Encrypted Text' },
  { key: 'shift_amount', label: 'Shift Key' },
  { key: 'created_at', label: 'Created At' },
];

const { pending, data: encryptions, refresh: getData } = await useLazyAsyncData('encryptions', () =>
  $fetch('/api/encryptions', {
    headers: useRequestHeaders(['cookie'])
  })
);

onMounted(() => {
  getData()
});
</script>

<template>
    <UContainer class="w-full p-8 my-20">
        <div class="flex flex-row justify-between">
          <h2 class="text-lg font-medium title-font">Caesar History</h2>
          <UButton :loading="pending"
            :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid' }"
            label="Refresh"
            variant="outline"
            @click="getData"
          />
        </div>
    
        <UTable
          :loading="pending"
          :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: 'Loading...' }"
          :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }"
          :columns="columns"
          :rows="encryptions?.encryptions"
        />
      </UContainer>
</template>