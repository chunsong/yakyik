var ZoneController = require('./ZoneController');
var CommmentController = require('./CommentController');
var ProfileController = require('./ProfileController');

module.exports = {
    comment: CommmentController,
    zone: ZoneController,
    profile: ProfileController
}