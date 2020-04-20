import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, OnDestroy, HostListener } from '@angular/core';
import { ChartDataSet } from './data-set';
import { IDataPoint } from './data-point';
import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
import * as moment from 'moment';

import { Subscriber, Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class ChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartId: string;
  @Input() latencyRequest: LatencyRequest;
  @ViewChild('chart', null) chartElement: ElementRef;
  @Input() viewFullChart: Boolean;
  private dataSet: ChartDataSet;

  private host: d3.Selection<any, any, any, any>;
  private hostWidth: number;
  private hostHeight: number;

  private margin: { top: number, right: number, bottom: number, left: number };
  private width: number;
  private height: number;

  private svg: d3.Selection<any, any, any, any>;
  private chartBody: d3.Selection<any, any, any, any>;
  private axesContainer: d3.Selection<any, any, any, any>;
  private clipPath: d3.Selection<any, any, any, any>;

  private xScaleUnzoomed: d3.ScaleTime<number, number>;
  private xScale: d3.ScaleTime<number, number>;
  private xAxis: d3.Axis<any>;
  private xAxisElement: d3.Selection<any, any, any, any>;

  private yScaleUnzoomed: d3.ScaleLinear<number, number>;
  private yScale: d3.ScaleLinear<number, number>;
  private yAxis: d3.Axis<any>;
  private yAxisElement: d3.Selection<any, any, any, any>;

  private brushElement: d3.Selection<any, any, any, any>;
  private brush: d3.BrushBehavior<any>;

  private zoomX: d3.ZoomBehavior<any, any>;
  private zoomY: d3.ZoomBehavior<any, any>;
  private zoomXElement: d3.Selection<any, any, any, any>;
  private zoomYElement: d3.Selection<any, any, any, any>;

  private scatterPointSize = 2.5;
  private scatterPoints: d3.Selection<any, any, any, any>;
  private area: d3.Area<IDataPoint>;
  private areaElement: d3.Selection<any, any, any, any>;
  private line: d3.Line<IDataPoint>;
  private lineElement: d3.Selection<any, any, any, any>;
  private signalStrengthLine: d3.Line<IDataPoint>;
  private signallineElement: d3.Selection<any, any, any, any>;
  private showChart: boolean = false;
  private NodeSuscription: Subscription;
  tooltipBody:any;
  ngAfterViewInit() {

    this.NodeSuscription = this.connectivityMonitoringService.getNodeNumberSubject().subscribe((nodeNumber: number) => {
      if (nodeNumber) {
        this.latencyRequest.NodeNumber = nodeNumber;

        d3.select('#' + this.chartId).remove();
        this.showChart = false;
        this.getChartData(this.latencyRequest);
      }
    });
  }
  getChartData(latencyRequest: LatencyRequest) {
    this.connectivityMonitoringService.getChartData(latencyRequest)
      .subscribe((data: any) => {
          for(var i=0;i< data.Result.length;i++){
            if(i>30 && i<90){
              data.Result.splice(i,1)
            }
          }
        this.dataSet = new ChartDataSet(data);
        this.setupChart();
      });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    if(document.getElementById(this.chartId)){
      document.getElementById(this.chartId).remove();
      this.setupChart();
    }
    
  }
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService) {
    //window.addEventListener('resize', this.setupChart);
  }
  ngOnDestroy(): void {
    this.NodeSuscription.unsubscribe();
    d3.select('#' + this.chartId).remove();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    // console.log(changes);
    if(changes.viewFullChart){
      setTimeout(()=>{
        if(document.getElementById(this.chartId)){
          document.getElementById(this.chartId).remove();
          this.setupChart();
        }
      },200)
    }
    //   console.log("########");
    //   let cacheData = this.connectivityMonitoringService.returncacheVesselLatencyChart();
    //   if(cacheData && cacheData.NodeNumber == this.latencyRequest.NodeNumber){
    //     this.dataSet = new ChartDataSet(cacheData.data);
    //     this.setupChart();
    //   }
    //   this.getChartData(this.latencyRequest);
    // }
  }
  setupChart() {

    this.dataSet.loadData();
    this.host = d3.select(this.chartElement.nativeElement);
    this.hostWidth = parseInt(this.host.style('width'), 10);
    this.hostHeight = 400;

    this.margin = { top: 5, right: 5, bottom: 30, left: 35 };
    this.width = this.hostWidth - this.margin.left - this.margin.right,
      this.height = this.hostHeight - this.margin.top - this.margin.bottom;

    this.svg = this.chartBody = this.host.append('svg')
      .attr('width', this.hostWidth)
      .attr('id', this.chartId)
      .attr('height', this.hostHeight);
    //ha
    if (this.dataSet.data.length === 0) {
      this.svg.append("text")
        .text("No Data Available")
        .attr('x', (this.hostWidth / 2.5) + (this.margin.left + this.margin.right))
        .attr('y', this.height / 2)
        .style("font-size", "40px");
      this.showChart = true;
      return;
    } else {
      this.showChart = true;
    }

    // for grid lines
    // Create a clip path
    const clipPathId = `clip${this.chartId}`;
    const clipPathUrl = `${window.location.protocol}//${window.location.host}/#clip${this.chartId}`;

    this.clipPath = this.svg.append('clipPath').attr('id', clipPathId)
      .append('rect')
      .attr('width', this.width)
      .attr('height', this.height);

    // Create separate containers to hold the chart body and axes
    this.chartBody = this.svg.append('g')
      .attr('clip-path', `url(${clipPathUrl})`)
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
      .attr('width', this.width)
      .attr('height', this.height);

    this.axesContainer = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`)
      .attr('width', this.width)
      .attr('height', this.height);

    // X-Axis
    this.xScale = d3.scaleTime()
      .domain([this.dataSet.xMin, this.dataSet.xMax])
      .range([0, this.width]);

    this.xAxis = d3.axisBottom(this.xScale);

    this.xAxisElement = this.axesContainer.append('g')
      .classed('x-axis', true)
      .attr('transform', `translate(0,${this.height})`)
      .call(this.xAxis);


    // Y-Axis
    this.yScale = d3.scaleLinear()
      .domain([this.dataSet.yMin, this.dataSet.yMax])
      .range([0, this.height]);
    this.yAxis = d3.axisLeft(this.yScale);

    this.yAxisElement = this.axesContainer.append('g')
      .classed('y-axis', true)
      .call(this.yAxis);

    // Setup area / line generators
    this.area = d3.area<IDataPoint>()
      .x(d => this.xScale(d3.isoParse(d.TimeStamp)))
      .y0(d => this.yScale(d.LatencyValue - 20))
      .y1(d => this.yScale(d.LatencyValue + 20))
      .defined(d => !d.isGap);

    this.areaElement = this.chartBody.append('path')
      .attr('fill', '#6a3d9a')
      .attr('fill-opacity', '0.1');

    let verticalGrid = this.svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${this.margin.left},${this.height})`)
      .style("stroke-dasharray", ("3,3"))
      .call(this.make_x_gridlines(this.xScale)
        .tickSize(-this.height).tickFormat(null)
      )
    let horizontalGrid = this.svg.append("g")
      .attr("class", "grid")
      .style("stroke-dasharray", ("3,3"))
      .attr("transform", `translate(${this.margin.left + 5},${this.margin.top})`)
      .call(this.make_y_gridlines(this.yScale)
        .tickSize(-this.width).tickFormat(null)
      )
    verticalGrid.selectAll("text").remove();
    horizontalGrid.selectAll("text").remove();
    this.line = d3.line<IDataPoint>()
      .x(d => this.xScale(d3.isoParse(d.TimeStamp)))
      .y(d => this.yScale(d.LatencyValue))
      .defined(d => !d.isGap);
    this.signalStrengthLine = d3.line<IDataPoint>()
      .x(d => this.xScale(d3.isoParse(d.TimeStamp)))
      .y(d => this.yScale(d.SignalStrength))
      .defined(d => !d.isGap);
    this.lineElement = this.chartBody.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-opacity', '0.0');

    this.signallineElement = this.chartBody.append('path')
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-opacity', '0.0');
    // Zoom
    this.setupZooming();

    // Brushing
    this.setupBrushing();

    this.chartBody.on('dblclick', () => {
      this.zoomXTo(this.dataSet.xMin, this.dataSet.xMax, true);
    });
    this.tooltipBody = this.createTolltipBody();
    // Draw initial data
    this.update(0,this.tooltipBody);
  }
  make_x_gridlines(x) {
    return d3.axisBottom(x)
      .ticks(8)
  }
  make_y_gridlines(y) {
    return d3.axisLeft(y)
      .ticks(5)
  }

  setupBrushing(): void {
    this.brush = d3.brushX()
      .extent([[0, 0], [this.width, this.height]])
      .on('end', () => {
        if (d3.event.selection) {
          this.brushElement.call(this.brush.move, null);

          const [x0, x1] = d3.event.selection;

          const d0 = this.xScale.invert(x0);
          const d1 = this.xScale.invert(x1);

          this.zoomXTo(d0, d1, true);
        }
      });

    this.brushElement = this.chartBody
      .append('g')
      .classed('brush-area', true)
      .attr('width', this.width)
      .attr('height', this.height)
      .style('pointer-events', 'all')
      .call(this.brush);
  }

  setupZooming(): void {
    this.zoomX = d3.zoom().on('zoom', () => { this.onZoomX(); });
    this.zoomY = d3.zoom().on('zoom', () => { this.onZoomY(); });

    this.xScaleUnzoomed = this.xScale.copy();
    this.yScaleUnzoomed = this.yScale.copy();

    this.zoomXElement = this.xAxisElement
      .append('rect')
      .attr('fill', 'red')
      .attr('fill-opacity', 0)
      .style('pointer-events', 'all')
      .attr('width', this.width)
      .attr('height', this.hostHeight)
      // TODO: Uncommenting this line means that zooming with the wheel works on the
      // whole chart area, but steals other mouse inputs too, so brushing doesn't work:
      //.attr('transform', `translate(0,-${this.height})`)
      .call(this.zoomX);

    this.zoomYElement = this.yAxisElement
      .append('rect')
      .attr('fill', 'lime')
      .attr('fill-opacity', 0)
      .style('pointer-events', 'all')
      .attr('width', this.margin.left)
      .attr('height', this.height)
      .attr('transform', `translate(-${this.margin.left}, 0)`)
      .call(this.zoomY);
  }

  onZoomX(): void {
    const transform = d3.event.transform;

    const newXScale: d3.ScaleTime<number, number> = transform.rescaleX(this.xScaleUnzoomed);

    this.xScale.domain(newXScale.domain());
    this.xAxis.scale(this.xScale);
    this.xAxisElement.call(this.xAxis);

    this.update(0,this.tooltipBody);
  }

  onZoomY(): void {
    const transform = d3.event.transform;

    const newYScale: d3.ScaleLinear<number, number> = transform.rescaleY(this.yScaleUnzoomed);

    this.yScale.domain(newYScale.domain());
    this.yAxis.scale(this.yScale);
    this.yAxisElement.call(this.yAxis);

    this.update(0,this.tooltipBody);
  }

  zoomXTo(x0: Date, x1: Date, animate: boolean): void {
    const transitionSpeed = animate ? 750 : 0;

    this.zoomXElement.transition().duration(transitionSpeed).call(this.zoomX.transform,
      d3.zoomIdentity
        .scale(this.width / (this.xScaleUnzoomed(x1) - this.xScaleUnzoomed(x0)))
        .translate(-this.xScaleUnzoomed(x0), 0)
    );
  }
  createTolltipBody(){
    return  d3.select("body")
    .append("div")
    .attr('id','tooltip-custom')
    .style("position", "absolute")
    .style("z-index", "10")
    .style("height", "auto")
    .style("width", "180px")
    .style("background", "#fff")
    .style("color", "#000")
    .style("visibility", "hidden")
  }
  update(transitionSpeed: number,tooltip): void {
    // Scatter
   // d3.select('#tooltip-custom').remove();
    
    this.scatterPoints = this.chartBody.selectAll('circle')
      .data(this.dataSet.data, (d: IDataPoint) => d.TimeStamp.toString());

    this.scatterPoints.enter().append('circle')
      .attr('r', 1.5)
      .attr('fill', '#6a3d9a')
      .attr('fill-opacity', d => d.isGap ? '0' : '0.7')

      .on("mouseover", function (d) {
        console.log(d.TimeStamp);
        let date = new Date(d.TimeStamp);
        tooltip.text(`${date} Latency  ${d.LatencyValue}`);
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function () { return tooltip.style("top", ((event as any).pageY - 10) + "px").style("left", ((event as any).pageX + 10) + "px"); })
      .on("mouseout", function () { return tooltip.style("visibility", "hidden"); })
      .merge(this.scatterPoints)
      .transition().duration(transitionSpeed)
      .attr('cx', d => this.xScale(d3.isoParse(d.TimeStamp)))
      .attr('cy', d => this.yScale(d.LatencyValue))
      ;


    // Line
    this.lineElement
      .transition().duration(transitionSpeed)
      .attr('d', this.line(this.dataSet.data))
      .attr('stroke-opacity', '0.7');
    this.signallineElement.transition().duration(transitionSpeed)
      .attr('d', this.signalStrengthLine(this.dataSet.data))
      .attr('stroke-opacity', '0.7');
  }
}
