module.exports = function(app) {

  app.post('/api', (req, res) => {

    // Generate error response randomly
    if (Math.random() >= 0.5) {

      const responses = [
        {"status":true},
        {"status":false,"error":"Phone number already in use."},
        {"status":false,"error":"IP address not allowed."},
        {"status":false,"error":"Email address already registered."},
        {"status":false,"error":"Username already exists."}
      ]

      // Get random index number
      const index = Math.floor(Math.random() * responses.length)
  
      return res.jsonp(responses[index])

    }

    return res.status(403).jsonp({})

  })

};