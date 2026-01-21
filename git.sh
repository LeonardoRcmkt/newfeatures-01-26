while true; do
	echo -e "\033[1;33mSCRIPT RODANDO DIR:\033[0m \033[0;32m$(pwd)\033[0m"
	git pull -Xtheirs
	git add .
	git commit -m "server: sync"
	git push

	sleep 10
done
