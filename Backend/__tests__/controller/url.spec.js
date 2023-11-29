const UrlShortenerController = require('../../controller/url');
const Url = require('../../models/UrlsModels');

/**
 * UNIT TESTING ARE NOT COMPLETED DUE TO INSUFFICIENT TIME
 * BUT I HAVE SETUP EVERY THINGS WHICH NEED TO PREPARED , FOR THE UNIT TESTING I AM USING JEST
 */

jest.mock('../../models/UrlsModels')

const req = {
    body: {
        longUrl: "https://www.npmjs.com/package/react-copy-to-clipboard"
    }
}
const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
}
it('should be long url is not valid and its should return 401 status code with object', async () => {
    Url.findOne.mockImplementationOnce(() => undefined)
    await UrlShortenerController.UrlShortener(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledTimes(1);
})

it("should be return the valid url and return 201 status code", async () => {
    Url.findOne.mockImplementationOnce(() => ({
        _id: "fnsfkdfbkdfk",
        longUrl: 'https://www.npmjs.com/package/react-copy-to-clipboard',
        shortUrl: 'http://loc3000/code',
        createAt: "23-10-2022",
        expireAt: "24-10-2022",
    }))
    let ans = await UrlShortenerController.UrlShortener(req, res);
    expect(ans).not.toBeNaN();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
})