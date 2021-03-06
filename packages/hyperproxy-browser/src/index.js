import "babel-polyfill";
import HyperproxyHubClient from 'hyperproxy-hub-client';

import {HUB_MSG_TYPE} from 'hyperproxy-config';

/* WINDOW EVENT */
window.addEventListener('load', init);

/* END WINDOW EVENT */

function init() {
    let activeURL,
        activeHash,
        shortHash;

    const client = new HyperproxyHubClient(window.WebSocket);

    const introEl = document.querySelector('#intro');
    const urlFormEl = document.querySelector('#url-form');
    const contentEl = document.querySelector('#content');

    const originalOnMessage = client.hub.onMessage;

    window.addEventListener('unload', ()=>{
        client.hub.broadcast(activeHash, {
            from: client.swarm.me,
            type: HUB_MSG_TYPE.LEAVE
        });
    });

    client.swarm.on('peer', function(peer) {
        peer.on('data', function(data) {
            renderOutput(data);
        });
    });

    function renderOutput(data) {
        const {body, type, from} = JSON.parse(Buffer.from(data).toString('utf8'));
        const value = body.type === 'Buffer'
            ? Buffer.from(body.data).toString('utf8')
            : body.data;

        contentEl.innerHTML = value;
    }

    document.querySelector('#swarm-id').innerHTML = client.swarm.me;

    document.querySelector('#subscribe').addEventListener('click', () => {
        activeURL = document.querySelector('#daturl').value;

        activeHash = activeURL.substring(6);

        shortHash = activeHash.slice(0, 4) + '...' + activeHash.slice(-5);

        document.querySelector('#active-daturl').innerHTML = shortHash;

        document.querySelector('#send').disabled = false;

        client.hub.subscribe(activeHash).on('data', ({from, type, body}) => {
            if (type != HUB_MSG_TYPE.RESPONSE) {
                return;
            }

            const value = body.type === 'Buffer'
                ? Buffer.from(body).toString('utf8')
                : body;

            contentEl.innerHTML = value;
        });

        client.hub.broadcast(activeHash, {
            from: client.swarm.me,
            type: HUB_MSG_TYPE.JOIN
        });

        urlFormEl.classList.remove('enabled');
    });

    document.querySelector('#send').addEventListener('click', () => {
        const body = document.querySelector('#message').value;

        client.hub.broadcast(activeHash, {
            from: client.swarm.me,
            type: HUB_MSG_TYPE.REQUEST,
            body
        });
    });

    document.querySelector('#try-out').addEventListener('click', () => {
        introEl.classList.remove('enabled');
    });
}

// Create html element. Code adapted from
// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
function createElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
