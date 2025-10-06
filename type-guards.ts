interface Circle {
	kind: "circle";
	radius: number;
}

interface Square {
	kind: "square";
	side: number;
}

export type Shape = Circle | Square;

export function isCircle(shape: Shape) {
	return shape.kind === "circle";
}

export function isSquare(shape: Shape) {
	return shape.kind === "square";
}

export function calculateArea(shape: Shape) {
	if (isCircle(shape)) {
		return Math.PI * shape.radius ** 2;
	}

	return shape.side ** 2;
}

export function calculatePerimeter(shape: Shape) {
	if (isCircle(shape)) {
		return shape.radius * Math.PI * 2;
	}

	return shape.side * 4;
}

if (import.meta.main) {
	console.log(
		"area of circle with radius of 2:",
		calculateArea({ kind: "circle", radius: 2 }),
	);
	console.log(
		"area of square with side of 4:",
		calculateArea({ kind: "square", side: 4 }),
	);
	console.log(
		"perimeter of circle with radius of 4:",
		calculatePerimeter({ kind: "circle", radius: 4 }),
	);
	console.log(
		"perimeter of square with side of 4:",
		calculatePerimeter({ kind: "square", side: 4 }),
	);
}
