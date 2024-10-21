<template>
  <div class="main-body">
    <div class="q-page-container">
      <div class="h1-title" v-if="winnersList.length>0">Winners</div>
      <div class="card-container">
        <div v-for="(val, i) in winnersList" v-bind:key="val.telegramId" style="z-index: 99;">
          <div :class="'card tracking-in-expand card'+[`${i}`]" >
            <p>{{i+1}}</p>
            <div class="h3-title">{{ val.name }}</div>
            <p>{{ val.dateTime }}</p>
          </div>
        </div>
      </div>
      <div class="card-container">
        <div class="card" v-for="val in losersList" v-bind:key="val.telegramId">
          <div class="h3-title">{{ val.name }}</div>
          <p>{{ val.dateTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pusher from 'pusher-js';
import { api } from 'boot/axios';

export default {
  name: 'Round',
  data: () => {
    return {
      winnersList: [],
      losersList: [],
    };
  },
  methods: {
    getWinners() {
      api.get('/api/getSecondRoundWinners').then((res) => {
        this.winnersList = res.data;
      });
    },
    in_a() {
      setInterval(this.getWinners, 5000);
    },
  },
  created() {
    // setTimeout(() => {
    //   console.log('Hello My Infinite Loop Execution');
    //   // Again
    //   this.getWinners();
    //
    //   // Every 3 sec
    // }, 5000);
    this.in_a();
    // Pusher.logToConsole = true;
    //
    // const pusher = new Pusher('9eed0f9c76dc0800dc4d', {
    //   cluster: 'ap1',
    // });
    // const channel = pusher.subscribe('notification-2');
    // channel.bind('App\\Events\\RoundAnswerEvent', (data) => {
    //   this.getWinners();
    // });
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');

.main-body {
  min-height: 100vh !important;
  background: linear-gradient(to bottom, #e1fcff, #d3bef9) !important;
  display: grid !important;
  -webkit-font-smoothing: antialiased !important;
  color: #2b1651 !important;
}
.card0{
  background: #b8ffc0 !important;
}
.card1{
  background: #cbffd2 !important;
}
.card2{
  background: #c9eece !important;
}
.h1-title {
  font-family: 'Chango', cursive;
  text-align: center;
  font-size: 56px;
  margin-top: 64px;
  text-shadow: 1px 1px 1px #fff;
  z-index: 10 !important;
}

.main-body::after {
  content: "" !important;
  position: absolute !important;
  width: 500px !important;
  height: 500px !important;
  border-radius: 50% !important;
  background: linear-gradient(to bottom, #d3bef9 120px, transparent 120px, transparent 125px,
  #d3bef9 125px, #d3bef9 220px, transparent 220px, transparent 230px,
  #d3bef9 230px, #d3bef9 300px, transparent 300px, transparent 315px,
  #d3bef9 315px, #d3bef9 400px, transparent 400px, transparent 420px,
  #d3bef9 420px, #d3bef9 460px, transparent 500px) !important;
  left: calc(50% - 250px) !important;
  top: calc(50% - 250px)!important;
  z-index: 0!important;
}

.tracking-in-expand {
  -webkit-animation: tracking-in-expand .7s cubic-bezier(.215, .61, .355, 1.000) both;
  animation: tracking-in-expand .7s cubic-bezier(.215, .61, .355, 1.000) both
}

@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -.5em;
    opacity: 0
  }
  40% {
    opacity: .6
  }
  100% {
    opacity: 1
  }
}

@keyframes tracking-in-expand {
  0% {
    letter-spacing: -.5em;
    opacity: 0
  }
  40% {
    opacity: .6
  }
  100% {
    opacity: 1
  }
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in-out;
  opacity: 0.8;
  z-index: 2 !important;
}

.h3-title {
  font-size: 24px;
  margin-top: 8px;
  font-family: 'Chango', cursive;
}

.card-container {
  display: grid;
  gap: 32px;
  padding: 56px;
  grid-template-columns: repeat(3, 1fr);
}

</style>
