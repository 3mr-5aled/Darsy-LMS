const asynchandler = require("express-async-handler");
const ApiError = require("../utils/apierror");
const Member = require("../models/member");
const addMemberShip = asynchandler(async (req, res , next) => {
  const {owner} = req.query
     const members = await Member.find({grade:req.body.grade,owner})
     if (members.length >= 3) {
         return next(new ApiError("you can't create more than 3 memberships for one grade", 1216,404))
     }   
     const member = await Member.create({...req.body,owner});
     res.status(201).json(member)
})

const updateMemberShip = asynchandler(async (req, res , next) => {
    const {memberId} = req.params;
    const member = await Member.findByIdAndUpdate(memberId,req.body,{new:true});
    if (!member) {
        return next(new ApiError("Member not found", 1216,404))
    }
    res.status(201).json(member)
})

const deleteMemberShip = asynchandler(async (req, res , next) => {
    const {memberId} = req.params;
    const member = await Member.findByIdAndDelete(memberId);
    if (!member) {
        return next(new ApiError("Member not found", 1216,404))
    }
    res.status(201).json(member)
})

const getMemberShip = asynchandler(async (req, res , next) => {
    const {memberId} = req.params;
    const member = await Member.findById(memberId).populate({path:"userId",select:"name credit email phone"})
    if (!member) {
        return next(new ApiError("Member not found", 1216,404))
    }
    res.status(201).json(member)
})

const getAllMemberShip = asynchandler(async (req, res , next) => {
    const grade = req.params.grade;
    const {owner} = req.query
    const member = grade === 'all' ? await Member.find({owner}) : await Member.find({grade,owner})
    if (member.length === 0) {
        return next(new ApiError("Members not found", 1216,404))
    }
    res.status(201).json(member)
})

module.exports = {addMemberShip,deleteMemberShip,updateMemberShip,getAllMemberShip,getMemberShip}

