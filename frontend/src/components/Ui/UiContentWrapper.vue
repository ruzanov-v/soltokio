<template>
    <div :class="$style.ctn">
        <div :class="$style.wrp">
            <slot></slot>
        </div>
    </div>
</template>

<style module>
.ctn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.wrp {
    max-width: 1000px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
</style>