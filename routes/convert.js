var express = require('express');
var router = express.Router();
var multer = require('multer')
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename).replace('bin', 'uploads/');
var outDir = path.dirname(require.main.filename).replace('bin', 'uploads');
var sourceDir = path.dirname(require.main.filename).replace('bin', '');

/* UTILITY function*/
function run_cmd(cmd, args, cb, end) {
	var spawn = require('child_process').spawn,
		child = spawn(cmd, args),
		me = this;
	child.stdout.on('data', function(buffer) {
		cb(me, buffer)
	});
	child.stdout.on('end', end);
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({
		error: 'not implemented'
	});
});

/*POST conversion api*/
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './uploads');
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});

var upload = multer({
	storage: storage
}).single('userDoc');

router.post('/', function(req, res) {
	upload(req, res, function(err) {
		if (err)
			return res.json({
				error: 'error uploading file',
				detail: err
			});

		//process files here
		var xconvert = new run_cmd(
			sourceDir + 'doctex.sh', [appDir + req.file.originalname, outDir],
			function(me, buffer) {
				me.stdout += buffer.toString()
			},
			function() {
				console.log(xconvert.stdout);
				//echo outfile
				/*res.json({
					message: 'uploaded',
					result_url: '/result?id=' + req.file.originalname + '.tex'
				});*/
				res.redirect('/result?id=' + req.file.originalname + '.tex');
			}
		);

/*		fs.rename(appDir + req.file.originalname, appDir + req.file.originalname + '.tex', function(err) {
			res.json({
				message: 'uploaded',
				result_url: '/result?id=' + req.file.originalname + '.tex'
			});
		});
*/

	});
});

module.exports = router;