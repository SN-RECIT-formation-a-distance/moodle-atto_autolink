import packageJson from "../../package.json";

export class Options
{
    static appVersion(){ return packageJson.version; }

    static appTitle(){
        return "Autolink RÉCIT | " + this.appVersion();
    }

    static getGateway(){
        return `${M.cfg.wwwroot}/local/recitcommon/php/CommonApi.php`;
    }
    
}