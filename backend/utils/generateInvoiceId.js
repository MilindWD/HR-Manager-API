const Job = require('../models/Job');

const invoiceIdGenerator = async () => {
    const jobs = await Job.find({});
    let num = 0;
    jobs.forEach(job => {
        num+=job.payments.length;
    })
    console.log(num);
    return num+1;
}

module.exports = {invoiceIdGenerator};