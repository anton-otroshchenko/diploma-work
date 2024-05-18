import OpenAi from 'openai';

import {
    type ChatCompletionCreateParams,
    type ChatCompletionMessageParam,
} from 'openai/resources/index.js';


import { ENV } from '../enums/env.enum';


class OpenAI {
    private openAIApi: OpenAi;

    public constructor() {
        this.openAIApi = new OpenAi(
            {apiKey: ENV.OPEN_AI.KEY }
        );
    }

    public async createCompletion(
        prompt: string,
    ): Promise<Record<string, string>> {
        const parameters: any = {
            messages: [
                {
                    role: 'assistant',
                    content: prompt
                },
            ],
            model: ENV.OPEN_AI.MODEL,
            temperature: 1.25,
            max_tokens: 256,
        };

        const response = await this.openAIApi.chat.completions.create(parameters);

        const [choice] = response.choices;

        const text = choice.message.content;

        return this.parseCompletionResponse(text as string);
    }

    // public async createImage(
    //     prompt: string,
    //     size: ValueOf<typeof ImageSize> = ImageSize.SMALL,
    // ): Promise<string> {
    //     const [image] = await this.createImages(prompt, 1, size);
    //
    //     return image ?? '';
    // }
    //
    // public async createImages(
    //     prompt: string,
    //     number: number,
    //     size: ValueOf<typeof ImageSize> = ImageSize.SMALL,
    // ): Promise<string[]> {
    //     const { data } = await this.openAIApi.createImage({
    //         prompt,
    //         n: number,
    //         size: imageSizeToResolutionMap[size],
    //         response_format: 'b64_json',
    //     });
    //
    //     return data.data.map((item) => item.b64_json ?? '');
    // }

    private parseCompletionResponse(response: string): Record<string, string> {
        const result: Record<string, string> = {};
        const lines = response.split('\n').filter(Boolean);

        let currentKey: string | null = null;
        let currentValue = '';

        for (const line of lines) {
            const colonIndex = line.indexOf(':');

            if (colonIndex === -1) {
                currentValue += line.trim() + '\n';
            } else {
                if (currentKey !== null) {
                    result[currentKey] = currentValue.trim();
                    currentValue = '';
                }

                const key = line.slice(0, colonIndex).trim();
                currentKey = key.charAt(0).toLowerCase() + key.slice(1);
                currentValue += line.slice(colonIndex + 1).trim() + '\n';
            }
        }

        if (currentKey !== null) {
            result[currentKey] = currentValue.trim();
        }

        return result;
    }
}

export { OpenAI };