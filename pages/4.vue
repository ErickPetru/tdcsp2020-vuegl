<template>
  <section id="example4">
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
        background-color="#fff"
        fog="#fff 2 20"
      >
        <vgl-group position="-1 0.05 -0.5">
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
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js'

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
    composer: null,
  }),
  mounted() {
    const renderer = this.$refs.renderer.inst
    const scene = this.$refs.scene.inst
    const camera = this.$refs.camera.inst

    const spotLight1 = this.$refs.sLight1.inst
    const spotLight2 = this.$refs.sLight2.inst
    const dirLight = this.$refs.dLight.inst

    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    spotLight1.shadow.mapSize.width = 1024
    spotLight1.shadow.mapSize.height = 1024

    spotLight2.shadow.mapSize.width = 1024
    spotLight2.shadow.mapSize.height = 1024

    dirLight.shadow.mapSize.width = 8192
    dirLight.shadow.mapSize.height = 8192

    this.composer = new EffectComposer(renderer)
    const ssaoPass = new SSAOPass(scene, camera)
    ssaoPass.output = SSAOPass.OUTPUT.Depth
    ssaoPass.kernelRadius = 16
    this.composer.addPass(ssaoPass)

    renderer.setAnimationLoop(this.animate)
  },

  animate() {
    this.composer.render()
  },
}
</script>
