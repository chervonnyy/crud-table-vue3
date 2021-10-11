<template>
	<div class="popup">
		<div class="popup-header">
			<h2> Добавление/изменение </h2>
			<div @click="$emit('close')" class="close-icon">+</div>
		</div>
		<div class="popup-contetn">
			<slot />
		</div>
	</div>
	<div class="overlay" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Popup',
	emits: ['close'],
})
</script>

<style scoped>
.popup {
	position: fixed;
	top: 50%;
	right: 50%;
	transform: translate(50%, -50%);
	min-width: 450px;
	z-index: 2;
	background: #fff;
	border-radius: 5px;

}
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	background: grey;
	opacity: .5;
}
.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 10px 0 30px;
}
.close-icon {
	transform: rotate(45deg);
	padding: 10px;
	cursor: pointer;
	font-size: 32px;
}
</style>
