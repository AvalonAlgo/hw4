<template>
    <div>
        <Header />
        <slot />
        <div class="p-4">
            <UButton to="/" variant="soft" block label="Back to Main Page" />
        </div>
    </div>
</template>