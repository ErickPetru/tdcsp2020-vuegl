<template>
  <section id="example2">
    <vgl-renderer scene="s" camera="c" antialias>
      <vgl-scene name="s" background-color="#111">
        <vgl-sphere-geometry
          name="g"
          radius="0.6"
          width-segments="48"
          height-segments="48"
        />
        <vgl-mesh-standard-material name="m" color="#369" />
        <vgl-mesh geometry="g" material="m" />

        <vgl-ambient-light intensity="0.1" />
        <vgl-point-light position="0 1 1" />
      </vgl-scene>
      <vgl-perspective-camera name="c" orbit-position="3 1 0.5" />
    </vgl-renderer>
  </section>
</template>

<script>
import {
  VglRenderer,
  VglScene,
  VglSphereGeometry,
  VglMeshStandardMaterial,
  VglMesh,
  VglAmbientLight,
  VglPointLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example2',
  components: {
    VglRenderer,
    VglScene,
    VglSphereGeometry,
    VglMeshStandardMaterial,
    VglMesh,
    VglAmbientLight,
    VglPointLight,
    VglPerspectiveCamera,
  },
}
</script>
