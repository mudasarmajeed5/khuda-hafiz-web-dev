import { Schema, model, models } from "mongoose"

const taskSchema = new Schema({
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true, default: false },
    priority: { type: String, enum: ["high", "medium", "low"], default: "medium", required: true },
},
{ 
    timestamps: true 
}
)
const MiniAppTasks = models.MiniAppTasks || model("MiniAppTasks", taskSchema);

export default MiniAppTasks;