YUI.add('moodle-atto_recitautolink-button', function (Y, NAME) {

/**
     * @module moodle-atto_recitautolink-button
     */
    
    /**
     * Atto text editor .
     *
     * @namespace M.atto_recitautolink
     * @class button
     * @extends M.editor_atto.EditorPlugin
     */

Y.namespace('M.atto_recitautolink').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * Add the buttons to the toolbar
     *
     * @method initializer
     */
    initializer: function() {
        if (!this.get('courseid')) {
            return;
        }
        this.addButton({
            title: 'pluginname',
            icon: 'html',
            iconComponent: 'atto_recitautolink',
            callback: this.openModal,
            buttonName: 'recitautolink'
        });
    },

    openModal: function(e) {
        e.preventDefault();
       
        var url = M.cfg.wwwroot;
        var js = url +"/lib/editor/atto/plugins/recitautolink/build/index.js";
        //var css = url +"/lib/editor/atto/plugins/recitautolink/build/index.css";
        

        var content = document.createElement('div');
        content.setAttribute('id', 'recitautolink_container');
        this.createPopup(content);
        
        if (!document.getElementById('recitautolink')){
            var script = document.createElement('script');
            script.onload = this.loadUi.bind(this);
            script.setAttribute('src', js);
            script.setAttribute('id', 'recitautolink');
            script.setAttribute('type', 'text/javascript');
            document.getElementsByTagName('head')[0].appendChild(script);
            /*script = document.createElement('link');
            script.setAttribute('href', css);
            script.setAttribute('rel', 'stylesheet');
            document.getElementsByTagName('head')[0].appendChild(script);*/
        }else{
            this.loadUi();
        }
    },

    
    createPopup: function(content) {        
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade', 'autolink_popup');
        modal.setAttribute('style', 'overflow-y: hidden;');
        let inner2 = document.createElement('div');
        inner2.classList.add('modal-dialog');
        modal.appendChild(inner2);
        let inner = document.createElement('div');
        inner.classList.add('modal-content');
        inner.setAttribute('style', 'width:600px;padding:10px');
        inner2.appendChild(inner);

        let header = document.createElement('div');
        header.classList.add('modal-header');
        header.innerHTML = "<h2>"+M.util.get_string('pluginname', 'atto_recitautolink')+"</h2>";
        inner.appendChild(header);
        let btn = document.createElement('button');
        btn.classList.add('close');
        btn.innerHTML = '<span aria-hidden="true">&times;</span>';
        btn.setAttribute('data-dismiss', 'modal');
        header.appendChild(btn);
        
        let body = document.createElement('div');
        body.classList.add('modal-body');
        inner.appendChild(body);
        body.appendChild(content);
        
        document.body.appendChild(modal);
        this.popup = modal;
        $(modal).modal({show: true, backdrop: true});
        let that = this;
        $(".modal-backdrop").click(() => $(this.popup).modal('hide'));
        $(modal).on('hidden.bs.modal', function (e) {
            that.destroy();
        });
      },

      destroy: function(){
        $(this.popup).modal('hide')
        this.popup.remove();
      },
      
      update: function(){
        $(this.popup).modal('handleUpdate');
      },

    loadUi: function(){
        if (window.openRecitAutolinkUI){
            window.openRecitAutolinkUI(this);
            this.update();
        }
    },
    

    close: function(code){
        this.destroy();
        if (code){
            let host = this.get('host');
            host.focus();
            host.insertContentAtFocusPoint(code);
        }
    },
}, {
    ATTRS: {
        courseid: {value: false},
    }
});


}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin"]});
