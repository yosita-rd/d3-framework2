import * as d3 from 'd3';

export default function Test() {
  const LinePlot = ({
    data,
    width = 320,
    height = 200,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
  }) => {
    const x = d3.scaleLinear(
      [0, data.length - 1],
      [marginLeft, width - marginRight]
    );
    const y = d3.scaleLinear(d3.extent(data), [
      height - marginBottom,
      marginTop,
    ]);
    const line = d3.line((d, i) => x(i), y); //i = index
    return (
      <svg width={width} height={height} className="bg-white">
        {/* line */}
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d={line(data)}
        />
        {/* circle / <g></g> container used to group other SVG elements */}
        <g fill="yellow" stroke="currentColor" strokeWidth="1.5">
          {data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))}
        </g>
      </svg>
    );
  };

  const Bubble = ({
    data,
    width = 320,
    height = 200,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
  }) => {
    const format = d3.format(',d');
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    //pack layout is big circles with smaller circles inside
    const pack = d3
      .pack()
      .size([
        width - marginLeft - marginRight,
        height - marginTop - marginBottom,
      ])
      .padding(3);

    const root = pack(d3.hierarchy({ children: data }).sum((d) => d.value));
    return (
      <svg width={width} height={height} className="bg-white">
        <g>
          {root.leaves().map((d, i) => (
            <g
              key={i}
              transform={`translate(${d.x + marginLeft},${d.y + marginTop})`}
            >
              <title>{`${d.data.id}\n${format(d.value)}`}</title>
              <circle r={d.r} fill={color(i)} fillOpacity={0.7} />
              <text
                x={0}
                y={0}
                textAnchor="middle"
                fontSize="10px"
                fill="black"
              >
                {`${d.data.id}\n${format(d.value)}`}
              </text>
            </g>
          ))}
        </g>
      </svg>
    );
  };

  return (
    <main className="flex flex-row flex-wrap justify-center gap-4 bg-stone-200 min-h-screen p-24">
      {LinePlot({
        data: [1, 6, 3, 4, 5, 6, 7, 8, 9, 10],
      })}
      {Bubble({
        data: [
          { id: 'A', value: 100 },
          { id: 'B', value: 1200 },
          { id: 'C', value: 300 },
          { id: 'D', value: 400 },
          { id: 'E', value: 1500 },
        ],
      })}
    </main>
  );
}
