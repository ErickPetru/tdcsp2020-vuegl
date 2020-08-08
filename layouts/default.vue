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

main > section > div:first-of-type {
  flex: 1;
  width: 100%;
  height: calc(100vh - 5rem);
}

main canvas {
  border-radius: 4px;
  box-shadow: 0 1px 5px #00000020, 0 2px 10px #00000020;
}

main > section > div > *:first-child {
  line-height: 0;
}

span {
  color: #fff4;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 1rem;
  background: #111;
  border-radius: 4px;
  box-shadow: 0 1px 5px #00000020, 0 2px 10px #00000020;
}

.controls span {
  font-size: 0.875em;
}

input[type='range'] {
  width: 100%;
  margin: 6px 0;
  background-color: transparent;
  -webkit-appearance: none;
}

input[type='range']:focus {
  outline: none;
}

input[type='range']::-webkit-slider-runnable-track {
  background: #00b7ff44;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 4px;
  width: 100%;
  height: 6px;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
}

input[type='range']::-webkit-slider-thumb {
  margin-top: -7px;
  width: 16px;
  height: 18px;
  background: #00b7ff;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
  -webkit-appearance: none;
  appearance: none;
}

input[type='range']:focus::-webkit-slider-runnable-track {
  background: #05b8ff88;
}

input[type='range']:hover::-webkit-slider-thumb {
  background: #6fd1ff;
}

input[type='range']::-moz-range-track {
  background: #00b7ff44;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 4px;
  width: 100%;
  height: 6px;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 18px;
  background: #00b7ff;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.25s ease-in-out;
}

input[type='range']:focus::-moz-range-track {
  background: #05b8ff88;
}

input[type='range']:hover::-moz-range-thumb {
  background: #6fd1ff;
}

input[type='range']::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 6px 0;
  color: transparent;
  width: 100%;
  height: 6px;
  cursor: pointer;
}

input[type='range']::-ms-fill-lower {
  background: #00b3fa44;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 8px;
  transition: background 0.25s ease-in-out;
}

input[type='range']::-ms-fill-upper {
  background: #00b3fa44;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 8px;
  transition: background 0.25s ease-in-out;
}

input[type='range']::-ms-thumb {
  width: 16px;
  height: 18px;
  background: #00b7ff;
  border: 1px solid rgba(17, 17, 17, 0.8);
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0px;
  transition: background 0.25s ease-in-out;
}

input[type='range']:focus::-ms-fill-lower {
  background: #05b8ff88;
}

input[type='range']:focus::-ms-fill-upper {
  background: #05b8ff88;
}

input[type='range']:hover::-ms-thumb {
  background: #6fd1ff;
}

@supports (-ms-ime-align: auto) {
  input[type='range'] {
    margin: 0;
  }
}
</style>
