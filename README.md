<h1>Monkey</h1>
<h2>Editor de Rich Text WYSIWYG</h2>


<h3>Modo de usar</h3>
Adicionar folha de estilo padrão dentro da tag <code>header</code><br>
<pre style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(51, 51, 51); color: rgb(255, 255, 255);"><span style="color: rgb(98, 200, 243);">&lt;<span style="font-weight: 700;">link</span> <span>rel</span>=<span style="color: rgb(162, 252, 162);">"stylesheet"</span> href=<span style="color: rgb(162, 252, 162);">"https://dominio.ext/assets/css/monkey.min.css"</span> /&gt;</span></pre>

Adicionar tag <code>textarea</code> com um id<br>
        <pre style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(51, 51, 51); color: rgb(255, 255, 255);"><span style="color: rgb(98, 200, 243);">&lt;<span style="font-weight: 700;">textarea</span> id=<span style="color: rgb(162, 252, 162);">"editor"</span>&gt;</span><span style="color: rgb(98, 200, 243);">&lt;/<span style="font-weight: 700;">textarea</span>&gt;</span></pre>

Adicionar javascript antes do fechamento da <code>body</code><br>
<pre style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(51, 51, 51); color: rgb(255, 255, 255);"><span style="color: rgb(98, 200, 243);">&lt;<span style="font-weight: 700;">script</span> src=<span style="color: rgb(162, 252, 162);">"https://dominio.ext/assets/js/monkey.min.js"</span>&gt;</span><span style="color: rgb(98, 200, 243);">&lt;/<span style="font-weight: 700;">script</span>&gt;</span></pre>

E após a tag <code>script</code> com o src, inicializar o editor:<br>
<pre style="display: block; overflow-x: auto; padding: 0.5em; background: rgb(51, 51, 51); color: rgb(255, 255, 255);"><span style="color: rgb(252, 194, 140);">new Monkey</span>({
    <span style="color: rgb(255, 255, 170);">base_url: <span style="color: rgb(162, 252, 162);">"http://localhost/monkey/git/"</span>,
    path_css: <span style="color: rgb(162, 252, 162);">"assets/css/"</span>,
    textarea: <span style="color: rgb(162, 252, 162);">"#editor"</span>,
    theme   : <span style="color: rgb(162, 252, 162);">"light"</span>
});     
</pre>  

<ol>
    <li>base_url: Pode deixar o valor vazio caso não precise que o url seja absoluto.</li>
    <li>path_css: Diretório onde está armazenado o arquivo css do tema. (pode e deve ficar com o valor vazio se o arquivo estiver no diretório raiz).</li>
    <li>textarea: O id definido no seu textarea.</li>
    <li>theme: Arquivo css com o esquma de cores do editor. Existem dois disponíveis, o mk-light.css e mk-dark.css</li>
</ol>
