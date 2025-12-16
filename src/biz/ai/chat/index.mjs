import OpenAI from 'openai';
import { aiConfig, rolePrompts } from './config.mjs';

class ChatAi {
  constructor() {
    this.messages = [];

    this.init();
    this.initMessages();
  }

  init() {
    const { apiKey, baseURL } = aiConfig;
    this.openai = new OpenAI({ apiKey, baseURL });
  }

  initMessages() {
    this.messages = [
      { role: 'system', content: rolePrompts.system },
      { role: 'user', content: rolePrompts.user },
    ];
  }

  async chat(messages = []) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: aiConfig.model,
        messages: [...this.messages, ...messages],
      });

      return completion.choices;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default new ChatAi();
