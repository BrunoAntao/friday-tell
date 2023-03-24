document.addEventListener("DOMContentLoaded", () => {

    let editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

    let beautify = ace.require("ace/ext/beautify");
    beautify.beautify(editor.session);

    document.addEventListener("keydown", function (e) {
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) && e.keyCode == 83) {
            e.preventDefault();
        }
    }, false);

    const viewWrapper = document.querySelector('#view');

    editor.commands.addCommand({
        name: 'run',
        bindKey: { win: 'Ctrl-S', mac: 'Command-S' },
        exec: function (editor) {

            viewWrapper.innerHTML = '';
            const value = editor.getValue();
            beautify.beautify(editor.getSession());
            eval(value);

        }
    });

    fetch("script.js")
        .then((response) => response.text())
        .then((data) => {

            editor.getSession().setValue(data);
            eval(data);

        });

})