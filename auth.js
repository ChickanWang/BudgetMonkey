module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.user) {
        return next();
      }
      return res.status(401).json({message: {msgBody: "peepeepoopoofart"}})
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }      
    }
  };