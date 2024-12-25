import { useEffect, useState } from 'react'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserComponent from './components/UserComponent'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <UserComponent />
    </QueryClientProvider>
  )
}

export default App
