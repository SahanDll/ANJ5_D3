import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, AfterViewChecked } from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'underscore';
import swal from 'sweetalert2';

@Component({
  selector: 'app-force-directed-chart-base',
  styleUrls: ['./ForceDirectChart.component.scss'],
  template: `
    <div [class]='"force-directed-chart " + class' #forceDirectedChartContainer>
      <div class='tooltip' style="position: fixed">
        <div fxLayout='row' fxLayoutAlign='start center' class='header'>
          <img src='../../../assets/user.png' alt='User Icon'>
          <div fxLayout='column' fxLayoutAlign='center start'>
            <div class='title'>{{node?.vendor}}</div>
            <div>{{node?.model}}</div>
          </div>
        </div>
        <div fxLayout='column' fxLayoutAlign='center start' class='body'>
          <div class='subtitle'>Name</div>
          <div>{{node?.name}}</div>
          <div class='subtitle'>IP</div>
          <div>{{node?.address}}</div>
          <div class='subtitle'>Protocol</div>
          <div>{{node?.protocol}}</div>
        </div>
      </div>
    </div>
  `
})

export class ForceDirectedChartBaseComponent implements OnInit, OnChanges, AfterViewChecked {
  @ViewChild('forceDirectedChartContainer')
  private chartContainer: ElementRef;
  @Input()
  data: Array<any>;
  @Input()
  class: string;
  public elementRef;

  node: any;

  hostElement: any;
  tooltip: any;

  linkElements: any;
  linkGroup: any;
  nodeElements: any;
  nodeGroup: any;
  imageGroup: any;
  textElements: any;
  textGroup: any;
  imageElements: any;
  links: any;

  margin: any;
  width: any;
  height: any;
  hostElementHeight: number;

  color: any;

  svg: any;
  simulation: any;
  sensors: any;

  smallCircleRadius = 6;
  largeCircleRadius = 50;

  status: string;

  constructor() {

  }

  ngAfterViewChecked() {
    if (this.hostElement && this.hostElement.offsetHeight !== 0 && this.hostElement.offsetHeight !== this.hostElementHeight) {
      this.hostElementHeight = this.hostElement.offsetHeight;
      d3.select('.' + this.class + ' svg').remove();
      this.createChart();
      if (this.data.length > 0) {
        this.sensors = _.sortBy(this.data, 'familyType');
        this.runSimulation();
      }
    }
  }

  ngOnInit() {
    this.hostElement = this.chartContainer.nativeElement;
  }

  ngOnChanges() {
    if (this.data.length > 0 && this.svg) {
      this.sensors = _.sortBy(this.data, 'familyType');
      this.runSimulation();
    }
  }

  createChart = () => {
    // Width & height
    this.margin = { top: 0, right: 0, bottom: 0, left: 0};

    this.width = this.hostElement.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.hostElement.offsetHeight - this.margin.top - this.margin.bottom;

    // Color
    this.color = d3.scaleOrdinal(d3.schemeCategory20);

    this.svg = d3.select(this.hostElement)
      .append('svg')
      .attr('width', this.hostElement.offsetWidth)
      .attr('height', this.hostElement.offsetHeight)
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.linkGroup = this.svg.append('g').attr('class', 'links');
    this.nodeGroup = this.svg.append('g').attr('class', 'nodes');
    this.textGroup = this.svg.append('g').attr('class', 'labels');
    this.imageGroup = this.svg.append('g').attr('class', 'images');

    this.tooltip =  this.elementRef.nativeElement.querySelector('.tooltip');
  }

  createLinks = () => {
    const groups = _.groupBy(this.sensors.slice(), 'familyType');

    const computedLinks = [];
    Object.keys(groups).map((key, i) => {
      const familyTypeSensors = groups[key].sort();
      for (let j = 0; j < familyTypeSensors.length; j++) {
        if (j > 0) { computedLinks.push({
          source: familyTypeSensors[j],
          target: familyTypeSensors[j - 1]
        });
        }
      }
    });

    return computedLinks;
  }

  render = () => {
    this.links = this.createLinks();

    this.linkElements = this.linkGroup.selectAll('line')
      .data(this.links, link => link.target.id + link.source.id);

    this.linkElements.exit().remove();

    const linkEnter = this.linkElements
      .enter().append('line')
      .attr('stroke-width', 1)
      .attr('stroke', '#d2d7d3');

    this.linkElements = linkEnter.merge(this.linkElements);

    // nodes
    this.nodeElements = this.nodeGroup.selectAll('circle')
      .data(this.sensors, node => node.id);

    this.nodeElements.exit().remove();

    const nodeEnter = this.nodeElements
      .enter()
      .append('circle')
      .attr('r', this.smallCircleRadius)
      .attr('fill', node => this.color(node.familyType))
      .on('mouseover', node => this.mouseover(node))
      .on('mouseout', node => this.mouseout())
      .call(d3.drag()
        .on('start', this.dragstarted)
        .on('drag', this.dragged)
        .on('end', this.dragended));

    this.nodeElements = nodeEnter.merge(this.nodeElements);

    // text labels
    const groups = _.toArray(_.groupBy(this.sensors.slice(), 'familyType'));

    this.textElements = this.textGroup.selectAll('text')
      .data(groups, group => group);

    this.textElements.exit().remove();

    const textEnter = this.textElements
      .enter()
      .append('text')
      .attr('dx', 15)
      .attr('dy', 4)
      .attr('pointer-events', 'none')
      .attr('font-size', 14)
      .attr('text-anchor', 'start')
      .attr('fill', group => this.color(group[0].familyType));

    this.textElements = textEnter.merge(this.textElements);
  }

  dragstarted = (d) => {
    if (!d3.event.active) { this.simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged = (d) => {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  dragended = (d) => {
    if (!d3.event.active) { this.simulation.alphaTarget(0); }
    d.fx = null;
    d.fy = null;
  }

  mouseover = (node) => {
    // placement
    this.tooltip.style.visibility = 'visible';
    this.tooltip.style.opacity = 0.9;
    this.tooltip.style.top = d3.event.pageY + 'px';
    this.tooltip.style.left = d3.event.pageX + 'px';

    // Values
    this.node = node;
    this.status = this.findStatus(node);
  }

  findStatus = (node): string => {
    let status = '';
    if (!node.activated) { status = 'Not activated'; }
    if (node.activated && node.online) {  status = 'Online'; }
    if (node.activated && !node.online) { status = 'Offline'; }
    return status;
  }

  mouseout = () => {
    this.tooltip.style.visibility = 'hidden';
    this.tooltip.style.opacity = 0;
  }

  placeElementY = (node): number => {
    const radius = this.smallCircleRadius;

    if (node.y < radius) { return radius; }
    if (node.y > this.height - radius) { return this.height - radius; }
    return node.y;
  }

  placeElementX = (node): number => {
    const radius = this.smallCircleRadius;

    if (node.x < radius) { return radius; }
    if (node.x > this.width - radius) { return this.width - radius; }
    return node.x;
  }

  runSimulation = () => {
    this.simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id((node: any) => node.id).distance(30))
      .force('collide', d3.forceCollide<any>( d => d.r + 8 ).iterations(16))
      .force('charge', d3.forceManyBody()
        .strength(-100)
        .distanceMax(200)
        .distanceMin(60)
      )
      .force('center', d3.forceCenter(this.width / 2, this.height / 2));

    this.render();

    this.simulation.nodes(this.sensors).on('tick', () => {
      this.nodeElements
        .attr('cx', node => this.placeElementX(node) )
        .attr('cy', node => this.placeElementY(node))
        .attr('fill', node => this.color(node.familyType));

      this.linkElements
        .attr('x1', node => this.placeElementX(node.source))
        .attr('y1', node => this.placeElementY(node.source))
        .attr('x2', node => this.placeElementX(node.target))
        .attr('y2', node => this.placeElementY(node.target));

      this.textElements
        .attr('x', groups => this.placeElementX(groups[groups.length - 1]))
        .attr('y', groups => this.placeElementY(groups[groups.length - 1]))
        .text(groups => groups[0].familyType);
    });

    this.simulation.force('link').links(this.links);
  }


  nodeClick(node) {
    swal({
      title: '<u>Base : ' + '' + '</u>',
      backdrop: false,
      type: 'info',
      html:
      '<b style="color: cornflowerblue">' + '' + '</b>' +
      '<br>' +
      '<b>' + '' + '</b>' +
      '<br>' +
      '<b>' + '' + '</b>' +
      '<br>' +
      '<b>' + '' + '</b>' +
      '<br>' +
      '<b>' + '' + '</b>' ,
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: true,
      confirmButtonColor: '#9487d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'View',
      cancelButtonText: 'Ok',
    }).then((result) => {
      if (result.value) {
        alert(node.name);
      }
    });
  }
}
