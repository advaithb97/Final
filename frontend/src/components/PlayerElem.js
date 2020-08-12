import React, { useState, useEffect } from 'react';

export default function PlayerElem({name, PTS, TRB, AST, STL, BLK}) {
  
  return (
    <div>
        <p>name: {name}</p>
        <p>points: {PTS}</p>
        <p>rebounds: {TRB}</p>
        <p>assists: {AST}</p>
        <p>steals: {STL}</p>
        <p>blocks: {BLK}</p>
    </div>
  )
}
