'use client';

import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { GeoJson } from '../app/data';

export default function Home() {
  const svgRef = useRef(null);
  const colorGenerator = (report) => {
    if (report.danger.length > 0) {
      let light = 255 - report.danger.length * 25;
      if (light < 104) light = 104;
      return `rgb(255, ${light}, ${light})`;
    } else if (report.warning.length > 0) {
      let light = 255 - report.warning.length * 10;
      if (light < 104) light = 104;
      return `rgb(255, ${light}, ${light - 70})`;
    } else {
      return 'rgb(215, 215, 215)';
    }
  };
  //not working yet
  const zoneAlert = (zone) => {
    const polygon = zone.geometry;
    if (d3.geoContains(polygon, currentLocation)) {
      return 'red';
    } else {
      return 'black';
    }
  };

  const [currentLocation, setCurrentLocation] = useState(0);
  //mock path coordinates
  const pathCoordinates = [
    [320.5, 329.5],
    [430, 209.5],
    [583.87, 182.17],
    [583.87, 490.56],
  ];

  //projection geo data -> x, y -> svg path
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const projection = d3.geoIdentity().scale(100).fitSize([960, 500], GeoJson);

    const path = d3.geoPath(projection);

    svg
      .selectAll('path')
      .data(GeoJson.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => colorGenerator(d.properties.report)) //d is the data from GeoJson.features
      .attr('stroke', 'black');

    // Append the circle once
    const circle = svg
      .append('circle')
      .attr('r', 10)
      .attr('cx', pathCoordinates[0][0])
      .attr('cy', pathCoordinates[0][1])
      .attr('fill', 'blue')
      .attr('hidden', 'true');
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg
      .selectAll('path')
      .attr('fill', (d) => colorGenerator(d.properties.report)) //d is the data from GeoJson.features
      .attr('stroke', 'black');
    const circle = svg.select('circle').attr('hidden', null);

    const nextLocation = (currentLocation + 1) % pathCoordinates.length;
    circle
      .transition()
      .duration(2000)
      .attr('cx', pathCoordinates[nextLocation][0])
      .attr('cy', pathCoordinates[nextLocation][1])
      .on('end', () => {
        setCurrentLocation(nextLocation);
      });
  }, [currentLocation]);

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4 bg-stone-200 min-h-screen p-24">
      <p>Current Location: {pathCoordinates[currentLocation].join(', ')}</p>
      <svg ref={svgRef} width="960" height="500" viewBox="0 0 960 500"></svg>
    </main>
  );
}
