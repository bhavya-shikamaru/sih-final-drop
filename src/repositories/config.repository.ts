import { RiskThresholdModel, IRiskThreshold } from '../../models/config/Threshold.model';

export class ConfigRepository {
  /**
   * Creates a new risk threshold.
   * @param thresholdData Data for the new threshold.
   * @returns The created risk threshold document.
   */
  async create(thresholdData: Omit<IRiskThreshold, 'createdAt' | 'updatedAt' | 'id'>): Promise<IRiskThreshold> {
    const newThreshold = await RiskThresholdModel.create(thresholdData);
    return newThreshold;
  }

  /**
   * Finds a risk threshold by its factor and updates it.
   * @param factor The factor to find.
   * @param updateData Data to update the threshold with.
   * @returns The updated risk threshold document, or null if not found.
   */
  async findByFactorAndUpdate(factor: string, updateData: Partial<Omit<IRiskThreshold, 'factor' | 'createdAt' | 'updatedAt' | 'id'>>): Promise<IRiskThreshold | null> {
    const updatedThreshold = await RiskThresholdModel.findOneAndUpdate(
      { factor: factor },
      updateData,
      { new: true } // Return the updated document
    );
    return updatedThreshold;
  }
}
