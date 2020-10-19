const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '96063c9755fc4b2eaa68373596501ec1'
  });

const handleApiCall = (req, res) =>  {app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to connect to API'))
    }

const handleImage =(req, res) => {
    const { id } = req.body;
    db('users').where('id', '+', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to update score'))
}

module.exports = {
    handleImage,
    handleApiCall
}