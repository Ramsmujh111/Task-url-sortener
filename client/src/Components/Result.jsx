import React from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const ResultEvent = ({Response}) => {
    const [shortenLink , setShortenLink] = React.useState(Response.urlSchema.shortUrl);
    const [copied , setCopied] = React.useState(false);
    return <>
        <div className="Result">
           <p className="url-link">{shortenLink}</p>
           <CopyToClipboard 
            text={shortenLink}
            onCopy={() => setCopied(true)}
            >
           <button className="copy">CLICK TO COPY URL</button>
           </CopyToClipboard>
        </div>
    </>
}

export default ResultEvent;