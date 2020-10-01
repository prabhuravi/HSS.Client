import { Component, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation, SimpleChanges, SimpleChange, OnChanges, OnDestroy } from '@angular/core';

import { ConnectivityMonitoringService } from 'src/app/services/connectivity-monitoring.service';
import * as d3 from 'd3';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartId: string;
  @Input() totalVessels: any;
  @ViewChild('chart', null) chartElement: ElementRef;

  host: d3.Selection<any, any, any, any>;
  hostWidth: number;
  hostHeight: number;

  margin: { top: number, right: number, bottom: number, left: number };
  width: number;
  height: number;

  svg: d3.Selection<any, any, any, any>;
  chartBody: d3.Selection<any, any, any, any>;
  axesContainer: d3.Selection<any, any, any, any>;
  clipPath: d3.Selection<any, any, any, any>;

  xScaleUnzoomed: d3.ScaleTime<number, number>;
  xScale: d3.ScaleTime<number, number>;
  xAxis: d3.Axis<any>;
  xAxisElement: d3.Selection<any, any, any, any>;

  yScaleUnzoomed: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  yAxis: d3.Axis<any>;
  yAxisElement: d3.Selection<any, any, any, any>;

  brushElement: d3.Selection<any, any, any, any>;
  brush: d3.BrushBehavior<any>;

  zoomX: d3.ZoomBehavior<any, any>;
  zoomY: d3.ZoomBehavior<any, any>;
  zoomXElement: d3.Selection<any, any, any, any>;
  zoomYElement: d3.Selection<any, any, any, any>;

  scatterPointSize = 2.5;
  scatterPoints: d3.Selection<any, any, any, any>;
  areaElement: d3.Selection<any, any, any, any>;
  lineElement: d3.Selection<any, any, any, any>;
  signallineElement: d3.Selection<any, any, any, any>;
  showChart: boolean = false;
  NodeSuscription: Subscription;

  ngAfterViewInit(): void {    }

  constructor(private connectivityMonitoringService: ConnectivityMonitoringService) {

  }
  ngOnDestroy(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.totalVessels && changes.totalVessels.currentValue && changes.totalVessels.currentValue.length > 0)
    {
      const grouped = _.groupBy(this.totalVessels, (vessel) => vessel.Status);
      this.setupChart();
    }
    const currentItem: SimpleChange = changes.item;

  }
  setupChart() {
    this.hostHeight = 150;
    this.hostWidth = 250;
    this.margin = { top: 0, right: 0, bottom: 0, left: 0 };
    this.width = this.hostWidth - this.margin.left - this.margin.right,
    this.height = this.hostHeight - this.margin.top - this.margin.bottom;
    // define data
    const data = _.groupBy(this.totalVessels, (vessel) => vessel.Status);
    console.log(this.totalVessels);
    const dataset: any = [
      { label: `Up ${data.Up ? data.Up.length :0 }`, count: data.Up ? data.Up.length :0 },
      { label: `Down ${data.Down ? data.Down.length :0}`, count: data.Down ? data.Down.length :0}
    ];
    this.totalVessels =[];
    // a circle chart needs a radius
    const radius = Math.min(this.width, this.height) / 2;

    // legend dimensions
    const legendRectSize = 10; // defines the size of the colored squares in legend
    const legendSpacing = 4; // defines spacing between squares

    // define color scale
    const color = d3.scaleOrdinal(['#1cb077', '#d1232c']);
    // more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9
    d3.select('#chart').selectAll('svg').remove();
    this.svg = d3.select('#chart') // select element in the DOM with id 'chart'
      .append('svg') // append an svg element to the element we've selected
      // .attr('width', this.width) // set the width of the svg element we just added
      // .attr('height', this.height) // set the height of the svg element we just added
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', (-this.width / 2) + ' ' + (-this.height / 2) + ' ' + this.width + ' ' + this.height)
      .attr('preserveAspectRatio', 'xMinYMin');

    const arc: any = d3.arc()
      .innerRadius(radius * 0.8) // none for pie chart
      .outerRadius(radius); // size of overall chart

    const pie = d3.pie() // start and end angles of the segments
      // tslint:disable-next-line:only-arrow-functions
      .value(function(d: any) { return d.count; }) // how to extract the numerical data from each entry in our dataset
      .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null

    // define tooltip
    const tooltip = d3.select('#chart') // select element in the DOM with id 'chart'
      .append('div') // append a div element to the element we've selected
      .attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

    tooltip.append('div') // add divs to the tooltip defined above
      .attr('class', 'label'); // add class 'label' on the selection

    tooltip.append('div') // add divs to the tooltip defined above
      .attr('class', 'percent'); // add class 'percent' on the selection

    // tslint:disable-next-line:only-arrow-functions
    dataset.forEach(function(d: any) {
      d.count = +d.count; // calculate count as we iterate through the data
      d.enabled = true; // add enabled property to track which entries are checked
    });

    // creating the chart
    let path: any = this.svg.selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
      .data(pie(dataset)) // associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
      .enter() // creates placeholder nodes for each of the values
      .append('path') // replace placeholders with path elements
      .attr('d', arc) // define d attribute with arc function above
      // tslint:disable-next-line:only-arrow-functions
      .attr('fill', function(d: any) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
      // tslint:disable-next-line:no-unused-expression
      .each(function(d: any) { (this as any)._current - d; }); // creates a smooth animation for each track

    // mouse event handlers are attached to path so they need to come after its definition
    // tslint:disable-next-line:only-arrow-functions
    path.on('mouseover', function(d) {  // when mouse enters div
      // tslint:disable-next-line:only-arrow-functions
      const total = d3.sum(dataset.map(function(d1) { // calculate the total number of tickets in the dataset
        return (d1.enabled) ? d1.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase
      }));
      const percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
      tooltip.select('.label').html(d.data.label); // set current label
      tooltip.select('.count').html(d.data.count);
      tooltip.style('display', 'block'); // set display
    });

    // tslint:disable-next-line:only-arrow-functions
    path.on('mouseout', function() { // when mouse leaves div
      tooltip.style('display', 'none'); // hide tooltip for that element
    });

    // tslint:disable-next-line:only-arrow-functions
    path.on('mousemove', function(d) { // when mouse moves
      tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
        .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
    });

    // define legend
    const legend = this.svg.selectAll('.legend') // selecting elements with class 'legend'
      .data(color.domain()) // refers to an array of labels from our dataset
      .enter() // creates placeholder
      .append('g') // replace placeholders with g elements
      .attr('class', 'legend') // each g is given a legend class
      .attr('transform', (d: any, i: any) => {

        const height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing
        const offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements
        const vert = i * height - offset + 5;
        // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'
        return 'translate(' + -17 + ',' + vert + ')'; // return translation
      });

    // adding colored squares to legend
    legend.append('rect') // append rectangle squares to legend
      .attr('width', legendRectSize) // width of rect size is defined above
      .attr('height', legendRectSize) // height of rect size is defined above
      .style('fill', color) // each fill is passed a color
      .style('stroke', color) // each stroke is passed a color
      .on('click', function(label) {
        const rect = d3.select(this); // this refers to the colored squared just clicked
        let enabled = true; // set enabled true to default
        // tslint:disable-next-line:only-arrow-functions
        const totalEnabled = d3.sum(dataset.map(function(d) { // can't disable all options
          return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
        }));

        if (rect.attr('class') === 'disabled') { // if class is disabled
          rect.attr('class', ''); // remove class disabled
        } else { // else
          if (totalEnabled < 2) { return; } // if less than two labels are flagged, exit
          rect.attr('class', 'disabled'); // otherwise flag the square disabled
          enabled = false; // set enabled to false
        }

        // tslint:disable-next-line:only-arrow-functions
        pie.value(function(d: any) {
          if (d.label === label) { d.enabled = enabled; } // if entry label matches legend label
          return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
        });

        path = path.data(pie(dataset)); // update pie with new data

        path.transition() // transition of redrawn pie
          .duration(750) //
          .attrTween('d', function(d) { // 'd' specifies the d attribute that we'll be animating
            const interpolate = d3.interpolate(this._current, d); // this = current path element
            this._current = interpolate(0); // interpolate between current value and the new value of 'd'
            // tslint:disable-next-line:only-arrow-functions
            return function(t) {
              return arc(interpolate(t));
            };
          });
      });

    // adding text to legend
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      // tslint:disable-next-line:only-arrow-functions
      .text(function(d) { return d; }); // return label

  }

}
