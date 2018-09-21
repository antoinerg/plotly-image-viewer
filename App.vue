<template>
  <div class="container">
    <a href="https://plot.ly"><img class="plotly-logo" src="https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format"/></a>

    <comparify value="50">
      <img slot="first" :src="baseline">
      <img slot="second" :src="image">
    </comparify>
  </div>
</template>

<script>
import Comparify from './Comparify.vue'
import Opacity from './Opacity.vue'

export default {
  data () {
    return {
      title: 'plotly.js image viewer',
      // https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90
      // https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90
      baseline: 'https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90',
      image: 'https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90'
    }
  },
  components: {
    Comparify, Opacity
  }
}
</script>

<style>
.container {
  padding: 10px;
  text-align: center;
  margin:0 auto;
  width: 90%;
}
.plotly-logo {
  border-radius: 10px;
  background-color: #118DFF;
}
</style>
