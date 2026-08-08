# standupcomedy.github.io

## 使用時

ポート番号（:8080）はローカル環境に合わせて修正する
echo www/index-php.php | entr -s 'curl http://localhost:8080/index-php.php > www/index.html';

事前に、entr のインストールが必要
brew install entr

filemtimeのために php を使って、index.htmlを書き出す
echo www/index-php.php | entr -s 'curl http://localhost:8080/index-php.php > www/index.html'

事前に、entr のインストールが必要
brew install entr




