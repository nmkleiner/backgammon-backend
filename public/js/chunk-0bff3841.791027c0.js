(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0bff3841"],{"0f5a":function(t,e,i){"use strict";var n=i("96ba"),r=i.n(n);r.a},"96ba":function(t,e,i){},c1a5:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"dices-section flex justify-center"},[t.isGameOn?i("div",{staticClass:"two-dices-wrapper flex space-between"},[i("dice",{attrs:{rolling:t.rolling,used:!t.dices.num1&&!!t.dices.num2,num:t.dices.num1ToShow}}),i("dice",{attrs:{rolling:t.rolling,used:!t.dices.num2&&!!t.dices.num1&&t.dices.doubleCount<=1,num:t.dices.num2ToShow}})],1):t._e(),t.isGameOn?t._e():i("dice",{attrs:{rolling:t.rolling,num:t.startDice.dice}})],1)},r=[],s=(i("96cf"),i("1da1")),c=(i("cadf"),i("551c"),i("097d"),i("8055"),function(){return i.e("chunk-39cec500").then(i.bind(null,"4fbe"))}),o=function(){return i.e("chunk-28fbbf5c").then(i.bind(null,"7b6b"))},u={components:{dice:c,soldier:o},sockets:{serverDicesRolling:function(){this.$store.commit("rollDices")},serverDicesUnrolling:function(t){var e=this;setTimeout(function(){e.$store.commit("unrollDices"),e.$store.commit({type:"dicesRes",dices:t})},1e3)},serverDiceUnrolling:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(e){var i,n=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,setTimeout(function(){n.$store.commit("unrollDices")},1e3);case 2:return i=this.userColor,t.next=5,this.$store.dispatch({type:"diceRes",dice:e,userColor:i});case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),serverEndTurn:function(){var t=this;setTimeout(function(){t.$store.commit("endTurn")},1500)}},computed:{dices:function(){return this.$store.getters.dices},duringTurn:function(){return this.$store.getters.duringTurn},userColor:function(){return this.$store.getters.loggedInUserColor},rolling:function(){return this.$store.getters.dicesRolling},isGameOn:function(){return this.$store.getters.isGameOn},startDice:function(){return this.$store.getters.startDice},winner:function(){return this.$store.getters.winner}},watch:{duringTurn:function(t,e){if(!1===t){var i=1;this.$socket.emit("clientEndTurn",i)}},"startDice.white":function(t,e){var i=this;if(this.startDice.black&&this.startDice.white){if(this.startDice.white===this.startDice.black)return this.$store.commit("nullDice"),!1;var n=this.startDice.white>this.startDice.black?"white":"black";this.$store.commit({type:"setCurrTurn",startingColor:n}),setTimeout(function(){i.$store.commit("gameOn")},2e3)}},"startDice.black":function(t,e){var i=this;if(this.startDice.black&&this.startDice.white){if(this.startDice.white===this.startDice.black)return this.$store.commit("nullDice"),!1;var n=this.startDice.white>this.startDice.black?"white":"black";this.$store.commit({type:"setCurrTurn",startingColor:n}),setTimeout(function(){i.$store.commit("gameOn")},2e3)}}}},a=u,l=(i("0f5a"),i("2877")),h=Object(l["a"])(a,n,r,!1,null,"64b64889",null);h.options.__file="dices-section.vue";e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-0bff3841.791027c0.js.map