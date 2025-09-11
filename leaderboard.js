// Leaderboard and Gamification System
class LeaderboardSystem {
    constructor() {
        this.achievements = [];
        this.leaderboardData = [];
        this.currentPeriod = 'monthly';
        this.currentMetric = 'savings';
        this.initializeAchievements();
        this.initializeLeaderboard();
    }

    // Initialize achievement system
    initializeAchievements() {
        this.achievements = [
            {
                id: 'first_week',
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
                id: 'energy_saver',
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
                id: 'consistency_champion',
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
                id: 'super_saver',
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
                id: 'efficiency_expert',
                name: 'Efficiency Expert',
                description: 'Maintain 90%+ efficiency score for a month',
                badge_icon: 'fas fa-medal',
                badge_color: '#10b981',
                criteria_type: 'efficiency',
                criteria_value: 90,
                rarity: 'epic',
                points: 75
            },
            {
                id: 'community_leader',
                name: 'Community Leader',
                description: 'Stay in top 3 for 3 consecutive months',
                badge_icon: 'fas fa-trophy',
                badge_color: '#f59e0b',
                criteria_type: 'community',
                criteria_value: 3,
                rarity: 'legendary',
                points: 200
            },
            {
                id: 'eco_warrior',
                name: 'Eco Warrior',
                description: 'Reduce CO₂ emissions by 500kg in a year',
                badge_icon: 'fas fa-leaf',
                badge_color: '#16a34a',
                criteria_type: 'savings',
                criteria_value: 500,
                rarity: 'legendary',
                points: 300
            },
            {
                id: 'perfect_month',
                name: 'Perfect Month',
                description: 'Stay under target every single day for a month',
                badge_icon: 'fas fa-crown',
                badge_color: '#ffd700',
                criteria_type: 'efficiency',
                criteria_value: 100,
                rarity: 'legendary',
                points: 250
            }
        ];
    }

    // Initialize leaderboard with sample data
    initializeLeaderboard() {
        this.leaderboardData = [
            {
                id: '1',
                household_name: 'Green Family',
                address: '123 Oak Street',
                total_score: 2850,
                energy_savings: 145.5,
                efficiency_score: 92,
                consistency_score: 88,
                current_streak: 45,
                badges: ['first_week', 'energy_saver', 'consistency_champion', 'super_saver'],
                rank: 1,
                monthly_change: +2
            },
            {
                id: '2',
                household_name: 'Eco Warriors',
                address: '456 Pine Avenue',
                total_score: 2720,
                energy_savings: 138.2,
                efficiency_score: 89,
                consistency_score: 91,
                current_streak: 38,
                badges: ['first_week', 'energy_saver', 'consistency_champion'],
                rank: 2,
                monthly_change: -1
            },
            {
                id: '3',
                household_name: 'Solar Home',
                address: '789 Maple Drive',
                total_score: 2650,
                energy_savings: 132.8,
                efficiency_score: 87,
                consistency_score: 85,
                current_streak: 29,
                badges: ['first_week', 'energy_saver', 'efficiency_expert'],
                rank: 3,
                monthly_change: +1
            },
            {
                id: '4',
                household_name: 'Energy Savers',
                address: '321 Cedar Lane',
                total_score: 2480,
                energy_savings: 125.4,
                efficiency_score: 84,
                consistency_score: 82,
                current_streak: 23,
                badges: ['first_week', 'energy_saver'],
                rank: 4,
                monthly_change: 0
            },
            {
                id: '5',
                household_name: 'Planet Lovers',
                address: '654 Birch Court',
                total_score: 2350,
                energy_savings: 118.7,
                efficiency_score: 81,
                consistency_score: 79,
                current_streak: 19,
                badges: ['first_week', 'energy_saver'],
                rank: 5,
                monthly_change: -2
            },
            {
                id: '6',
                household_name: 'Sustainable Living',
                address: '987 Elm Street',
                total_score: 2220,
                energy_savings: 112.3,
                efficiency_score: 78,
                consistency_score: 76,
                current_streak: 15,
                badges: ['first_week'],
                rank: 6,
                monthly_change: +1
            },
            {
                id: '7',
                household_name: 'Carbon Neutral',
                address: '147 Spruce Way',
                total_score: 2100,
                energy_savings: 106.8,
                efficiency_score: 76,
                consistency_score: 74,
                current_streak: 12,
                badges: ['first_week'],
                rank: 7,
                monthly_change: -1
            },
            {
                id: '8',
                household_name: 'Nature First',
                address: '258 Willow Road',
                total_score: 1980,
                energy_savings: 101.2,
                efficiency_score: 73,
                consistency_score: 71,
                current_streak: 8,
                badges: ['first_week'],
                rank: 8,
                monthly_change: 0
            },
            {
                id: '9',
                household_name: 'Clean Energy',
                address: '369 Aspen Place',
                total_score: 1850,
                energy_savings: 95.6,
                efficiency_score: 70,
                consistency_score: 68,
                current_streak: 5,
                badges: [],
                rank: 9,
                monthly_change: +2
            },
            {
                id: '10',
                household_name: 'Earth Friends',
                address: '741 Poplar Street',
                total_score: 1720,
                energy_savings: 89.4,
                efficiency_score: 67,
                consistency_score: 65,
                current_streak: 3,
                badges: [],
                rank: 10,
                monthly_change: -1
            }
        ];
    }

    // Calculate scoring based on different metrics
    calculateScore(household, metric = 'overall') {
        let score = 0;
        
        switch(metric) {
            case 'savings':
                score = household.energy_savings * 10;
                break;
            case 'efficiency':
                score = household.efficiency_score * 20;
                break;
            case 'consistency':
                score = household.consistency_score * 15;
                break;
            case 'overall':
            default:
                // Weighted scoring system
                score = (household.energy_savings * 10) + 
                       (household.efficiency_score * 8) + 
                       (household.consistency_score * 6) + 
                       (household.current_streak * 5) +
                       (household.badges.length * 25);
                break;
        }

        return Math.round(score);
    }

    // Update podium display
    updatePodium() {
        const sortedData = [...this.leaderboardData].sort((a, b) => {
            const scoreA = this.calculateScore(a, this.currentMetric);
            const scoreB = this.calculateScore(b, this.currentMetric);
            return scoreB - scoreA;
        });

        // Update podium positions
        if (sortedData.length >= 3) {
            document.getElementById('first-place-name').textContent = sortedData[0].household_name;
            document.getElementById('first-place-score').textContent = `${sortedData[0].energy_savings} kWh saved`;
            
            document.getElementById('second-place-name').textContent = sortedData[1].household_name;
            document.getElementById('second-place-score').textContent = `${sortedData[1].energy_savings} kWh saved`;
            
            document.getElementById('third-place-name').textContent = sortedData[2].household_name;
            document.getElementById('third-place-score').textContent = `${sortedData[2].energy_savings} kWh saved`;
        }
    }

    // Update leaderboard table
    updateLeaderboardTable() {
        const tbody = document.getElementById('leaderboardBody');
        if (!tbody) return;

        const sortedData = [...this.leaderboardData].sort((a, b) => {
            const scoreA = this.calculateScore(a, this.currentMetric);
            const scoreB = this.calculateScore(b, this.currentMetric);
            return scoreB - scoreA;
        });

        tbody.innerHTML = '';

        sortedData.forEach((household, index) => {
            const row = document.createElement('tr');
            const currentRank = index + 1;
            const rankChange = household.rank - currentRank;
            
            // Rank change indicator
            let rankChangeIcon = '';
            let rankChangeClass = '';
            if (rankChange > 0) {
                rankChangeIcon = `<i class="fas fa-arrow-up text-green-500"></i>`;
                rankChangeClass = 'text-green-500';
            } else if (rankChange < 0) {
                rankChangeIcon = `<i class="fas fa-arrow-down text-red-500"></i>`;
                rankChangeClass = 'text-red-500';
            } else {
                rankChangeIcon = `<i class="fas fa-minus text-gray-400"></i>`;
                rankChangeClass = 'text-gray-400';
            }

            // Generate badges HTML
            const badgesHtml = household.badges.map(badgeId => {
                const achievement = this.achievements.find(a => a.id === badgeId);
                if (achievement) {
                    return `<span class="badge ${achievement.rarity}" title="${achievement.description}">
                        <i class="${achievement.badge_icon}"></i>
                    </span>`;
                }
                return '';
            }).join('');

            // Streak display
            const streakHtml = household.current_streak > 0 
                ? `<span class="streak-badge">${household.current_streak} days</span>`
                : '<span class="text-gray-400">-</span>';

            row.innerHTML = `
                <td class="rank-cell">
                    #${currentRank}
                    <span class="${rankChangeClass} ml-2">${rankChangeIcon}</span>
                </td>
                <td>
                    <div class="household-info">
                        <div class="font-semibold">${household.household_name}</div>
                        <div class="text-sm text-gray-500">${household.address}</div>
                    </div>
                </td>
                <td class="font-semibold">${this.calculateScore(household, this.currentMetric).toLocaleString()}</td>
                <td>
                    <div class="badges-cell">${badgesHtml}</div>
                </td>
                <td>${streakHtml}</td>
            `;

            tbody.appendChild(row);
        });
    }

    // Update achievements display
    updateAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;

        achievementsGrid.innerHTML = '';

        this.achievements.forEach(achievement => {
            const isEarned = this.leaderboardData.some(household => 
                household.badges.includes(achievement.id)
            );

            const card = document.createElement('div');
            card.className = `achievement-card ${isEarned ? 'earned' : ''}`;
            
            card.innerHTML = `
                <div class="achievement-icon" style="background: linear-gradient(135deg, ${achievement.badge_color}, ${this.lightenColor(achievement.badge_color, 20)})">
                    <i class="${achievement.badge_icon}"></i>
                </div>
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                <div class="achievement-footer">
                    <span class="achievement-points">+${achievement.points} pts</span>
                    <span class="badge ${achievement.rarity}">${achievement.rarity}</span>
                </div>
            `;

            achievementsGrid.appendChild(card);
        });
    }

    // Helper function to lighten colors
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // Award achievement to household
    awardAchievement(householdId, achievementId) {
        const household = this.leaderboardData.find(h => h.id === householdId);
        const achievement = this.achievements.find(a => a.id === achievementId);
        
        if (household && achievement && !household.badges.includes(achievementId)) {
            household.badges.push(achievementId);
            
            // Show achievement notification
            this.showAchievementNotification(achievement);
            
            // Update displays
            this.updateLeaderboardTable();
            this.updateAchievements();
            
            return true;
        }
        return false;
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <div class="achievement-icon" style="background: ${achievement.badge_color}">
                    <i class="${achievement.badge_icon}"></i>
                </div>
                <div class="achievement-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.name}</p>
                    <span>+${achievement.points} points</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Check for new achievements
    checkAchievements(household) {
        this.achievements.forEach(achievement => {
            if (household.badges.includes(achievement.id)) return;
            
            let earned = false;
            
            switch(achievement.criteria_type) {
                case 'savings':
                    earned = household.energy_savings >= achievement.criteria_value;
                    break;
                case 'efficiency':
                    earned = household.efficiency_score >= achievement.criteria_value;
                    break;
                case 'consistency':
                    earned = household.current_streak >= achievement.criteria_value;
                    break;
                case 'community':
                    earned = household.rank <= achievement.criteria_value;
                    break;
            }
            
            if (earned) {
                this.awardAchievement(household.id, achievement.id);
            }
        });
    }

    // Update leaderboard period
    updatePeriod(period) {
        this.currentPeriod = period;
        // In a real app, this would fetch new data from the API
        this.updateAllDisplays();
    }

    // Update leaderboard metric
    updateMetric(metric) {
        this.currentMetric = metric;
        this.updateAllDisplays();
    }

    // Update all leaderboard displays
    updateAllDisplays() {
        this.updatePodium();
        this.updateLeaderboardTable();
        this.updateAchievements();
    }

    // Initialize leaderboard system
    initialize() {
        this.updateAllDisplays();
        
        // Set up event listeners for period and metric changes
        const periodSelect = document.getElementById('leaderboardPeriod');
        const metricSelect = document.getElementById('leaderboardMetric');
        
        if (periodSelect) {
            periodSelect.addEventListener('change', (e) => {
                this.updatePeriod(e.target.value);
            });
        }
        
        if (metricSelect) {
            metricSelect.addEventListener('change', (e) => {
                this.updateMetric(e.target.value);
            });
        }
    }
}

// Add CSS for achievement notifications
const achievementStyles = `
    .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        padding: 20px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }
    
    .achievement-notification.show {
        transform: translateX(0);
    }
    
    .achievement-notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .achievement-notification .achievement-icon {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
    }
    
    .achievement-text h4 {
        margin: 0 0 5px 0;
        font-size: 14px;
        font-weight: 600;
        color: #10b981;
    }
    
    .achievement-text p {
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: 600;
        color: #1f2937;
    }
    
    .achievement-text span {
        font-size: 12px;
        color: #6b7280;
        font-weight: 500;
    }
    
    .streak-badge {
        background: linear-gradient(135deg, #10b981, #34d399);
        color: white;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
    }
    
    .household-info {
        min-width: 150px;
    }
    
    .achievement-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = achievementStyles;
document.head.appendChild(styleSheet);

// Export for use in main.js
window.LeaderboardSystem = LeaderboardSystem;
