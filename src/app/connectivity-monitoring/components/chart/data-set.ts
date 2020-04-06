import * as d3 from 'd3';

import { sampleData as dataFile } from './sample-data';
import { IDataPoint } from './data-point';
export class ChartDataSet {
  // TODO: Replace publics with proper accessors
  public data: IDataPoint[];
  public xMin: Date;
  public xMax: Date;
  public yMin: number;
  public yMax: number;
  constructor(private chartData: any) {
   this.data =chartData.Result;
  }
  public loadData() {
   // this.data = dataFile[0].data as IDataPoint[];
    [this.xMin, this.xMax] = d3.extent<any, Date>(this.data, d => d3.isoParse(d.TimeStamp));
    [this.yMin, this.yMax] = d3.extent<any, number>(this.data, d => d.LatencyValue).reverse();
  }
}
