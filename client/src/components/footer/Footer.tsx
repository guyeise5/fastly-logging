import {ReactElement} from "react";
import './Footer.css'

function Footer(): ReactElement {
    const origin = window.location.protocol + "//" + window.location.host;

    return <footer>
        <span><a className={"credit"} href="https://github.com/guyeise5/fastly-logging">©Guy Eisenbach</a></span>
        <span>
            <code>
                {`curl -s -XPOST '${origin}/api/v1/log' -H 'Content-type: text/plain' -d 'Test message'`}
            </code>
        </span>
    </footer>

}

export default Footer;