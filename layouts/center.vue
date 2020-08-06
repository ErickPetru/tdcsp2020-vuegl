<template>
  <div id="app">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'LayoutCenter',
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
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
