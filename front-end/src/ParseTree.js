// src/ParseTree.js

import React, { useRef, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';

const ParseTree = ({ treeData }) => {
  const treeContainer = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });

  useEffect(() => {
    if (treeContainer.current) {
      const { offsetWidth, offsetHeight } = treeContainer.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  if (!treeData) return null;

  const convertNode = (node) => {
    const name = node.type + (node.value ? `\n${node.value}` : '');
    return {
      name,
      children: node.children?.map(convertNode) || [],
    };
  };

  const formattedTree = convertNode(treeData);

  return (
    <div
      ref={treeContainer}
      style={{
        width: '100%',
        height: '580px',
        marginTop: '30px',
        padding: '24px',
        borderRadius: '18px',
        background: 'linear-gradient(to right top, #f0f8ff, #eaf6ff)',
        overflow: 'auto',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
        border: '2px solid #4ecdc4',
      }}
    >
      <h2
        style={{
          margin: '0 0 18px',
          color: '#0077ff',
          fontSize: '1.7rem',
          fontWeight: '800',
          letterSpacing: '0.5px',
          textShadow: '0 2px 5px rgba(0,0,0,0.1)',
        }}
      >
         Parse Tree
      </h2>

      <Tree
        data={formattedTree}
        orientation="vertical"
        translate={{
          x: dimensions.width / 2,
          y: 60,
        }}
        pathFunc="step"
        collapsible={false}
        zoomable={true}
        separation={{ siblings: 2, nonSiblings: 2.4 }}
        styles={{
          links: {
            stroke: '#4ecdc4',
            strokeWidth: 3,
          },
        }}
        renderCustomNodeElement={({ nodeDatum }) => {
          const isLeaf = !nodeDatum.children || nodeDatum.children.length === 0;
          const isRoot = nodeDatum.__rd3t.depth === 0;
          const circleFill = isRoot
            ? '#5a8dee'
            : isLeaf
            ? '#00ffd0'
            : '#5f9ea0';

          // Split lines for multi-line support
          const lines = nodeDatum.name.split('\n');
          const textColor = isRoot ? '#fff' : isLeaf ? '#1b2a2f' : '#2d3748';
          const badgeFill = isRoot
            ? 'rgba(90,141,238,0.18)'
            : isLeaf
            ? 'rgba(0,255,208,0.17)'
            : 'rgba(94,158,160,0.13)';
          const badgeStroke = isRoot
            ? '#5a8dee'
            : isLeaf
            ? '#00ffd0'
            : '#5f9ea0';

          return (
            <g>
              <circle
                r={16}
                fill={circleFill}
                stroke="#eaf6ff"
                strokeWidth={2}
                filter="url(#shadow)"
              />
              {/* Glassy badge background */}
              <rect
                x={-46}
                y={20}
                width={92}
                height={lines.length * 20 + 14}
                rx={18}
                fill={badgeFill}
                stroke={badgeStroke}
                strokeWidth={1.1}
                opacity={0.85}
                filter="url(#badgeShadow)"
              />
              {/* Render each line of text */}
              {lines.map((line, i) => (
                <text
                  key={i}
                  x={0}
                  y={36 + i * 20}
                  textAnchor="middle"
                  style={{
                    fill: textColor,
                    fontSize: '1.05rem',
                    fontFamily: 'Fira Code, monospace',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '0.1em',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    opacity: 0.95,
                    filter: 'drop-shadow(0 1px 2px #fff7)',
                  }}
                >
                  {line}
                </text>
              ))}
              {/* SVG filter for shadow */}
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#5a8dee" floodOpacity="0.09"/>
                </filter>
                <filter id="badgeShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#4ecdc4" floodOpacity="0.07"/>
                </filter>
              </defs>
            </g>
          );
        }}
      />
    </div>
  );
};

export default ParseTree;
