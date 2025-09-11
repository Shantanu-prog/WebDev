 const questions = [
            {
                id: 1,
                text: "What type of work environment do you prefer?",
                options: ["Office/Corporate", "Outdoor/Field", "Work from Home", "Mixed"]
            },
            {
                id: 2,
                text: "Which subject interests you the most?",
                options: ["Mathematics", "Science", "Literature", "Social Studies"]
            },
            {
                id: 3,
                text: "How do you prefer to work?",
                options: ["Independently", "In a team", "Leading others", "Flexible"]
            },
            {
                id: 4,
                text: "What motivates you the most?",
                options: ["Money", "Creativity", "Helping others", "Recognition"]
            },
            {
                id: 5,
                text: "What's your preferred learning style?",
                options: ["Visual", "Hands-on", "Reading/Writing", "Discussion"]
            }
        ];

        let currentQuestion = 0;
        let userResponses = [];

        function startJourney() {
            showSection('profile');
        }

        function showSection(section) {
            // Hide all sections
            document.getElementById('home').style.display = 'none';
            document.getElementById('profile').classList.remove('active');
            document.getElementById('assessment').classList.remove('active');
            document.getElementById('results').classList.remove('active');
            
            // Show selected section
            if (section === 'home') {
                document.getElementById('home').style.display = 'block';
            } else if (section === 'profile') {
                document.getElementById('profile').classList.add('active');
            } else if (section === 'assessment') {
                document.getElementById('assessment').classList.add('active');
            } else if (section === 'results') {
                document.getElementById('results').classList.add('active');
            }
        }

        function selectOption(element, value) {
            // Remove previous selection
            const options = element.parentElement.querySelectorAll('.option');
            options.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked option
            element.classList.add('selected');
            
            // Store the response
            userResponses[currentQuestion] = value;
        }

        function nextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                updateQuestion();
            } else {
                // Show results
                calculateResults();
            }
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                updateQuestion();
            }
        }

        function updateQuestion() {
            const question = questions[currentQuestion];
            document.getElementById('questionText').textContent = question.text;
            
            // Update progress bar
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // Update options
            const optionsContainer = document.querySelector('.options');
            optionsContainer.innerHTML = '';
            question.options.forEach(option => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'option';
                optionDiv.textContent = option;
                optionDiv.onclick = function() { selectOption(this, option); };
                optionsContainer.appendChild(optionDiv);
            });
        }

        function calculateResults() {
            // Simulate calculation
            console.log('User responses:', userResponses);
            
            // Show results section
            showSection('results');
        }

        function downloadReport() {
            alert('Generating PDF report... (This would download a detailed career report)');
        }

        // Handle profile form submission
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const profileData = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                education: document.getElementById('education').value,
                stream: document.getElementById('stream').value,
                interests: []
            };
            
            // Get selected interests
            const checkboxes = document.querySelectorAll('.skill-checkbox input:checked');
            checkboxes.forEach(cb => profileData.interests.push(cb.value));
            
            console.log('Profile Data:', profileData);
            
            // Move to assessment
            showSection('assessment');
        });

        // Initialize
        window.onload = function() {
            // Set up initial state
            updateQuestion();
        };