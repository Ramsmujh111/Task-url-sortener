import React from "react";
import validUrl from 'valid-url';
import BackGoundAnimations from "./BackGournd";
import ResultEvent from "./Result";
import axios from 'axios';
import ErrorPage from "./ErrorPage";

/**
 *  here i'm not validating the input from the client side 
 */
const Homepage = () => {
    const [url, setUrl] = React.useState('');
    const [ResultStatus, setResultStatus] = React.useState(false);
    const [errorStatus , setErrorStatus] = React.useState(false);
    const [ErrorHandling , setError] = React.useState({});
    const [res, setRes] = React.useState({});
    async function GetSubmitUrl(e) {
        e.preventDefault()
        try {
            let apiRes = await axios.post('http://localhost:3001/api/shorten', {
                longUrl: url
            });
            setRes(apiRes.data);
            setResultStatus(true);
            setUrl('');
            // console.log(apiRes.data);
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
            setErrorStatus(false);
        }
    }
    React.useEffect(()=>{
      const timer =  setTimeout(()=>{
            setErrorStatus(true)
        } , 10000)
      return () => clearTimeout(timer);
    } , [errorStatus])
    return <>
        <header className="headers-class">
            <div className="Title-tag">
                <h2 className="heading">URL <span className="softener">Shortener</span></h2>
            </div>
            <div className="form-control">
                <form className="form-check" onSubmit={(e) => GetSubmitUrl(e)}>
                    <input type="text" value={url} className="input-url" placeholder="Please Enter the url" onChange={(e) => setUrl(e.target.value)} />
                    <button type="submit" className="btn">SHORTEN</button>
                </form>
            </div>
            {
                ResultStatus && <ResultEvent Response={res} />
            }
            {
               !errorStatus ? <ErrorPage res={ErrorHandling}/> : ""
            }
            <BackGoundAnimations />
        </header>
    </>
}

export default Homepage;