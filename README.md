# Özgür Web Günleri 2012 - Workshop

Özgür Web Günleri 2012'de yapılacak olan etkinlikteki geliştirmeleri içerir. Etkinlik gününden önce
veya etkinlik günü bu repoyu bilgisayarınıza aktarmanız gerekir.

## Gereksinimler
 * git
 * npm (Node Package Manager) jQuery reposunu build etmek için.

```
sudo apt-get install git npm
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

Uygulama dinamik bir server ortamı gerektirmediğinden `file:` protokolü ile browser'da açmak üzere de çalıştırılabilir.

### Gerekliliklerin Yüklenmemesi veya Hata Oluşması Durumunda

Gerekliliklerin kurulumu dışında gerçekleşen sorunlar için `index.html` içerisinde `# CDN` başlıklı yorum satırındaki
```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="http://underscorejs.org/underscore-min.js"></script>
<script src="http://backbonejs.org/backbone-min.js"></script>
```
kodlarının yorum kapsayıcılarını kaldırın (uncomment), böylece dosyaları CDN'den çekerek çalışmasını sağlayacaksınız.
