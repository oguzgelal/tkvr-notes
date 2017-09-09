<template>
  <div id="app" style="text-align: center;">

    <div v-if="!signedIn">
      <a href="#" v-on:click="signIn">Sign In</a>
    </div>

    <div v-if="signedIn">
      <div>{{ profile.getId() }}</div>
      <div>{{ profile.getName() }}</div>
      <div><img v-bind:src="profile.getImageUrl()"></div>
      <div>{{ profile.getEmail() }}</div>
      <div>
        <a href="#" v-on:click="signOut">Sign out</a>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import api from './api'

export default {
  name: 'app',
  data: () => ({
    signedIn: false,
    profile: null
  }),
  mounted: function() {
    var self = this;
    gapi.load('auth2', {
      callback: function() {
        gapi.auth2.init().then(function() {
          self.signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
          self.profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
        });
      }
    });
  },
  methods: {
    signIn() {
      var self = this;
      gapi.auth2.getAuthInstance().signIn().then(function(googleUser) {
        var token = googleUser.getAuthResponse().id_token;
        api.login(token)
          .then(res => {
            console.log('verified', res);
            self.signedIn = true;
            self.profile = googleUser.getBasicProfile();
          }).catch(err => {
            alert('an error occured');
            self.signOut();
          })
      });
    },
    signOut() {
      this.signedIn = false;
      this.profile = null;
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log('User signed out.');
      });
    }
  },
  watch: {
    signedIn: function(n, o) {
      console.log('signed in changed');
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.g-signin2 .abcRioButton {
  margin: auto;
}
</style>
