const Press = require("../models/press");
//
// ─── PRESS_CONTROLLER ──────────────────────────────────────────────────────────
//

exports.list = (req, res) => {
  Press.find((err, press) => {
    if (err) res.send({ message: "internal server error" });
    return res.render('../templates/press.ejs', { press: press });
  });
};

exports.post = (req, res, next) => {
  const nPress = new Press(req.body);
  return nPress.save(function(err) {
    if (err) {
      if (err.name === 'ValidationError') {
        const vError = new Error('There is some issues with your data!');
        vError.status = 400;
        const simplifiedErrors = Object.entries(err.errors)
            .map(curError => ({ on: curError[0], error: curError[1].message }));
        vError.message = { title: vError.message, errors: simplifiedErrors };
        return next(vError);
      }
      return next(err);
    }
    return res.send(nPress);
  });
};

exports.show = (req, res) => {
  Press.findById(req.params.id, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    res.json(press);
  });
};

exports.delete = (req, res) => {
  Press.findByIdAndRemove(req.params.id, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    res.send("Has been deleted");
  });
};

exports.update = (req, res) => {
  Press.findByIdAndUpdate(req.params.id, req.body, (err, press) => {
    if (!press) return res.status(404).send("Not found");
    Press.findOne({
      _id: req.params.id
    }).then(press => {
      res.send(press);
    });
  });
};

//
// ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
//

