<script setup lang="ts">
import {Base64} from 'js-base64';
const user = useSupabaseUser();
const client = useSupabaseClient();

const textInput = ref('');
const shiftAmountInput = ref('');
const encryptedText = ref('');

const getShiftAmount = () => {
  let finalShiftAmount = parseInt(shiftAmountInput.value);
  finalShiftAmount %= 256;
  
  return finalShiftAmount;
};

// ❤️ õpilasest üle 小飼弾 🦄
const handleEncrypt = async () => {
  const encoder: TextEncoder = new TextEncoder();
  const byteArray: Uint8Array = encoder.encode(textInput.value);

  const shiftAmount = getShiftAmount();

  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] += shiftAmount;
  };

  encryptedText.value = Base64.fromUint8Array(byteArray);

  const { error } = await useFetch('/api/caesar', {
    method: 'post',
    body: {
        encrypted_text: encryptedText.value,
        shift_amount: shiftAmount
    }
  });
};

const handleReset = () => {
  textInput.value = '';
  shiftAmountInput.value = '';
  encryptedText.value = '';
};
</script>

<template>
    <UContainer class="w-full p-8 my-48">
        <h2 class="text-lg font-medium title-font">Caesar Encrypt</h2>    
        <!-- Encrypt -->
        <div class="flex flex-col space-y-2">
            <UInput required v-model="textInput" type="text" placeholder="Text to encrypt (UTF-8)..." />
            <UInput required v-model="shiftAmountInput" type="number" placeholder="Shift amount..." />
            <UButton block @click="handleEncrypt" label="Encrypt" />
    
            <UCard v-if="encryptedText">
                <div class="flex flex-col space-y-4">
                    <h1 class="text-center text-xl font-bold break-words">{{ encryptedText }}</h1>
                    <UButton @click="handleReset" block label="Clear" />
                </div>
            </UCard>
        </div>
    </UContainer>
</template>