var Monkey = function(config) {

    function mkToolbar() {
        var events_elements = [
            mkFormatBlock(), mkFormatInline(), mkGrid(), 
            separator_bar(), 
            mkTextAlign(), 
            separator_bar(), 
            mkLink(), 
            separator_bar(), 
            mkLists(), 
            separator_bar(), 
            mkQuotes(), mkTextColor(), mkFontSize(), 
            separator_bar(), 
            mkMedias(), 
            separator_bar(), 
            mkRule(), mkLorem(), mkSwitchMode()
        ];
        return events_elements;
    }

    function mkInit() {
        var style = config.base_url+config.path_css+"mk-"+config.theme+".css";
        var css = document.createElement("link");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("href", style);
        document.head.append(css);

        var mk_wrap = document.createElement("div");
        mk_wrap.id = "mk_wrap";
        var mk_toolbar = document.createElement("ul");
        mk_toolbar.id = "mk_toolbar";
        var mk_grow = document.createElement("div");
        mk_grow.id = "mk_grow";
        var monkey = document.createElement("div");
        monkey.id = "monkey";
        monkey.contentEditable = true;
        var mk_srcode = document.createElement("textarea");
        mk_srcode.id = "mk_srcode";

        mk_wrap.prepend(mk_toolbar);        
        mk_wrap.append(mk_grow);
        mk_grow.prepend(monkey);
        mk_grow.append(mk_srcode);

        mkToolbar().forEach(function(elems) {
            mk_toolbar.append(elems)
        });

        var selector = document.querySelector(config.textarea);
        selector.before(mk_wrap);
    }

    document.body.onload = mkInit();

    document.execCommand("defaultParagraphSeparator", false, "p");
    const MONKEY   = document.querySelector("#monkey");
    const SRCODE   = document.querySelector("#mk_srcode");
    SRCODE.style.display = "none";
    const TEXTAREA = document.querySelector(config.textarea);
    TEXTAREA.style.display = "none";
    const BUTTONS = document.querySelectorAll("#mk_toolbar button");
    BUTTONS.forEach(function(elem) {
        elem.setAttribute("type", "button");
    });
    const SELECTION = window.getSelection();

    /** envia conteudo de editor visual para codigo fonte e vice-versa 
     * @function mkSwitchMode() */
    MONKEY.addEventListener('keydown', function() { SRCODE.value = MONKEY.innerHTML });
    MONKEY.addEventListener('keyup', function() { SRCODE.value = MONKEY.innerHTML });
    MONKEY.addEventListener('change', function() { SRCODE.value = MONKEY.innerHTML });
    MONKEY.addEventListener('input', function() { SRCODE.value = MONKEY.innerHTML });
    SRCODE.addEventListener('keydown', function() { MONKEY.innerHTML = SRCODE.value });
    SRCODE.addEventListener('keyup', function() { MONKEY.innerHTML = SRCODE.value });
    SRCODE.addEventListener('change', function() { MONKEY.innerHTML = SRCODE.value });
    SRCODE.addEventListener('input', function() { MONKEY.innerHTML = SRCODE.value });

    /** envia conteudo para textarea */
    function mkDesignModeToTextarea() {
        var writing = this.innerHTML;
        TEXTAREA.value = writing;
    }
    MONKEY.addEventListener('keydown', mkDesignModeToTextarea);
    MONKEY.addEventListener('keyup', mkDesignModeToTextarea);
    MONKEY.addEventListener('change', mkDesignModeToTextarea);
    MONKEY.addEventListener('input', mkDesignModeToTextarea);
    function mkCodeModeToTextarea() {
        var writing = this.value;
        TEXTAREA.value = writing;
    }
    SRCODE.addEventListener('keydown', mkCodeModeToTextarea);
    SRCODE.addEventListener('keyup', mkCodeModeToTextarea);
    SRCODE.addEventListener('change', mkCodeModeToTextarea);
    SRCODE.addEventListener('input', mkCodeModeToTextarea);

    function separator_bar() {
        var bar = document.createElement('li');
        bar.classList.add("separator");
        return bar;
    }

    function mkFormatBlock() {
        var format_block = mkElement("li", !1, "Tags HTML com formatação de bloco", ["select", "caret", "format"]);
        var span = mkElement("span", "format_block", !1, ["opendown"]);
        format_block.prepend(span);
        var dropdown = mkElement("div", "blocks", !1, ["dropdown"]);
        format_block.append(dropdown);
        for(var i = 2; i <= 6; i++) {
            var headers = mkElement("button", "h"+i, "h"+i, !1, "Cabeçalho "+i);
            dropdown.appendChild(headers);
        }
        var paragraph = mkElement("button", "p", "p", !1, "Paragrafo");
        var pre = mkElement("button", "pre", "pre", !1, "Pre-formatado");
        var address = mkElement("button", "address", "Para informações de contato", ["bracket"], "&lt;address&gt;");
        dropdown.append(paragraph);
        paragraph.after(pre);
        pre.after(address);

        return format_block;
    }
    
    function mkFormatInline() {
        var format_inline = mkElement("li", !1, "Tags HTML com formatação em linha", ["select", "caret", "format"]);
        var span = mkElement("span", "format_inline", !1, ["opendown"]);
        format_inline.prepend(span);
        var dropdown = mkElement("div", "inlines", !1, ["dropdown"]);
        format_inline.append(dropdown);

        var sm_b = mkElement("small", !1, !1, !1, "&lt;b&gt");
        var b = mkElement("button", "b", "Negrito", ["mk_ico_bold"]);
        b.appendChild(sm_b);
        var sm_i = mkElement("small", !1, !1, !1, "&lt;i&gt");
        var i = mkElement("button", "i", "Negrito", ["mk_ico_italic"]);
        i.appendChild(sm_i);
        var u = mkElement("button", "u", "Sublinhado", ["mk_ico_underline"]);
        var sm_strike = mkElement("small", !1, !1, !1, "&lt;strike&gt");
        var strike = mkElement("button", "strike", "Riscado", ["mk_ico_strike"]);
        strike.appendChild(sm_strike);
        var strong = mkElement("button", "strong", "Negrito", ["bracket"], "&lt;strong&gt");
        var em = mkElement("button", "em", "Italico", ["bracket"], "&lt;em&gt");
        var s = mkElement("button", "s", "Texto riscado", ["bracket"], "&lt;s&gt");
        var code = mkElement("button", "code", "Pequeno trecho de código", ["bracket"], "&lt;code&gt");
        var mark = mkElement("button", "mark", "Destaca o texto com fundo colorido", ["bracket"], "&lt;mark&gt");
        var small = mkElement("button", "small", "Reduz o tamanho da fonte", ["bracket"], "&lt;small&gt");
        var abbr = mkElement("button", "abbr", "Abreviação", ["bracket"], "&lt;abbr&gt");
        var time = mkElement("button", "time", "Data e/ou hora", ["bracket"], "&lt;time&gt;");
        [b, i, u, strike, strong, em, s, code, mark, small, abbr, time].forEach(function(elem) {
            dropdown.appendChild(elem);
        });
        return format_inline;
    }

    function mkGrid() {
        var like = 'colunas com larguras iguais';
        var diff = '2 colunas com larguras diferentes';
        var grid = mkElement("li", !1, "Inserir colunas de grid", ["select", "caret"]);
        var btn_ico = mkElement("button", !1, !1, ["mk_ico_grid", "mk_ico_down", "opendown"]);
        grid.prepend(btn_ico);
        var dropdown = mkElement("div", "insert_grid", !1, ["dropdown"]);
        grid.append(dropdown);
        var cols_1 = mkElement("button", "x_66", "2 "+like, !1, "<b></b> <b></b>");
        var cols_2 = mkElement("button", "x_444", "3 "+like, !1, "<b></b> <b></b> <b></b>");
        var cols_3 = mkElement("button", "x_75", diff, !1, "<b></b> <b></b>");
        var cols_4 = mkElement("button", "x_57", diff, !1, "<b></b> <b></b>");
        var cols_5 = mkElement("button", "x_84", diff, !1, "<b></b> <b></b>");
        var cols_6 = mkElement("button", "x_48", diff, !1, "<b></b> <b></b>");
        [cols_1, cols_2, cols_3, cols_4, cols_5, cols_6].forEach(function(elem) {
            dropdown.appendChild(elem);
        });
        return grid;
    }

    function mkTextAlign() {
        var textalign   = mkElement("li", !1, !1, ["select", "caret"]);
        var btn_align = mkElement("button", !1, !1, ["mk_ico_center", "mk_ico_down", "opendown"]);
        textalign.prepend(btn_align);
        var dropdown = mkElement("div", "text_aligns", !1, ["dropdown"]);
        textalign.append(dropdown);

        var left    = mkElement("button", "justifyLeft", "Alinhar a esquerda", ["align", "mk_ico_left"]);
        var center  = mkElement("button", "justifyCenter", "Centralizar", ["align", "mk_ico_center"]);
        var right   = mkElement("button", "justifyRight", "Alinhar a direita", ["align", "mk_ico_right"]);
        var justify = mkElement("button", "justifyFull", "Justificar", ["align", "mk_ico_justify"]);
        [left, center, right, justify].forEach(function(elem) {
            dropdown.appendChild(elem);
        });
        return textalign;
    }

    function mkLink() {
        var group   = mkElement("li", !1, !1, ["mk_group"]);
        var link = mkElement("button", "link", "Adicionar Link", ["mk_ico_link"]);
        var unlink = mkElement("button", "unlink", "Remover Link", ["mk_ico_unlink"]);
        group.appendChild(link); 
        group.appendChild(unlink);
        return group;
    }

    /*function mkBold() {
        return mkElement("button", "b", "Negrito", ["mk_ico_bold"]);
    }
    function mkItalic() {
        return mkElement("button", "i", "Italico", ["mk_ico_italic"]);
    }*/

    function mkLists() {
        var group = mkElement("li", !1, !1, ["mk_group"]);
        var ul    = mkElement("button", "ul", "Lista desordenada", ["mk_ico_unorderlist"]);
        var ol    = mkElement("button", "ol", "Lista ordenada", ["mk_ico_orderlist"]);
        group.appendChild(ul); 
        group.appendChild(ol);
        return group;
    }

    function mkQuotes() {
        var quotes = mkElement("li", !1, "Citações", ["select"]);
        var btn_ico = mkElement("button", !1, !1, ["mk_ico_quote", "mk_ico_down", "opendown"]);
        quotes.prepend(btn_ico);
        var dropdown = mkElement("div", "cites", !1, ["dropdown"]);
        quotes.append(dropdown);
        var blockquote = mkElement("button", "blockquote", "Bloco de citação", ["bracket"], "&lt;blockquote&gt;");
        var q = mkElement("button", "q", "Pequena citação", ["bracket"], "&lt;q&gt;");
        var cite = mkElement("button", "cite", "Dados de citação", ["bracket"], "&lt;cite&gt;");
        dropdown.appendChild(blockquote);
        blockquote.after(q);
        q.after(cite);
        return quotes;
    }

    function mkTextColor() {
        var textcolor  = mkElement("li", !1, "Cor da fonte", ["select"]);
        var btn_tcolor = mkElement("button", !1, !1, ["mk_ico_color", "mk_ico_down", "opendown"]);
        textcolor.prepend(btn_tcolor); //colorpicker = dropdown
        var colorpicker = mkElement("div", "mk_textcolors", !1, ["dropdown"]); 
        textcolor.append(colorpicker);
        return textcolor;
    }

    function mkFontSize() {
        var fontsize = mkElement("li", !1, "Tamanho da fonte", ["select"]);
        var btn_ftsz = mkElement("button", !1, !1, ["mk_ico_fontsize", "mk_ico_down", "opendown"]);
        fontsize.prepend(btn_ftsz);
        var dropdown = mkElement("div", "fontsize", !1, ["dropdown"]);
        fontsize.append(dropdown);
        return fontsize;
    }

    function mkMedias() {
        var medias = mkElement("li", !1, !1, ["group"]);
        var image = mkElement("input", "data_image", !1, ["screen_reader"]);
        image.setAttribute("type", "file");
        image.setAttribute("accept", "image/*");
        var img_label = mkElement("label", !1, "Inserir imagem", ["mk_ico_image"]);
        img_label.setAttribute("for", "data_image");
        var embed = mkElement("button", "embed", "Embutir video youtube", ["mk_ico_embed"]);
        var video = mkElement("input", "data_video", !1, ["screen_reader"]);
        video.setAttribute("type", "file");
        video.setAttribute("accept", "video/*");
        var vid_label = mkElement("label", !1, "Inserir video", ["mk_ico_video"]);
        vid_label.setAttribute("for", "data_video");
        [image, img_label, embed, vid_label, video].forEach(function(elem) {
            medias.appendChild(elem);
        });
        return medias;
    }

    function mkRule() {
        return mkElement("button", "hr", "Linha horizontal", ["mk_ico_rule"]);
    }

    function mkLorem() {
        return mkElement("button", "mk_lorem", "Lorem ipsum", ["mk_ico_lorem"]);
    }

    /** alterna editor visual para codigo fonte */
    function mkSwitchMode() {
        var mktoggle   = mkElement("li", "mk_toggle", "Alternar para editor de código", !1);
        var switchmode = mkElement("input", "switch_mode", !1, ["screen_reader"]);
        var btn_swtg   = mkElement("label", "pages", !1, ["mk_ico_code"]);
        switchmode.setAttribute("type", "checkbox");
        btn_swtg.setAttribute("for", "switch_mode");
        mktoggle.prepend(switchmode);
        mktoggle.append(btn_swtg);
        switchmode.addEventListener('change', function() {
            if(this.checked)
                SRCODE.style.display = "block";
            else 
                SRCODE.style.display = "none";
        })
        switchmode.onclick = function() {
            this.classList.toggle("mode_code");
        }
        switchmode.addEventListener('change', function() {
            if( this.classList.contains("mode_code") ) {
                mktoggle.setAttribute("title", "Alternar para editor visual");
            } else {
                mktoggle.setAttribute("title", "Alternar para editor de código");
            }
        })
        return mktoggle;
    }


    function mkElement(tag, attr_id, attr_title, attr_class, inner_html = '') {
        var element = document.createElement(tag);

        element.innerHTML = inner_html;

        if(attr_id != false) {
            element.id = attr_id;
        }
        if(attr_title != false) {
            element.setAttribute("title", attr_title);
        }
        if(attr_class != false) {
            attr_class.forEach(function(classes) {
                element.classList.add(classes);
            })
        }
        return element;
    }

    var block = document.querySelectorAll("#blocks button");
    for(var i = 0; i < block.length; i++) {
        var blocks = block[i].getAttribute("id");
        var block_id = document.querySelector("#"+blocks);
        block_id.addEventListener('click', function() {
            document.execCommand("formatBlock", false, this.getAttribute("id"));
        })
    }

    var inline = document.querySelectorAll("#inlines button")
    for(var i = 0; i < inline.length; i++) {
        var inlines = inline[i].getAttribute("id")
        var inline_id = document.querySelector("#"+inlines)
        inline_id.addEventListener('click', function() {
            var _inline_ = this.getAttribute("id")
            var _tag_selection_;
            if(_inline_ == "abbr")
                _tag_selection_ = '<'+_inline_+' title="">'+SELECTION+'</'+_inline_+'>';
            else
                _tag_selection_ = '<'+_inline_+'>'+SELECTION+'</'+_inline_+'>';
            document.execCommand("insertHTML", false, _tag_selection_);
        })
    }

    function mkInsertGrid(cols) {
        var 
        x_66  = '<div class="cn_s6"></div><div class="cn_s6"></div>',
        x_444 = '<div class="cn_s4"></div><div class="cn_s4"></div><div class="cn_s4"></div>',
        x_75  = '<div class="cn_s7"></div><div class="cn_s5"></div>',
        x_57  = '<div class="cn_s5"></div><div class="cn_s7"></div>',
        x_84  = '<div class="cn_s8"></div><div class="cn_s4"></div>',
        x_48  = '<div class="cn_s4"></div><div class="cn_s8"></div>';
        if(cols == 'x_66')  cols = x_66;
        if(cols == 'x_444') cols = x_444;
        if(cols == 'x_75')  cols = x_75;
        if(cols == 'x_57')  cols = x_57;
        if(cols == 'x_84')  cols = x_84;
        if(cols == 'x_48')  cols = x_48;
        var grid = '<div class="grid">'+cols+'</div><p>&nbsp;</p>';
        mkInsertElement(grid);
        MONKEY.focus();
    }
    var insert_grid = document.querySelectorAll("#insert_grid button")
    for(var i = 0; i < insert_grid.length; i++) {
        var columns = insert_grid[i].getAttribute("id")
        var column_id = document.querySelector("#"+columns)
        column_id.addEventListener('click', function() {
            mkInsertGrid( this.getAttribute("id") )
        })
    }

    var align = document.querySelectorAll(".align");
    for(var i = 0; i < align.length; i++) {
        var aligns = align[i].getAttribute("id");
        var align_id = document.querySelector("#"+aligns);
        align_id.addEventListener('click', function() {
            document.execCommand("styleWithCSS", false, "true");
            var command = this.getAttribute("id");
            document.execCommand(command, false, "");
        });
    }

    document.querySelector("#link").onclick = function() {
        var url = prompt("URL", "//");
        document.execCommand('createLink', false, url);
        SELECTION.anchorNode.parentElement.target = "_blank";
    }
    document.querySelector("#unlink").onclick = function() {
        document.execCommand("unlink", false, "");
    }

    document.querySelector("#ul").onclick = function() {
        document.execCommand("insertUnorderedList", false, "");
    }
    document.querySelector("#ol").onclick = function() {
        document.execCommand("insertOrderedList", false, "");
    }

    document.querySelector("#blockquote").onclick = function() {
        document.execCommand("formatBlock", false, "blockquote");
    }
    document.querySelector("#q").onclick = function() {
        document.execCommand("insertHTML", false, '<q>'+window.getSelection()+'</q>');
    }
    document.querySelector("#cite").onclick = function() {
        document.execCommand("insertHTML", false, '<cite>'+window.getSelection()+'</cite>');
    }

    var colorpicker = document.querySelector("#mk_textcolors");
    var colors = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FFA500", "#E60077", "#808080",
        "#CC0000", "#00CC00", "#0000CC", "#E6E600", "#E69500", "#CC0069", "#777777",
        "#B30000", "#00B300", "#0000B3", "#CCCC00", "#CC8500", "#B3005C", "#666666",
        "#990000", "#009900", "#000099", "#B3B300", "#C37400", "#99004F", "#555555",
        "#800000", "#008000", "#000080", "#999900", "#996300", "#800042", "#444444",
        "#660000", "#006B00", "#000066", "#808000", "#805300", "#660035", "#333333",
        "#4D0000", "#004D00", "#00004D", "#666600", "#664200", "#4D0028", "#222222",
        "#330000", "#003300", "#000033", "#4D4D00", "#4C3200", "#33001A", "#111111",
        "#1A0000", "#001A00", "#00001A", "#333300", "#332100", "#1A000A", "#000000"
    ];
    for(var i = 0; i < colors.length; i++) {
        var selectcolor = mkElement("button", !1, colors[i], ["color"]);
        selectcolor.setAttribute("data-color", colors[i]);
        selectcolor.style.backgroundColor = colors[i];
        selectcolor.setAttribute("type", "button");
        colorpicker.appendChild(selectcolor);
        selectcolor.addEventListener('click', function() {
            document.execCommand("styleWithCSS", false, "true");
            document.execCommand('foreColor', false, this.getAttribute("data-color"));
        });
    }

    var fontsize = document.querySelector("#fontsize");
    var sizes = [
        {"9px":"0.563rem"}, {"10px":"0.625rem"}, {"11px":"0.688rem"}, {"12px":"0.75rem"}, 
        {"13px":"0.813rem"}, {"14px":"0.875rem"}, {"15px":"0.938rem"}, {"16px":"1rem"}, 
        {"17px":"1.063rem"}, {"18px":"1.125rem"}, {"19px":"1.188rem"}, {"21px":"1.313rem"}, 
        {"23px":"1.438rem"}, {"26px":"1.625rem"}, {"29px":"1.813rem"}, {"32px":"2rem"}, {"40px":"2.5rem"}
    ];
    sizes.forEach(function(value) {
        for(px in value) {
            var rem = value[px];
            var selectsize = mkElement("button", !1, "Equivale a "+rem, !1, px);
            selectsize.setAttribute("data-size", rem);
            selectsize.setAttribute("type", "button");
            fontsize.appendChild(selectsize);
        }
    })
    var data_size = document.querySelectorAll("#fontsize button");
    data_size.forEach(function(elem) {
        var size = elem.getAttribute("data-size");
        elem.addEventListener('click', function() {
            size = '<span style="font-size:'+size+'">'+SELECTION+'</span>';
            return document.execCommand("insertHTML", false, size);
        });
    });

    var data_image = document.querySelector("#data_image");
    data_image.addEventListener('change', function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            var talt = data_image.files[0].name.split('.').slice(0, -1).join('.')
            mkInsertElement('<img src="'+e.target.result+'" alt="'+talt+'">')
        }
        reader.readAsDataURL(this.files[0]);
        MONKEY.focus();
    });

    var embed = document.querySelector("#embed")
    embed.onclick = function() {
        var youtube_url = prompt("Insira URL de video do YouTube", "");
        youtube_url = youtube_url.replace("watch?v=", "embed/");
        if(youtube_url.indexOf("&") > -1) {
            youtube_url = youtube_url.substring(0, youtube_url.indexOf('&'));
        }
        else {
            youtube_url = youtube_url;
        }
        mkInsertElement('<div class="iframe"><iframe src="'+youtube_url+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>');
    }

    var data_video = document.querySelector("#data_video");
    data_video.addEventListener('change', function() {
        var reader = new FileReader();
        var size = this.files[0].size;
        if(size > 30000000) {
            alert("O tamanho do arquivo excede o máximo permitido");
        }
        else {
            reader.onload = function(e) {
                mkInsertElement('<video controls><mk_source src="'+e.target.result+'" type="video/mp4"></video>');
            }
        }
        reader.readAsDataURL(this.files[0]);
        MONKEY.focus();
    });

    document.querySelector("#hr").onclick = function() {
        document.execCommand('insertHorizontalRule', false, "");
    }
    
    var lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    document.querySelector("#mk_lorem").onclick = function() {
        document.execCommand("insertText", false, lorem);
    }

    /** inserir Html no final da selecao */
    function mkInsertElement(html) {
        var sel, range, node;
        if(window.getSelection) {
            sel = window.getSelection();
            if(sel.getRangeAt && sel.rangeCount) {
                range = window.getSelection().getRangeAt(0);
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
            }
        } 
        else if(document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(html);
        }
    }

}