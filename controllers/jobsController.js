import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checkPermissions.js';
import mongoose from 'mongoose';

const createJob = async (req, res) => {
    const { position, company } = req.body;

    if (!position || !company) {
        throw new BadRequestError('Please Provide All Values');
    }

    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
};

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
}

const updateJob = async (req, res) => {
    const { id: jobId } = req.params;

    const { company, position } = req.body;

    if (!company || !position) {
        throw new BadRequestError('Please Provide All Values');
    }

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    // check permissions
    // We didn't use save() method because you can use it when you want to use a hook in the model file for example createJWT method in the user model file. save() triggers the hooks but findOneAndUpdate() doesn't. Another reason is if you use save() method, you should write all the fields in the request body. But if you use findOneAndUpdate() method, you can write only the fields that you want to update for example job.position = position; job.company = company; await job.save();

    checkPermissions(req.user, job.createdBy) // We change type of job.createdBy to string in func because it is an object id. It comes from the database.

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(StatusCodes.OK).json({ updatedJob });
}

const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id : ${jobId}`);
    }

    checkPermissions(req.user, job.createdBy);

    await job.deleteOne();
    res.status(StatusCodes.OK).json({ msg: 'Success! Job removed' });
};

const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {$match: {createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
        {$group: { _id: '$status', count: { $sum: 1 } }}
    ]);

    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };
    

    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
        {$group: {
            _id: {
              year: {
                $year: '$createdAt',
              },
              month: {
                $month: '$createdAt',
              },
            },
            count: { $sum: 1 },
          },},
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 },
    ]);


    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
} 

export {
    createJob,
    getAllJobs,
    updateJob,
    deleteJob,
    showStats
}