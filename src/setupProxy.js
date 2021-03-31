module.exports = function(app) {

  app.post('/api', (req, res) => {

    const responses = [
      { status: 200, response: { status:true }},
      { status: 409, response: { status:false, message:"Phone number already in use." }},
      { status: 409, response: { status:false, message:"IP address not allowed." }},
      { status: 409, response: { status:false, message:"Email address already registered." }},
      { status: 409, response: { status:false, message:"Username already exists." }},
      { status: 403, response: []},
    ];

    const { status, response } = responses[
      Math.floor(Math.random() * responses.length) // Get random index number
    ];

    return res.status(status).jsonp(response);

  });

};