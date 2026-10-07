# standupcomedy.github.io

## 使用時

事前に、entr のインストールが必要
brew list entr &>/dev/null && echo "entr はインストール済み" || brew install entr

filemtimeのために php を使って、index.htmlを書き出す
echo build/src/php/index.php | entr -s "docker compose exec php sh -c 'php /app/src/php/index.php > /var/www/html/index.html'"