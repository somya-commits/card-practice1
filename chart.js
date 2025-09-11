// Chart.js Configuration and Management
class EnergyCharts {
    constructor() {
        this.charts = {};
        this.chartColors = {
            primary: '#10b981',
            secondary: '#3b82f6',
            accent: '#f59e0b',
            warning: '#ef4444',
            success: '#22c55e',
            info: '#06b6d4',
            purple: '#8b5cf6',
            pink: '#ec4899',
            gradient: {
                primary: ['#10b981', '#34d399'],
                secondary: ['#3b82f6', '#60a5fa'],
                accent: ['#f59e0b', '#fbbf24'],
                warning: ['#ef4444', '#f87171']
            }
        };
        this.initializeCharts();
    }

    // Initialize all charts
    initializeCharts() {
        this.createEnergyTrendChart();
        this.createEnergyDistributionChart();
        this.createPersonalChart();
        this.createCommunityChart();
    }

    // Create gradient for charts
    createGradient(ctx, color1, color2, direction = 'vertical') {
        const gradient = direction === 'vertical' 
            ? ctx.createLinearGradient(0, 0, 0, ctx.canvas.height)
            : ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
        
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        return gradient;
    }

    // Energy Trend Chart (Line Chart)
    createEnergyTrendChart() {
        const ctx = document.getElementById('energyTrendChart');
        if (!ctx) return;

        // Generate sample data for the last 3 months
        const labels = [];
        const currentDate = new Date();
        for (let i = 89; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        }

        // Sample data with seasonal variations
        const communityData = labels.map((_, index) => {
            const baseUsage = 45 + Math.sin(index * 0.1) * 10; // Seasonal variation
            const randomVariation = (Math.random() - 0.5) * 8;
            return Math.max(20, baseUsage + randomVariation);
        });

        const myHomeData = labels.map((_, index) => {
            const baseUsage = 38 + Math.sin(index * 0.12) * 8; // Slightly different pattern
            const randomVariation = (Math.random() - 0.5) * 6;
            return Math.max(15, baseUsage + randomVariation);
        });

        const targetData = labels.map(() => 35); // Target line

        this.charts.energyTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Community Average',
                        data: communityData,
                        borderColor: this.chartColors.secondary,
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointRadius: 0,
                        pointHoverRadius: 6,
                        pointHoverBorderWidth: 3,
                        pointHoverBorderColor: '#ffffff',
                    },
                    {
                        label: 'My Home',
                        data: myHomeData,
                        borderColor: this.chartColors.primary,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        borderWidth: 3,
                        fill: '+1',
                        tension: 0.4,
                        pointRadius: 2,
                        pointBackgroundColor: this.chartColors.primary,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        pointHoverBorderWidth: 3,
                    },
                    {
                        label: 'Target',
                        data: targetData,
                        borderColor: this.chartColors.accent,
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        borderDash: [10, 5],
                        fill: false,
                        pointRadius: 0,
                        pointHoverRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index'
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toFixed(1)} kWh`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Date',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            }
                        },
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 8,
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Energy Usage (kWh)',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            }
                        },
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            callback: function(value) {
                                return value + ' kWh';
                            }
                        }
                    }
                }
            }
        });
    }

    // Energy Distribution Chart (Doughnut Chart)
    createEnergyDistributionChart() {
        const ctx = document.getElementById('energyDistributionChart');
        if (!ctx) return;

        const data = [35, 25, 20, 15, 5];
        const labels = ['Heating/Cooling', 'Lighting', 'Appliances', 'Water Heating', 'Other'];
        const colors = [
            this.chartColors.primary,
            this.chartColors.secondary,
            this.chartColors.accent,
            this.chartColors.purple,
            this.chartColors.pink
        ];

        this.charts.energyDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 0,
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${context.label}: ${percentage}% (${context.parsed} kWh)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Personal Energy Chart
    createPersonalChart() {
        const ctx = document.getElementById('personalChart');
        if (!ctx) return;

        // Generate data for last 12 months
        const months = [];
        const currentDate = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
        }

        const personalUsage = [52, 48, 45, 42, 38, 35, 32, 34, 38, 42, 46, 50];
        const personalTarget = months.map(() => 40);

        this.charts.personal = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Actual Usage',
                        data: personalUsage,
                        backgroundColor: personalUsage.map(value => 
                            value <= 40 ? this.chartColors.success : this.chartColors.warning
                        ),
                        borderColor: personalUsage.map(value => 
                            value <= 40 ? this.chartColors.success : this.chartColors.warning
                        ),
                        borderWidth: 2,
                        borderRadius: 6,
                        borderSkipped: false,
                    },
                    {
                        label: 'Target',
                        data: personalTarget,
                        type: 'line',
                        borderColor: this.chartColors.accent,
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        borderDash: [8, 4],
                        fill: false,
                        pointRadius: 4,
                        pointBackgroundColor: this.chartColors.accent,
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.type === 'line') {
                                    return `${context.dataset.label}: ${context.parsed.y} kWh (target)`;
                                }
                                return `${context.dataset.label}: ${context.parsed.y} kWh`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Energy Usage (kWh)',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            }
                        },
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    // Community Comparison Chart
    createCommunityChart() {
        const ctx = document.getElementById('communityChart');
        if (!ctx) return;

        const households = [
            'Green Family', 'Eco Warriors', 'Solar Home', 'Energy Savers', 'Planet Lovers',
            'Sustainable Living', 'Carbon Neutral', 'Nature First', 'Clean Energy', 'Earth Friends'
        ];

        const currentUsage = [28, 32, 35, 38, 41, 43, 45, 48, 52, 55];
        const lastYearUsage = [45, 48, 50, 52, 55, 58, 60, 62, 65, 68];

        this.charts.community = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: households,
                datasets: [
                    {
                        label: 'Current Month',
                        data: currentUsage,
                        backgroundColor: this.chartColors.primary,
                        borderColor: this.chartColors.primary,
                        borderWidth: 2,
                        borderRadius: 4,
                        borderSkipped: false,
                    },
                    {
                        label: 'Same Month Last Year',
                        data: lastYearUsage,
                        backgroundColor: this.chartColors.secondary,
                        borderColor: this.chartColors.secondary,
                        borderWidth: 2,
                        borderRadius: 4,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(17, 24, 39, 0.9)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#374151',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                const savings = context.dataset.label === 'Current Month' 
                                    ? lastYearUsage[context.dataIndex] - context.parsed.y
                                    : 0;
                                
                                if (savings > 0) {
                                    return [`${context.dataset.label}: ${context.parsed.y} kWh`, 
                                           `Savings: ${savings.toFixed(1)} kWh`];
                                }
                                return `${context.dataset.label}: ${context.parsed.y} kWh`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxRotation: 45,
                            font: {
                                family: 'Inter',
                                size: 10
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Energy Usage (kWh)',
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: '600'
                            }
                        },
                        grid: {
                            color: 'rgba(229, 231, 235, 0.5)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            }
                        }
                    }
                }
            }
        });
    }

    // Update chart data based on time range selection
    updateEnergyTrendChart(timeRange) {
        if (!this.charts.energyTrend) return;

        const chart = this.charts.energyTrend;
        const days = parseInt(timeRange);
        
        // Generate new labels
        const labels = [];
        const currentDate = new Date();
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            
            if (days <= 7) {
                labels.push(date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }));
            } else if (days <= 30) {
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            } else {
                labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            }
        }

        // Generate new data with appropriate patterns
        const communityData = labels.map((_, index) => {
            const baseUsage = 45 + Math.sin(index * (0.1 * (90 / days))) * 10;
            const randomVariation = (Math.random() - 0.5) * 8;
            return Math.max(20, baseUsage + randomVariation);
        });

        const myHomeData = labels.map((_, index) => {
            const baseUsage = 38 + Math.sin(index * (0.12 * (90 / days))) * 8;
            const randomVariation = (Math.random() - 0.5) * 6;
            return Math.max(15, baseUsage + randomVariation);
        });

        const targetData = labels.map(() => 35);

        // Update chart
        chart.data.labels = labels;
        chart.data.datasets[0].data = communityData;
        chart.data.datasets[1].data = myHomeData;
        chart.data.datasets[2].data = targetData;
        
        chart.update('resize');
    }

    // Update leaderboard chart data
    updateLeaderboardChart(period, metric) {
        // This would typically fetch new data based on period and metric
        console.log(`Updating charts for period: ${period}, metric: ${metric}`);
        
        // For demo purposes, we'll just add some animation
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update('active');
            }
        });
    }

    // Destroy all charts (cleanup)
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }

    // Resize all charts
    resizeCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.resize();
            }
        });
    }
}

// Export for use in main.js
window.EnergyCharts = EnergyCharts;
// Handle Connect to Meter
document.getElementById("connectMeterForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const meterId = document.getElementById("meterId").value;
  const apiKey = document.getElementById("apiKey").value;
  const statusDiv = document.getElementById("meterStatus");

  // Simulate API call (replace with real API later)
  if (meterId.trim() !== "") {
    statusDiv.innerHTML = `<p><i class="fas fa-check-circle"></i> Connected to meter <b>${meterId}</b> successfully!</p>`;
    statusDiv.className = "meter-status success";
  } else {
    statusDiv.innerHTML = `<p><i class="fas fa-times-circle"></i> Please enter a valid Meter ID.</p>`;
    statusDiv.className = "meter-status error";
  }
});
