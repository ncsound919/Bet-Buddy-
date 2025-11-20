/**
 * Bet Buddy - Accessible JavaScript
 * Ensures keyboard navigation, screen reader support, and ARIA live regions
 */

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
    
    function init() {
        setupFormHandling();
        setupKeyboardNavigation();
        setupAriaLiveRegions();
        loadBetsFromStorage();
    }
    
    /**
     * Form handling with accessibility features
     */
    function setupFormHandling() {
        const form = document.getElementById('bet-form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!form.checkValidity()) {
                announceToScreenReader('Please fill in all required fields', 'assertive');
                // Focus on first invalid field
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
                return;
            }
            
            // Get form data
            const formData = {
                type: document.getElementById('bet-type').value,
                amount: document.getElementById('bet-amount').value,
                description: document.getElementById('bet-description').value,
                date: document.getElementById('bet-date').value,
                id: Date.now(),
                result: 'pending'
            };
            
            // Save bet
            saveBet(formData);
            
            // Reset form
            form.reset();
            
            // Announce success
            announceToScreenReader('Bet added successfully', 'polite');
            
            // Update display
            displayBets();
            updateStatistics();
            
            // Focus on the new bet in the table
            setTimeout(() => {
                const firstBetRow = document.querySelector('tbody tr:first-child a');
                if (firstBetRow) {
                    firstBetRow.focus();
                }
            }, 100);
        });
    }
    
    /**
     * Enhanced keyboard navigation
     */
    function setupKeyboardNavigation() {
        // Trap focus in modals (if implemented)
        document.addEventListener('keydown', function(e) {
            // Escape key handling for modals
            if (e.key === 'Escape') {
                closeModals();
            }
        });
        
        // Add keyboard shortcuts with proper announcement
        document.addEventListener('keydown', function(e) {
            // Alt+1 to focus on main content
            if (e.altKey && e.key === '1') {
                e.preventDefault();
                const main = document.getElementById('main-content');
                if (main) {
                    main.focus();
                    announceToScreenReader('Jumped to main content', 'polite');
                }
            }
        });
    }
    
    /**
     * Setup ARIA live regions for dynamic updates
     */
    function setupAriaLiveRegions() {
        // Ensure status region exists
        if (!document.getElementById('bet-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'bet-status';
            statusDiv.className = 'sr-only';
            statusDiv.setAttribute('role', 'status');
            statusDiv.setAttribute('aria-live', 'polite');
            statusDiv.setAttribute('aria-atomic', 'true');
            document.body.appendChild(statusDiv);
        }
    }
    
    /**
     * Announce message to screen readers via ARIA live region
     * @param {string} message - Message to announce
     * @param {string} priority - 'polite' or 'assertive'
     */
    function announceToScreenReader(message, priority = 'polite') {
        const statusDiv = document.getElementById('bet-status');
        if (!statusDiv) return;
        
        // Update aria-live priority
        statusDiv.setAttribute('aria-live', priority);
        
        // Clear and set message
        statusDiv.textContent = '';
        setTimeout(() => {
            statusDiv.textContent = message;
        }, 100);
    }
    
    /**
     * Save bet to localStorage
     */
    function saveBet(bet) {
        const bets = getBets();
        bets.push(bet);
        localStorage.setItem('betBuddyBets', JSON.stringify(bets));
    }
    
    /**
     * Get all bets from localStorage
     */
    function getBets() {
        const bets = localStorage.getItem('betBuddyBets');
        return bets ? JSON.parse(bets) : [];
    }
    
    /**
     * Load and display bets from storage
     */
    function loadBetsFromStorage() {
        displayBets();
        updateStatistics();
    }
    
    /**
     * Display bets in table with accessibility features
     */
    function displayBets() {
        const tbody = document.querySelector('table tbody');
        if (!tbody) return;
        
        const bets = getBets();
        
        if (bets.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        <p>No bets recorded yet. Add your first bet above to get started!</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        // Sort bets by date (newest first)
        bets.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        tbody.innerHTML = bets.map(bet => `
            <tr>
                <td>${formatDate(bet.date)}</td>
                <td>${escapeHtml(bet.type)}</td>
                <td>$${parseFloat(bet.amount).toFixed(2)}</td>
                <td>
                    <span class="badge badge-${bet.result}">
                        ${bet.result.charAt(0).toUpperCase() + bet.result.slice(1)}
                    </span>
                </td>
                <td>
                    <button 
                        onclick="editBet(${bet.id})"
                        class="btn-icon"
                        aria-label="Edit bet from ${formatDate(bet.date)}"
                    >
                        <span aria-hidden="true">✏️</span>
                    </button>
                    <button 
                        onclick="deleteBet(${bet.id})"
                        class="btn-icon"
                        aria-label="Delete bet from ${formatDate(bet.date)}"
                    >
                        <span aria-hidden="true">🗑️</span>
                    </button>
                </td>
            </tr>
        `).join('');
    }
    
    /**
     * Update statistics with proper ARIA labels
     */
    function updateStatistics() {
        const bets = getBets();
        const totalBets = bets.length;
        
        // Calculate statistics
        const wins = bets.filter(b => b.result === 'win').length;
        const winRate = totalBets > 0 ? ((wins / totalBets) * 100).toFixed(1) : 0;
        const totalWagered = bets.reduce((sum, bet) => sum + parseFloat(bet.amount), 0);
        
        // Update DOM with proper announcements
        updateStatElement('total-bets-label', totalBets, `${totalBets} total bets`);
        updateStatElement('win-rate-label', `${winRate}%`, `${winRate}% win rate`);
        updateStatElement('total-wagered-label', `$${totalWagered.toFixed(2)}`, `$${totalWagered.toFixed(2)} total wagered`);
        updateStatElement('profit-loss-label', '$0.00', '$0.00 profit or loss');
    }
    
    /**
     * Update statistic element with accessibility
     */
    function updateStatElement(labelId, displayValue, ariaLabel) {
        const label = document.getElementById(labelId);
        if (!label) return;
        
        const valueElement = label.nextElementSibling;
        if (valueElement && valueElement.classList.contains('stat-value')) {
            valueElement.textContent = displayValue;
            valueElement.setAttribute('aria-label', ariaLabel);
        }
    }
    
    /**
     * Delete bet with confirmation
     */
    window.deleteBet = function(id) {
        // Use native confirm for accessibility
        const confirmed = confirm('Are you sure you want to delete this bet?');
        if (!confirmed) return;
        
        let bets = getBets();
        bets = bets.filter(bet => bet.id !== id);
        localStorage.setItem('betBuddyBets', JSON.stringify(bets));
        
        announceToScreenReader('Bet deleted successfully', 'polite');
        displayBets();
        updateStatistics();
    };
    
    /**
     * Edit bet (placeholder)
     */
    window.editBet = function(id) {
        const bets = getBets();
        const bet = bets.find(b => b.id === id);
        if (!bet) return;
        
        // Populate form
        document.getElementById('bet-type').value = bet.type;
        document.getElementById('bet-amount').value = bet.amount;
        document.getElementById('bet-description').value = bet.description || '';
        document.getElementById('bet-date').value = bet.date;
        
        // Announce to screen reader
        announceToScreenReader('Bet loaded in form for editing. Update the fields and submit to save changes.', 'polite');
        
        // Focus on first field
        document.getElementById('bet-type').focus();
        
        // Delete old entry (will be replaced on submit)
        deleteBet(id);
    };
    
    /**
     * Close modals (placeholder for future modals)
     */
    function closeModals() {
        // Placeholder for modal closing logic
    }
    
    /**
     * Utility: Format date for display
     */
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    /**
     * Utility: Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
})();
