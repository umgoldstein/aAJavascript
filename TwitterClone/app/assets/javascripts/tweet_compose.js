$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$el.on("submit", this.submit.bind(this));
};

$.TweetCompose.prototype.submit = function (evt) {
  evt.preventDefault();
  var content = this.$el.find(".tweet-content").val();
  var mention = this.$el.find(".tweet-mention").val();
  this.$el.find(":input").prop("disabled", true);
  $.ajax({
    url: "/tweets",
    type: "POST",
    dataType: "json",
    data: { "tweet[content]": content, "tweet[mentioned_user_ids]": [mention]},
    success: function (data) {
      this.handleSuccess(data);
    }.bind(this)
  });
};
$.TweetCompose.prototype.clearInput = function(){
    this.$el.find(".tweet-content, .tweet-mention").prop("value", null);
};

$.TweetCompose.prototype.handleSuccess = function(data){
  this.clearInput();
  this.$el.find(":input").prop("disabled", false);
  var $ul = $(this.$el.data("tweets-ul"));
  var html = "<li>"+ data.content + " -- " + "<a href=/users/" + data.user_id + ">" + data.user.username + "</a> -- " + data.created_at + "</li>";
  $ul.prepend(html);
};

$.fn.tweetCompose= function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};

$(function () {
  $("form.tweet-compose").tweetCompose();
});
