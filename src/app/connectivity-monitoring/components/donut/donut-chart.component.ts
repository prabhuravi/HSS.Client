import { Component, Input, ViewChild, ElementRef, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, OnDestroy } from '@angular/core';

import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
import { LatencyRequest } from 'src/app/models/LatencyRequest';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements AfterViewInit, OnChanges,OnDestroy {
  @Input() chartId: string;
  @Input() totalVessels: any;
  @ViewChild('chart', null) chartElement: ElementRef;


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
  private areaElement: d3.Selection<any, any, any, any>;
  private lineElement: d3.Selection<any, any, any, any>;
  private signallineElement: d3.Selection<any, any, any, any>;
  private showChart: boolean = false;
  private NodeSuscription : Subscription;
  ngAfterViewInit() {
   
    
  }
  
  constructor(private connectivityMonitoringService: ConnectivityMonitoringService) {

  }
  ngOnDestroy(): void {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.totalVessels.currentValue.length>0){
      const grouped = _.groupBy(this.totalVessels, vessel => vessel.Status);
      this.setupChart();
    }
    const currentItem: SimpleChange = changes.item;
    
  }
  setupChart() {
  
    
   
    this.hostHeight = 150;
    this.hostWidth =250;
    this.margin = { top: 0, right:0, bottom: 0, left: 0 };
    this.width = this.hostWidth - this.margin.left - this.margin.right,
    this.height = this.hostHeight - this.margin.top - this.margin.bottom;

   
// define data
let data =   _.groupBy(this.totalVessels, vessel => vessel.Status);
var dataset:any = [
  {label:'Down', count: data['Up'].length},
  {label: 'Up', count: data['Down'].length}
];


// a circle chart needs a radius
var radius = Math.min(this.width, this.height) / 2;

// legend dimensions
var legendRectSize = 10; // defines the size of the colored squares in legend
var legendSpacing = 4; // defines spacing between squares

// define color scale
var color = d3.scaleOrdinal(["#d1232c","#1cb077"]);
// more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

this.svg = d3.select('#chart') // select element in the DOM with id 'chart'
.append('svg') // append an svg element to the element we've selected
//.attr('width', this.width) // set the width of the svg element we just added
//.attr('height', this.height) // set the height of the svg element we just added
.attr("width", '100%')
.attr("height", '100%')
.attr('viewBox', (-this.width / 2) + ' ' + (-this.height / 2) + ' ' + this.width + ' ' + this.height)
.attr('preserveAspectRatio', 'xMinYMin');

var arc:any = d3.arc()
.innerRadius(radius * 0.8) // none for pie chart
.outerRadius(radius); // size of overall chart

var pie = d3.pie() // start and end angles of the segments
.value(function(d:any) { return d.count; }) // how to extract the numerical data from each entry in our dataset
.sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

// define tooltip
var tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
.append('div') // append a div element to the element we've selected                                    
.attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

tooltip.append('div') // add divs to the tooltip defined above                            
.attr('class', 'label'); // add class 'label' on the selection                         

tooltip.append('div') // add divs to the tooltip defined above                     
.attr('class', 'count'); // add class 'count' on the selection                  

tooltip.append('div') // add divs to the tooltip defined above  
.attr('class', 'percent'); // add class 'percent' on the selection

dataset.forEach(function(d:any) {
d.count = +d.count; // calculate count as we iterate through the data
d.enabled = true; // add enabled property to track which entries are checked
});

// creating the chart
var path:any = this.svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
.data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
.enter() //creates placeholder nodes for each of the values
.append('path') // replace placeholders with path elements
.attr('d', arc) // define d attribute with arc function above
.attr('fill', function(d:any) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
.each(function(d:any) { (this as any)._current - d; }); // creates a smooth animation for each track


// mouse event handlers are attached to path so they need to come after its definition
path.on('mouseover', function(d) {  // when mouse enters div      
var total = d3.sum(dataset.map(function(d) { // calculate the total number of tickets in the dataset         
return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
}));                                                      
var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
tooltip.select('.label').html(d.data.label); // set current label           
tooltip.select('.count').html( d.data.count);         
tooltip.style('display', 'block'); // set display                     
});                                                           

path.on('mouseout', function() { // when mouse leaves div                        
tooltip.style('display', 'none'); // hide tooltip for that element
});

path.on('mousemove', function(d) { // when mouse moves                  
tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
  .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
});

// define legend
var legend = this.svg.selectAll('.legend') // selecting elements with class 'legend'
.data(color.domain()) // refers to an array of labels from our dataset
.enter() // creates placeholder
.append('g') // replace placeholders with g elements
.attr('class', 'legend') // each g is given a legend class
.attr('transform', (d:any, i:any)=> {   
                
  var height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
  var offset =  height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
  var vert = i * height - offset+5;
  console.log(vert)
   // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
    return 'translate(' + -17 + ',' + vert + ')'; //return translation       
 });

// adding colored squares to legend
legend.append('rect') // append rectangle squares to legend                                   
.attr('width', legendRectSize) // width of rect size is defined above                        
.attr('height', legendRectSize) // height of rect size is defined above                      
.style('fill', color) // each fill is passed a color
.style('stroke', color) // each stroke is passed a color
.on('click', function(label) {
  var rect = d3.select(this); // this refers to the colored squared just clicked
  var enabled = true; // set enabled true to default
  var totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
    return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
  }));

  if (rect.attr('class') === 'disabled') { // if class is disabled
    rect.attr('class', ''); // remove class disabled
  } else { // else
    if (totalEnabled < 2) return; // if less than two labels are flagged, exit
    rect.attr('class', 'disabled'); // otherwise flag the square disabled
    enabled = false; // set enabled to false
  }

  pie.value(function(d:any) { 
    if (d.label === label) d.enabled = enabled; // if entry label matches legend label
      return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
  });

  path = path.data(pie(dataset)); // update pie with new data

  path.transition() // transition of redrawn pie
    .duration(750) // 
    .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
      var interpolate = d3.interpolate(this._current, d); // this = current path element
      this._current = interpolate(0); // interpolate between current value and the new value of 'd'
      return function(t) {
        return arc(interpolate(t));
      };
    });
});

// adding text to legend
legend.append('text')                                    
.attr('x', legendRectSize + legendSpacing)
.attr('y', legendRectSize - legendSpacing)
.text(function(d) { return d; }); // return label

  }
 
}
