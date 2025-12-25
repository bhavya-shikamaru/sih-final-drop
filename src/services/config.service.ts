import { ConfigRepository } from '../repositories/config.repository';
import { IRiskThreshold } from '../models/config/Threshold.model';

export class ConfigService {
  private configRepository: ConfigRepository;

  constructor() {
    this.configRepository = new ConfigRepository();
  }

  /**
   * Creates a new risk threshold.
   * @param thresholdData Data for the new threshold.
   * @returns The created risk threshold.
   */
  async createThreshold(thresholdData: Omit<IRiskThreshold, 'createdAt' | 'updatedAt' | 'id'>): Promise<IRiskThreshold> {
    // In a real application, you might have more complex business logic here,
    // like checking for conflicts or validating against other business rules.
    
    // Note: The audit logging (FR-006) will be implemented in a later task (T010)
    // by decorating this service or adding a dedicated audit service.
    
    return this.configRepository.create(thresholdData);
  }

  /**
   * Updates an existing risk threshold by its factor.
   * @param factor The factor of the threshold to update.
   * @param updateData The data to update.
   * @returns The updated risk threshold, or null if not found.
   */
  async updateThresholdByFactor(factor: string, updateData: Partial<Omit<IRiskThreshold, 'factor' | 'createdAt' | 'updatedAt' | 'id'>>): Promise<IRiskThreshold | null> {
    // Note: The audit logging (FR-006) will be implemented in a later task (T010)
    
    return this.configRepository.findByFactorAndUpdate(factor, updateData);
  }
}
