import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { syncToSheets } from '../utils/syncService'

export const useClientStore = create(
    persist(
        (set) => ({
            clients: [
                {
                    id: 1,
                    company: 'Acme Corp',
                    contact: 'John Doe',
                    email: 'john@acme.com',
                    phone: '+1 555-0123',
                    status: 'Active',
                    projects: 3,
                    due: 1250.00
                },
                {
                    id: 2,
                    company: 'Globex Inc',
                    contact: 'Jane Smith',
                    email: 'jane@globex.com',
                    phone: '+1 555-0124',
                    status: 'Active',
                    projects: 1,
                    due: 0.00
                },
                {
                    id: 3,
                    company: 'Soylent Corp',
                    contact: 'Alice Johnson',
                    email: 'alice@soylent.com',
                    phone: '+1 555-0125',
                    status: 'Inactive',
                    projects: 0,
                    due: 450.50
                },
            ],
            addClient: (client) => set((state) => {
                const newClient = { ...client, id: state.clients.length + 1, projects: 0, due: 0.00 };
                
                // Sync to Google Sheets
                syncToSheets('clients', newClient);

                return {
                    clients: [...state.clients, newClient]
                };
            }),
            updateClient: (id, updatedData) => set((state) => ({
                clients: state.clients.map((client) => 
                    client.id === id ? { ...client, ...updatedData } : client
                )
            })),
            deleteClient: (id) => set((state) => ({
                clients: state.clients.filter((client) => client.id !== id)
            })),
        }),
        {
            name: 'buildco-client-store',
        }
    )
)
