import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiSave, FiX } from 'react-icons/fi'
import { toast } from 'react-toastify'
import PageHeader from '../../components/common/PageHeader'
import { useAppStore } from '../../store/appStore'

const SupplierForm = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = !!id

    const { addSupplier, updateSupplier, suppliers } = useAppStore()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        category: 'General',
        status: 'Active'
    })

    useEffect(() => {
        if (isEditMode) {
            const supplier = suppliers.find(s => s.id === parseInt(id))
            if (supplier) setFormData(supplier)
        }
    }, [id, isEditMode, suppliers])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEditMode) {
                updateSupplier(parseInt(id), formData)
                toast.success('Supplier updated')
            } else {
                addSupplier(formData)
                toast.success('Supplier added')
            }
            navigate('/suppliers')
        } catch (error) {
            toast.error('Error saving supplier')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="animate-fade-in max-w-4xl mx-auto">
            <PageHeader title={isEditMode ? 'Edit Supplier' : 'New Supplier'} parent="Suppliers" action={null} />
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="label">Supplier Company Name *</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Contact Person</label>
                        <input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="input" />
                    </div>
                    <div>
                        <label className="label">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="input">
                            <option value="General">General</option>
                            <option value="Concrete">Concrete</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                        </select>
                    </div>
                </div>
                <div className="mt-8 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate('/suppliers')} className="btn btn-secondary">Cancel</button>
                    <button type="submit" className="btn btn-primary flex items-center space-x-2" disabled={loading}>
                        <FiSave /><span>{loading ? 'Saving...' : 'Save Supplier'}</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SupplierForm
