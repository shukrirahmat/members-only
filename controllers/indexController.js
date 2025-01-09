const getIndexPage = (req, res) => {
  res.render("homePage", {title : "Homepage"})
};

module.exports = {
  getIndexPage,
};
