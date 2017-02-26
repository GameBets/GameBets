var gith = require('gith').create(6000);
var exec = require('child_process').exec;

gith({
  repo: 'GameBets/GameBets'
}).on('all', function(payload){
  console.log("push received");
  exec('/home/angel/GameBets/hook/hook.sh', function(err, stdout, stderr){
    if (err) return err;
    console.log(stdout);
    console.log('git deployed to branch ' + payload.branch);
  });
});
