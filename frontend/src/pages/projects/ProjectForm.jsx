import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'
import { useClientStore } from '../../store/clientStore'

const ProjectForm = () => {
    const navigate = useNavigate()
    const { clients } = useClientStore()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        client: '',
        start_date: '',
        deadline: '',
        status: 'Not Started',
        progress: 0,
        description: '',
        budget: ''
    })

    const addProject = useAppStore((state) => state.addProject)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // In a real app, successful API call would go here
            // const response = await fetch('/api/projects', { method: 'POST', body: JSON.stringify(formData) ... })

            // For now, updating local store
            addProject({
                ...formData,
                progress: parseInt(formData.progress) || 0,
                budget: parseFloat(formData.budget) || 0
            })

            await new Promise(resolve => setTimeout(resolve, 500)) // Simulation
            toast.success('Project created successfully')
            navigate('/projects')
        } catch (error) {
            console.error(error)
            toast.error('Failed to create project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title="New Project"
                parent="Projects"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Project Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g. Website Redesign"
                        />
                    </div>

                    {/* Client */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Client <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="client"
                            required
                            value={formData.client}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">-- Select Client --</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.company}>
                                    {client.company}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Budget
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">Rs.</span>
                            <input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                className="input pl-7"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Start Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="start_date"
                            required
                            value={formData.start_date}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="deadline"
                            required
                            value={formData.deadline}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="On Hold">On Hold</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    {/* Progress */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Progress (%)
                        </label>
                        <input
                            type="number"
                            name="progress"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={handleChange}
                            className="input"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                            className="input"
                            placeholder="Project details..."
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/projects')}
                        className="btn btn-secondary flex items-center space-x-2"
                        disabled={loading}
                    >
                        <FiX />
                        <span>Cancel</span>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary flex items-center space-x-2"
                        disabled={loading}
                    >
                        <FiSave />
                        <span>{loading ? 'Saving...' : 'Save Project'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm
