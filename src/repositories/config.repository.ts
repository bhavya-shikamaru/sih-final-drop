import { RiskThresholdModel, IRiskThreshold } from '../models/config/Threshold.model';

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

  /**
   * Finds a risk threshold by its factor.
   * @param factor The factor to find.
   * @returns The risk threshold document, or null if not found.
   */
  async findByFactor(factor: string): Promise<IRiskThreshold | null> {
    return RiskThresholdModel.findOne({ factor: factor });
  }

  /**
   * Finds all risk thresholds.
   * @returns A list of all risk threshold documents.
   */
  async findAll(): Promise<IRiskThreshold[]> {
    return RiskThresholdModel.find({});
  }

  /**
   * Deletes all risk thresholds.
   * @returns The result of the delete operation.
   */
  async deleteAll(): Promise<any> {
    return RiskThresholdModel.deleteMany({});
  }
}
