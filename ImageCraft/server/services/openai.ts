import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "your-api-key-here"
});

export interface ImageGenerationOptions {
  prompt: string;
  maskType: string;
  size: "1024x1024" | "1792x1024" | "1024x1792";
  style: string;
}

export async function generateImage(options: ImageGenerationOptions): Promise<{ url: string }> {
  try {
    // Clean and enhance prompt based on mask type and style
    const enhancedPrompt = enhancePrompt(options.prompt, options.maskType, options.style);
    
    console.log("Generating image with prompt:", enhancedPrompt);
    
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: options.size,
      quality: "standard",
    });

    if (!response.data[0]?.url) {
      throw new Error("No image URL returned from OpenAI");
    }

    return { url: response.data[0].url };
  } catch (error) {
    console.error("OpenAI Image Generation Error:", error);
    
    if (error instanceof Error) {
      if (error.message.includes("billing")) {
        throw new Error("OpenAI API billing issue. Please check your account credits.");
      }
      if (error.message.includes("rate limit")) {
        throw new Error("Rate limit exceeded. Please try again in a moment.");
      }
      if (error.message.includes("content policy") || error.message.includes("user_error")) {
        throw new Error("Content violates OpenAI's usage policies. Try a different description or mask type.");
      }
    }
    
    // Check if it's a BadRequestError with image_generation_user_error
    if (error && typeof error === 'object' && 'type' in error && error.type === 'image_generation_user_error') {
      throw new Error("Your prompt may contain inappropriate content. Please try a different description.");
    }
    
    throw new Error("Failed to generate image. Please try again with a different prompt.");
  }
}

function enhancePrompt(basePrompt: string, maskType: string, style: string): string {
  // Clean the base prompt of potentially problematic content
  let enhanced = basePrompt.trim();
  
  // Remove potentially problematic words/phrases that might trigger content policy
  const problematicTerms = [
    'violence', 'violent', 'blood', 'gore', 'death', 'kill', 'murder',
    'nude', 'naked', 'sexual', 'sexy', 'erotic', 'adult',
    'weapon', 'gun', 'knife', 'bomb', 'explosive',
    'drug', 'alcohol', 'cigarette', 'smoking'
  ];
  
  problematicTerms.forEach(term => {
    enhanced = enhanced.replace(new RegExp(term, 'gi'), '');
  });
  
  // Clean up extra spaces
  enhanced = enhanced.replace(/\s+/g, ' ').trim();
  
  // Add mask-specific details
  const maskDescriptions = {
    medical: "wearing a protective medical face covering",
    fashion: "wearing a stylish designer face covering",
    carnival: "wearing a decorative festive mask",
    sports: "wearing a sports face covering",
    artistic: "wearing an artistic decorative face piece",
    custom: "wearing a unique face covering"
  };
  
  // Add style modifiers
  const styleModifiers = {
    realistic: "photorealistic portrait, professional photography style",
    artistic: "artistic portrait style, creative interpretation",
    cartoon: "cartoon illustration style, friendly character",
    abstract: "abstract artistic interpretation"
  };
  
  // Ensure mask is mentioned in prompt
  if (!enhanced.toLowerCase().includes("mask") && !enhanced.toLowerCase().includes("covering")) {
    enhanced += `, ${maskDescriptions[maskType as keyof typeof maskDescriptions] || maskDescriptions.custom}`;
  }
  
  // Add style modifier
  enhanced += `, ${styleModifiers[style as keyof typeof styleModifiers] || styleModifiers.realistic}`;
  
  // Add safe, positive descriptors
  enhanced += ", friendly person, positive expression, well-lit, clean background";
  
  return enhanced;
}
