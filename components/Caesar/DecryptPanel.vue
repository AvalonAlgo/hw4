<script setup lang="ts">
import {Base64} from 'js-base64';

const textInput = ref('');
const shiftAmountInput = ref('');
const decryptedText = ref('');

const getShiftAmount = () => {
  let finalShiftAmount = parseInt(shiftAmountInput.value);
  finalShiftAmount %= 256;
  
  return finalShiftAmount;
};

// ❤️ õpilasest üle 小飼弾 🦄
const handleDecrypt = () => {
  const cypheredByteArray = Base64.toUint8Array(textInput.value);;

  const shiftAmount = getShiftAmount();

  for (let i = 0; i < cypheredByteArray.length; i++) {
    cypheredByteArray[i] -= shiftAmount;
  };

  const decoder: TextDecoder = new TextDecoder();
  decryptedText.value = decoder.decode(cypheredByteArray);
};

const handleReset = () => {
  textInput.value = '';
  shiftAmountInput.value = '';
  decryptedText.value = '';
};
</script>

<template>
    <UContainer class="w-full p-8 my-20">
        <h2 class="text-lg font-medium title-font">Caesar Decrypt</h2>    
        <!-- Encrypt -->
        <div class="flex flex-col space-y-2">      
            <UInput v-model="textInput" type="text" placeholder="Text to decrypt (Base64)..." />
            <UInput v-model="shiftAmountInput" type="number" placeholder="Shift amount..." />
            <UButton block @click="handleDecrypt" label="Decrypt" />
      
            <UCard v-if="decryptedText">
                <div class="flex flex-col space-y-4">
                    <h1 class="text-center text-xl font-bold break-words">{{ decryptedText }}</h1>
                    <UButton @click="handleReset" block label="Clear" />
                </div>
            </UCard>
        </div>
    </UContainer>
</template>