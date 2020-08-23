<template>
  <section id="example1">
    <vgl-renderer scene="s" camera="c" antialias>
      <vgl-scene name="s" background-color="#111">
        <vgl-box-geometry name="g" />
        <vgl-mesh-basic-material name="m" color="#f00" />
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
  VglMeshBasicMaterial,
  VglMesh,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example1',
  components: {
    VglRenderer,
    VglScene,
    VglBoxGeometry,
    VglMeshBasicMaterial,
    VglMesh,
    VglPerspectiveCamera,
  },
}
</script>
