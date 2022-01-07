import './App.css';
import pecan from './res/logo_pecan.png';
import logoText from './res/logo_text.png';
import { Button, TextField, Typography, Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel, Radio, RadioGroup } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';

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
    const [srpPing, setSrpPing] = React.useState(false);
    const [srpShip, setSrpShip] = React.useState(false);
    const [srpFit, setSrpFit] = React.useState(false);
    const [srpSplit, setSrpSplit] = React.useState(false);
    const [srpEqip, setSrpEqip] = React.useState(false);
    const [recipient, setRecipient] = React.useState("");

    return (
        <body className="App-background">
            <div className="App-title">
                 <img src = {pecan} className="App-logo-small"/>
                 <img src = {logoText} className="App-logo-small"/>
            </div>
            <div className="App-body">
                <Box className="Hori-style">
                    <Box className="Vertical-style" sx={{m:2}}>
                        <TextField label="Recipient" variant="outlined" sx={{mb:2}}/>
                        <TextField label="ZKB Link" variant="outlined"/>
                    </Box>
                    <FormControl sx={{m:2}}>
                        <FormLabel component="legend">SRP Status</FormLabel>
                        <RadioGroup
                            aria-label="srp-status"
                            defaultValue="rejected"
                            onChange={(event) => setSrpStatus(event.target.value)}
                        >
                            <FormControlLabel value="rejected" control={<Radio />} label="Rejected" />
                            <FormControlLabel value="reduced" control={<Radio />} label="Reduced (50%)" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box sx={{ pt:2}}>
                    <FormControl>
                        <FormLabel component="legend">With the following reason</FormLabel>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox />} 
                                onChange={() => setSrpPing(!srpPing)}
                                label="Lack of or inaccurate ping info" />
                            <FormControlLabel control={<Checkbox />} 
                                onChange={() => setSrpShip(!srpShip)}
                                label="Unsuitable ship" />
                            <FormControlLabel control={<Checkbox />} 
                                onChange={() => setSrpFit(!srpFit)}
                                label="Inaccurate or inappropriate fitting" />
                            <FormControlLabel control={<Checkbox />} 
                                onChange={() => setSrpSplit(!srpSplit)}
                                label="Splited usage of armament" />
                            <FormControlLabel control={<Checkbox />} 
                                onChange={() => setSrpEqip(!srpEqip)}
                                label="Lack of required ammunation/equipment in cabin" />
                        </FormGroup>
                    </FormControl>
                </Box>
                <Box sx={{ width: '100%', maxWidth: 500, pt:2}}>
                    <Typography> Your SRP application is {srpStatus} due to the following reason: </Typography>
                    <p/>
                    { srpPing && <Typography> Lack of or inaccurate ping info </Typography> }
                    { srpShip && <Typography> Unsuitable ship </Typography> }
                    { srpFit && <Typography> Inaccurate or inappropriate fitting </Typography> }
                    { srpSplit && <Typography> Splited usage of armament </Typography> }
                    { srpEqip && <Typography> Lack of required ammunation/equipment in cabin </Typography> }
                    <p/>
                    <Typography> Should you have any questions, please contact the SRP team by replying this in-game mail. </Typography>
                </Box>
                <Button variant="contained" color="error">
                    Send!
                </Button>
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
