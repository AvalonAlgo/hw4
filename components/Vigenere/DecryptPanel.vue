<script setup lang="ts">
import {Base64} from 'js-base64';

const textInput = ref('');
const encryptionKey = ref('');
const decryptedText = ref('');

const handleDecrypt = () => {
  if (!encryptionKey || !textInput) {
    return;
  };
  
  const encoder: TextEncoder = new TextEncoder();
  const cypheredByteArray = Base64.toUint8Array(textInput.value);
  const keyByteArray: Uint8Array = encoder.encode(encryptionKey.value);

  for (let i = 0; i < cypheredByteArray.length; i++) {
    cypheredByteArray[i] = (cypheredByteArray[i] - keyByteArray[i % keyByteArray.length] + 256) % 256;
  };

  const decoder: TextDecoder = new TextDecoder();
  decryptedText.value = decoder.decode(cypheredByteArray);
};

const handleReset = () => {
  textInput.value = '';
  encryptionKey.value = '';
  decryptedText.value = '';
};
</script>

<template>
    <UContainer class="w-full p-8 my-20">
        <h2 class="text-lg font-medium title-font">Vigenere Decrypt</h2>    
        <!-- Encrypt -->
        <div class="flex flex-col space-y-2">      
            <UInput v-model="textInput" type="text" placeholder="Text to decrypt (Base64)..." />
            <UInput v-model="encryptionKey" type="text" placeholder="Encryption key..." />
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