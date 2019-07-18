//react
import React, { Fragment } from 'react';
//router
import { } from "react-router-dom";
//redux
import { } from 'react-redux';
import { } from '../redux/selectors';
import { } from '../redux/actions';
//recharts
import {
  PieChart, Pie, Cell,
} from 'recharts';

const colors = ['#38a3c7', '#fff'];

export default function DonutChart({ data = [{ name: "Complete", value: 0 }, { name: "Incomplete", value: 1 }] }) {

  return (
    <Fragment>
      <PieChart width={30} height={30}>
        <Pie data={data}
          nameKey="name"
          dataKey="value"
          innerRadius={4}
          outerRadius={13}
          startAngle={90}
          endAngle={449}
        >
          <Cell key={0} fill={colors[0]} />
          <Cell key={1} fill={colors[1]} />
        </Pie>
      </PieChart>
    </Fragment>
  );
};

