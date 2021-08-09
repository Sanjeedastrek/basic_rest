const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();


//const comments = [];

let comments = [
  // {
  //   id: '71de83f6-2832-45ae-b126-2b44cabb99ed',
  //   firstName: 'dsdsdsdds',
  //   comment: 'qqqqqqqq'
  // },
  // {
  //   id: 'ec444bbd-2313-487a-8583-c2b33bc6d48b',
  //   firstName: 'xxxxxx',
  //   comment: 'cccccc'
  // },
  // {
  //   id: 'c81fbc47-7db3-4aca-8367-e377f6e49477',
  //   firstName: 'rrrrrrr',
  //   comment: 'gggggggg'
  // }
]
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { comments });
});

//create comment form
router.get('/comment/new', (req, res) => {
  res.render('newComment');
})

//save comment 
router.post('/comment/new', (req, res) => {
  let { firstName, comment } = req.body;
  //res.send(firstName);
  comments.push({ id: uuidv4(), firstName: firstName, comment: comment });
  res.redirect('/');
})

//show comment form 
router.get('/comment/:id', (req, res) => {
  let { id } = req.params;
  // const found = array1.find(element => element > 10);
  let outputComment = comments.find(element => element.id === id)
  res.render('showComment', { outputComment });
})

// edit comment form 
router.get('/comment/:id/edit', (req, res) => {
  let { id } = req.params;

  let outputComment = comments.find(element => element.id === id)
  res.render('editComment', { outputComment });
  //res.send(id) //working
})

//save after edit 
router.patch('/comment/:id/edit', (req, res) => {
  let { id } = req.params;
  let { firstName, comment } = req.body;
  let targettedComment = comments.find(c => c.id === id);
  if (req.body && req.body.firstName) {
    targettedComment.firstName = firstName;
  }
  if (req.body && req.body.comment) {
    targettedComment.comment = comment;
  }

  res.redirect('/');

})

//delete comment (PROBLEM)
router.delete('/comment/:id', (req, res) => {
  let { id } = req.params;

   comments = comments.filter(c => c.id !== id); 
  //this is the main problem, 500 error. 
  //It causes redirection to http://localhost:3000/comment/a7f18f6f-1bac-484f-8192-506b53eef370?_method=DELETE instead of /
  
  //console.log(comments.filter(c => c.id !== id)); //this works & redirects properly

  res.redirect('/');
  // res.send(comments); //ok

})

module.exports = router;
