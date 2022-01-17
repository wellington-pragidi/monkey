# Monkey
Editor de Rich Text WYSIWYG


Modo de usar
Adicionar folha de estilo padrão dentro da tag header

<link rel="stylesheet" href="https://dominio.ext/assets/css/monkey.min.css" />

Adicionar tag textarea com um id

<textarea id="editor"></textarea>

Adicionar javascript antes do fechamento da body

<script src="https://dominio.ext/assets/js/monkey.min.js"></script>

E após a tag script com o src, inicializar o editor:

new Monkey({
    base_url: "http://localhost/monkey/git/",
    path_css: "assets/css/",
    textarea: "#editor",
    theme   : "light"
});     
        

    base_url: Pode deixar o valor vazio caso não precise que o url seja absoluto.
    path_css: Diretório onde está armazenado o arquivo css do tema. (pode e deve ficar com o valor vazio se o arquivo estiver no diretório raiz).
    textarea: O id definido no seu textarea.
    theme: Arquivo css com o esquma de cores do editor. Existem dois disponíveis, o mk-light.css e mk-dark.css
