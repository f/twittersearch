# Özgür Web Günleri 2012 - Backbone.js ile Uygulama Geliştirme Uygulamalı Semineri 

Özgür Web Günleri 2012'de yapılacak olan etkinlikteki geliştirmeleri içerir. Etkinlik gününden önce
veya etkinlik günü bu repoyu bilgisayarınıza aktarmanız gerekir.

## Gereksinimler
 * git
 * npm (Node Package Manager) jQuery reposunu build etmek için.
 * grunt

```
sudo apt-get install git npm
sudo npm install -g grunt
```

## Geliştirme Ortamı Hazırlamak

Geliştirme ortamı hazırlarken **virtualenv** ve **virtualenvwrapper** kullanmanız tercih edilir.

### Geliştirme Ortamının Kurulumu

```
git clone https://github.com/fkadeveloper/twittersearch.git
cd twittersearch
git submodule update --init --recursive
cd lib/jquery && npm install && grunt && cd -
```

### Geliştirme Ortamının Çalıştırılması

Uygulama dinamik bir server ortamı gerektirmediğinden `file:` protokolü ile browser'da açmak üzere de çalıştırılabilir. Bunun için
`index.html` dosyasını browseriniz ile açınız.

#### Not:
İsterseniz `python -m SimpleHTTPServer` ile bir sunucu başlatıp da çalıştırabilirsiniz.

### Gerekliliklerin Yüklenmemesi veya Hata Oluşması Durumunda

Gerekliliklerin kurulumu dışında gerçekleşen sorunlar için `index.html` içerisinde `# CDN` başlıklı yorum satırındaki
```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="http://underscorejs.org/underscore-min.js"></script>
<script src="http://backbonejs.org/backbone-min.js"></script>
```
kodlarının yorum kapsayıcılarını kaldırın (uncomment), böylece dosyaları CDN'den çekerek çalışmasını sağlayacaksınız.

Veya `index.cdn.html` dosyasını açarak da geliştirmeye devam edebilirsiniz.

## Windows Kullanıcıları için Geliştirme Ortamı Kurulumu

Windows kullanıcıları [projeyi zip olarak indirip](https://github.com/fkadeveloper/twittersearch/zipball/master) `index.cdn.html`
dosyasını browser'da açarak (Lütfen Internet Explorer kullanmayın!) geliştirme sürecine katılabilirler. 
[Projeyi ZIP olarak indirin.](https://github.com/fkadeveloper/twittersearch/zipball/master)

## Atölyeye Hazırlık

Ekranınızda **Özgür Web Günleri 2012 - Backbone ile Uygulama Geliştirme - Fatih Kadir Akın** yazısını görüyorsanız, geliştirmeye
hazırsınız demektir. Kolaylıklar! :)

## Sunum

[https://docs.google.com/presentation/pub?id=12TtjK6p1dHdhdLcgNpOCbMh31KG90zX6y1Eh2MoTUxs&start=false&loop=false&delayms=3000](https://docs.google.com/presentation/pub?id=12TtjK6p1dHdhdLcgNpOCbMh31KG90zX6y1Eh2MoTUxs&start=false&loop=false&delayms=3000)