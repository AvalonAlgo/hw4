<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: false,
});

const supabase = useSupabaseClient();

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .required()
})

const state = reactive({
  email: undefined,
  password: undefined
})

const credentialError = ref(false)

const onSubmit = async () => {

  const { error } = await supabase.auth.signUp({
    email: state.email,
    password: state.password,
  });
  if (error) {
    credentialError.value = true;
  } else {
    const { error } = await supabase.auth.signInWithPassword({
        email: state.email,
        password: state.password,
    });
    if (error) {
        credentialError.value = true;
    } else {
        navigateTo('/');
    }
  }

}
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <UContainer>
      <h1 class="text-3xl font-bold mb-8">Crypt-O</h1>
      
      <UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>
    
        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>
            
        <UButton variant="soft" label="Register" type="Submit" block />
      
        <UButton to="/login" variant="outline" label="Sign In" block />
      </UForm>

      <div v-if="credentialError" class="text-center text-red-500">
        Invalid credentials!
      </div>
    </UContainer>
  </div>
</template>