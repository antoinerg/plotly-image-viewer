<template>
  <div class="container">
      <header>
        <a href="https://plot.ly"><img class="plotly-logo" src="https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format"/></a>
      </header>

      <div class="controls">
        <input type="text" v-model="mock" placeholder="mocks search" @input="fetchMock"/>
      </div>

    <h2 v-if="mock">{{mock}}</h2>

    <h3>Comparison slider</h3>
    <comparify value="50">
      <img slot="first" :src="baseline">
      <img slot="second" :src="image">
    </comparify>

    <div v-if="false">
        <h3>Opacity slider</h3>
        <opacity value="50">
          <img slot="first" :src="baseline">
          <img slot="second" :src="image">
        </opacity>
    </div>

    <h3>mock data (<a :href="json_url">JSON</a>)</h3>
    <pre>{{mockPayload}}</pre>
  </div>
</template>

<script>
import Comparify from './components/Comparify.vue'
import Opacity from './components/Opacity.vue'

const axios = require('axios');

export default {
  data () {
    return {
      title: 'plotly.js image viewer',
      mock: null,
      mockPayload: {},
      baseUrl: 'http://localhost:3000'
    }
  },
  computed: {
    baseline: function() {
        if(this.mock) return `${this.baseUrl}/build/test_images/${this.mock}.png`;
        return 'https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90'
    },
    image: function() {
        if(this.mock) return `${this.baseUrl}/test/image/baselines/${this.mock}.png`;
        return 'https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90';
    },
    json_url: function() {
        if(this.mock) return `${this.baseUrl}/test/image/mocks/${this.mock}.json`;
    }
  },
  methods: {
    fetchMock: function() {
        console.log('fetchMock');
        axios
            .get(this.json_url)
            .then(response => (this.mockPayload = response.data))
    }
  },
  components: {
    Comparify, Opacity
  }
}
</script>

<style>
body {
    font-family: 'Dosis', sans-serif;
}
.container {
  padding: 10px;
  text-align: center;
  margin:0 auto;
  width: 90%;
}
header {
  margin-bottom: 25px;
}
.plotly-logo {
  border-radius: 10px;
  background-color: #118DFF;
}
.controls {
    margin:25px;
}
input {
    width: 50%;
    padding:5px;
    font-size: 20px;
    border-radius: 10px;
    border: none;
    border: 1px solid #118DFF;
    outline: 0;
}

pre {
    text-align:left;
}
</style>
