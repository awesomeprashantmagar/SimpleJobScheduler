var kue = require('kue')
var jobs = kue.createQueue();

//Register new Job
function newJob(name){
    var job = jobs.create("new Job",{
        name:name
    });
    job.on("complete", function(){
      console.log('Job has been completed',jobs.id)  
    }).on("failed", function(){
        console.log('Job has been failed')
    })
    job.save();
}

//Write Processor for new Job
jobs.process("new Job",function(job,done){
    console.log('Job',job.id,'with name',job.data.name,'is done');
    done();
})

//run jobs
setInterval(function(){
    newJob('Send Email')
},3000);