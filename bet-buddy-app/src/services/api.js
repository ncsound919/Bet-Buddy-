const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'API request failed')
      }

      return data
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async signup(email, password) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request('/auth/logout', { method: 'POST' })
  }

  // Bet endpoints
  async getBets(userId) {
    return this.request(`/bets/${userId}`)
  }

  async createBet(betData) {
    return this.request('/bet', {
      method: 'POST',
      body: JSON.stringify(betData),
    })
  }

  async updateBet(betId, betData) {
    return this.request(`/bet/${betId}`, {
      method: 'PUT',
      body: JSON.stringify(betData),
    })
  }

  async deleteBet(betId) {
    return this.request(`/bet/${betId}`, {
      method: 'DELETE',
    })
  }

  // Insights endpoints
  async getInsights(userId) {
    return this.request(`/insights/${userId}`)
  }
}

export default new ApiService()
