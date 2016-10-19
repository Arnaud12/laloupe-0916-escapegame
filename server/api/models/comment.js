import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    commentaire: String
});

let model = mongoose.model('comment', commentSchema);

export default class comment {

    findAll(req, res) {
        model.find({}, (err, comments) => {
            if (err) {
                res.sendStatus(403);
            } else {
                res.json(comments);
            }
        });
    }

    findById(req, res) {
        model.findById(req.params.id, (err, comment) => {
            if (err || !comment) {
                res.sendStatus(403);
            } else {
                res.json(comment);
            }
        });
    }

    create(req, res) {
        model.create({
                commentaire: req.body.commentaire
            },
            (err, comment) => {
                if (err) {
                    res.status(500).send(err.message);
                } else {
                    res.json(comment);
                }
            });
    }

    update(req, res) {
        model.update({
            _id: req.params.id
        }, {
            commentaire: req.body.commentaire
        }, (err, comment) => {
            if (err || !comment) {
                res.status(500).send(err.message);
            } else {
                res.json(comment);
            }
        });
    }

    delete(req, res) {
        model.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                res.status(500).send(err.message);
            } else {
                res.sendStatus(200);
            }
        });
    }
}
