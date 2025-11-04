import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, lowercase: true, unique: true},
    cohort: {type: String, enum: ['Year 1', 'Year 2', 'Year 3'], default: 'Year 1'},
    interests: {type: String, default: ""}
}, {timestamps: true})

export default mongoose.models.Student || mongoose.model('Student', studentSchema)