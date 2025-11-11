  const userName = 'Bibi';
        
        const quotes = {
            morning: [
                "Every morning brings new potential, but if you dwell on the misfortunes of the day before, you tend to overlook tremendous opportunities.",
                "The morning breeze has secrets to tell you. Do not go back to sleep.",
                "Wake up with determination. Go to bed with satisfaction.",
                "Today is a new beginning, a chance to turn your failures into achievements."
            ],
            afternoon: [
                "The afternoon knows what the morning never suspected.",
                "Make each day your masterpiece.",
                "Keep your face always toward the sunshine, and shadows will fall behind you.",
                "You are never too old to set another goal or to dream a new dream."
            ],
            evening: [
                "The evening's the best part of the day. You've done your day's work. Now you can put your feet up and enjoy it.",
                "Twilight is about finding beauty in the simple moments.",
                "Let the evening teach you that every ending has a new beginning.",
                "The sunset is life's way of saying, 'Good job, you survived today.'"
            ],
            night: [
                "Night is the wonderful opportunity to take rest, to forgive, to dream, to smile and to get ready for the next battle.",
                "The night is more alive and more richly colored than the day.",
                "Dream beautiful dreams, and may they all come true.",
                "As the night gets dark, let your worries fade. Sleep peacefully knowing you've done all you can for today."
            ]
        };

        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        function updateTime() {
            const now = new Date();
            const timeDisplay = document.getElementById('timeDisplay');
            const dateDisplay = document.getElementById('dateDisplay');
            
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
            
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        }

        function getTimeOfDay() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 12) return 'morning';
            if (hour >= 12 && hour < 17) return 'afternoon';
            if (hour >= 17 && hour < 21) return 'evening';
            return 'night';
        }

        function startFlow() {
            document.getElementById('intro').classList.add('hidden');
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('mainContent').classList.add('fade-in');
            
            updateTime();
            showGreeting();
            setInterval(updateTime, 1000);
            
            // Update greeting every minute
            setInterval(showGreeting, 60000);
        }

        function showGreeting() {
            const timeOfDay = getTimeOfDay();
            const greeting = document.getElementById('greeting');
            const message = document.getElementById('message');
            const quote = document.getElementById('quote');
            const emoji = document.getElementById('emojiIcon');
            
            // Update body background
            document.body.className = timeOfDay;
            
            const greetings = {
                morning: {
                    text: `Good Morning, ${userName}! ☀️`,
                    message: `Rise and shine, my beautiful ${userName}! ✨ You're the sunshine that brightens my world. May your day be as wonderful and lovely as you are, filled with sweet moments and happiness! 💕`,
                    emoji: "☀️"
                },
                afternoon: {
                    text: `Good Afternoon, ${userName}! 🌤️`,
                    message: `Hello my precious ${userName}! 🌸 I hope your day is going beautifully. Remember, you're amazing and I'm always thinking of you. Keep that gorgeous smile shining! 💗`,
                    emoji: "🌤️"
                },
                evening: {
                    text: `Good Evening, ${userName}! 🌇`,
                    message: `Sweet evening, my darling ${userName}! 🌹 As the day comes to a close, I want you to know how special you are to me. Relax and enjoy this peaceful moment, you deserve all the love in the world! 💖`,
                    emoji: "🌇"
                },
                night: {
                    text: `Good Night, ${userName}! 🌙`,
                    message: `Sweet dreams, my angel ${userName}! 🌟 May your night be filled with peaceful rest and beautiful dreams. You're the last thought on my mind before I sleep. Sleep tight, my love! 💕😴`,
                    emoji: "🌙"
                }
            };
            
            const current = greetings[timeOfDay];
            greeting.textContent = current.text;
            message.textContent = current.message;
            emoji.textContent = current.emoji;
            
            // Random quote
            const randomQuote = quotes[timeOfDay][Math.floor(Math.random() * quotes[timeOfDay].length)];
            quote.textContent = `"${randomQuote}"`;
        }

        function playVoice() {
            const timeOfDay = getTimeOfDay();
            const audioMap = {
                morning: 'morningVoice',
                afternoon: 'afternoonVoice',
                evening: 'eveningVoice',
                night: 'nightVoice'
            };
            
            const audio = document.getElementById(audioMap[timeOfDay]);
            
            if (audio && audio.src) {
                audio.play().catch(e => {
                    alert('Audio playback requires user interaction. Please ensure audio files are available.');
                    console.log('Audio play failed:', e);
                });
            } else {
                alert('Audio file not found. Please add your audio files.');
            }
        }

        function resetApp() {
            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('intro').classList.remove('hidden');
        }

        // Event listeners
        document.getElementById('startBtn').addEventListener('click', startFlow);
        document.getElementById('playBtn').addEventListener('click', playVoice);
        document.getElementById('resetBtn').addEventListener('click', resetApp);

        // Initialize
        createParticles();