<template>
  <section id="example6">
    <vgl-renderer
      ref="renderer"
      scene="scene"
      camera="camera"
      antialias
      shadow-map-enabled
    >
      <vgl-scene
        ref="scene"
        name="scene"
        background-color="#111"
        fog="#111 10 40"
      >
        <vgl-grid-helper size="50" divisions="50" />
        <vgl-ambient-light color="#fff" intensity="0.4" />
        <vgl-point-light
          ref="pLight"
          color="#fff"
          intensity="0.7"
          position="10 5 -2"
        />
      </vgl-scene>

      <vgl-perspective-camera
        ref="camera"
        name="camera"
        fov="25"
        near="1"
        far="1000"
        orbit-position="18 1.15 -9.75"
      />
    </vgl-renderer>
  </section>
</template>

<script>
import * as THREE from 'three'
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader'

import {
  VglRenderer,
  VglScene,
  VglGridHelper,
  VglAmbientLight,
  VglPointLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example6',
  components: {
    VglRenderer,
    VglScene,
    VglGridHelper,
    VglAmbientLight,
    VglPointLight,
    VglPerspectiveCamera,
  },
  data: () => ({
    renderer: null,
    scene: null,
    camera: null,
    mixer: null,
    clock: null,
  }),
  mounted() {
    this.renderer = this.$refs.renderer.inst
    this.scene = this.$refs.scene.inst

    this.camera = this.$refs.camera.inst
    this.camera.position.y = 10.35

    this.configureExternalObjects()

    this.renderer.setAnimationLoop(this.animate)
  },
  methods: {
    configureExternalObjects() {
      this.clock = new THREE.Clock()

      new ColladaLoader().load('models/stormtrooper.dae', (collada) => {
        const avatar = collada.scene
        this.scene.add(avatar)

        const animations = collada.animations.shift()
        this.mixer = new THREE.AnimationMixer(avatar)
        this.mixer.clipAction(animations).play()
      })
    },

    animate() {
      if (this.mixer) {
        this.mixer.update(this.clock.getDelta())
      }

      this.renderer.render(this.scene, this.camera)
    },
  },
}
</script>
