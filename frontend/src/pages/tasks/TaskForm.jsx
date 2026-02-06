import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const TaskForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addTask, updateTask, tasks, projects } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        project: '',
        assignee: '',
        duedate: '',
        status: 'Pending',
        priority: 'Medium'
    })

    useEffect(() => {
        if (isEditMode) {
            const task = tasks.find(t => t.id === parseInt(id))
            if (task) setFormData(task)
        }
    }, [id, isEditMode, tasks])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                updateTask(parseInt(id), formData)
                toast.success('Task updated')
            } else {
                addTask(formData)
                toast.success('Task added')
            }
            navigate('/tasks')
        } catch (error) {
            toast.error('Error saving task')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Task' : 'New Task'} parent="Tasks" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Task Title *</label>
                        <input type="text" name="title" required value={formData.title} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Project</label>
                        <select name="project" value={formData.project} onChange={handleChange} className="input">
                            <option value="">-- Select Project --</option>
                            {projects.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="label">Assignee</label>
                        <input type="text" name="assignee" value={formData.assignee} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Due Date</label>
                        <input type="date" name="duedate" value={formData.duedate} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="input">
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Priority</label>
                        <select name="priority" value={formData.priority} onChange={handleChange} className="input">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/tasks')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Task'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TaskForm
