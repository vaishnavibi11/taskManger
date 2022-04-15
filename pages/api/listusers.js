// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var request = require('request');

export default function handler(req, res) {
  console.log(req.body)
  var options = {
    'method': req.body.method,
    'url': req.body.url,
    'headers': {
      'AuthToken':'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
    },
    formData: {...req.body}
   
};
return request(options, function (error, response) {
  try {
      if (error) {
          res.status(400).send(error)
          throw new Error(error)
      };
      console.log(JSON.parse(response.body))
      res.status(200).json({ data: JSON.parse(response.body) });
      return;
  } catch (err) {
      res.status(400).json({ data: null })
      return ;
  }
})

}
