import './App.css';
import pecan from './res/logo_pecan.png';
import logoText from './res/logo_text.png';

const eveSsoIcon = "https://web.ccpgamescdn.com/eveonlineassets/developers/eve-sso-login-black-large.png"
const callback = "localhost:3000/callback";
const clientID = "455cc59662854ca0a70468886aa951b4";
const ssoScope = "esi-mail.organize_mail.v1 esi-mail.read_mail.v1 esi-mail.send_mail.v1";
const state = "pecanKlutz";

function App() {
    return (
        <EveSSO/>
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
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <img src={eveSsoIcon} className="EVE-SSO" />
                </a>
            </header>
        </div>
    );
}

export default App;
