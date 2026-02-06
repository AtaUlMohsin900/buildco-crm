import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const EmployeeForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addEmployee, updateEmployee, employees } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        department: '',
        email: '',
        phone: '',
        status: 'Active'
    })

    useEffect(() => {
        if (isEditMode) {
            const employee = employees.find(e => e.id === parseInt(id))
            if (employee) {
                setFormData(employee)
            } else {
                toast.error('Employee not found')
                navigate('/employees')
            }
        }
    }, [id, isEditMode, employees, navigate])

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
            await new Promise((resolve) => setTimeout(resolve, 500))
            
            if (isEditMode) {
                updateEmployee(parseInt(id), formData)
                toast.success('Employee updated successfully')
            } else {
                addEmployee(formData)
                toast.success('Employee added successfully')
            }
            navigate('/employees')
        } catch (error) {
            toast.error('Failed to save employee')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader
                title={isEditMode ? 'Edit Employee' : 'New Employee'}
                parent="Employees"
                action={null}
            />

            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Job Role <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="role"
                            required
                            value={formData.role}
                            onChange={handleChange}
                            className="input"
                            placeholder="e.g. Project Manager"
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="department"
                            required
                            value={formData.department}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">-- Select Department --</option>
                            <option value="Management">Management</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Operations">Operations</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                        </select>
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
                            placeholder="john@buildco.com"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input"
                            placeholder="+1 555-0000"
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
                            <option value="On Leave">On Leave</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/employees')}
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
                        <span>{loading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Save Employee')}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmployeeForm
