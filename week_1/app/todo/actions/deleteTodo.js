"use server"
import connectDB from "@/utils/connection";
import MiniAppTasks from "@/models/tasks";
export const deleteTodo = async (_id) => {
    try {
        await connectDB();
        const deletedTodo = await MiniAppTasks.deleteOne({ _id })
        if (deletedTodo.deletedCount === 1) {
            return { success: true, message: "Todo Deleted" }
        } else {
            return { success: false, message: "Todo doesn't exist" }
        }
    } catch (error) {
        return { success: false, message: error.message }
    }
}