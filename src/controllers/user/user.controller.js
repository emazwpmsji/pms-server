const boom = require('boom');
const User = require('../../models/User');

exports.get = (req, res) => {
  const { firstName, lastName, email, city, _id } = req.user;

  const user = { firstName, lastName, email, city, _id };
  res.status(200).send(user);
};

exports.update = (req, res, next) => {
  const { firstName, lastName, email, city } = req.body;

  if (req.params.userId !== req.user._id.toString()) {
    return next(boom.forbidden('Not Allowed'));
  }

  const updatedFields = { firstName, lastName, email, city };
  const options = { runValidators: true };
  User.findOneAndUpdate({ _id: req.params.userId }, updatedFields, options, (err, user) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!user) return next(boom.notFound('User not found'));

    res.sendStatus(204);
  });
};
