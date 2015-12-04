$.UsersSearch = function (el){
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find(".users");
  this.$input.on("input", this.handleInput.bind(this));
  this.users = [];
};

$.UsersSearch.prototype.handleInput = function(ev){
  var query = $(ev.currentTarget).val();
  $.ajax({
    url: "/users/search",
    type: "GET",
    dataType: "json",
    data: {"query" : query},
    success: function (data) {
      this.render(data);
    }.bind(this)
  });
};

$.UsersSearch.prototype.render = function (data) {
  this.$ul.empty();
  data.forEach(function(el){
    var id = el.id;
    var username = el.username;
    var $li = $("<li></li>");
    var $button = $("<button class='follow-toggle'></button>");
    var options = {userId: id, followState: el.followed ? "followed" : "unfollowed" };
    $button.followToggle(options);
    $li.append("<a href=/users/" + id + ">" + username + "</a>");
    this.$ul.append($li).append($button);
  }.bind(this));
};

$.fn.usersSearch= function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("div.users-search").usersSearch();
});
