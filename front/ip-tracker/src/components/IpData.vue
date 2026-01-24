<template>
  <div class="ip-datas">
    <div class="box box-first">
      <span>IP ADDRESS</span>
      <h1>{{ ipData?.ip }}</h1>
    </div>
    <div class="box">
      <span>LOCATION</span>
      <h1>
        {{ ipData?.city }}, {{ ipData?.region_code }},
        {{ ipData?.postal }}
      </h1>
    </div>
    <div class="box">
      <span>TIMEZONE</span>
      <h1>UTC{{ ipData?.timezone?.utc }}</h1>
    </div>
    <div class="box">
      <span>ISP</span>
      <h1>{{ ipData?.connection?.isp }}</h1>
    </div>
  </div>
</template>

<style scoped>
.ip-datas {
  position: relative;
  top: 20%;
  z-index: 1000;
  background: white;
  padding: 25px 40px;
  width: 80%;
  max-width: 900px;

  margin: 0 auto;
  border-radius: 15px;

  display: flex;
  justify-content: space-between;
  text-align: left;

  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
.box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  padding: 0 20px;
  border-left: 1px solid #ddd;
}
.box-first {
  border-left: none;
  padding-left: 0;
}
.box h1 {
  font-size: 16px;
  font-weight: bold;
  color: black;
}
span {
  font-size: 10px;
  color: rgb(168, 168, 168);
}

@media (max-width: 768px) {
  .box h1 {
    font-size: 13px;
    color: black;
  }
  .ip-datas {
    width: 61vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 0px;
  }
  .box-first {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    padding: 0 20px;
    border-left: 1px solid #ddd;
  }
  .box {
    border-left: none;
    padding: 4px 2px;
    gap: 1px;
  }
}
</style>

<script>
export default {
  props: {
    ipData: {
      type: Object,
      required: false,
    },
  },
  methods: {},
  mounted() {
    console.log('ipdataMAP: ', this.ipData)
  },
  created() {
    console.log(this.ipData)
  },
  updated() {
    console.log('ipData mis à jour:', this.ipData)
  },
}
</script>
