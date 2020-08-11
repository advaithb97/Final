import React, { useState, useEffect } from 'react';

export default function PlayerElem(PTS, TRB, AST, STL, BLK) {
  
  return (
    <div>
        <p>points: {PTS}</p>
        <p>rebounds: {TRB}</p>
        <p>assists: {AST}</p>
        <p>steals: {STL}</p>
        <p>blocks: {BLK}</p>
    </div>
  )
}
