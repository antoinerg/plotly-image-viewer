<template>
    <div class="compare-wrapper">
      <div class="compare">

        <div class="compare__content" :style="{'opacity': opacity/100.0}">
          <slot name="first"></slot>
        </div>

        <div class="handle-wrap" :style="{left:`calc(${opacity + '%'} - var(--handle-line-width) / 2`}">
          <div class="handle">
            <svg class="handle__arrow handle__arrow--l feather feather-chevron-left" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <svg class="handle__arrow handle__arrow--r feather feather-chevron-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          <span class="handle-line"></span>
        </div>

        <div class="compare-overlay">
          <div class="compare-overlay__content" :style="{ 'opacity': 1-opacity/100.0 }">
            <slot name="second"></slot>
          </div>
        </div>
      </div>
      <input type="range" min="0" max="100" :step="step" class="compare__range" :value="opacity" @input="handleInput" tabindex="-1">
    </div>
</template>

<script>

export default {
  props:{
    value: { default: 50 },
    step: { default: '.1' }
  },
  data(){
    return {
        opacity: 1.0
    }
  },
  mounted() {
    this.opacity = this.value;
  },
  methods:{
    handleInput(e){
      this.opacity = e.target.value
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style scoped>
.compare-wrapper{
  position: relative;
}
.compare, .compare__content{
  position: relative;
  height: 100%;
}

.compare-overlay{
  position: absolute;
  overflow:hidden;
  height: 100%;
  width: 100%;
  top:0;
}
.compare-overlay__content{
  position:relative;
  height: 100%;
  width: 100%;
}

.object-fit-cover{
  object-fit: cover;
}
</style>
