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

  //generate random location every 2 seconds
  const [currentLocation, setCurrentLocation] = useState([0, 0]);
  useEffect(() => {
    const interval = setInterval(() => {
      let location = [
        Math.floor(Math.random() * width),
        Math.floor(Math.random() * height),
      ];
      setCurrentLocation(location);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  //draw the map
  const width = 952;
  const height = 551.86;
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3
      .geoIdentity()
      .fitSize([width * scale, height * scale], GeoJson);
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
      .attr('r', 10 * scale)
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('fill', 'blue')
      .attr('hidden', 'true');
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3
      .geoIdentity()
      .fitSize([width * scale, height * scale], GeoJson);
    const path = d3.geoPath(projection);

    svg
      .selectAll('path')
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => colorGenerator(d.properties.report));

    const circle = svg.select('circle');
    circle.attr('r', 10 * scale);
  }, [scale]);

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
      .attr('cx', currentLocation[0] * scale)
      .attr('cy', currentLocation[1] * scale);
  }, [currentLocation]);

  return (
    <main>
      <p>Current Location: {currentLocation.join(', ')}</p>
      <p>Scale: 1px = {scale}m</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded text-sm"
        onClick={() =>
          setScale(
            (prevScale) => Math.round(Math.max(prevScale + 0.2, 0.2) * 10) / 10
          )
        }
      >
        Zoom In
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded text-sm"
        onClick={() =>
          setScale(
            (prevScale) => Math.round(Math.max(prevScale - 0.2, 0.2) * 10) / 10
          )
        }
      >
        Zoom Out
      </button>
      <svg
        ref={svgRef}
        width={width * scale}
        height={height * scale}
        viewBox={`0 0 ${width * scale} ${height * scale}`}
      ></svg>
    </main>
  );
}
