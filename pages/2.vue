<template>
  <section id="example2">
    <vgl-renderer name="renderer" scene="scene" camera="camera" antialias alpha>
      <vgl-scene name="scene" background-color="#111">
        <vgl-box-geometry name="box" />
        <vgl-mesh-standard-material name="material" />
        <vgl-mesh geometry="box" material="material" />
        <vgl-directional-light name="light" position="1 2 3" />
      </vgl-scene>
      <vgl-perspective-camera name="camera" orbit-position="3 1 0.5" />
    </vgl-renderer>
  </section>
</template>

<script>
import {
  VglRenderer,
  VglBoxGeometry,
  VglMeshStandardMaterial,
  VglScene,
  VglMesh,
  VglDirectionalLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example2',
  components: {
    VglRenderer,
    VglBoxGeometry,
    VglMeshStandardMaterial,
    VglScene,
    VglMesh,
    VglDirectionalLight,
    VglPerspectiveCamera,
  },
}
</script>
