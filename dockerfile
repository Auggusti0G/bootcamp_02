# IMAGEM BASE: servidor nginx em Linux Alpine (pequeno e seguro)
FROM nginx:alpine

# COPIA O CONTEUDO DA PASTA ATUAL PARA O DIRETORIO /usr/share/nginx/html DO CONTAINER
COPY . /usr/share/nginx/html

# EXPOE A PORTA 80 PARA ACESSO EXTERNO
EXPOSE 80