const list = (req,res,next)=>{
  res.json([
    {name: 'bob',age: 18},
    {name: 'jerry',age: 19}
  ])
}

exports.list = list