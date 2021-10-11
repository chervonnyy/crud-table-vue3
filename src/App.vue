<template>
	<div id="nav">
		<router-link to="/users">Пользователи</router-link> |
		<router-link to="/groups">Группы</router-link>
	</div>
	<Suspense>
		<template #default>
			<router-view/>
		</template>
		<template #fallbakc>
			<div>Загрузка...</div>	
		</template>
	</Suspense>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'
import store from '@/store'

export default defineComponent({
	name: 'App',
	setup() {
		provide('store', store)
	},
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
