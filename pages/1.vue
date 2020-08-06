<template>
  <section id="example1">
    <vgl-renderer name="renderer" scene="scene" camera="camera" antialias alpha>
      <vgl-scene name="scene" background-color="#111">
        <vgl-box-geometry name="box" />
        <vgl-mesh geometry="box" />
      </vgl-scene>
      <vgl-perspective-camera name="camera" orbit-position="3 1 0.5" />
    </vgl-renderer>
  </section>
</template>

<script>
import {
  VglRenderer,
  VglBoxGeometry,
  VglScene,
  VglMesh,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example1',
  components: {
    VglRenderer,
    VglBoxGeometry,
    VglScene,
    VglMesh,
    VglPerspectiveCamera,
  },
}
</script>
