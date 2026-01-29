import api from './api'

const ticketService = {
    getAll: async () => {
        const response = await api.get('/tickets')
        return response.data
    },

    getById: async (id) => {
        const response = await api.get(`/tickets/${id}`)
        return response.data
    },

    create: async (data) => {
        const response = await api.post('/tickets', data)
        return response.data
    },

    update: async (id, data) => {
        const response = await api.put(`/tickets/${id}`, data)
        return response.data
    },

    delete: async (id) => {
        const response = await api.delete(`/tickets/${id}`)
        return response.data
    }
}

export default ticketService
