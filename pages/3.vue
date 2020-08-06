<template>
  <section id="example3">
    <vgl-renderer name="renderer" scene="scene" camera="camera" antialias>
      <vgl-scene name="scene" background-color="#999" fog="#999 0.1 20">
        <vgl-box-geometry name="boxGeometry" />
        <vgl-mesh-standard-material name="boxMaterial" />
        <vgl-mesh
          geometry="boxGeometry"
          material="boxMaterial"
          cast-shadow
          receive-shadow
          position="0 0.5 0"
          :rotation="`0 ${boxRotationY} 0 ZYX`"
        />

        <vgl-box-geometry
          name="groundGeometry"
          width="50"
          depth="50"
          height="0.1"
        />
        <vgl-mesh-phong-material name="groundMaterial" color="#666" />
        <vgl-mesh
          geometry="groundGeometry"
          material="groundMaterial"
          cast-shadow
          receive-shadow
          position="0 -0.5 0"
        />

        <vgl-hemisphere-light
          name="hemisphere"
          color="#fff"
          ground-color="#666"
          intensity="0.2"
        />
        <vgl-point-light name="light" cast-shadow position="1 4 3" />
      </vgl-scene>
      <vgl-perspective-camera
        name="camera"
        orbit-target="0 0.5 0"
        orbit-position="3 1 0.5"
      />
    </vgl-renderer>
  </section>
</template>

<script>
import {
  VglRenderer,
  VglScene,
  VglBoxGeometry,
  VglMeshStandardMaterial,
  VglMeshPhongMaterial,
  VglMesh,
  VglHemisphereLight,
  VglPointLight,
  VglPerspectiveCamera,
} from 'vue-gl'

export default {
  name: 'Example2',
  components: {
    VglRenderer,
    VglScene,
    VglBoxGeometry,
    VglMeshStandardMaterial,
    VglMeshPhongMaterial,
    VglMesh,
    VglHemisphereLight,
    VglPointLight,
    VglPerspectiveCamera,
  },
}
</script>
