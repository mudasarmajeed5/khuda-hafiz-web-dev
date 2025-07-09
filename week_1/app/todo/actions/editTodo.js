"use server"
import MiniAppTasks from "@/models/tasks";
import connectDB from "@/utils/connection";
export const editTodo = async (_id, form) => {
    try {
        await connectDB();
        const updatedTodo = await MiniAppTasks.findByIdAndUpdate(
            { _id },
            {
                title: form.title,
                priority: form.priority,
                isCompleted: form.isCompleted
            },
            { new: true }
        )
        const data = JSON.parse(JSON.stringify(updatedTodo))
        return { success: true, data }
    } catch (error) {
        return { success: false, error: "Failed to update" + error?.message }
    }
}