import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h1 className="text-9xl font-extrabold text-primary-500">404</h1>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Page not found</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>
                <div className="mt-8">
                    <Link
                        to="/dashboard"
                        className="btn-primary inline-flex items-center"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
