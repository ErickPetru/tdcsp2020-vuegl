<template>
  <section id="example3">
    <vgl-renderer
      ref="renderer"
      scene="scene"
      camera="camera"
      antialias
      shadow-map-enabled
    >
      <vgl-scene name="scene" background-color="#fff" fog="#fff 2 20">
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

        <vgl-group position="-1 0 -0.5">
          <vgl-box-geometry name="boxGeo" />
          <vgl-mesh-phong-material
            name="boxMat"
            color="#e64a19"
            shininess="0"
            specular="#222"
          />
          <vgl-mesh
            geometry="boxGeo"
            material="boxMat"
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
  </section>
</template>

<script>
import * as THREE from 'three'

import {
  VglRenderer,
  VglScene,
  VglGroup,
  VglSphereGeometry,
  VglBoxGeometry,
  VglMeshPhongMaterial,
  VglMesh,
  VglHemisphereLight,
  VglDirectionalLight,
  VglSpotLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example3',
  components: {
    VglRenderer,
    VglScene,
    VglGroup,
    VglSphereGeometry,
    VglBoxGeometry,
    VglMeshPhongMaterial,
    VglMesh,
    VglHemisphereLight,
    VglDirectionalLight,
    VglSpotLight,
    VglPerspectiveCamera,
  },
  data: () => ({
    renderer: null,
    lights: [],
  }),
  mounted() {
    this.renderer = this.$refs.renderer.inst

    this.configureLights()
  },
  methods: {
    configureLights() {
      this.lights = []

      this.lights[0] = this.$refs.sLight1.inst
      this.lights[1] = this.$refs.sLight2.inst
      this.lights[2] = this.$refs.dLight.inst

      this.renderer.shadowMap.type = THREE.VSMShadowMap

      this.lights[0].shadow.camera.near = 1
      this.lights[0].shadow.camera.far = 100
      this.lights[0].shadow.mapSize.width = 256
      this.lights[0].shadow.mapSize.height = 256
      this.lights[0].shadow.bias = -0.0001
      this.lights[0].shadow.radius = 5

      this.lights[1].shadow = this.lights[0].shadow

      this.lights[2].shadow.camera.near = 0.1
      this.lights[2].shadow.camera.far = 650
      this.lights[2].shadow.camera.right = 20
      this.lights[2].shadow.camera.left = -20
      this.lights[2].shadow.camera.top = 20
      this.lights[2].shadow.camera.bottom = -20
      this.lights[2].shadow.mapSize.width = 512
      this.lights[2].shadow.mapSize.height = 512
      this.lights[2].shadow.radius = 5
      this.lights[2].shadow.bias = -0.00025
    },
  },
}
</script>
