const validUrl = require('valid-url');
const shortId =  require('short-id');
const Logger = require('../utils/Logger');
const Url = require('../models/UrlsModels');
/**
 *
 * @param {object} req
 * @param {object} res
 * @route POST /api/url
 * @desc  Create short URL
 * @returns return the shorted url from long url
 */
exports.UrlShortener = async (req, res) => {
    try {
        const longUrl = req.body.longUrl;
        const baseUrl = process.env.BASE_URL;
        // check base url is valid url or not
        if(!validUrl.isUri(baseUrl) || !validUrl.isUri(longUrl)){
            Logger.info('url is not valid');
            return res.status(401).json({
                status:false,
                message:`Url is not valid`
            })
        }

        // create url code
        const urlCode = shortId.generate();
        let urlSchema = await Url.findOne({longUrl});
        // if long url is exist is db return the long url shortener
        if(urlSchema){
            Logger.info(`returning the existing url`);
            urlSchema.expire_at = new Date(
                new Date().setHours(new Date().getHours()+ 23)
            )
            await urlSchema.save();
            return res.status(200).json({
                status:true,
                urlSchema,
            })
        }
        const shortUrl = baseUrl + "/" + urlCode;
        // save the url in db;
        urlSchema  = new Url({
            longUrl,
            shortUrl,
            urlCode,
            expire_at:new Date(
                new Date().setHours(new Date().getHours() + 23)
            ),
            create_At:new Date()
        })
        await urlSchema.save();
        Logger.info(`url has been save in Database`);
        res.status(201).json({
            status:true,
            message:`Create new Instance of Url`,
            urlSchema,
        })
        
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({
            status:false,
            message:error.message
        })
        
    }
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} code code params is generated randoms uuid
 * @redirect redirect the long url and goes long url page
 * @returns if long url is not valid it's return error 404
 */
exports.UrlRedirect  = async (req, res) => {
    try {
        const urlCode = req.params.code;
        const urlSchema = await Url.findOne({urlCode});
        if(!urlSchema){
            Logger.warn(`url doesn't exit Please try again`);
            return res.status(404).json({
                status:false,
                message:'Url does not exist Please try again'
            })
        }
        Logger.info('url redirect successfully');
        res.redirect(urlSchema.longUrl);
    } catch (error) {
        Logger.error(error.message);
        res.status(500).json({
            status:false,
            message:error.message
        })
    }
}
