import { z } from 'zod';

// Zod schema for the operator enum
const operatorSchema = z.enum(['LT', 'GT', 'EQ']);

// Schema for creating a new RiskThreshold
export const createThresholdSchema = z.object({
  body: z.object({
    factor: z.string({
      required_error: 'Factor is required',
    }).min(3, 'Factor must be at least 3 characters long'),
    
    operator: operatorSchema,
    
    value: z.number({
      required_error: 'Value is required',
    }),

    description: z.string().optional(),
  }),
});

// Schema for updating an existing RiskThreshold
export const updateThresholdSchema = z.object({
  params: z.object({
    factor: z.string({
        required_error: 'Factor parameter is required',
    }),
  }),
  body: z.object({
    operator: operatorSchema.optional(),
    value: z.number().optional(),
    description: z.string().optional(),
  }).refine(data => Object.keys(data).length > 0, {
      message: "At least one field (operator, value, or description) must be provided for an update.",
  }),
});

// Schema for getting a single threshold by factor
export const getThresholdSchema = z.object({
    params: z.object({
        factor: z.string({
            required_error: 'Factor parameter is required',
        }),
    }),
});
