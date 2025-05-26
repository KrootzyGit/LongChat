// Username Generator for LongChat
// Generates random usernames using adjectives and nouns

class UsernameGenerator {
    constructor() {
        this.adjectives = [
            'hollow', 'unaccountable', 'rigid', 'auspicious', 'tame', 'faded', 'harmonious', 
            'unequal', 'gusty', 'maniacal', 'magical', 'terrific', 'caring', 'sweltering', 
            'clean', 'flippant', 'spotty', 'protective', 'draconian', 'relevant', 'roomy', 
            'childlike', 'lumpy', 'bloody', 'illustrious', 'toothsome', 'creepy', 'slim', 
            'dramatic', 'remarkable', 'cultured', 'knowledgeable', 'changeable', 'dapper', 
            'spiky', 'ripe', 'grey', 'curvy', 'fantastic', 'weak', 'probable', 'wretched', 
            'guilty', 'bored', 'aquatic', 'defeated', 'helpful', 'second-hand', 'aromatic', 
            'undesirable', 'damaging', 'exotic', 'available', 'violet', 'royal', 'bright', 
            'divergent', 'swift', 'somber', 'tough', 'medical', 'far', 'lyrical', 'utter', 
            'steady', 'sordid', 'present', 'shaky', 'imaginary', 'square', 'diligent', 
            'debonair', 'beneficial', 'trashy', 'tedious', 'inexpensive', 'hesitant', 
            'hurried', 'savory', 'cooperative', 'laughable', 'meek', 'rude', 'rural', 
            'erratic', 'uninterested', 'brave', 'premium', 'mixed', 'significant', 'good', 
            'funny', 'last', 'moaning', 'clear', 'agreeable', 'disturbed', 'voracious', 
            'versed', 'cluttered'
        ];

        this.middleWords = ['ahh']; // 0.1% chance

        this.nouns = [
            'night', 'professor', 'ability', 'organization', 'emotion', 'stranger', 'police', 
            'person', 'article', 'tooth', 'application', 'perception', 'philosophy', 'reading', 
            'camera', 'midnight', 'anxiety', 'manufacturer', 'chocolate', 'sister', 'drawer', 
            'classroom', 'menu', 'wealth', 'reaction', 'bath', 'advice', 'football', 'suggestion', 
            'news', 'mud', 'historian', 'cheek', 'connection', 'oven', 'scene', 'reflection', 
            'audience', 'fortune', 'bonus', 'republic', 'insurance', 'speaker', 'user', 'church', 
            'ad', 'computer', 'medicine', 'fact', 'drama', 'assumption', 'skill', 'chocolate', 
            'arrival', 'ladder', 'description', 'video', 'debt', 'department', 'village', 
            'child', 'tooth', 'county', 'week', 'month', 'committee', 'permission', 'conclusion', 
            'apple', 'location', 'teaching', 'organization', 'tension', 'moment', 'insect', 
            'storage', 'shopping', 'law', 'pollution', 'sir', 'article', 'engineering', 'player', 
            'courage', 'activity', 'literature', 'resource', 'significance', 'departure', 
            'marketing', 'consequence', 'delivery', 'audience', 'son', 'refrigerator', 'loss', 
            'girl', 'penalty', 'personality', 'buyer'
        ];

        this.middleWordChance = 0.001; // 0.1% chance
    }

    // Get random element from array
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Capitalize first letter
    capitalize(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Generate a random username
    generateUsername() {
        const adjective = this.capitalize(this.getRandomElement(this.adjectives));
        const noun = this.capitalize(this.getRandomElement(this.nouns));
        
        // Check for middle word (0.1% chance)
        const shouldIncludeMiddle = Math.random() < this.middleWordChance;
        
        if (shouldIncludeMiddle) {
            const middleWord = this.capitalize(this.getRandomElement(this.middleWords));
            return `${adjective}${middleWord}${noun}`;
        } else {
            return `${adjective}${noun}`;
        }
    }

    // Generate multiple usernames at once
    generateMultiple(count = 5) {
        const usernames = [];
        for (let i = 0; i < count; i++) {
            usernames.push(this.generateUsername());
        }
        return usernames;
    }

    // Check if username has middle word
    hasMiddleWord(username) {
        return this.middleWords.some(middle => 
            username.toLowerCase().includes(middle.toLowerCase())
        );
    }

    // Get username parts for analysis
    analyzeUsername(username) {
        const lowerUsername = username.toLowerCase();
        
        // Check for middle word
        let hasMiddle = false;
        let middleWord = '';
        
        for (const middle of this.middleWords) {
            if (lowerUsername.includes(middle.toLowerCase())) {
                hasMiddle = true;
                middleWord = middle;
                break;
            }
        }
        
        return {
            username,
            hasMiddleWord: hasMiddle,
            middleWord: hasMiddle ? middleWord : null,
            isRare: hasMiddle
        };
    }

    // Generate username with retry logic to avoid duplicates
    generateUniqueUsername(existingUsernames = []) {
        let attempts = 0;
        let username;
        
        do {
            username = this.generateUsername();
            attempts++;
        } while (existingUsernames.includes(username) && attempts < 50);
        
        return username;
    }
}

// Create global instance
const usernameGenerator = new UsernameGenerator();

// Export for use in other files
window.UsernameGenerator = usernameGenerator;