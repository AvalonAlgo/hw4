<script setup lang="ts">
const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    navigateTo('/login')
  }
} 
</script>

<template>
  <div>
    <UContainer class="flex flex-row justify-between mx-auto p-6">
      <h1 class="text-3xl">Crypt-O</h1>
      <UButton @click="signOut" variant="soft" label="Sign Out" />
    </UContainer>
  </div>
</template>