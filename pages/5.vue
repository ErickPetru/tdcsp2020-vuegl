<template>
  <section id="example5">
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
          />

          <vgl-spot-light
            ref="sLight2"
            position="3 10 -23"
            intensity="0.5"
            color="#990"
            penumbra="0.3"
            :angle="Math.PI / 5"
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

      <vgl-perspective-camera
        ref="camera"
        name="camera"
        orbit-position="4.25 1 0.5"
      />
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
  name: 'Example5',
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
  data: () => ({
    renderer: null,
    scene: null,
    camera: null,
    material: null,
    light: null,
    torusPositionY: 0.095,
    torusDirection: 0.01,
    torusRotationZ: 0,
  }),
  mounted() {
    this.renderer = this.$refs.renderer.inst
    this.scene = this.$refs.scene.inst
    this.camera = this.$refs.camera.inst

    this.configureLights()
    this.configureMaterials()

    this.renderer.setAnimationLoop(this.animate)
  },
  methods: {
    configureLights() {
      this.light = this.$refs.dLight.inst

      this.renderer.shadowMap.type = THREE.VSMShadowMap

      this.light.shadow.camera.near = 0.1
      this.light.shadow.camera.far = 500
      this.light.shadow.mapSize.width = 1024
      this.light.shadow.mapSize.height = 1024
      this.light.shadow.bias = -0.0001
      this.light.shadow.radius = 5
    },

    configureMaterials() {
      this.material = this.$refs.torusMat.inst

      this.scene.background = new THREE.CubeTextureLoader()
        .setPath('textures/')
        .load(['px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'])

      this.material.envMap = this.scene.background
      this.material.refractionRatio = 0.95
    },

    animate() {
      if (this.torusPositionY < 0.75) {
        this.torusPositionY += this.torusDirection
      } else {
        this.torusPositionY = 0.75
        this.torusDirection = -0.01
      }

      if (this.torusPositionY > 0.095) {
        this.torusPositionY += this.torusDirection
      } else {
        this.torusPositionY = 0.095
        this.torusDirection = 0.01
      }

      this.renderer.render(this.scene, this.camera)
    },
  },
}
</script>
