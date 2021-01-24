var router = express.Router();
var controll = require('./controller');

router.post('/filter',controll.filterStudentResultWithSubjectAndYear);
router.get('/:id',controll.filterStudentResultWithStudentId);
module.exports=router;