// Main Application Logic for Neighborhood Energy Tracker
class EnergyTracker {
    constructor() {
        this.charts = null;
        this.leaderboard = null;
        this.currentTab = 'dashboard';
        this.selectedHousehold = null;
        this.isLoading = false;
        
        // Initialize application when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    // Initialize the application
    async initialize() {
        try {
            this.showLoading('Initializing EcoVillage Energy Tracker...');
            
            // Initialize core systems
            this.charts = new EnergyCharts();
            this.leaderboard = new LeaderboardSystem();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Load initial data
            await this.loadInitialData();
            
            // Initialize UI components
            this.initializeUI();
            
            this.hideLoading();
            
            console.log('EcoVillage Energy Tracker initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this.showError('Failed to initialize application. Please refresh the page.');
            this.hideLoading();
        }
    }

    // Set up all event listeners
    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Chart controls
        this.setupChartControls();
        
        // Leaderboard controls
        this.setupLeaderboardControls();
        
        // Personal dashboard
        this.setupPersonalDashboard();
        
        // Community features
        this.setupCommunityFeatures();
        
        // Window events
        window.addEventListener('resize', () => {
            if (this.charts) {
                this.charts.resizeCharts();
            }
        });
    }

    // Setup navigation system
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const tabContents = document.querySelectorAll('.tab-content');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = link.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    // Switch between tabs
    switchTab(tabName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
        
        this.currentTab = tabName;
        
        // Trigger tab-specific actions
        this.onTabChange(tabName);
    }

    // Handle tab change events
    onTabChange(tabName) {
        switch(tabName) {
            case 'dashboard':
                this.updateDashboardStats();
                if (this.charts) {
                    setTimeout(() => this.charts.resizeCharts(), 100);
                }
                break;
            case 'leaderboard':
                if (this.leaderboard) {
                    this.leaderboard.updateAllDisplays();
                }
                break;
            case 'household':
                this.updatePersonalStats();
                break;
            case 'community':
                this.updateCommunityStats();
                if (this.charts) {
                    setTimeout(() => this.charts.resizeCharts(), 100);
                }
                break;
        }
    }

    // Setup chart controls
    setupChartControls() {
        const timeRangeSelect = document.getElementById('timeRange');
        if (timeRangeSelect) {
            timeRangeSelect.addEventListener('change', (e) => {
                if (this.charts) {
                    this.charts.updateEnergyTrendChart(e.target.value);
                }
            });
        }
    }

    // Setup leaderboard controls
    setupLeaderboardControls() {
        if (this.leaderboard) {
            this.leaderboard.initialize();
        }
    }

    // Setup personal dashboard
    setupPersonalDashboard() {
        const householdSelect = document.getElementById('householdSelect');
        if (householdSelect) {
            householdSelect.addEventListener('change', (e) => {
                this.selectedHousehold = e.target.value;
                this.updatePersonalStats();
            });
        }
    }

    // Setup community features
    setupCommunityFeatures() {
        const addHouseholdForm = document.getElementById('addHouseholdForm');
        if (addHouseholdForm) {
            addHouseholdForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAddHousehold();
            });
        }
    }

    // Load initial data and populate tables
    async loadInitialData() {
        try {
            // Populate achievements table
            await this.populateAchievements();
            
            // Populate households table
            await this.populateHouseholds();
            
            // Populate energy usage data
            await this.populateEnergyUsage();
            
            // Populate leaderboard scores
            await this.populateLeaderboardScores();
            
            // Update UI with loaded data
            await this.refreshAllData();
            
        } catch (error) {
            console.error('Error loading initial data:', error);
            // Continue with sample data if API fails
        }
    }

    // Populate achievements data
    async populateAchievements() {
        try {
            const achievements = [
                {
                    name: 'Green Rookie',
                    description: 'Complete your first week of energy tracking',
                    badge_icon: 'fas fa-seedling',
                    badge_color: '#22c55e',
                    criteria_type: 'consistency',
                    criteria_value: 7,
                    rarity: 'common',
                    points: 10
                },
                {
                    name: 'Energy Saver',
                    description: 'Reduce energy usage by 10% compared to last month',
                    badge_icon: 'fas fa-bolt',
                    badge_color: '#f59e0b',
                    criteria_type: 'savings',
                    criteria_value: 10,
                    rarity: 'common',
                    points: 25
                },
                {
                    name: 'Consistency Champion',
                    description: 'Maintain energy goals for 30 consecutive days',
                    badge_icon: 'fas fa-calendar-check',
                    badge_color: '#3b82f6',
                    criteria_type: 'consistency',
                    criteria_value: 30,
                    rarity: 'rare',
                    points: 50
                },
                {
                    name: 'Super Saver',
                    description: 'Achieve 25% energy reduction in a month',
                    badge_icon: 'fas fa-star',
                    badge_color: '#8b5cf6',
                    criteria_type: 'savings',
                    criteria_value: 25,
                    rarity: 'epic',
                    points: 100
                },
                {
                    name: 'Community Leader',
                    description: 'Stay in top 3 for 3 consecutive months',
                    badge_icon: 'fas fa-trophy',
                    badge_color: '#f59e0b',
                    criteria_type: 'community',
                    criteria_value: 3,
                    rarity: 'legendary',
                    points: 200
                }
            ];

            for (const achievement of achievements) {
                await this.createRecord('achievements', achievement);
            }
        } catch (error) {
            console.log('Achievements may already exist or API not available:', error.message);
        }
    }

    // Populate households data
    async populateHouseholds() {
        try {
            const households = [
                {
                    name: 'Green Family',
                    address: '123 Oak Street',
                    household_size: 4,
                    join_date: new Date('2024-01-15').getTime(),
                    is_active: true,
                    current_streak: 45,
                    best_streak: 52,
                    total_badges: 4,
                    badge_list: ['green_rookie', 'energy_saver', 'consistency_champion', 'super_saver']
                },
                {
                    name: 'Eco Warriors',
                    address: '456 Pine Avenue',
                    household_size: 3,
                    join_date: new Date('2024-02-01').getTime(),
                    is_active: true,
                    current_streak: 38,
                    best_streak: 38,
                    total_badges: 3,
                    badge_list: ['green_rookie', 'energy_saver', 'consistency_champion']
                },
                {
                    name: 'Solar Home',
                    address: '789 Maple Drive',
                    household_size: 2,
                    join_date: new Date('2024-01-20').getTime(),
                    is_active: true,
                    current_streak: 29,
                    best_streak: 35,
                    total_badges: 3,
                    badge_list: ['green_rookie', 'energy_saver', 'efficiency_expert']
                },
                {
                    name: 'Energy Savers',
                    address: '321 Cedar Lane',
                    household_size: 5,
                    join_date: new Date('2024-03-01').getTime(),
                    is_active: true,
                    current_streak: 23,
                    best_streak: 28,
                    total_badges: 2,
                    badge_list: ['green_rookie', 'energy_saver']
                },
                {
                    name: 'Planet Lovers',
                    address: '654 Birch Court',
                    household_size: 3,
                    join_date: new Date('2024-02-15').getTime(),
                    is_active: true,
                    current_streak: 19,
                    best_streak: 24,
                    total_badges: 2,
                    badge_list: ['green_rookie', 'energy_saver']
                }
            ];

            for (const household of households) {
                await this.createRecord('households', household);
            }
        } catch (error) {
            console.log('Households may already exist or API not available:', error.message);
        }
    }

    // Populate energy usage data
    async populateEnergyUsage() {
        try {
            // Generate sample energy usage data for the last 3 months
            const households = await this.getRecords('households');
            const currentDate = new Date();
            
            for (const household of households.data || []) {
                for (let i = 0; i < 90; i++) {
                    const usageDate = new Date(currentDate);
                    usageDate.setDate(usageDate.getDate() - i);
                    
                    const baseUsage = 35 + (Math.random() * 20); // Random usage between 35-55 kWh
                    const seasonalFactor = 1 + (Math.sin((i / 30) * Math.PI) * 0.3); // Seasonal variation
                    const kwhUsed = Math.round((baseUsage * seasonalFactor) * 100) / 100;
                    
                    const usageRecord = {
                        household_id: household.id,
                        date: usageDate.getTime(),
                        kwh_used: kwhUsed,
                        cost: Math.round(kwhUsed * 0.12 * 100) / 100, // $0.12 per kWh
                        temperature: 20 + (Math.random() * 15), // 20-35°C
                        usage_type: 'daily',
                        efficiency_score: Math.round(Math.max(60, 100 - (kwhUsed - 35) * 2)),
                        comparison_avg: 45,
                        savings_vs_avg: Math.round((45 - kwhUsed) * 100) / 100
                    };
                    
                    await this.createRecord('energy_usage', usageRecord);
                }
            }
        } catch (error) {
            console.log('Energy usage data may already exist or API not available:', error.message);
        }
    }

    // Populate leaderboard scores
    async populateLeaderboardScores() {
        try {
            const households = await this.getRecords('households');
            const currentDate = new Date();
            
            for (const household of households.data || []) {
                const score = {
                    household_id: household.id,
                    period_type: 'monthly',
                    period_start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getTime(),
                    total_score: 2000 + Math.floor(Math.random() * 1000),
                    energy_savings: 80 + Math.floor(Math.random() * 80),
                    efficiency_score: 70 + Math.floor(Math.random() * 25),
                    consistency_score: 65 + Math.floor(Math.random() * 30),
                    bonus_points: household.total_badges * 25,
                    rank_position: 0 // Will be calculated
                };
                
                await this.createRecord('leaderboard_scores', score);
            }
        } catch (error) {
            console.log('Leaderboard scores may already exist or API not available:', error.message);
        }
    }

    // API helper methods
    async getRecords(tableName, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `tables/${tableName}${queryString ? '?' + queryString : ''}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${tableName}:`, error);
            return { data: [], total: 0 };
        }
    }

    async createRecord(tableName, data) {
        try {
            const response = await fetch(`tables/${tableName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error creating ${tableName} record:`, error);
            throw error;
        }
    }

    async updateRecord(tableName, recordId, data) {
        try {
            const response = await fetch(`tables/${tableName}/${recordId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error updating ${tableName} record:`, error);
            throw error;
        }
    }

    // UI Update Methods
    async refreshAllData() {
        try {
            // Load households for dropdown
            await this.loadHouseholdsDropdown();
            
            // Update dashboard stats
            await this.updateDashboardStats();
            
            // Update community stats
            await this.updateCommunityStats();
            
        } catch (error) {
            console.error('Error refreshing data:', error);
        }
    }

    async loadHouseholdsDropdown() {
        try {
            const households = await this.getRecords('households');
            const select = document.getElementById('householdSelect');
            
            if (select && households.data) {
                select.innerHTML = '<option value="">Choose your house...</option>';
                
                households.data.forEach(household => {
                    const option = document.createElement('option');
                    option.value = household.id;
                    option.textContent = `${household.name} - ${household.address}`;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading households dropdown:', error);
        }
    }

    async updateDashboardStats() {
        try {
            const households = await this.getRecords('households');
            const energyUsage = await this.getRecords('energy_usage', { limit: 1000 });
            
            // Calculate total consumption
            const totalConsumption = energyUsage.data?.reduce((sum, record) => sum + record.kwh_used, 0) || 0;
            document.getElementById('totalConsumption').textContent = `${Math.round(totalConsumption).toLocaleString()} kWh`;
            
            // Calculate total savings (estimated)
            const totalSavings = energyUsage.data?.reduce((sum, record) => sum + Math.max(0, record.savings_vs_avg * 0.12), 0) || 0;
            document.getElementById('totalSavings').textContent = `$${Math.round(totalSavings).toLocaleString()}`;
            
            // Calculate CO2 reduction (1 kWh ≈ 0.4 kg CO2)
            const co2Reduced = Math.round(totalSavings * 0.4);
            document.getElementById('co2Reduced').textContent = `${co2Reduced.toLocaleString()} kg`;
            
            // Active households
            const activeHouseholds = households.data?.filter(h => h.is_active).length || 0;
            document.getElementById('activeHouseholds').textContent = activeHouseholds;
            
            // Update top performers
            this.updateTopPerformers(households.data || []);
            
        } catch (error) {
            console.error('Error updating dashboard stats:', error);
        }
    }

    updateTopPerformers(households) {
        const container = document.getElementById('topPerformers');
        if (!container) return;
        
        // Sort by current streak and take top 5
        const topPerformers = households
            .sort((a, b) => b.current_streak - a.current_streak)
            .slice(0, 5);
        
        container.innerHTML = topPerformers.map((household, index) => `
            <div class="performer-card">
                <div class="performer-rank">${index + 1}</div>
                <h3>${household.name}</h3>
                <p>${household.current_streak} day streak</p>
            </div>
        `).join('');
    }

    async updatePersonalStats() {
        if (!this.selectedHousehold) {
            document.getElementById('personalStats').style.display = 'none';
            return;
        }
        
        try {
            const household = await this.getRecord('households', this.selectedHousehold);
            const energyUsage = await this.getRecords('energy_usage', { 
                household_id: this.selectedHousehold,
                limit: 30 
            });
            
            document.getElementById('personalStats').style.display = 'block';
            
            // Calculate monthly usage
            const monthlyUsage = energyUsage.data?.reduce((sum, record) => sum + record.kwh_used, 0) || 0;
            document.getElementById('personalUsage').textContent = `${Math.round(monthlyUsage)} kWh`;
            
            // Mock rank calculation
            const rank = Math.floor(Math.random() * 10) + 1;
            document.getElementById('personalRank').textContent = `#${rank}`;
            
            // Update goal progress
            const goalProgress = Math.min(100, (monthlyUsage / 35) * 100);
            document.getElementById('goalProgress').textContent = `${Math.round(goalProgress)}%`;
            document.getElementById('goalProgressBar').style.width = `${goalProgress}%`;
            
        } catch (error) {
            console.error('Error updating personal stats:', error);
        }
    }

    async updateCommunityStats() {
        try {
            // Calculate community impact
            const totalSavings = 2840; // Mock total kWh saved
            
            // Trees planted equivalent (1 tree ≈ 21 kg CO2/year, 1 kWh ≈ 0.4 kg CO2)
            const treesEquivalent = Math.round((totalSavings * 0.4) / 21);
            document.getElementById('treesEquivalent').textContent = treesEquivalent;
            
            // Cars off road equivalent (1 car ≈ 4.6 tons CO2/year)
            const carsOffRoad = Math.round((totalSavings * 0.4) / 4600 * 100) / 100;
            document.getElementById('carsOffRoad').textContent = carsOffRoad;
            
        } catch (error) {
            console.error('Error updating community stats:', error);
        }
    }

    async getRecord(tableName, recordId) {
        try {
            const response = await fetch(`tables/${tableName}/${recordId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${tableName} record:`, error);
            return null;
        }
    }

    // Handle adding new household
    async handleAddHousehold() {
        try {
            this.showLoading('Adding household...');
            
            const formData = new FormData(document.getElementById('addHouseholdForm'));
            const householdData = {
                name: formData.get('householdName'),
                address: formData.get('householdAddress'),
                household_size: parseInt(formData.get('householdSize')),
                join_date: Date.now(),
                is_active: true,
                current_streak: 0,
                best_streak: 0,
                total_badges: 0,
                badge_list: []
            };
            
            await this.createRecord('households', householdData);
            
            // Refresh the households dropdown
            await this.loadHouseholdsDropdown();
            
            // Reset form
            document.getElementById('addHouseholdForm').reset();
            
            // Show success message
            this.showSuccess('Household added successfully!');
            
            this.hideLoading();
        } catch (error) {
            console.error('Error adding household:', error);
            this.showError('Failed to add household. Please try again.');
            this.hideLoading();
        }
    }

    // Initialize UI components
    initializeUI() {
        // Set initial tab if specified in URL hash
        const hash = window.location.hash.replace('#', '');
        if (hash && ['dashboard', 'leaderboard', 'household', 'community'].includes(hash)) {
            this.switchTab(hash);
        }
        
        // Update URL hash when switching tabs
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-link')) {
                const tab = e.target.getAttribute('data-tab');
                window.location.hash = tab;
            }
        });
    }

    // Utility methods for UI feedback
    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('loadingOverlay');
        const messageEl = overlay.querySelector('p');
        if (messageEl) messageEl.textContent = message;
        overlay.classList.add('show');
        this.isLoading = true;
    }

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.remove('show');
        this.isLoading = false;
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10001;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background: #10b981;
    }
    
    .notification-error {
        background: #ef4444;
    }
    
    .notification-info {
        background: #3b82f6;
    }
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Initialize the application
window.energyTracker = new EnergyTracker();

function sendCarNotification() {
  const destinationInput = document.getElementById("destination");
  const destination = destinationInput.value.trim();

  if (destination === "") {
    alert("Please enter a destination!");
    return;
  }

  const notifList = document.getElementById("notifList");
  const li = document.createElement("li");

  const message = `🚗 Car is heading towards: ${destination}`;
  const time = new Date().toLocaleTimeString();

  li.innerHTML = `${message} <span>${time}</span>`;
  notifList.prepend(li);

  destinationInput.value = ""; // clear input
}
