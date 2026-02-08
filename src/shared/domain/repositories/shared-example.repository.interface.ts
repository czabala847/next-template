import { SharedExample } from "../entity/shared-example.enty"

// Definición de contrato para el repositorio de SharedExample
export interface ISharedExampleRepository {
  getAll(): Promise<SharedExample[]>;
}
