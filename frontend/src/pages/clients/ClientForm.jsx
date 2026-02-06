import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useClientStore } from '../../store/clientStore'

const ClientForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id
    
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        company: '',
        contact: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active',
    })

    const { addClient, updateClient, clients } = useClientStore()

    useEffect(() => {
        if (isEditMode) {
            const clientToEdit = clients.find(c => c.id === parseInt(id))
            if (clientToEdit) {
                setFormData({
                    company: clientToEdit.company || '',
                    contact: clientToEdit.contact || '',
                    email: clientToEdit.email || '',
                    phone: clientToEdit.phone || '',
                    address: clientToEdit.address || '',
                    status: clientToEdit.status || 'Active',
                })
            } else {
                toast.error('Client not found')
                navigate('/clients')
            }
        }
    }, [id, isEditMode, clients, navigate])

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
            await new Promise((resolve) => setTimeout(resolve, 500)) // Small delay for UX
            
            if (isEditMode) {
                updateClient(parseInt(id), formData)
                toast.success('Client updated successfully')
            } else {
                addClient(formData)
                toast.success('Client created successfully')
            }
            
            navigate('/clients')
        } catch (error) {
            toast.error(isEditMode ? 'Failed to update client' : 'Failed to create client')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title={isEditMode ? 'Edit Client' : 'New Client'}
                parent="Clients"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter company name"
                        />
                    </div>

                    {/* Contact Person */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Primary Contact <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="contact"
                            required
                            value={formData.contact}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter contact person name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter email address"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter phone number"
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Address
                        </label>
                        <textarea
                            name="address"
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            className="input"
                            placeholder="Enter full address"
                        />
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/clients')}
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
                        <span>{loading ? 'Saving...' : (isEditMode ? 'Update Client' : 'Save Client')}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ClientForm
