exports.getSignUp = (req, res) => {
  res.status(200).render("signup");
};

exports.getSignIn = (req, res) => {
  res.status(200).render("signin");
};

exports.getHomePage = (req, res) => {
  res.status(200).render("base");
};
