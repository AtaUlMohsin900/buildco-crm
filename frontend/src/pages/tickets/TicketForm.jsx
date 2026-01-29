import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const TicketForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        subject: '',
        contact: '',
        email: '',
        priority: 'Medium',
        status: 'Open',
        message: ''
    })

    const addTicket = useAppStore((state) => state.addTicket)

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
            // Mock API / Backend call
            addTicket({
                ...formData,
                last_reply: 'Just now'
            })

            await new Promise(resolve => setTimeout(resolve, 500))
            toast.success('Ticket created successfully')
            navigate('/tickets')
        } catch (error) {
            console.error(error)
            toast.error('Failed to create ticket')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title="Open New Ticket"
                parent="Tickets"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subject */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                            className="input"
                            placeholder="Ticket subject..."
                        />
                    </div>

                    {/* Contact Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            placeholder="Your Name"
                        />
                    </div>

                    {/* Contact Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="email@example.com"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Message / Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="message"
                            rows="6"
                            required
                            value={formData.message}
                            onChange={handleChange}
                            className="input"
                            placeholder="Describe the issue..."
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/tickets')}
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
                        <span>{loading ? 'Creating...' : 'Create Ticket'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default TicketForm
