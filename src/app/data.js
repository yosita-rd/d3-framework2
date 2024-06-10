//geographic data from geojson.org.
//use pixel scale from figma
export const GeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Zone1',
        report: {
          danger: [
            {
              name: 'Danger1',
              location: [320.5, 329.5],
              description: 'Dangerous area 1',
            },
            {
              name: 'Danger2',
              location: [430, 209.5],
              description: 'Dangerous area 2',
            },
            {
              name: 'Danger3',
              location: [583.87, 182.17],
              description: 'Dangerous area 3',
            },
          ],
          warning: [],
        },
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
        report: {
          danger: [],
          warning: [
            {
              name: 'Warning1',
              location: [583.87, 490.56],
              description: 'Warning area 1',
            },
          ],
        },
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
        report: {
          danger: [],
          warning: [
            {
              name: 'Warning1',
              location: [583.87, 384.7],
              description: 'Warning area 1',
            },
            {
              name: 'Warning2',
              location: [583.87, 137],
              description: 'Warning area 2',
            },
            {
              name: 'Warning3',
              location: [1133, 137],
              description: 'Warning area 3',
            },
          ],
        },
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
        report: {
          danger: [
            {
              name: 'Danger4',
              location: [583.87, 384.7],
              description: 'Dangerous area 4',
            },
          ],
          warning: [],
        },
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
        report: {
          danger: [],
          warning: [],
        },
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
