// Встроенная база тем
const TOPICS_DATA = {
    "topics": [
        {
            "id": 1,
            "name": "Профессии",
            "category": "classic",
            "words": ["Врач", "Учитель", "Повар", "Программист", "Строитель", "Водитель", "Актер", "Художник", "Полицейский", "Пожарный"]
        },
        {
            "id": 2,
            "name": "Животные",
            "category": "classic", 
            "words": ["Лев", "Слон", "Обезьяна", "Дельфин", "Орел", "Кит", "Змея", "Паук", "Тигр", "Медведь"]
        },
        {
            "id": 3,
            "name": "Фильмы",
            "category": "culture",
            "words": ["Титаник", "Матрица", "Гарри Поттер", "Властелин Колец", "Звездные Войны", "Король Лев", "Пираты Карибского моря", "Форсаж"]
        },
        {
            "id": 4,
            "name": "Еда",
            "category": "fun",
            "words": ["Пицца", "Суши", "Бургер", "Салат", "Суп", "Мороженое", "Шоколад", "Сыр", "Паста", "Стейк"]
        },
        {
            "id": 5, 
            "name": "Спорт",
            "category": "classic",
            "words": ["Футбол", "Баскетбол", "Теннис", "Плавание", "Бег", "Йога", "Бокс", "Гольф", "Хоккей", "Волейбол"]
        },
        {
            "id": 6,
            "name": "Города",
            "category": "classic",
            "words": ["Москва", "Париж", "Лондон", "Токио", "Нью-Йорк", "Рим", "Дубай", "Сидней", "Берлин", "Прага"]
        },
        {
            "id": 7,
            "name": "Технологии",
            "category": "science", 
            "words": ["Смартфон", "Компьютер", "Робот", "Дрон", "Виртуальная реальность", "Искусственный интеллект", "Блокчейн", "Гаджет"]
        },
        {
            "id": 8,
            "name": "Музыка",
            "category": "culture",
            "words": ["Гитара", "Пианино", "Барабаны", "Скрипка", "Опера", "Рок", "Джаз", "Классика", "Хип-хоп", "Электроника"]
        },
        {
            "id": 9,
            "name": "Природа",
            "category": "science",
            "words": ["Лес", "Океан", "Гора", "Река", "Водопад", "Пустыня", "Вулкан", "Айсберг", "Джунгли", "Саванна"]
        },
        {
            "id": 10,
            "name": "Супергерои",
            "category": "fun",
            "words": ["Супермен", "Бэтмен", "Человек-паук", "Железный человек", "Чудо-женщина", "Капитан Америка", "Тор", "Халк"]
        },
        {
            "id": 11,
            "name": "Страны",
            "category": "classic",
            "words": ["Россия", "США", "Китай", "Япония", "Германия", "Франция", "Италия", "Испания", "Канада", "Австралия"]
        },
        {
            "id": 12,
            "name": "Хобби",
            "category": "fun",
            "words": ["Рисование", "Фотография", "Кулинария", "Садоводство", "Чтение", "Игры", "Рыбалка", "Танцы", "Пение", "Путешествия"]
        }
    ]
};

class SpyGame {
    constructor() {
        this.topics = [];
        this.selectedTopic = null;
        this.currentWord = '';
        this.players = [];
        this.spies = [];
        this.gameTimer = null;
        this.timeLeft = 0;
        this.lastTimeUpdate = 0;
        this.isMobile = this.checkMobile();
        this.currentPlayerIndex = 0;
        this.timeUpShown = false;
        this.rolesVisible = false;
        
        this.initializeElements();
        this.loadTopics();
        this.setupEventListeners();
        this.setupMobileEvents();
        
        this.animateTimer();
    }

    checkMobile() {
        return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initializeElements() {
        // Основные элементы
        this.topicsGrid = document.getElementById('topicsGrid');
        this.searchInput = document.getElementById('searchInput');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.selectedTopicName = document.getElementById('selectedTopicName');
        this.startGameBtn = document.getElementById('startGameBtn');
        this.gameScreen = document.getElementById('gameScreen');
        this.secretWord = document.getElementById('secretWord');
        this.newGameBtn = document.getElementById('newGameBtn');
        
        // Настройки игры
        this.playersCountInput = document.getElementById('playersCount');
        this.spiesCountInput = document.getElementById('spiesCount');
        this.gameTimerSelect = document.getElementById('gameTimer');
        this.timerDisplay = document.getElementById('timerDisplay');
        this.playersCountDisplay = document.getElementById('playersCountDisplay');
        this.spiesCountDisplay = document.getElementById('spiesCountDisplay');
        this.gameTopicDisplay = document.getElementById('gameTopicDisplay');
        
        // Элементы ввода никнеймов
        this.nicknamesScreen = document.getElementById('nicknamesScreen');
        this.currentPlayerNumber = document.getElementById('currentPlayerNumber');
        this.totalPlayers = document.getElementById('totalPlayers');
        this.nicknameInput = document.getElementById('nicknameInput');
        this.addPlayerBtn = document.getElementById('addPlayerBtn');
        this.playersListNicknames = document.getElementById('playersListNicknames');
        this.startRoleAssignmentBtn = document.getElementById('startRoleAssignmentBtn');
        this.backToSetupBtn = document.getElementById('backToSetupBtn');
        
        // Элементы показа ролей
        this.roleScreen = document.getElementById('roleScreen');
        this.currentPlayerName = document.getElementById('currentPlayerName');
        this.rolePlayerCurrent = document.getElementById('rolePlayerCurrent');
        this.rolePlayerTotal = document.getElementById('rolePlayerTotal');
        this.roleDisplay = document.getElementById('roleDisplay');
        
        // Игровые элементы
        this.playersListGame = document.getElementById('playersListGame');
        this.toggleRolesBtn = document.getElementById('toggleRolesBtn');
        this.endGameBtn = document.getElementById('endGameBtn');
        
        // Мобильные элементы
        this.mobileCategorySelect = document.getElementById('mobileCategorySelect');
        
        // Добавляем класс для плавного таймера
        if (this.timerDisplay) {
            this.timerDisplay.classList.add('smooth');
        }
    }

    // === ЗАГРУЗКА ТЕМ ===
    loadTopics() {
        try {
            this.topics = TOPICS_DATA.topics;
            this.renderTopics();
            console.log('✅ Темы загружены:', this.topics.length);
        } catch (error) {
            console.error('❌ Ошибка загрузки тем:', error);
            this.topicsGrid.innerHTML = '<p>❌ Ошибка загрузки тем</p>';
        }
    }

    renderTopics(filteredTopics = null) {
        const topicsToRender = filteredTopics || this.topics;
        
        if (!this.topicsGrid) {
            console.error('❌ topicsGrid не найден');
            return;
        }

        if (topicsToRender.length === 0) {
            this.topicsGrid.innerHTML = '<p>😔 Темы не найдены</p>';
            return;
        }

        this.topicsGrid.innerHTML = topicsToRender.map(topic => `
            <div class="topic-card ${this.selectedTopic?.id === topic.id ? 'selected' : ''}" 
                 data-id="${topic.id}">
                <div class="topic-name">${topic.name}</div>
                <div class="topic-category">${this.getCategoryName(topic.category)}</div>
            </div>
        `).join('');

        // Добавляем обработчики для карточек тем
        this.topicsGrid.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => this.selectTopic(card.dataset.id));
        });

        console.log('✅ Темы отображены:', topicsToRender.length);
    }

    getCategoryName(category) {
        const categories = {
            'all': 'Все',
            'classic': 'Классические',
            'culture': 'Культура', 
            'science': 'Наука',
            'fun': 'Веселые'
        };
        return categories[category] || category;
    }

    selectTopic(topicId) {
        this.selectedTopic = this.topics.find(topic => topic.id == topicId);
        if (this.selectedTopicName) {
            this.selectedTopicName.textContent = this.selectedTopic.name;
        }
        if (this.startGameBtn) {
            this.startGameBtn.disabled = false;
        }
        
        // Обновляем выделение
        this.topicsGrid.querySelectorAll('.topic-card').forEach(card => {
            card.classList.toggle('selected', card.dataset.id == topicId);
        });
        
        if (navigator.vibrate && this.isMobile) {
            navigator.vibrate(50);
        }

        console.log('✅ Тема выбрана:', this.selectedTopic.name);
    }

    filterTopics(category, searchTerm = '') {
        let filtered = this.topics;

        if (category !== 'all') {
            filtered = filtered.filter(topic => topic.category === category);
        }

        if (searchTerm) {
            filtered = filtered.filter(topic => 
                topic.name.toLowerCase().includes(searchTerm)
            );
        }

        this.renderTopics(filtered);
    }

    // === ПЛАВНЫЙ ТАЙМЕР ===
    startTimer(minutes) {
        this.timeLeft = minutes * 60 * 1000;
        this.lastTimeUpdate = performance.now();
        this.timeUpShown = false;
        
        this.updateTimerDisplay();
        
        const animate = (currentTime) => {
            if (!this.gameTimer) return;
            
            const delta = currentTime - this.lastTimeUpdate;
            this.lastTimeUpdate = currentTime;
            
            this.timeLeft -= delta;
            
            if (this.timeLeft <= 0) {
                this.timeLeft = 0;
                this.timeUp();
                return;
            }
            
            this.updateTimerDisplay();
            this.gameTimer = requestAnimationFrame(animate);
        };
        
        this.gameTimer = requestAnimationFrame(animate);
    }

    updateTimerDisplay() {
        if (!this.timerDisplay) return;
        
        const totalSeconds = Math.floor(this.timeLeft / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((this.timeLeft % 1000) / 10);
        
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
        
        this.timerDisplay.textContent = timeString;
        
        this.timerDisplay.classList.remove('warning', 'critical');
        if (totalSeconds <= 30) {
            this.timerDisplay.classList.add('critical');
        } else if (totalSeconds <= 60) {
            this.timerDisplay.classList.add('warning');
        }
    }

    timeUp() {
        if (this.gameTimer) {
            cancelAnimationFrame(this.gameTimer);
            this.gameTimer = null;
        }
        
        if (this.timerDisplay) {
            this.timerDisplay.textContent = '00:00.00';
            this.timerDisplay.classList.add('critical');
        }
        
        if (!this.timeUpShown) {
            this.timeUpShown = true;
            this.showTimeUpModal();
        }
        
        if (navigator.vibrate) {
            navigator.vibrate([500, 200, 500, 200, 500]);
        }
    }

    showTimeUpModal() {
        const spiesNames = this.spies && this.spies.length > 0 
            ? this.spies.map(spy => spy.name).join(', ')
            : 'Не назначены';

        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-title">⏰ Время вышло!</div>
                    <div class="modal-message">
                        Игра завершена. Время истекло!
                        <br><br>
                        Шпионы: ${spiesNames}
                    </div>
                    <div class="modal-buttons">
                        <button id="continueGameBtn" class="secondary-btn">Продолжить просмотр</button>
                        <button id="newGameFromModalBtn" class="primary-btn">Новая игра</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('continueGameBtn').addEventListener('click', () => {
            this.removeModal();
        });
        
        document.getElementById('newGameFromModalBtn').addEventListener('click', () => {
            this.removeModal();
            this.resetGame();
        });
        
        document.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.removeModal();
            }
        });
    }

    removeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    animateTimer() {
        requestAnimationFrame(() => this.animateTimer());
    }

    // === УПРАВЛЕНИЕ РОЛЯМИ ===
    toggleRoles() {
        this.rolesVisible = !this.rolesVisible;
        
        if (this.rolesVisible) {
            this.showAllRoles();
            this.toggleRolesBtn.textContent = '🙈 Скрыть роли';
            this.toggleRolesBtn.classList.remove('secondary-btn');
            this.toggleRolesBtn.classList.add('danger-btn');
        } else {
            this.hideAllRoles();
            this.toggleRolesBtn.textContent = '👁️ Показать роли';
            this.toggleRolesBtn.classList.remove('danger-btn');
            this.toggleRolesBtn.classList.add('secondary-btn');
        }
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    showAllRoles() {
        if (!this.playersListGame) return;

        this.playersListGame.innerHTML = this.players.map(player => {
            const isSpy = this.spies && this.spies.some(spy => spy.id === player.id);
            return `
                <div class="player-card-game ${isSpy ? 'spy' : 'civilian'}">
                    <div class="player-name-game">${player.name}</div>
                    <div class="player-role-game">${isSpy ? '🕵️ Шпион' : '😊 Мирный'}</div>
                </div>
            `;
        }).join('');
    }

    hideAllRoles() {
        if (!this.playersListGame) return;

        this.playersListGame.innerHTML = this.players.map(player => {
            return `
                <div class="player-card-game hidden-role">
                    <div class="player-name-game">${player.name}</div>
                    <div class="role-placeholder">❓ Роль скрыта</div>
                    <div class="player-role-game hidden">${this.spies && this.spies.some(spy => spy.id === player.id) ? '🕵️ Шпион' : '😊 Мирный'}</div>
                </div>
            `;
        }).join('');
    }

    // === ОСНОВНАЯ ЛОГИКА ИГРЫ ===
    startGame() {
        console.log('🚀 Начинаем игру...', {
            players: this.players,
            spies: this.spies,
            topic: this.selectedTopic,
            word: this.currentWord
        });

        // Проверяем что все данные на месте
        if (!this.players || this.players.length === 0) {
            console.error('❌ Нет игроков для начала игры');
            alert('❌ Не добавлены игроки!');
            return;
        }

        if (!this.selectedTopic) {
            console.error('❌ Не выбрана тема');
            alert('❌ Не выбрана тема!');
            return;
        }

        if (!this.currentWord) {
            console.error('❌ Не выбрано слово');
            alert('❌ Не выбрано слово!');
            return;
        }

        // Обновляем UI
        if (this.playersCountDisplay) {
            this.playersCountDisplay.textContent = this.players.length;
        }
        
        if (this.spiesCountDisplay) {
            this.spiesCountDisplay.textContent = this.spies ? this.spies.length : 0;
        }
        
        if (this.gameTopicDisplay) {
            this.gameTopicDisplay.textContent = this.selectedTopic.name;
        }
        
        // Сбрасываем состояние кнопки ролей
        this.rolesVisible = false;
        if (this.toggleRolesBtn) {
            this.toggleRolesBtn.textContent = '👁️ Показать роли';
            this.toggleRolesBtn.classList.remove('danger-btn');
            this.toggleRolesBtn.classList.add('secondary-btn');
        }
        
        // Отрисовываем список игроков (скрытые роли)
        this.hideAllRoles();
        
        // Запускаем таймер если нужно
        const timerMinutes = parseInt(this.gameTimerSelect.value);
        if (timerMinutes > 0) {
            this.startTimer(timerMinutes);
        } else if (this.timerDisplay) {
            this.timerDisplay.textContent = '⏰ Без таймера';
            this.timerDisplay.style.background = '#6c757d';
        }
        
        // Переключаем на игровой экран
        this.switchToScreen('gameScreen');
        
        console.log('✅ Игра успешно начата!');
    }

    endGame() {
        if (this.gameTimer) {
            cancelAnimationFrame(this.gameTimer);
            this.gameTimer = null;
        }
        
        this.showAllRoles();
        this.showGameEndModal();
    }

    showGameEndModal() {
        const spiesNames = this.spies && this.spies.length > 0 
            ? this.spies.map(spy => spy.name).join(', ')
            : 'Не назначены';
            
        const civiliansCount = this.players ? this.players.length - (this.spies ? this.spies.length : 0) : 0;
        
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-title">🎮 Игра завершена</div>
                    <div class="modal-message">
                        <strong>Шпионы:</strong> ${spiesNames}
                        <br>
                        <strong>Мирные жители:</strong> ${civiliansCount}
                        <br><br>
                        <strong>Загаданное слово:</strong> ${this.currentWord || 'Не выбрано'}
                    </div>
                    <div class="modal-buttons">
                        <button id="viewResultsBtn" class="secondary-btn">Посмотреть результаты</button>
                        <button id="newGameFromEndBtn" class="primary-btn">Новая игра</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('viewResultsBtn').addEventListener('click', () => {
            this.removeModal();
            this.showAllRoles();
        });
        
        document.getElementById('newGameFromEndBtn').addEventListener('click', () => {
            this.removeModal();
            this.resetGame();
        });
        
        document.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.removeModal();
            }
        });
    }

    // === УПРАВЛЕНИЕ ИГРОКАМИ И РОЛЯМИ ===
    startRoleAssignment() {
        const spiesCount = parseInt(this.spiesCountInput.value);
        const playersCount = this.players.length;

        console.log('🎲 Начинаем назначение ролей...', { playersCount, spiesCount });

        // Проверяем что игроков достаточно
        if (playersCount < 3) {
            alert('❌ Необходимо минимум 3 игрока!');
            return;
        }

        if (spiesCount >= playersCount) {
            alert('❌ Количество шпионов должно быть меньше количества игроков!');
            return;
        }

        // Сбрасываем роли
        this.players.forEach(player => player.isSpy = false);
        this.spies = [];
        
        // Случайно выбираем шпионов
        const availablePlayers = [...this.players];
        for (let i = 0; i < spiesCount; i++) {
            if (availablePlayers.length === 0) break;
            const randomIndex = Math.floor(Math.random() * availablePlayers.length);
            const spy = availablePlayers.splice(randomIndex, 1)[0];
            spy.isSpy = true;
            this.spies.push(spy);
        }
        
        // Выбираем случайное слово
        if (this.selectedTopic && this.selectedTopic.words && this.selectedTopic.words.length > 0) {
            const randomIndex = Math.floor(Math.random() * this.selectedTopic.words.length);
            this.currentWord = this.selectedTopic.words[randomIndex];
        } else {
            console.error('❌ Нет слов в выбранной теме');
            alert('❌ В выбранной теме нет слов!');
            return;
        }
        
        console.log('✅ Роли назначены:', {
            spies: this.spies.map(s => s.name),
            word: this.currentWord
        });

        // Начинаем показ ролей
        this.currentPlayerIndex = 0;
        this.showCurrentPlayerRole();
    }

    showCurrentPlayerRole() {
        if (!this.players || this.players.length === 0) {
            console.error('❌ Нет игроков для показа ролей');
            return;
        }

        const player = this.players[this.currentPlayerIndex];
        
        if (this.rolePlayerCurrent) this.rolePlayerCurrent.textContent = this.currentPlayerIndex + 1;
        if (this.rolePlayerTotal) this.rolePlayerTotal.textContent = this.players.length;
        if (this.currentPlayerName) this.currentPlayerName.textContent = player.name;
        
        if (this.roleDisplay) {
            if (player.isSpy) {
                this.roleDisplay.innerHTML = `
                    <div class="role-title spy">🕵️ ВЫ ШПИОН!</div>
                    <p>Вы не знаете загаданное слово</p>
                    <p>Ваша задача - вычислить его и остаться незамеченным</p>
                `;
            } else {
                this.roleDisplay.innerHTML = `
                    <div class="role-title civilian">😊 ВЫ МИРНЫЙ ЖИТЕЛЬ</div>
                    <p>Загаданное слово:</p>
                    <div class="secret-word">${this.currentWord}</div>
                    <p>Ваша задача - найти шпиона, не выдав слово</p>
                `;
            }
        }
        
        this.switchToScreen('roleScreen');
        
        if (navigator.vibrate) {
            navigator.vibrate(player.isSpy ? [200, 100, 200] : [100, 50, 100]);
        }
    }

    showNextPlayerRole() {
        this.currentPlayerIndex++;
        
        if (this.currentPlayerIndex < this.players.length) {
            this.showCurrentPlayerRole();
        } else {
            console.log('✅ Все игроки увидели свои роли, начинаем игру...');
            this.startGame();
        }
    }

    // === ВВОД НИКНЕЙМОВ ===
    startNicknameInput() {
        if (!this.selectedTopic) {
            alert('📱 Сначала выберите тему!');
            return;
        }

        const playersCount = parseInt(this.playersCountInput.value);
        this.players = [];
        
        this.totalPlayers.textContent = playersCount;
        this.currentPlayerNumber.textContent = '1';
        this.nicknameInput.value = '';
        this.nicknameInput.focus();
        this.updatePlayersListNicknames();
        
        this.switchToScreen('nicknamesScreen');
    }

    addPlayer() {
        const nickname = this.nicknameInput.value.trim();
        const playersCount = parseInt(this.playersCountInput.value);
        
        if (!nickname) {
            alert('📝 Введите имя игрока!');
            return;
        }
        
        if (this.players.some(player => player.name.toLowerCase() === nickname.toLowerCase())) {
            alert('❌ Игрок с таким именем уже существует!');
            this.nicknameInput.value = '';
            this.nicknameInput.focus();
            return;
        }
        
        this.players.push({
            id: this.players.length + 1,
            name: nickname,
            isSpy: false
        });
        
        this.currentPlayerNumber.textContent = this.players.length + 1;
        this.nicknameInput.value = '';
        this.nicknameInput.focus();
        this.updatePlayersListNicknames();
        
        if (this.players.length >= playersCount) {
            this.startRoleAssignmentBtn.disabled = false;
            this.nicknameInput.disabled = true;
            this.addPlayerBtn.disabled = true;
        }
        
        if (navigator.vibrate) navigator.vibrate(50);
    }

    updatePlayersListNicknames() {
        this.playersListNicknames.innerHTML = this.players.map((player, index) => `
            <div class="player-nickname-item">
                <span class="player-name">${player.name}</span>
                <button class="remove-player-btn" data-index="${index}">✕</button>
            </div>
        `).join('');
        
        this.playersListNicknames.querySelectorAll('.remove-player-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                this.removePlayer(index);
            });
        });
    }

    removePlayer(index) {
        this.players.splice(index, 1);
        
        this.players.forEach((player, i) => {
            player.id = i + 1;
        });
        
        this.currentPlayerNumber.textContent = this.players.length + 1;
        this.nicknameInput.disabled = false;
        this.addPlayerBtn.disabled = false;
        this.startRoleAssignmentBtn.disabled = this.players.length < parseInt(this.playersCountInput.value);
        this.updatePlayersListNicknames();
        this.nicknameInput.focus();
    }

    backToSetup() {
        this.switchToScreen('gameSetup');
    }

    // === ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ ===
    switchToScreen(screenName) {
        document.querySelector('.game-setup').classList.add('hidden');
        this.nicknamesScreen.classList.add('hidden');
        this.roleScreen.classList.add('hidden');
        this.gameScreen.classList.add('hidden');
        
        switch(screenName) {
            case 'gameSetup':
                document.querySelector('.game-setup').classList.remove('hidden');
                break;
            case 'nicknamesScreen':
                this.nicknamesScreen.classList.remove('hidden');
                break;
            case 'roleScreen':
                this.roleScreen.classList.remove('hidden');
                break;
            case 'gameScreen':
                this.gameScreen.classList.remove('hidden');
                break;
        }
    }

    setupEventListeners() {
        // Фильтрация по категориям (десктоп)
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const category = btn.dataset.category;
                this.filterTopics(category);
                
                // Синхронизируем с мобильным селектором
                if (this.mobileCategorySelect) {
                    this.mobileCategorySelect.value = category;
                }
            });
        });

        // Поиск
        this.searchInput.addEventListener('input', (e) => {
            const currentCategory = document.querySelector('.filter-btn.active')?.dataset.category || 'all';
            this.filterTopics(currentCategory, e.target.value.toLowerCase());
        });

        // Основные кнопки
        this.startGameBtn.addEventListener('click', () => this.startNicknameInput());
        this.newGameBtn.addEventListener('click', () => this.resetGame());

        // Валидация количества игроков
        this.playersCountInput.addEventListener('change', () => this.validateSpiesCount());
        this.spiesCountInput.addEventListener('change', () => this.validateSpiesCount());
        
        // Ввод никнеймов
        this.addPlayerBtn.addEventListener('click', () => this.addPlayer());
        this.nicknameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addPlayer();
        });
        this.startRoleAssignmentBtn.addEventListener('click', () => this.startRoleAssignment());
        this.backToSetupBtn.addEventListener('click', () => this.backToSetup());
        
        // Показ ролей
        this.roleScreen.addEventListener('click', () => this.showNextPlayerRole());
        this.roleScreen.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.showNextPlayerRole();
        });
        
        // Игровые кнопки
        this.toggleRolesBtn.addEventListener('click', () => this.toggleRoles());
        this.endGameBtn.addEventListener('click', () => this.endGame());

        // Предотвращение масштабирования
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    setupMobileEvents() {
        if (this.mobileCategorySelect) {
            this.mobileCategorySelect.addEventListener('change', (e) => {
                this.filterTopics(e.target.value);
            });
        }
    }

    validateSpiesCount() {
        const players = parseInt(this.playersCountInput.value);
        const spies = parseInt(this.spiesCountInput.value);
        
        if (spies >= players) {
            this.spiesCountInput.value = Math.max(1, players - 1);
        }
        
        if (players < 3) {
            this.playersCountInput.value = 3;
        }
    }

    resetGame() {
        if (this.gameTimer) {
            cancelAnimationFrame(this.gameTimer);
            this.gameTimer = null;
        }

        this.selectedTopic = null;
        this.currentWord = '';
        this.players = [];
        this.spies = [];
        this.timeLeft = 0;
        this.currentPlayerIndex = 0;
        this.timeUpShown = false;
        this.rolesVisible = false;
        
        this.selectedTopicName.textContent = '—';
        this.startGameBtn.disabled = true;
        this.searchInput.value = '';
        if (this.timerDisplay) {
            this.timerDisplay.className = 'timer-display smooth';
            this.timerDisplay.textContent = '05:00.00';
        }
        this.nicknameInput.disabled = false;
        this.addPlayerBtn.disabled = false;
        this.startRoleAssignmentBtn.disabled = true;
        
        this.removeModal();
        
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        this.filterBtns[0].classList.add('active');
        if (this.mobileCategorySelect) {
            this.mobileCategorySelect.value = 'all';
        }
        
        this.renderTopics();
        this.switchToScreen('gameSetup');
    }
}

// Запускаем игру когда страница загрузится
document.addEventListener('DOMContentLoaded', () => {
    new SpyGame();
});

window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
});