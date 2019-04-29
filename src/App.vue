<template>
<div>
  <loading :show="loading" />
  <header class="main">
    <a href="https://plot.ly"><img class="plotly-logo" src="https://tamarack-prismic.imgix.net/plotly/eb464d43-4ab4-427e-b617-482b62ba6c69_plotly-logo-white.png?w=100&auto=format" /></a>
    <autocomplete @submit="navigate(this.value)" :min-len="0" :wait="10" @item-selected="navigate" @update-items="updateResults" :component-item='AutocompleteItem' :items="results" :input-attrs="{placeholder: 'search mocks'}"></autocomplete>

    <a alt="Download JSON" target="_blank" :href="json_url">
      <font-awesome-layers class="fa-2x">
        <font-awesome-icon icon="circle" color="white" />
        <font-awesome-icon icon="download" transform="shrink-7" color="#118DFF" />
      </font-awesome-layers>
    </a>

    <a alt="Configuration" href="#config">
      <font-awesome-layers class="fa-2x">
        <font-awesome-icon icon="circle" color="white" />
        <font-awesome-icon icon="cog" transform="shrink-7" color="#118DFF" />
      </font-awesome-layers>
    </a>
  </header>

  <div class="container">
    <header style="color: white;">
      <input alt="Render in browser" @click="plotlyRender" style="width:50px; height:50px;" type="image" src="logo.svg" />
      <input alt="Render on Orca" @click="orcaRender" style="width:50px; height:50pxpx;" type="image" src="https://raw.githubusercontent.com/plotly/orca/master/orca_logo.png" />
      <div>
        <span style="font-size:1.5em">plotly.js @ </span>
        <select v-model="fromGithub">
          <option v-for="version in versions" :key="version" :value="version">{{version}}</option>
        </select>
    </div>
    </header>

    <header v-if="errorMsg" v-bind:style="{backgroundColor: errorColor}">
      <div style="color: white;">
        <font-awesome-layers :alt="errorMsg" class="fa-1x">
          <font-awesome-icon icon="circle" :color="errorColor" />
          <font-awesome-icon :icon="errorMsg ? 'exclamation': 'check'" transform="shrink-7" color="white" />
        </font-awesome-layers>
        <span>{{errorMsg}}</span>
      </div>
    </header>

    <div class="preview">
      <div v-if="plotlyJSdisplay">
        <h3>Comparison slider</h3>
        <comparify value="50">
          <img ref="baseline" slot="first" :src="baseline" />
          <img ref="image" slot="second" :src="image" />

        </comparify>
      </div>

      <div v-if="numDiffPixels > 0">
        <h3>Diff ({{numDiffPixels}} different pixels)</h3>
        <canvas ref="diff" />
      </div>

      <div v-if="false">
        <h3>Opacity slider</h3>
        <opacity value="50">
          <img slot="first" :src="baseline">
          <img slot="second" :src="image">
        </opacity>
      </div>

      <div v-if="mockPayload">
        <h3>plotly.js vs image</h3>
        <comparify value="50">
          <img slot="first" :src="baseline" />
          <div slot="second" id="graph" ref="graph" />
        </comparify>
      </div>

      <div v-if="mockPayload">
        <h3>mock data (<a :href="json_url">JSON</a>)</h3>
        <div>
          <json-tree :data="mockPayload" :level="2"></json-tree>
        </div>
      </div>
    </div>
  </div>
  <footer id="config">
    <h2>Serving local assets from:</h2><input type="text" v-model="baseUrl" />
    <h2>Orca endpoint:</h2> <input type="text" v-model="orcaUrl" />
  </footer>
</div>
</template>

<script>
/*global Plotly*/

import Comparify from './components/Comparify.vue'
import Opacity from './components/Opacity.vue'
import JsonTree from 'vue-json-tree'

import Loading from 'vue-full-loading'

import Autocomplete from 'v-autocomplete'
import AutocompleteItem from './components/AutocompleteItem.vue'
import Fuse from 'fuse.js'

const axios = require('axios');
const imagesLoaded = require('imagesloaded'); // To detect images that fail to load
const pixelmatch = require('pixelmatch'); // To diff canvas images
const htmlparser = require('htmlparser'); // To parse HTML listing from ecstatic

export default {
  data() {
    return {
      title: 'plotly.js image viewer',
      fromGithub: 'local', // Either false of the name of the branch/tag
      versions: ['local', 'master', 'v1.47.2', 'v1.31.0', 'v1.2.0'],
      baseUrl: 'http://localhost:3000',
      orcaUrl: 'http://localhost:9091',

      mock: null,
      mockPayload: null,
      numDiffPixels: 0,

      // Search mocks
      fuse: null,
      fuseOptions: {},
      AutocompleteItem: AutocompleteItem,
      AllMocks: [],
      results: [],

      // Plotly.js config
      mapboxAccessToken: 'pk.eyJ1IjoiZXRwaW5hcmQiLCJhIjoiY2luMHIzdHE0MGFxNXVubTRxczZ2YmUxaCJ9.hwWZful0U2CQxit4ItNsiQ',

      // App state
      errorMsg: false,
      loading: false,
      plotlyJSdisplay: true
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.params.id !== 'config') this.fetchMock(to.params.id);
    next();
  },
  computed: {
    rawGithubBaseUrl() {
      return "https://raw.githubusercontent.com/plotly/plotly.js/" + this.fromGithub;
    },
    image: function() {
      if (this.mock) return `${this.baseUrl}/build/test_images/${this.mock}.png`;
      return 'overlay.jpg'
      // return 'https://images.unsplash.com/photo-1525936607120-6a787fb05d6a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3cb09a29812d04718a5855dc61442612&auto=format&fit=crop&w=800&q=90'
    },
    baseline: function() {
      if (this.mock) return `${this.fromGithub !== 'local' ? this.rawGithubBaseUrl : this.baseUrl}/test/image/baselines/${this.mock}.png`;
      return 'baseline.jpg'
      // return 'https://images.unsplash.com/photo-1510149053388-87292573d661?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=18d7ef1ac6ffcd0a644aaa1d330278c6&auto=format&fit=crop&w=800&q=90';
    },
    json_url: function() {
      if (this.mock) return `${this.fromGithub !== 'local' ? this.rawGithubBaseUrl : this.baseUrl}/test/image/mocks/${this.mock}.json`;
    },
    errorColor: function() {
      return this.errorMsg ? 'red' : 'green';
    }
  },
  methods: {
    initFuse(mocks) {
      this.fuse = new Fuse(mocks, this.fuseOptions);
    },
    updateResults(text) {
      this.results = this.fuse.search(text).map(i => this.AllMocks[i]);
    },
    navigate(item) {
      this.$router.replace({
        params: {
          id: item
        }
      });
    },
    fetchMock: async function(item) {
        if (!item) return;
        this.errorMsg = false;
        this.mockPayload = null;

        var obj = this;
        obj.loading = true;

        var imgLoad = imagesLoaded(obj.$refs.image);
        var baselineImgLoad = imagesLoaded(obj.$refs.baseline);
        imgLoad.on('fail', function() {
          obj.errorMsg = `Cannot load build image ${obj.$refs.image.src}`;
          obj.$refs.image.src = 'favicon.ico';

        })

        baselineImgLoad.on('fail', function() {
          obj.errorMsg = `Cannot load baseline image ${obj.$refs.baseline.src}`;
          obj.$refs.baseline.src = 'favicon.ico';
          obj.loading = false;
        })

        baselineImgLoad.on('done', function() {
          // successfully loaded baseline image
          var width = obj.$refs.baseline.width;
          var height = obj.$refs.baseline.height;

          if(width < 64) width = 700;
          if(height < 64) height = 400;
          console.log(width, height);
          // TODO: console.log(`Fetching ${obj.json_url}`)
          axios
            .get(obj.json_url)
            .then(response => (obj.mockPayload = response.data))
            .catch(error => (obj.mockPayload = null, obj.loading = false, obj.errorMsg = error))
            .then(function(mockData) {
              if (!mockData) return;
              obj.$refs.graph.style.width = width + 'px';
              obj.$refs.graph.style.height = height + 'px';
              obj.imgDiff()
              obj.plotlyRender();
            })
            .finally(() => obj.loading = false)
        })
        obj.mock = item;
    },
    plotlyRender: function() {
        if (!this.mockPayload) return;
        var payload = JSON.parse(JSON.stringify(this.mockPayload));
        if (!payload.layout) {
          payload.layout = {};
        } else {
          if (payload.layout.width) delete(payload.layout.width);
          if (payload.layout.height) delete(payload.layout.height);
        }
        payload.layout.autosize = true;

        payload.config = {
          mapboxAccessToken: this.mapboxAccessToken
        }

        var obj = this;
        obj.loading = true;
        return Plotly.newPlot('graph', payload)
          .then(function() {
            window.gd = obj.$refs.graph
            setTimeout(() => obj.loading = false, 100);
          })
      },
    orcaRender: function() {
        if (!this.mockPayload) return;
        var payload = JSON.parse(JSON.stringify(this.mockPayload));
        if (!payload.layout) {
          payload.layout = {};
        }
        payload.layout.width = this.$refs.baseline.width;
        payload.layout.height = this.$refs.baseline.height;

        var obj = this;
        obj.loading = true;
        obj.errorMsg = false;
        axios({
            method: 'post',
            url: obj.orcaUrl,
            data: payload,
            responseType: 'arraybuffer'
          })
          .then(response => new Buffer(response.data, 'binary').toString('base64'))
          .then(image => this.$refs.image.src = 'data:image/png;base64,' + image)
          .then(obj.imgDiff)
          .finally(() => obj.loading = false)

        // Test agasint other Orca instance
      },
    imgDiff: function() {
        var width = this.$refs.baseline.width,
          height = this.$refs.baseline.height;
        var ctx1 = this.convertImageToCanvas(this.$refs.baseline).getContext('2d'),
          ctx2 = this.convertImageToCanvas(this.$refs.image).getContext('2d'),
          diffCtx = this.$refs.diff.getContext('2d');

        var img1 = ctx1.getImageData(0, 0, width, height),
          img2 = ctx2.getImageData(0, 0, width, height),
          diff = diffCtx.createImageData(width, height);

        this.$refs.diff.width = width;
        this.$refs.diff.height = height;

        this.numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
          threshold: 0.01
        });

        diffCtx.putImageData(diff, 0, 0);
      },
    // Converts image to canvas; returns new canvas element
    convertImageToCanvas: function(image) {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
      },
    fetAllMocksGithub() {
        var url = 'https://api.github.com/repos/plotly/plotly.js/contents/test/image/mocks';

        var obj = this;
        axios
          .get(url)
          .then(function(response) {

            var mocks = response.data
              .map(child => child.name.split('/').splice(-1)[0].replace('.json', ''))

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
            var handler = new htmlparser.DefaultHandler(function(error) {
              if (error) obj.errorMsg = error;
            })
            var parser = new htmlparser.Parser(handler);

            parser.parseComplete(response.data);

            var children = handler.dom[2].children[3].children[3].children;

            var mocks = children
              .filter((child, i) => (i % 2 === 0))
              .map(child => child.children[3].children[0].attribs.href.split('/').splice(-1)[0].replace('.json', ''))

            return mocks;
          })
          .then(function(mocks) {
            obj.initFuse(mocks);
            obj.AllMocks = mocks;
          })
      }
  },
  created() {
    if (this.fromGithub !== 'local') {
      this.fetAllMocksGithub();
    } else {
      this.fetchAllMocks();
    }
  },
  mounted() {
    [this.$refs.baseline, this.$refs.image].forEach(img => img.crossOrigin = "Anonymous");
    this.fetchMock(this.$route.params.id)
  },
  components: {
    Comparify,
    Opacity,
    JsonTree,
    Autocomplete,
    Loading
  }
}
</script>

<style>
html,
body {
  font-family: 'Dosis', sans-serif;
  margin: 0px;
  padding: 0px;
  background-color: #118DFF;
}



.container {
  background-color: white;
  padding-top: 50px;
  padding-bottom: 50px;
}

.preview {
  text-align: center;
  margin: 0 auto;
  width: 90%;
}

header.main {
  position: fixed;
}
header {
  display: flex;
  padding: 10px;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  background-color: #118DFF;
  box-sizing: border-box;
  width: 100%;
}

header * {
  margin-right: 5px;
}

footer {
  width: 75%;
  margin: 0 auto;
  padding: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;
  color: white;
  font-size: 1.4 rem;
  background-color: #118DFF;
  box-sizing: border-box;
}

footer input {
  text-align: center;
}

footer h2 {
  margin-bottom: 5px;
  font-size: 1.5em;
}

img.plotly-logo {
  height: 100%
}

input,
select {
  padding: 5px;
  font-size: 20px;
  border-radius: 10px;
  border: none;
  border: 1px solid #118DFF;
  outline: 0;
  line-height: 25px;
}

.v-autocomplete {
  position: relative;
  flex-grow: 4;
}

.v-autocomplete-input {
  width: 100%;
}

pre {
  text-align: left;
}

#graph {
  margin: 0 auto;
}

.js-plotly-plot div.svg-container {
  margin: 0 auto;
}

.v-autocomplete-list {
  width: 100%;
  list-style-type: none;

  z-index: 100;
  background: rgba(255, 255, 255, 0.85);

  overflow-y: scroll;
  max-height: 80vh;
  position: absolute;
}

.v-autocomplete-list-item {
  font-size: 20px;
  width: 100%;
  border-radius: 10px;
  padding: 5px;
  box-sizing: border-box;
}

.v-autocomplete-item-active {
  color: white;
  background: #118DFF;
}
</style>
