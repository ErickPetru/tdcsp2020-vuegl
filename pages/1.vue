<template>
  <section id="example1">
    <vgl-renderer scene="s" camera="c" antialias>
      <vgl-scene name="s" background-color="#111">
        <vgl-box-geometry name="g" />
        <vgl-mesh-standard-material name="m" />
        <vgl-mesh geometry="g" material="m" />
      </vgl-scene>
      <vgl-perspective-camera name="c" orbit-position="3 1 0.5" />
    </vgl-renderer>
  </section>
</template>

<script>
import {
  VglRenderer,
  VglScene,
  VglBoxGeometry,
  VglMeshStandardMaterial,
  VglMesh,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example1',
  components: {
    VglRenderer,
    VglScene,
    VglBoxGeometry,
    VglMeshStandardMaterial,
    VglMesh,
    VglPerspectiveCamera,
  },
}
</script>
