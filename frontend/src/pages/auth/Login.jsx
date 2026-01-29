import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'
import authService from '../../services/authService'
import logo from '../../assets/logo-1.png'

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
})

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const response = await authService.login(data.email, data.password)
            login(response.user, response.token)
            toast.success('Login successful!')
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="animate-fade-in">
            {/* Logo */}
            <div className="text-center mb-8">
                <img src={logo} alt="Buildco CRM" className="w-auto h-16 mb-4 mx-auto" />

                <p className="text-gray-600 mt-2">Sign in to your account</p>
            </div>

            {/* Login Form */}
            <div className="card">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiMail className="text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                {...register('email')}
                                className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                                placeholder="admin@buildco.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-danger-600">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiLock className="text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                                {showPassword ? (
                                    <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                                ) : (
                                    <FiEye className="text-gray-400 hover:text-gray-600" />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-danger-600">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                            Forgot password?
                        </a>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary py-3 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="spinner mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                {/* Demo Credentials */}
                <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-100">
                    <p className="text-xs font-semibold text-primary-900 mb-2">Demo Credentials:</p>
                    <p className="text-xs text-primary-700">Email: admin@buildco.com</p>
                    <p className="text-xs text-primary-700">Password: admin123</p>
                </div>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
                © 2026 Buildco CRM. All rights reserved.
            </p>
        </div>
    )
}

export default Login
