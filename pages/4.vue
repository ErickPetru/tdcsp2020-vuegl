<template>
  <section id="example4">
    <vgl-renderer
      ref="renderer"
      scene="scene"
      camera="camera"
      antialias
      shadow-map-enabled
    >
      <vgl-scene ref="scene" name="scene" background-color="#fff">
        <vgl-group
          :position="`0.15 ${torusPositionY} 0.25`"
          :rotation="`${torusRotationZ} 0 2 ZYX`"
        >
          <vgl-torus-knot-geometry
            name="torusGeo"
            radius="0.45"
            tube="0.065"
            p="6"
            q="3"
            radial-segments="32"
            tubular-segments="512"
          />
          <vgl-mesh-lambert-material
            ref="torusMat"
            name="torusMat"
            color="#3366ff"
          />
          <vgl-mesh
            geometry="torusGeo"
            material="torusMat"
            receive-shadow
            cast-shadow
          />
        </vgl-group>

        <vgl-group position="0.5 0.1 0">
          <vgl-sphere-geometry
            name="sphereGeo"
            radius="0.65"
            width-segments="48"
            height-segments="48"
          />
          <vgl-mesh-phong-material
            name="sphereMat"
            color="#00bcd4"
            shininess="0"
            specular="#222"
          />
          <vgl-mesh
            geometry="sphereGeo"
            material="sphereMat"
            receive-shadow
            cast-shadow
          />
        </vgl-group>

        <vgl-group name="ground" position="0 -0.5 0">
          <vgl-box-geometry
            name="groundGeo"
            width="100%"
            height="100%"
            depth="0.1"
          />
          <vgl-mesh-phong-material
            name="groundMat"
            color="#999"
            shininess="0"
          />
          <vgl-mesh
            geometry="groundGeo"
            material="groundMat"
            cast-shadow
            receive-shadow
            :rotation="`${Math.PI / 2} 0 0 ZYX`"
          />
        </vgl-group>

        <vgl-hemisphere-light ground-color="#dd9" intensity="0.35" />

        <vgl-group>
          <vgl-spot-light
            ref="sLight1"
            position="7 12 17"
            intensity="0.25"
            color="#88c"
            penumbra="0.3"
            :angle="Math.PI / 5"
            cast-shadow
          />

          <vgl-spot-light
            ref="sLight2"
            position="3 10 -23"
            intensity="0.5"
            color="#990"
            penumbra="0.3"
            :angle="Math.PI / 5"
            cast-shadow
          />

          <vgl-directional-light
            ref="dLight"
            position="8 10 5"
            intensity="0.85"
            color="#ffe"
            cast-shadow
          />
        </vgl-group>
      </vgl-scene>

      <vgl-perspective-camera name="camera" orbit-position="3 1 0.5" />
    </vgl-renderer>

    <div class="controls">
      <span>Rotação:</span>
      <input
        v-model="torusRotationZ"
        type="range"
        min="-2"
        max="2"
        step="0.25"
      />
    </div>
  </section>
</template>

<script>
import * as THREE from 'three'

import {
  VglRenderer,
  VglScene,
  VglGroup,
  VglTorusKnotGeometry,
  VglBoxGeometry,
  VglMeshLambertMaterial,
  VglMeshPhongMaterial,
  VglMesh,
  VglHemisphereLight,
  VglDirectionalLight,
  VglSpotLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example4',
  components: {
    VglRenderer,
    VglScene,
    VglGroup,
    VglTorusKnotGeometry,
    VglBoxGeometry,
    VglMeshLambertMaterial,
    VglMeshPhongMaterial,
    VglMesh,
    VglHemisphereLight,
    VglDirectionalLight,
    VglSpotLight,
    VglPerspectiveCamera,
  },
  data() {
    return {
      torusPositionY: 0.095,
      torusDirection: 0.035,
      torusRotationZ: 0,
    }
  },
  mounted() {
    this.configureShadows()
    this.configureReflections()
    this.animate()
  },
  methods: {
    configureShadows() {
      const renderer = this.$refs.renderer.inst
      const spotLight1 = this.$refs.sLight1.inst
      const spotLight2 = this.$refs.sLight2.inst
      const dirLight = this.$refs.dLight.inst

      renderer.shadowMap.type = THREE.VSMShadowMap

      spotLight1.shadow.camera.near = 1
      spotLight1.shadow.camera.far = 100
      spotLight1.shadow.mapSize.width = 256
      spotLight1.shadow.mapSize.height = 256
      spotLight1.shadow.bias = -0.0001
      spotLight1.shadow.radius = 4
      spotLight2.shadow = spotLight1.shadow

      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 650
      dirLight.shadow.camera.right = 10
      dirLight.shadow.camera.left = -10
      dirLight.shadow.camera.top = 10
      dirLight.shadow.camera.bottom = -10
      dirLight.shadow.mapSize.width = 1024
      dirLight.shadow.mapSize.height = 1024
      dirLight.shadow.radius = 7
      dirLight.shadow.bias = -0.00015
    },

    configureReflections() {
      const scene = this.$refs.scene.inst
      const torusMat = this.$refs.torusMat.inst

      scene.background = new THREE.CubeTextureLoader()
        .setPath('textures/')
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

      torusMat.envMap = scene.background
      torusMat.refractionRatio = 0.95
      torusMat.needsUpdate = true
      scene.needsUpdate = true
    },

    animate() {
      requestAnimationFrame(this.animate)

      if (this.torusPositionY < 0.5) {
        this.torusPositionY += this.torusDirection
      } else {
        this.torusPositionY = 0.5
        this.torusDirection = -0.0035
      }

      if (this.torusPositionY > 0.095) {
        this.torusPositionY += this.torusDirection
      } else {
        this.torusPositionY = 0.095
        this.torusDirection = 0.0035
      }

      const renderer = this.$refs.renderer.inst
      renderer.needsUpdate = true
    },
  },
}
</script>
