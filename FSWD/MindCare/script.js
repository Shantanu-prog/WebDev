
        const appState = {
            currentMood: null,
            journalEntries: [],
            moodHistory: [],
            achievements: {
                firstSteps: false,
                weekWarrior: false,
                moodMaster: false,
                zenMaster: false,
                journalPro: false
            },
            stats: {
                streakDays: 0,
                totalEntries: 0,
                moodCheckins: 0,
                activitiesCompleted: 0,
                lastVisit: null
            }
        };

        // Initialize app on load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
            
            loadFromStorage();
            updateGreeting();
            updateStats();
            checkAchievements();
        });

        // Storage Functions
        function loadFromStorage() {
            const saved = {
                journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
                moodHistory: JSON.parse(localStorage.getItem('moodHistory') || '[]'),
                achievements: JSON.parse(localStorage.getItem('achievements') || JSON.stringify(appState.achievements)),
                stats: JSON.parse(localStorage.getItem('stats') || JSON.stringify(appState.stats))
            };
            
            Object.assign(appState, saved);
            
            // Update streak
            const today = new Date().toDateString();
            if (appState.stats.lastVisit !== today) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                
                if (appState.stats.lastVisit === yesterday.toDateString()) {
                    appState.stats.streakDays++;
                } else if (appState.stats.lastVisit !== today) {
                    appState.stats.streakDays = 1;
                }
                
                appState.stats.lastVisit = today;
                saveToStorage();
            }
            
            displayJournalEntries();
        }

        function saveToStorage() {
            localStorage.setItem('journalEntries', JSON.stringify(appState.journalEntries));
            localStorage.setItem('moodHistory', JSON.stringify(appState.moodHistory));
            localStorage.setItem('achievements', JSON.stringify(appState.achievements));
            localStorage.setItem('stats', JSON.stringify(appState.stats));
        }

        // Greeting based on time
        function updateGreeting() {
            const hour = new Date().getHours();
            let greeting = '';
            let emoji = '';
            
            if (hour < 12) {
                greeting = 'Good Morning!';
                emoji = '🌞';
            } else if (hour < 17) {
                greeting = 'Good Afternoon!';
                emoji = '☀️';
            } else {
                greeting = 'Good Evening!';
                emoji = '🌙';
            }
            
            document.getElementById('greeting').textContent = `${greeting} ${emoji}`;
        }

        // Section Navigation
        function hideAllSections() {
            document.getElementById('dashboard').style.display = 'none';
            document.getElementById('moodTracker').style.display = 'none';
            document.getElementById('activitiesSection').style.display = 'none';
            document.getElementById('journalSection').style.display = 'none';
            document.getElementById('resourcesSection').style.display = 'none';
            document.getElementById('progressSection').style.display = 'none';
        }

        function goHome() {
            hideAllSections();
            document.getElementById('dashboard').style.display = 'grid';
        }

        function showMoodTracker() {
            hideAllSections();
            document.getElementById('moodTracker').style.display = 'block';
            drawMoodChart();
        }

        function showActivities() {
            hideAllSections();
            document.getElementById('activitiesSection').style.display = 'block';
        }

        function showJournal() {
            hideAllSections();
            document.getElementById('journalSection').style.display = 'block';
            document.getElementById('journalSection').classList.add('active');
        }

        function showResources() {
            hideAllSections();
            document.getElementById('resourcesSection').style.display = 'block';
        }

        function showProgress() {
            hideAllSections();
            document.getElementById('progressSection').style.display = 'block';
            updateStats();
        }

        // Mood Tracker
        function selectMood(emoji, mood) {
            // Remove previous selection
            document.querySelectorAll('.mood-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Add selection to clicked button
            event.target.closest('.mood-btn').classList.add('selected');
            
            // Save mood
            const moodEntry = {
                emoji,
                mood,
                date: new Date().toISOString()
            };
            
            appState.moodHistory.push(moodEntry);
            appState.currentMood = mood;
            appState.stats.moodCheckins++;
            
            saveToStorage();
            showToast(`Mood tracked: ${mood} ${emoji}`);
            checkAchievements();
            drawMoodChart();
        }

        function drawMoodChart() {
            const canvas = document.getElementById('moodChart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const width = canvas.width = canvas.offsetWidth;
            const height = canvas.height = canvas.offsetHeight;
            
            // Clear canvas
            ctx.clearRect(0, 0, width, height);
            
            // Get last 7 days of mood data
            const last7Days = appState.moodHistory.slice(-7);
            
            if (last7Days.length === 0) {
                ctx.fillStyle = '#6b7280';
                ctx.font = '16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('No mood data yet. Track your mood to see the chart!', width / 2, height / 2);
                return;
            }
            
            // Draw simple bar chart
            const barWidth = width / 7;
            const moodValues = {
                'Happy': 5,
                'Calm': 4,
                'Tired': 3,
                'Anxious': 2,
                'Sad': 1,
                'Angry': 0
            };
            
            last7Days.forEach((entry, i) => {
                const value = moodValues[entry.mood] || 0;
                const barHeight = (value / 5) * (height - 40);
                const x = i * barWidth + barWidth / 4;
                const y = height - barHeight - 20;
                
                // Draw bar
                const gradient = ctx.createLinearGradient(0, y, 0, height - 20);
                gradient.addColorStop(0, '#667eea');
                gradient.addColorStop(1, '#764ba2');
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth / 2, barHeight);
                
                // Draw emoji
                ctx.font = '20px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(entry.emoji, x + barWidth / 4, y - 10);
                
                // Draw date
                const date = new Date(entry.date);
                ctx.font = '10px sans-serif';
                ctx.fillStyle = '#6b7280';
                ctx.fillText(`${date.getMonth() + 1}/${date.getDate()}`, x + barWidth / 4, height - 5);
            });
        }

        // Journal Functions
        function saveJournalEntry() {
            const textarea = document.getElementById('journalEntry');
            const content = textarea.value.trim();
            
            if (!content) {
                showToast('Please write something before saving!');
                return;
            }
            
            const entry = {
                content,
                date: new Date().toISOString(),
                mood: appState.currentMood || 'Neutral'
            };
            
            appState.journalEntries.unshift(entry);
            appState.stats.totalEntries++;
            saveToStorage();
            
            textarea.value = '';
            displayJournalEntries();
            showToast('Journal entry saved! 📝');
            checkAchievements();
        }

        function displayJournalEntries() {
            const container = document.getElementById('journalEntries');
            if (!container) return;
            
            if (appState.journalEntries.length === 0) {
                container.innerHTML = '<p style="color: var(--text-light);">No entries yet. Start writing to see them here!</p>';
                return;
            }
            
            container.innerHTML = appState.journalEntries.slice(0, 5).map(entry => {
                const date = new Date(entry.date);
                const moodEmoji = getMoodEmoji(entry.mood);
                
                return `
                    <div class="journal-entry">
                        <div class="entry-date">${date.toLocaleDateString()} at ${date.toLocaleTimeString()}</div>
                        <div class="entry-mood">${moodEmoji}</div>
                        <div>${entry.content}</div>
                    </div>
                `;
            }).join('');
        }

        function getMoodEmoji(mood) {
            const moods = {
                'Happy': '😊',
                'Calm': '😌',
                'Sad': '😔',
                'Anxious': '😰',
                'Angry': '😤',
                'Tired': '😴',
                'Neutral': '😐'
            };
            return moods[mood] || '😐';
        }

        // Activities
        function startBreathing() {
            showToast('Starting 4-7-8 breathing exercise... 🫁');
            appState.stats.activitiesCompleted++;
            saveToStorage();
            
            // Create breathing modal
            const modal = document.createElement('div');
            modal.className = 'modal active';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal" onclick="this.parentElement.parentElement.remove()">×</span>
                    <h2>4-7-8 Breathing Exercise</h2>
                    <div class="breathing-circle" id="breathingCircle">
                        Breathe In
                    </div>
                    <p style="text-align: center; color: var(--text-light);">
                        Follow the circle and text for guided breathing
                    </p>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Breathing animation
            const circle = document.getElementById('breathingCircle');
            let phase = 0;
            const phases = ['Breathe In (4s)', 'Hold (7s)', 'Breathe Out (8s)'];
            const durations = [4000, 7000, 8000];
            
            function breathingCycle() {
                circle.textContent = phases[phase];
                setTimeout(() => {
                    phase = (phase + 1) % 3;
                    breathingCycle();
                }, durations[phase]);
            }
            
            breathingCycle();
        }

        function startMeditation() {
            showToast('Starting guided meditation... 🧘‍♀️');
            appState.stats.activitiesCompleted++;
            saveToStorage();
        }

        function playMusic() {
            showToast('Playing calming music... 🎵');
            appState.stats.activitiesCompleted++;
            saveToStorage();
        }

        function showGratitude() {
            const things = prompt('What are 3 things you\'re grateful for today?');
            if (things) {
                showToast('Gratitude recorded! 🙏');
                appState.stats.activitiesCompleted++;
                saveToStorage();
            }
        }

        function showAffirmations() {
            const affirmations = [
                "You are capable of amazing things ✨",
                "You are worthy of love and respect 💜",
                "You have the strength to overcome challenges 💪",
                "Your feelings are valid and important 🌟",
                "You are enough, just as you are 🌈"
            ];
            
            const random = affirmations[Math.floor(Math.random() * affirmations.length)];
            showToast(random);
            appState.stats.activit