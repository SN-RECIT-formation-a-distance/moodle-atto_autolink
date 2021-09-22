import React, { Component } from 'react';
import ReactDOM from "react-dom";
/**************************************************************************************
 *  il ne faut pas charger le bootstrap de base car il est déjà chargé dans le thème
 * //import 'bootstrap/dist/css/bootstrap.min.css';  
 **************************************************************************************/ 
import {GeneratorView} from "./views/Views";
import {$glVars} from "./common/common";
export * from "./common/i18n";
 
class App extends Component {
    static defaultProps = {
        classHandler: null
    };

    constructor(props) {
        super(props);

        $glVars.classHandler = props.classHandler;
        this.state = {};
    }

    render() {       
        let main =
            <GeneratorView onClose={this.onClose}/>

        return (main);
    }

    onClose(val){
        $glVars.classHandler.close(val);
    }

}

window.openRecitAutolinkUI = function(classHandler){ 
    const domContainer = document.getElementById('recitautolink_container');
    ReactDOM.render(<App classHandler={classHandler}/>, domContainer);
};
