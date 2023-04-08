<template>
    <div ref="containerRef">
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, onUnmounted, ref, type Ref } from 'vue';
  import { FloorMaterial, Room, Scuti, WallMaterial } from '@kozennnn/scuti-renderer';


  export default defineComponent({
    setup(props, { emit }) {
      const containerRef: Ref<HTMLDivElement | null> = ref(null);

        let scuti: Scuti;
        
      onMounted(async () => {
        const container = containerRef.value;
  
        if (container == null) return;
  
        scuti = new Scuti({
          canvas: container,
          width: window.innerWidth / 2,
          height: window.innerHeight / 2,
          resources: './resources'
        });
        await scuti.loadResources("https://psociety.github.io/scuti-resources/");

        if (props.cb) props.cb(scuti);
      });
      onUnmounted(() => {
        scuti.application.destroy();
      });
  
      return {
        containerRef,
      };
    },
    props: {
      cb: Function as unknown as () => (scut: Scuti) => void,
    },
  });
  </script>