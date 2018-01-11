const router = require('express').Router();
const mongojs = require('mongojs');

const db = mongojs('mean-db', ['tasks']);

router.get('/tasks', (req, res, next) => {

	db.tasks.find((err, tasks) => {
		if(err) return next(err);
		res.json(tasks);
	})
	
});


router.get('/tasks/:id', (req, res, next) => {

	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
		if(err) return next(err);
		res.json(task);
	})
	
});

router.post('/tasks', (req, res, next) => {

	const task = req.body;

	if(!task.isDone) {
		res.status(400).json({
			error: 'Bad Data Req.'
		});

	} else {

		db.tasks.save(task, (err, task) => {
			if(err) return next(err);
			res.json(task);
		})
	}
});

router.delete('/tasks/:id', (req, res, next) => {

	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
		if(err) return next(err);
		res.json(result);
	});
});

router.put('/task/:id', (req, res, next) => {

	const task = req.body;

	const updateTask = {};

	if(task.isDone) {
		updateTask.isDone = task.isDone;
	}

	if(task.title) {
		updateTask.title = task.title;
	}

	if(!updateTask) {
		res.status(400).json({
			error: 'Bad Req..'
		})
	} else {

		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
			if(err) return next(err);
			res.json(task);
		})		
	}
})

module.exports = router;
