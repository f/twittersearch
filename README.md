# Özgür Web Günleri 2012 - Workshop

Özgür Web Günleri 2012'de yapılacak olan etkinlikteki geliştirmeleri içerir. Etkinlik gününden önce
veya etkinlik günü bu repoyu bilgisayarınıza aktarmanız gerekir.

# Gereksinimler
 * git
 * npm (Node Package Manager) jQuery reposunu build etmek için.

## Gereksinimlerin Kurulumu
```
sudo apt-get install git npm
```

# Geliştirme Ortamı Hazırlamak

Geliştirme ortamı hazırlarken **virtualenv** ve **virtualenvwrapper** kullanmanız tercih edilir.

```
easy_install virtualenv
```

## Geliştirme Ortamının Kurulumu

**Eğer VirtualEnv yüklemeyi tercih etmiyorsanız bu adımı atlayabilirsiniz.**

VirtualEnv kurulu ise:
```
virtualenv twittersearch
cd twittersearch
source bin/activate
```

VirtualEnv ve VirtualEnvWrapper kurulu ise:
```
mkvirtualenv twittersearch
workon twittersearch
cdvirtualenv
```
### Dosyaların Aktarılması

```
git clone https://github.com/fkadeveloper/twittersearch.git
cd twittersearch
git submodule update --init --recursive
cd lib/jquery && npm install && grunt && cd -
```

## Geliştirme Ortamının Çalıştırılması

### Browser Üzerinden

Uygulama dinamik bir server ortamı gerektirmediğinden `file:` protokolü ile browser'da açmak üzere de çalıştırılabilir.

Chromium için:
```
chromium-browser index.html
```

Chrome için:
```
google-chrome index.html
```

Firefox için:
```
firefox index.html
```

### Python SimpleHTTPServer

Bir başka yöntem ise Python'un `SimpleHTTPServer` modülü.

Projenin root klasöründe.
```
python -m SimpleHTTPServer
```
komutu ile server başlatılıp çalıştırılabilir.

[http://localhost:8000](http://localhost:8000)

adresinden uygulamaya erişebilirsiniz.

## Gerekliliklerin Yüklenmemesi veya Hata Oluşması Durumunda

Gerekliliklerin kurulumu dışında gerçekleşen sorunlar için `index.php` içerisinde `# CDN` başlıklı yorum satırındaki
```html
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="http://underscorejs.org/underscore-min.js"></script>
  <script src="http://backbonejs.org/backbone-min.js"></script>
```
kodlarının yorum kapsayıcılarını kaldırın (uncomment), böylece dosyaları CDN'den çekerek çalışmasını sağlayacaksınız.
