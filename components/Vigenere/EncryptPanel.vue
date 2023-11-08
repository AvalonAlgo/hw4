<script setup lang="ts">
import {Base64} from 'js-base64';

const textInput = ref('');
const encryptionKey = ref('');
const encryptedText = ref('');

const handleEncrypt = async () => {
  if (!encryptionKey || !textInput) {
    return;
  };

  const encoder: TextEncoder = new TextEncoder();
  const byteArray: Uint8Array = encoder.encode(textInput.value);
  const byteArrayKey: Uint8Array = encoder.encode(encryptionKey.value);

  for (let i = 0; i < byteArray.length; i++) {
    byteArray[i] = (byteArray[i] + byteArrayKey[i % byteArrayKey.length]) % 256;
  };

  encryptedText.value = Base64.fromUint8Array(byteArray);

  const { error } = await useFetch('/api/vigenere', {
    method: 'post',
    body: {
        encrypted_text: encryptedText.value,
        encryption_key: encryptionKey.value
    }
  });
};

const handleReset = () => {
  textInput.value = '';
  encryptionKey.value = '';
  encryptedText.value = '';
};
</script>

<template>
    <UContainer class="w-full p-8 my-48">
        <h2 class="text-lg font-medium title-font">Vigenere Encrypt</h2>    
        <!-- Encrypt -->
        <div class="flex flex-col space-y-2">
            <UInput required v-model="textInput" type="text" placeholder="Text to encrypt (UTF-8)..." />
            <UInput required v-model="encryptionKey" type="text" placeholder="Encryption key..." />
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