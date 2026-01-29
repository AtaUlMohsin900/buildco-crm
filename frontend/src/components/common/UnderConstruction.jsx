import { FiTool } from 'react-icons/fi'

const UnderConstruction = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-fade-in">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiTool className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500 max-w-md">
                This module is currently under development. We are working hard to bring this feature to you soon.
            </p>
        </div>
    )
}

export default UnderConstruction
