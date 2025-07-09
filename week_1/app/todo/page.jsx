"use client"
import { useState, useEffect } from 'react'
import { FaSave, FaSpinner } from "react-icons/fa"
import submitData from './actions/saveTodo';
import { toast } from 'sonner';
import { getTodos } from './actions/getTodos';
import LoadTodos from './components/LoadTodos';
import { deleteTodo } from './actions/deleteTodo';
import { editTodo } from './actions/editTodo';
const TodoApp = () => {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    priority: 'high',
    isCompleted: false
  });
  const [allTodos, setAllTodos] = useState([]);
  const [loading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (editId) {
      const result = await editTodo(editId, form);
      if (result.success) {
        toast.success("Todo updated");
        fetchTodos();
        setIsLoading(false);
        return;
      }
    }
    const result = await submitData(form);
    if (result.success) {
      toast.success("Todo Saved");
      setAllTodos((prev) => [result.data, ...prev])
    } else {
      toast.error(result?.error);
    }
    setIsLoading(false);
    setForm({
      title: "",
      isCompleted: false,
      priority: "medium",
    })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const fetchTodos = async () => {
    const result = await getTodos();
    if (result.success) {
      setAllTodos(result?.data);
    } else {
      toast.error(result.error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);
  const removeTodo = async (_id) => {
    const result = await deleteTodo(_id);
    if (result.success) {
      toast.success(result.message);
      const newTodos = allTodos.filter((item) => item._id !== _id);
      setAllTodos(newTodos);
    }
    else {
      toast.error(result.message)
    }
  }
  const toggleCompleted = async (_id, newStatus) => {
    const targetTodo = allTodos.find((todo) => todo._id === _id);
    if (!targetTodo) return;

    await editTodo(_id, {
      title: targetTodo.title,
      priority: targetTodo.priority,
      isCompleted: newStatus,
    });

    fetchTodos();
  };

  const changeTodo = async (_id) => {
    const foundTodo = allTodos.find((item) => item._id === _id);
    if (foundTodo) {
      setForm({
        title: foundTodo.title,
        priority: foundTodo.priority,
        isCompleted: foundTodo.isCompleted,
      });
      setEditId(_id);
    }
  }

  return (
    <>
      <div className="min-h-[80vh] mt-2 bg-[var(--color-background)] py-6 px-4">
        <div className="max-w-3xl mx-auto space-y-6">

          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-white p-3 rounded-md shadow-sm border"
          >
            <input
              onChange={handleChange}
              type="text"
              name="title"
              value={form.title ?? ""}
              placeholder="Task title"
              className="flex-1 min-w-[150px] border px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
              onChange={handleChange}
              value={form.priority ?? "medium"}
              name="priority"
              className="border px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <button
              disabled={form.title.length<5}
              type="submit"
              className={`${form.title.length < 5 ? "bg-blue-300": "bg-blue-600"} hover:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded-md flex items-center gap-1`}
            >
              {loading ? (
                <>
                  <span>Saving</span>
                  <span className="animate-spin"><FaSpinner size={14} /></span>
                </>
              ) : (
                <>
                  <span>Save</span>
                  <FaSave size={14} />
                </>
              )}
            </button>
          </form>

          <LoadTodos onToggle={toggleCompleted} onEdit={(_id) => changeTodo(_id)} onDelete={(_id) => removeTodo(_id)} todos={allTodos} />
        </div>
      </div>


    </>
  )
}

export default TodoApp