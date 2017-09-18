var app = new Vue({
  el: '#app',
  created: function () {
    var vm = this
    $.ajax({
      url: '/api/issues',
      success: function (res) {
        vm.issues = res
      }
    })
  },
  data: function () {
    return {
      issues: []
    }
  }
})
