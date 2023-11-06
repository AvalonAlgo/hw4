<script setup lang="ts">
const items = [
	{
		label: 'Caesar',
		slot: 'caesar'
	},
	{
		label: 'Vigenere',
		slot: 'vigenere'
	}
]
</script>

<template>
	<div class="p-4 my-48">
		<UAccordion multiple variant="soft" :items="items">

			<template #caesar>
				<div class="flex flex-col space-y-2 mx-4">
					<UButton to="/caesar/encrypt" label="Encrypt" block />
					<UButton to="/caesar/decrypt" label="Decrypt" block />
				</div>
			</template>

			<template #vigenere>
				<div class="flex flex-col space-y-2 mx-4">
					<UButton to="/vigenere/encrypt" label="Encrypt" block />
					<UButton to="/vigenere/decrypt" label="Decrypt" block />
				</div>
			</template>

		</UAccordion>
	</div>
</template>