/**
 * Özgür Web Günleri 2012 - Backbone ile Uygulama Geliştirme Uygulamalı Semineri
 * 
 * main.js - Ana uygulama modülü.
 *
 * Bu dosyada ana uygulama geliştirilecek. Backbone Twitter Client'a bağlanarak arama
 * yapacak. Kullanıcıdan gelen hashtag ile o hashtag'ın geçtiği verileri listeleyecek.
 *
 *
 * # Gereksinimler:
 *
 * ## API Doc
 *
 * GET http://search.twitter.com/search.json
 *  ?q=<query>
 *  &rpp=<tweets per page>
 *  &include_entities=true
 *  &callback=<jsonp callback>
 *  &result_type=recent
 *  
 */
(function ($, _, Backbone) {

  var Tweet, // Tweet Model
      Tweets, // Tweet Collection
      TweetView, // Tweet Model View
      TweetsView, // Tweet Collection View
      SearchView, // Search Tweet View
      Router; // Main Router

  Tweet = Backbone.Model.extend({});

  Tweets = Backbone.Collection.extend({
    model: Tweet,
    sync: function (method, model, options) {
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    parse: function (data) {
      if (data.error) {
        alert(data.error);
        return;
      }
      this.nextPage = data.next_page;
      return data.results;
    },
    url: 'http://search.twitter.com/search.json'
  });

  TweetView = Backbone.View.extend({
    template: _.template($('script#tweet-template').html()),
    text: function (text) {
      return text
        .replace(/(https?\:\/\/([\w\.\-\/]+))/gi, '<a target="_blank" href="$1">$2</a>')
        .replace(/@([\w\_]+)/gi, '<a href="#search/@$1">@$1</a>')
        .replace(/\s#([\w\_]+)/gi, ' <a href="#search/%23$1">#$1</a>')
    },
    render: function () {
      this.setElement(this.template(this.model.toJSON()));
      return this;
    }
  });

  TweetsView = Backbone.View.extend({
    el: '#main section',
    initialize: function () {
      this.tweets = new Tweets();
      this.tweets.on('add', this.addTweet, this);
      this.tweets.on('reset', this.loadTweets, this);

      this.tweets.fetch({data: {q: this.options.query}});
    },
    addTweet: function (tweet) {
      var tweetView = new TweetView({model: tweet});
      this.$el.append(tweetView.render().el);
    },
    loadTweets: function () {
      this.tweets.each(this.addTweet, this);
    }
  });

  SearchView = Backbone.View.extend({
    el: '#main header form',
    events: {
      'submit': 'search'
    },
    initialize: function () {
      this.input = this.$('input');
      this.router = this.options.router;

      if (this.options.query) {
        var search = new TweetsView({query: this.options.query});
        this.input.val(this.options.query);
      }
    },
    search: function (e) {
      var query = this.input.val();
      this.router.navigate('search/' + escape(query), true); 
      e.preventDefault();
    }
  });

  Router = Backbone.Router.extend({
    routes: {
      'search/:query': 'search'
    },
    search: function (query) {
      new SearchView({query: query, router: this});
    }
  });

  new Router();
  Backbone.history.start();

})(jQuery, _, Backbone);

