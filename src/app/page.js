'use client';

import * as d3 from 'd3';
import { useRef, useEffect } from 'react';

export default function Home() {
  const svgRef = useRef(null);

  //geographic data from geojson.org.
  //use pixel scale from figma
  const GeoJson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Zone1',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [291, 490.56],
              [320.5, 329.5],
              [430, 209.5],
              [583.87, 182.17],
              [583.87, 490.56],
              [291, 490.56],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zone2',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [291, 490.56],
              [583.87, 490.56],
              [583.87, 613.35],
              [291, 613.35],
              [291, 490.56],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zone3',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [583.87, 384.7],
              [583.87, 137],
              [1133, 137],
              [1102, 260.85],
              [1243, 260.85],
              [1243, 384.7],
              [583.87, 384.7],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zone4',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [583.87, 384.7],
              [1006.59, 384.7],
              [1006.59, 688.86],
              [790.5, 688.86],
              [583.87, 613.35],
              [583.87, 384.7],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: {
          name: 'Zone5',
        },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [1006.59, 688.86],
              [1006.59, 384.7],
              [1243, 384.7],
              [1006.59, 688.86],
            ],
          ],
        },
      },
    ],
  };

  //projection geo data -> x, y
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const projection = d3.geoIdentity().fitSize([960, 500], GeoJson);

    const path = d3.geoPath().projection(projection);

    svg
      .selectAll('path')
      .data(GeoJson.features)
      .join('path')
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'black');
  }, [GeoJson]);

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4 bg-stone-200 min-h-screen p-24">
      <svg ref={svgRef} width="960" height="500" viewBox="0 0 960 500"></svg>
    </main>
  );
}
