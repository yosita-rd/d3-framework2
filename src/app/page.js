'use client';

import * as d3 from 'd3';
import { useRef, useEffect } from 'react';
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

  //projection geo data -> x, y -> svg path
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const projection = d3.geoIdentity().fitSize([960, 500], GeoJson);

    const path = d3.geoPath().projection(projection);

    svg
      .selectAll('path')
      .data(GeoJson.features)
      .join('path')
      .attr('d', path)
      .attr('fill', (d) => colorGenerator(d.properties.report)) //d is the data from GeoJson.features
      .attr('stroke', 'black');
  }, [GeoJson]);

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4 bg-stone-200 min-h-screen p-24">
      <svg ref={svgRef} width="960" height="500" viewBox="0 0 960 500"></svg>
    </main>
  );
}
