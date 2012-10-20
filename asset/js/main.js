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

  // # 1. Değişkenleri oluşturuyoruz.
  // Tweet Modelini belirliyoruz. Her bir tweet bir tweet modelidir.
  var Tweet,
  
      // Tweet modellerinden oluşan bir tweet collection'u olmalı.
      Tweets,

      // Her bir tweet modelinin karşılığı olan view olmalı.
      TweetView,

      // Tweet modellerinden oluşan koleksiyonun kapsayıcısı olan view, aynı zamanda
      // TweetView'in parenti.
      TweetsView,

      // Arama bölümünün view'i. Burada arama/sonuç kontrollerini yapıyoruz.
      SearchView,

      // Temel Router, search/{query} gibi bir url'i sonuç olarak görebilmeli.
      Router;

  // # 2. Modeli oluşturuyoruz.
  Tweet = Backbone.Model.extend();

  // # 3. Koleksiyonu oluşturuyoruz.
  Tweets = Backbone.Collection.extend({
    // # 4. Koleksiyon hangi modellerden oluşacak?
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

  // # 5. Her bir tweet'in view'ini oluşturuyoruz.
  TweetView = Backbone.View.extend({
    // # 6. Template kısmını ayırıp, html'ini alıyoruz, ve _.template fonksiyonuna sokuyoruz.
    template: _.template($('script#tweet-template').html()),
    text: function (text) {
      return text
        .replace(/(https?\:\/\/([\w\.\-\/]+))/gi, '<a target="_blank" href="$1">$2</a>')
        .replace(/@([\w\_]+)/gi, '<a href="#search/@$1">@$1</a>')
        .replace(/\s#([\w\_]+)/gi, ' <a href="#search/%23$1">#$1</a>')
    },
    // # 7. Standart render fonksiyonu. setElement ile ayarlanıyor.
    render: function () {
      this.setElement(this.template(this.model.toJSON()));
      return this;
    }
  });

  // # 8. Tweetlerin kapsayıcı elementini belirliyoruz.
  TweetsView = Backbone.View.extend({
    // # 9. Element belirleniyor.
    el: '#main section',
    initialize: function () {
      this.$el.html('');

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

  // # 10. Arama kısmının elementini belirliyoruz.
  SearchView = Backbone.View.extend({
    // # 11. Elementi bağlıyoruz.
    el: '#main header form',
    events: {
      'submit': 'search'
    },
    initialize: function () {
      this.input = this.$('input');
    },
    search: function (e) {
      var query = this.input.val();
      this.options.router.navigate('search/' + encodeURIComponent(query), {trigger: true}); 
      e.preventDefault();
    }
  });

  MoreTweetsView = Backbone.View.extend({
    el: '#main footer button',
    events: {
      'click': 'loadMore'
    },
    loadMore: function () {
      this.options.tweets.fetch({data: this.options.tweets.nextPage.replace(/^\?/,'')});
    }
  });

  Router = Backbone.Router.extend({
    routes: {
      'search/:query': 'search'
    },
    initialize: function () {
      this.searchView = new SearchView({router: this});
    },
    search: function (query) {
      this.tweetsView = new TweetsView({query: query});
      this.searchView.input.val(query);
      this.moreTweetsView = new MoreTweetsView({tweets: this.tweetsView.tweets});
    }
  });

  new Router();
  Backbone.history.start();

})(jQuery, _, Backbone);

