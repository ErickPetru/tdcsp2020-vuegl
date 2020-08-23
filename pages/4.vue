<template>
  <section id="example4">
    <vgl-renderer
      ref="renderer"
      scene="scene"
      camera="camera"
      shadow-map-enabled
    >
      <vgl-scene
        ref="scene"
        name="scene"
        background-color="#fff"
        fog="#fff 2 20"
      >
        <vgl-group position="-1.25 0.25 -0.5">
          <vgl-sphere-geometry
            name="sphereGeo"
            radius="0.65"
            width-segments="48"
            height-segments="48"
          />
          <vgl-mesh-phong-material
            name="sphereMat"
            color="#4aa619"
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

        <vgl-group position="0.5 0.1 0">
          <vgl-box-geometry name="boxGeo" />
          <vgl-mesh-phong-material
            name="boxMat"
            color="#a4117c"
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

        <vgl-group name="ground" position="0 -0.45 0">
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

      <vgl-perspective-camera
        ref="camera"
        name="camera"
        orbit-position="3 1 0.5"
      />
    </vgl-renderer>
  </section>
</template>

<script>
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

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
  name: 'Example4',
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
    scene: null,
    camera: null,
    lights: [],
    composer: null,
    postprocessing: true,
    radius: 75,
    theta: 0,
    direction: '+',
  }),
  mounted() {
    this.renderer = this.$refs.renderer.inst
    this.scene = this.$refs.scene.inst
    this.camera = this.$refs.camera.inst

    this.configureLights()
    this.configurePostProcessing()

    this.renderer.setAnimationLoop(this.animate)
  },
  methods: {
    configureLights() {
      this.lights = []

      this.lights[0] = this.$refs.sLight1.inst
      this.lights[1] = this.$refs.sLight2.inst
      this.lights[2] = this.$refs.dLight.inst

      this.renderer.shadowMap.type = THREE.VSMShadowMap

      this.lights[0].shadow.mapSize.width = 256
      this.lights[0].shadow.mapSize.height = 256
      this.lights[0].shadow.radius = 10
      this.lights[0].shadow.bias = -0.00025

      this.lights[1].shadow.mapSize.width = 256
      this.lights[1].shadow.mapSize.height = 256
      this.lights[1].shadow.radius = 5
      this.lights[1].shadow.bias = -0.00025

      this.lights[2].shadow.camera.near = 0.1
      this.lights[2].shadow.camera.far = 500
      this.lights[2].shadow.camera.right = 20
      this.lights[2].shadow.camera.left = -20
      this.lights[2].shadow.camera.top = 20
      this.lights[2].shadow.camera.bottom = -20
      this.lights[2].shadow.mapSize.width = 256
      this.lights[2].shadow.mapSize.height = 256
      this.lights[2].shadow.radius = 5
    },

    configurePostProcessing() {
      this.composer = new EffectComposer(this.renderer)

      const ssaaRenderPass = new SSAARenderPass(this.scene, this.camera)
      ssaaRenderPass.unbiased = true
      ssaaRenderPass.sampleLevel = 4
      this.composer.addPass(ssaaRenderPass)

      const copyPass = new ShaderPass(CopyShader)
      this.composer.addPass(copyPass)
    },

    animate() {
      if (this.direction === '+' && this.theta > 2) {
        this.direction = '-'
      } else if (this.direction === '-' && this.theta < 0) {
        this.direction = '+'
      }

      const thetaChange = this.postprocessing ? 0.05 : 0.01
      if (this.direction === '+') {
        this.theta += thetaChange
      } else {
        this.theta -= thetaChange
      }

      this.camera.position.x =
        this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta))
      this.camera.position.y =
        this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta))

      this.camera.lookAt(this.scene.position)

      if (this.postprocessing) {
        this.composer.render()
      } else {
        this.renderer.render(this.scene, this.camera)
      }
    },
  },
}
</script>
