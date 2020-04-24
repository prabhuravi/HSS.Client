export interface IDataPoint {
  TimeStamp: string;
  LatencyValue: number;
  isGap?: boolean;
  SignalStrength: number;
}
