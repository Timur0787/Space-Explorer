require('dotenv').config();

const SYSTEM_PROMPT = `Ты - эксперт по астрономии и планетам Солнечной системы. 
Твоя задача - отвечать на вопросы пользователей о планетах, их характеристиках, 
орбитах, спутниках и других астрономических фактах. Отвечай подробно, но понятно, 
используя научные данные. Если вопрос не связан с планетами, вежливо перенаправь 
разговор на тему астрономии.`;

class AiServise {
  constructor() {
    this.client = null;
    this.initializationError = null;
  }

  async initializeClient() {
    if (this.initializationError) {
      throw this.initializationError;
    }

    if (!this.client) {
      try {
        if (!process.env.GIGACHAT_KEY) {
          const error = new Error('GIGACHAT_KEY не установлен в переменных окружения');
          this.initializationError = error;
          throw error;
        }

        console.log('Initializing GigaChat client...');
        console.log('GIGACHAT_KEY exists:', !!process.env.GIGACHAT_KEY);
        console.log('GIGACHAT_KEY length:', process.env.GIGACHAT_KEY?.length || 0);
        
        // Динамический импорт для лучшей обработки ошибок
        let Gigachat;
        try {
          const gigachatModule = require('gigachat');
          console.log('Gigachat module type:', typeof gigachatModule);
          console.log('Gigachat module keys:', Object.keys(gigachatModule || {}));
          
          // Пробуем разные способы получения конструктора
          Gigachat = gigachatModule.Gigachat || gigachatModule.default || gigachatModule;
          
          if (typeof Gigachat !== 'function') {
            throw new Error(`Gigachat не является функцией. Тип: ${typeof Gigachat}`);
          }
          
          console.log('Gigachat constructor found');
        } catch (requireError) {
          console.error('Failed to require gigachat module:', requireError);
          const error = new Error(`Не удалось загрузить модуль gigachat: ${requireError.message}`);
          this.initializationError = error;
          throw error;
        }

        // Пробуем инициализацию с разными вариантами
        try {
          // Вариант 1: с объектом конфигурации
          this.client = new Gigachat({
            model: 'Gigachat-2',
            credentials: process.env.GIGACHAT_KEY,
          });
          console.log('GigaChat client initialized with config object');
        } catch (initError) {
          console.error('GigaChat constructor error (method 1):', initError.message);
          
          // Вариант 2: прямой ключ
          try {
            this.client = new Gigachat(process.env.GIGACHAT_KEY);
            console.log('GigaChat client initialized with direct key');
          } catch (altError) {
            console.error('GigaChat constructor error (method 2):', altError.message);
            
            // Вариант 3: только credentials
            try {
              this.client = new Gigachat({
                credentials: process.env.GIGACHAT_KEY,
              });
              console.log('GigaChat client initialized with credentials only');
            } catch (thirdError) {
              console.error('GigaChat constructor error (method 3):', thirdError.message);
              const error = new Error(`Не удалось инициализировать клиент GigaChat. Ошибка: ${initError.message}. Проверьте формат API ключа и документацию библиотеки.`);
              this.initializationError = error;
              throw error;
            }
          }
        }
      } catch (error) {
        console.error('Error in initializeClient:', error);
        if (!this.initializationError) {
          this.initializationError = error;
        }
        throw error;
      }
    }
    return this.client;
  }

  async ask(message) {
    try {
      const client = await this.initializeClient();

      const response = await client.chat({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: message },
        ],
      });

      let answer;
      if (response.choices && response.choices.length > 0) {
        answer = response.choices[response.choices.length - 1].message.content;
      } else if (response.message && response.message.content) {
        answer = response.message.content;
      } else if (typeof response === 'string') {
        answer = response;
      } else {
        answer = JSON.stringify(response);
      }

      console.log('AI Response:', answer);
      return answer;
    } catch (error) {
      console.error('AI Service Error:', error);
      console.error('Error details:', error.message, error.stack);

    
      if (error.message.includes('GIGACHAT_KEY')) {
        throw new Error('API ключ GigaChat не настроен');
      }
      if (error.message.includes('credentials') || error.message.includes('auth')) {
        throw new Error('Ошибка аутентификации в GigaChat');
      }
      throw new Error(`Ошибка при обращении к ИИ: ${error.message}`);
    }
  }
}

module.exports = new AiServise();
