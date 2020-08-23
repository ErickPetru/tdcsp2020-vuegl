<template>
  <div id="app">
    <Header />

    <main>
      <keep-alive>
        <Nuxt />
      </keep-alive>
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>
