<template>
  <header>
    <nav>
      <span>Exemplo:</span>
      <a
        v-for="n in 6"
        :key="n"
        :href="current === n ? null : `/${n}`"
        :class="{ 'exact-active': current === n }"
        @click.prevent="$router.push(`/${n}`)"
        >{{ n }}</a
      >
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    current() {
      return parseInt(this.$route.path.replace(/[^\d]/g, ''), 10)
    },
  },
}
</script>

<style scoped>
nav {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  gap: 0.25rem;
  height: 3rem;
}

span {
  padding: 0.5rem 0;
}

a {
  padding: 0.5rem;
  text-decoration: none;
  color: #00b7ff;
  transition: all 0.25s ease-in-out;
  outline: 1px solid #00b7ff00;
}

a:hover {
  color: #6fd1ff;
}

a:focus {
  outline-color: #00b7ff80;
}

a.exact-active {
  cursor: default;
  color: #00b7ff44;
}
</style>
