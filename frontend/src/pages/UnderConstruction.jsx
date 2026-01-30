import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiTool } from 'react-icons/fi'

const UnderConstruction = ({ title = "Under Construction" }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6 text-primary-600 dark:text-primary-400">
                <FiTool size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
                We're currently building this feature to help you manage your business better.
                Please check back soon for updates!
            </p>
            <button
                onClick={() => navigate(-1)}
                className="btn-primary flex items-center space-x-2"
            >
                <FiArrowLeft />
                <span>Go Back</span>
            </button>
        </div>
    )
}

export default UnderConstruction
