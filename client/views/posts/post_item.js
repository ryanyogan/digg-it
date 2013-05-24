Template.postItem.helpers({
  ownPost: function() {
    return this.userId == Meteor.userId();
  },

  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },

  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvoteable';
    } else {
      return 'disabled';
    }
  }
});

Template.postItem.events({
  'click .upvoteable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  }
});

Template.postItem.rendered = function() {
  // animate post from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var postHeight = 80;
  var newPosition = rank * postHeight;

  // if element has currentPosition
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  } else {
    $this.addClass("invisible");
  }

  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    $this.css("top", "0px").removeClass("invisible");
  });
};