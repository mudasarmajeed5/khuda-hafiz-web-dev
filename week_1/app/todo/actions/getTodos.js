"use server"
import connectDB from "@/utils/connection";
import MiniAppTasks from "@/models/tasks";
export const getTodos = async () => {
    try {
        await connectDB();
        const allTodos = await MiniAppTasks.find({}).sort({ createdAt: -1 });
        const plainDoc = JSON.parse(JSON.stringify(allTodos));
        return { success: true, data: plainDoc }
    } catch (error) {
        return { success: false, error: error.message }
    }
}