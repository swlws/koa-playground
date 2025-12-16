// API 文档
// https://help.aliyun.com/zh/model-studio/qwen-api-reference?spm=a2c4g.11186623.help-menu-2400256.d_2_1_0.336f51573msTqf&scm=20140722.H_2712576._.OR_help-T_cn~zh-V_1#4ec3e641c294d

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
