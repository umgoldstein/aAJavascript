$.FollowToggle = function (el, options) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || options.userId;
  this.followState = this.$el.data("initial-follow-state") || options.followState;
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
};

$.FollowToggle.prototype.render = function () {
  this.$el.prop("disabled", false);
  if (this.followState === "followed") {
    this.$el.empty();
    this.$el.append("Unfollow!");
  } else if (this.followState === "unfollowed") {
    this.$el.empty();
    this.$el.append("Follow!");
  } else if (this.followState === "following" || this.followState === "unfollowing") {
    this.$el.prop("disabled", true);
  }
};

$.FollowToggle.prototype.handleClick = function (ev) {
  ev.preventDefault();
  var verb;
  var state;
  if(this.followState === "followed"){
    verb = "DELETE";
    state = "unfollowed";
    this.followState = "unfollowing";
  } else {
    verb = "POST";
    state = "followed";
    this.followState = "following";
  }
  this.render();
  var url = "/users/" + this.userId + "/follow";

  $.ajax({
    method: verb,
    url: url,
    dataType: "json",
    success: function () {
      this.followState = state;
      this.render();
    }.bind(this)
  });
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
