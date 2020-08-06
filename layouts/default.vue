<template>
  <div id="app">
    <Header />

    <main>
      <Nuxt />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue',
    'Segoe UI', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background: #151515;
}

#app {
  min-height: 100vh;
  padding: 1rem;
  display: flex;
  flex-flow: column;
}

main {
  flex: 1;
  border-radius: 4px;
}

main > section > div {
  flex: 1;
  width: 100%;
  height: calc(100vh - 5rem);
}

main canvas {
  border-radius: 4px;
  box-shadow: 0 2px 6px #000;
}

main > section > div > *:first-child {
  line-height: 0;
}
</style>
