# standupcomedy.github.io

## 使用時

ポート番号（:8080）はローカル環境に合わせて修正する
echo docs/index-php.php | entr -s 'curl http://localhost:8080/index-php.php > docs/index.html';

事前に、entr のインストールが必要
brew install entr

filemtimeのために php を使って、index.htmlを書き出す
echo docs/index-php.php | entr -s 'curl http://localhost:8090/index-php.php > docs/index.html'

事前に、entr のインストールが必要
brew install entr




