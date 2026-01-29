const PageHeader = ({ title, parent, action }) => {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 animate-fade-in">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                {parent && (
                    <nav className="flex text-sm text-gray-500 mt-1">
                        <span>{parent}</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{title}</span>
                    </nav>
                )}
            </div>
            {action && <div>{action}</div>}
        </div>
    )
}

export default PageHeader
