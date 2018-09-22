<template>
  <div class="container">
      <header>
        <a href="https://plot.ly"><img class="plotly-logo" src="https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format"/></a>
      </header>

      <div class="controls">
        <vue-fuse ref="fuse" :list="AllMocks" :defaultAll="false" event-name="results" placeholder="search mocks" @input="displaySuggestions=true"></vue-fuse>

        <ul class="autocomplete" v-show="displaySuggestions">
            <li v-for="result in results.slice(0,10)" @click="selectMock(AllMocks[result])">
                {{AllMocks[result]}}
            </li>
        </ul>
      </div>


    <h2 v-if="mock">{{mock}}</h2>

    <div v-if="true">
        <h3>Comparison slider</h3>
        <comparify value="50">
          <img slot="first" :src="baseline">
          <img slot="second" :src="image">
        </comparify>
    </div>

    <div v-if="false">
        <h3>Opacity slider</h3>
        <opacity value="50">
          <img slot="first" :src="baseline">
          <img slot="second" :src="image">
        </opacity>
    </div>

    <div v-if="mockPayload">
        <h3>Live</h3>
        <div id="graph"/>
    </div>

    <div v-if="mockPayload">
        <h3>mock data (<a :href="json_url">JSON</a>)</h3>
        <div>
            <json-tree :data="mockPayload" :level="2"></json-tree>
        </div>
    </div>

  </div>
</template>

<script>
import Comparify from './components/Comparify.vue'
import Opacity from './components/Opacity.vue'
import JsonTree from 'vue-json-tree'
import VueFuse from 'vue-fuse'

const axios = require('axios');
const htmlparser = require('htmlparser')

export default {
  data () {
    return {
      title: 'plotly.js image viewer',
      mock: null,
      mockPayload: null,
      displaySuggestions: true,
      AllMocks: [],
      results: [],
      baseUrl: 'http://localhost:3000'
    }
  },
  computed: {
    image: function() {
        if(this.mock) return `${this.baseUrl}/build/test_images/${this.mock}.png`;
        return 'https://tamarack-prismic.imgix.net/plotly/89baddfcf14ab9543598ae83b84ae6db0d6e1c2f_00--58_105x.jpg?w=800&sat=0'
        // return 'https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90'
    },
    baseline: function() {
        if(this.mock) return `${this.baseUrl}/test/image/baselines/${this.mock}.png`;
        return 'https://tamarack-prismic.imgix.net/plotly/89baddfcf14ab9543598ae83b84ae6db0d6e1c2f_00--58_105x.jpg?w=800&sat=-100'
        // return 'https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90';
    },
    json_url: function() {
        if(this.mock) return `${this.baseUrl}/test/image/mocks/${this.mock}.json`;
    }
  },
  methods: {
    selectMock: function(name) {
        this.$refs.fuse.value = name;
        this.mock = name;
        this.fetchMock();
    },
    fetchMock: function() {
        console.log(`Fetching ${this.json_url}`)
        axios
            .get(this.json_url)
            .then(response => (this.mockPayload = response.data))
            .then(mockData => Plotly.newPlot('graph', mockData))
            .catch(error => (this.mockPayload = null, console.log(error)))
    },
    async fetchAllMocks() {
        var handler = new htmlparser.DefaultHandler(function (error, dom) {
            if (error) console.log(error)
        })
        var parser = new htmlparser.Parser(handler);

        var obj = this;
        axios
            .get(`${this.baseUrl}/test/image/mocks/`)
            .then(function(response) {
                parser.parseComplete(response.data);

                var children = handler.dom[2].children[3].children[3].children;

                var mocks = children
                .filter((child,i) => (i % 2 === 0))
                .map(child => child.children[3].children[0].attribs.href.split('/').splice(-1)[0].replace('.json',''))

                obj.AllMocks = mocks;
            })
    }
  },
  created () {
    this.fetchAllMocks();

    this.$on('results', results => {
      this.results = results
    })
  },
  components: {
    Comparify, Opacity, JsonTree
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
    width: 50%;
    margin: 0 auto;
    position: relative;
    display: inline-block;
}

input {
    width:100%;
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
#graph {
    margin: 0 auto;
}
.js-plotly-plot div.svg-container {
    margin: 0 auto;
}

ul.autocomplete {
    width: 100%;
    margin:0; padding:0;
    list-style-type: none;

    z-index:100;
    background: rgba(255,255,255,0.85);
}

ul.autocomplete li {
    font-size: 20px;
    width:100%;
    border-radius: 10px;
    padding:5px;
    box-sizing: border-box;
}

ul.autocomplete li:hover {
    color: white;
    background: #118DFF;
}
</style>
