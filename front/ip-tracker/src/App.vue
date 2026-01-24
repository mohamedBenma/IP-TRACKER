<template>
  <div class="page">
    <header class="header">
      <h1>IP Address Tracker</h1>

      <div class="search_bar">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          v-model="ip"
          v-on:keyup.enter="getOwnIp()"
        />
        <img src="./assets/icon-arrow.svg" alt="" @click="handleClick" />
      </div>

      <IpData :ipData="ipData" class="info-card" />
    </header>

    <main class="content">
      <Map v-if="lat !== null && lang !== null" :lat="lat" :lang="lang" />
    </main>
  </div>
</template>

<script>
import IpData from './components/IpData.vue'
import Map from './components/Map.vue'

export default {
  name: 'App',
  components: { IpData, Map },

  data() {
    return {
      ip: '',
      ipData: null,
      lat: null,
      lang: null,
    }
  },

  methods: {
    handleClick() {
      this.getOwnIp()
    },

    async getOwnIp() {
      try {
        const url = this.ip ? `https://ipwho.is/${this.ip}` : `https://ipwho.is/`
        const res = await fetch(url)

        if (!res.ok) throw new Error('Erreur API')
        const data = await res.json()

        if (!data.success) return console.error(data.message)

        this.ipData = { ...data }
        this.lat = data.latitude
        this.lang = data.longitude
      } catch (e) {
        console.error('IP fetch error', e)
      }
    },
  },

  created() {
    this.getOwnIp()
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  height: 100%;
}
h1 {
  font-size: 24px;
  font-weight: bold;
  color: white;
}
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.header {
  background-image: url('./assets/pattern-bg-desktop.png');
  background-size: cover;
  height: 250px;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  padding-top: 25px;
}

.search_bar {
  margin-top: 20px;
  display: flex;
}

input {
  width: 400px;
  height: 40px;
  border-radius: 10px 0 0 10px;
  border: none;
  padding-left: 10px;
}

img {
  background: black;
  padding: 10px;
  border-radius: 0 10px 10px 0;
  cursor: pointer;
}

.content {
  flex: 1;
  display: flex;
}
@media (max-width: 768px) {
  input {
    width: 58vw;
  }
  h1 {
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
}
</style>
