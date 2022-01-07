import './App.css';
import pecan from './res/logo_pecan.png';
import logoText from './res/logo_text.png';
import { Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup} from '@mui/material';
import * as React from 'react';

const eveSsoIcon = "https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-white-large.png"
const callback = "https://bbqpot.github.io/pecan-bot";
const clientID = "455cc59662854ca0a70468886aa951b4";
const ssoScope = "esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1";
const state = "pecanKlutz";

function getQueryVariable(variable)
{
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                    var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
         }
         return(false);
}
let tokenState = Boolean(getQueryVariable("state") == "pecanKlutz");
let token = getQueryVariable("code");

function App() {
    if (!tokenState) return <EveSSO/>;
    else return <MailPage/>;
}

function MailPage() {
    const [srpStatus, setSrpStatus] = React.useState("rejected");
    return (
        <body>
            <div className="App-title">
                 <img src = {pecan} className="App-logo-small"/>
                 <img src = {logoText} className="App-logo-small"/>
            </div>
            <div id="body" className="App-body">
                <FormControl component="fieldset">
                    <FormLabel component="legend">SRP Status</FormLabel>
                    <RadioGroup
                        row
                        aria-label="srp-status"
                        defaultValue="rejected"
                        onChange={(event) => setSrpStatus(event.target.value)}
                    >
                        <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                        <FormControlLabel value="reduced" control={<Radio />} label="Reduced (50%)" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                </FormControl>
                {srpStatus}
            </div>
        </body>
    );
}

function EveSSO() {
    const ssoLink = "https://login.eveonline.com/v2/oauth/authorize/?" + 
        "response_type=code&" +
        "redirect_uri=" + callback + "&" +
        "client_id=" + clientID + "&" +
        "scope=" + ssoScope + "&" +
        "state=" + state;
    return (
        <div className="App">
            <header className="App-header">
                <img src={pecan} className="App-logo" alt="logo" />
                <img src={logoText} />
                <p>
                    Please login using EVE SSO.
                </p>
                <a
                    className="App-link"
                    href={ssoLink}
                >
                <img src={eveSsoIcon} className="EVE-SSO" />
                </a>
            </header>
        </div>
    );
}

export default App;
