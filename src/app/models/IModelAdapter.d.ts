export interface IModelAdapter<T> {
    adapt(item:any): T;
}