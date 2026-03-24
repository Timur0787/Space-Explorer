const AiServise = require('../services/ai.service')

class AiController{
    static async askAi(req, res){
        try {
            const { question } = req.body;
            
            if (!question || !question.trim()) {
                return res.status(400).json({ error: 'Вопрос не может быть пустым' });
            }

            const answer = await AiServise.ask(question);
            res.json({ answer });
        } catch (error) {
            console.error('AI Controller Error:', error);
            res.status(500).json({ error: 'Ошибка при обработке запроса к ИИ' });
        }
    }
}

module.exports = AiController;