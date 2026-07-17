export interface Point {
  time: number;
  value: number;
}

export interface Series {
  name: string;
  points: Point[];
}

export interface Graph {
  graph_name: string;
  graph_type: string;
  x_axis: string;
  y_axis: string;
  series: Series[];
}