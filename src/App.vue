<template>
  <div class="container">
      <header>
        <a href="https://plot.ly"><img class="plotly-logo" src="https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format"/></a>
        <select>
            <option v-for="version in versions" :key="version" :value="version">{{version}}</option>
        </select>
      </header>

      <div class="controls">
        <autocomplete @submit="fetchMock(this.value)" :min-len="2" :wait="10" @item-selected="fetchMock" @update-items="updateResults" :component-item='AutocompleteItem' :items="results" :input-attrs="{placeholder: 'search mocks'}"></autocomplete>
      </div>


    <h2 v-if="mock">{{mock}}</h2>

    <div v-if="true">
        <h3>Comparison slider</h3>
        <comparify value="50">
          <img slot="first" :src="baseline"/>
          <img slot="second" :src="image"/>
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
        <div ref="graph" id="graph"/>
    </div>

    <div v-if="false">
        <h3>mock data (<a :href="json_url">JSON</a>)</h3>
        <div>
            <json-tree :data="mockPayload" :level="2"></json-tree>
        </div>
    </div>


  <footer>
      Serving assets from: <input type="text" v-model="baseUrl"/>
  </footer>
  </div>
</template>

<script>
import Comparify from './components/Comparify.vue'
import Opacity from './components/Opacity.vue'
import JsonTree from 'vue-json-tree'

import Autocomplete from 'v-autocomplete'
import AutocompleteItem from './components/AutocompleteItem.vue'
import Fuse from 'fuse.js'

const axios = require('axios');
const htmlparser = require('htmlparser')

export default {
  data () {
    return {
      title: 'plotly.js image viewer',
      fromGithub: 'master',
      baseUrl: 'http://localhost:3000',
      mock: null,
      mockPayload: null,

      fuse: null,
      fuseOptions: {},
      displaySuggestions: true,
      AutocompleteItem: AutocompleteItem,
      AllMocks: [],
      results: [],

      versions: ['master', '1.41.2', '1.31.0', '1.2.0']
    }
  },
  computed: {
    rawGithubBaseUrl () {
        return "https://raw.githubusercontent.com/plotly/plotly.js/" + this.fromGithub;
    },
    image: function() {
        if(this.mock) return `${this.baseUrl}/build/test_images/${this.mock}.png`;
        return 'https://tamarack-prismic.imgix.net/plotly/89baddfcf14ab9543598ae83b84ae6db0d6e1c2f_00--58_105x.jpg?w=800&sat=0'
        // return 'https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90'
    },
    baseline: function() {
        if(this.mock) return `${this.fromGithub ? this.rawGithubBaseUrl : this.baseUrl}/test/image/baselines/${this.mock}.png`;
        return 'https://tamarack-prismic.imgix.net/plotly/89baddfcf14ab9543598ae83b84ae6db0d6e1c2f_00--58_105x.jpg?w=800&sat=-100'
        // return 'https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90';
    },
    json_url: function() {
        if(this.mock) return `${this.fromGithub ? this.rawGithubBaseUrl : this.baseUrl}/test/image/mocks/${this.mock}.json`;
    }
  },
  methods: {
    initFuse (mocks) {
        this.fuse = new Fuse(mocks,this.fuseOptions);
    },
    updateResults (text) {
        this.results = this.fuse.search(text).map(i => this.AllMocks[i]);
    },
    fetchMock: async function(item) {
        var obj = this;
        obj.mock = item;
        if (!item) return;
        console.log(`Fetching ${this.json_url}`)
        axios
            .get(this.json_url)
            .then(response => (obj.mockPayload = response.data))
            .catch(error => (obj.mockPayload = null, console.log(error)))
            .then(function(mockData) {
                var layout = mockData.layout;
                if('width' in layout && 'height' in layout) {
                    if(layout.width < 1000) {
                        obj.$refs.graph.style.width = layout.width + 'px';
                    } else {
                        obj.$refs.graph.style.width = '700px';
                    }

                    if(layout.height < 600) {
                        obj.$refs.graph.style.height = layout.height + 'px';
                    } else {
                        obj.$refs.graph.style.height = '500px';
                    }
                } else {
                    obj.$refs.graph.style.width = '700px';
                    obj.$refs.graph.style.height = '500px';
                }
                obj.plotlyRender();
            })

    },
    plotlyRender: function() {
        Plotly.newPlot('graph', this.mockPayload)
    },
    fetAllMocksGithub() {
        var url = 'https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks';

        var obj = this;
        axios
            .get(url)
            .then(function(response) {

                var mocks = response.data
                .map(child => child.name.split('/').splice(-1)[0].replace('.json',''))

                return mocks;
            })
            .then(function(mocks) {
                obj.initFuse(mocks);
                obj.AllMocks = mocks;
            })
    },
    async fetchAllMocks() {
        var url = `${this.baseUrl}/test/image/mocks/`;

        var obj = this;
        axios
            .get(url)
            .then(function(response) {
                var handler = new htmlparser.DefaultHandler(function (error, dom) {
                    if (error) console.log(error)
                })
                var parser = new htmlparser.Parser(handler);

                parser.parseComplete(response.data);

                var children = handler.dom[2].children[3].children[3].children;

                var mocks = children
                .filter((child,i) => (i % 2 === 0))
                .map(child => child.children[3].children[0].attribs.href.split('/').splice(-1)[0].replace('.json',''))

                return mocks;
            })
            .then(function(mocks) {
                obj.initFuse(mocks);
                obj.AllMocks = mocks;
            })
    }
  },
  created () {
    if (this.fromGithub) {
        this.fetAllMocksGithub();
    } else {
        this.fetchAllMocks();
    }
  },
  components: {
    Comparify, Opacity, JsonTree, Autocomplete
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

select {
    height:39px;
    border-radius: 10px;
    border: none;
    border: 1px solid #118DFF;
    outline: 0;
    padding: 5px;
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

ul.autocomplete, .v-autocomplete-list {
    width: 100%;
    margin:0; padding:0;
    list-style-type: none;

    z-index:100;
    background: rgba(255,255,255,0.85);

    overflow-y: scroll;
    max-height:80vh;
    position: absolute;
}

ul.autocomplete li, .v-autocomplete-list-item {
    font-size: 20px;
    width:100%;
    border-radius: 10px;
    padding:5px;
    box-sizing: border-box;
}

ul.autocomplete li:hover, .v-autocomplete-item-active {
    color: white;
    background: #118DFF;
}

footer {
    border-top: #eee 1px solid;
    margin-top:50px;
    padding-top:50px;
    color: #a2b1c6;
    font-size: 1.4 rem;
}
</style>
