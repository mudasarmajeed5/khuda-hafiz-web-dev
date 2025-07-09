"use server"
import connectDB from "@/utils/connection";
import MiniAppTasks from "@/models/tasks";

const submitData = async (formData) => {
    try {
        await connectDB();
        const doc = await MiniAppTasks.create({
            title: formData.title,
            priority: formData.priority,
            isCompleted: formData.isCompleted,
        });
        const plainDoc = JSON.parse(JSON.stringify(doc));
        return { success: true, data: plainDoc };
    } catch (error) {
        console.log("Error saving document:", error);
        return { success: false, error: error.message };
    }
};

export default submitData;
