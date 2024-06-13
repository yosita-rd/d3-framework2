'use client';

import * as d3 from 'd3';
import { useRef, useEffect, useState } from 'react';
import { GeoJson } from '../app/data';

export default function Home() {
  const svgRef = useRef(null);

  //color generator based on the number of danger and warning
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

  // //not working yet
  // const zoneAlert = (zone) => {
  //   const polygon = zone.geometry;
  //   if (d3.geoContains(polygon, currentLocation)) {
  //     return 'red';
  //   } else {
  //     return 'black';
  //   }
  // };

  //generate random location every 2 seconds
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  useEffect(() => {
    const interval = setInterval(() => {
      let location = [
        Math.floor(Math.random() * 952),
        Math.floor(Math.random() * 551.86),
      ];
      setCurrentLocation(location);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  //draw the map
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3
      .geoIdentity()
      .scale(100)
      .fitSize([952, 551.86], GeoJson);
    const path = d3.geoPath(projection);

    svg
      .selectAll('path')
      .data(GeoJson.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => colorGenerator(d.properties.report))
      .attr('stroke', 'black');

    // Append the circle once at [0,0] and hide it
    const circle = svg
      .append('circle')
      .attr('r', 10)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('fill', 'blue')
      .attr('hidden', 'true');
  }, []);

  //update the map(fill) and circle every 2 seconds
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    //update the color of the path based on the report
    svg
      .selectAll('path')
      .attr('fill', (d) => colorGenerator(d.properties.report));

    // Move the circle to the next location
    const circle = svg.select('circle').attr('hidden', null);
    circle
      .transition()
      .duration(2000)
      .attr('cx', currentLocation[0])
      .attr('cy', currentLocation[1]);
  }, [currentLocation]);

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4 bg-stone-200 min-h-screen p-24">
      <p>Current Location: {currentLocation.join(', ')}</p>
      <svg
        ref={svgRef}
        width="952"
        height="551.86"
        viewBox="0 0 952 551.86"
      ></svg>
    </main>
  );
}
